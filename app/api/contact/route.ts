import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

// Only allow POST
export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse body ────────────────────────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, phone, message } = body as Record<string, unknown>;

    // ── 2. Validate ──────────────────────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) errors.name = "Required";
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Invalid email address";
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) errors.phone = "Required";
    if (!message || typeof message !== "string" || !message.trim()) errors.message = "Required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 });
    }

    // Safe trimmed values
    const safe = {
      name: (name as string).trim(),
      email: (email as string).trim(),
      phone: (phone as string).trim(),
      message: (message as string).trim(),
    };

    // ── 3. Insert into Supabase ──────────────────────────────────────────────
    const { error: dbError } = await supabase
      .from("leads")
      .insert(safe);

    if (dbError) {
      console.error("[POST /api/contact] Supabase error:", dbError.message);
      return NextResponse.json({ error: "Could not save your inquiry." }, { status: 500 });
    }

    // ── 4. Send email via Resend ─────────────────────────────────────────────
    const submitted = new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.MY_EMAIL!,
      subject: " New Portfolio Inquiry",
      html: buildEmail({ ...safe, submitted }),
    });

    if (emailError) {
      console.error("[POST /api/contact] Resend error:", emailError.message);
      return NextResponse.json({ error: "Inquiry saved but email delivery failed." }, { status: 500 });
    }

    // ── 5. Success ───────────────────────────────────────────────────────────
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/contact] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(p: {
  name: string;
  email: string;
  phone: string;
  message: string;
  submitted: string;
}): string {
  const row = (label: string, value: string, pre = false) => `
    <tr>
      <td style="padding:12px 16px 12px 0;border-bottom:1px solid #eee;font-weight:600;
                 white-space:nowrap;vertical-align:top;color:#111;">${label}</td>
      <td style="padding:12px 0 12px 16px;border-bottom:1px solid #eee;color:#333;
                 ${pre ? "white-space:pre-wrap;" : ""}">
        ${value}
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:12px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(0,0,0,.08);max-width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#111;padding:28px 32px;">
            <p style="margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;
                      color:rgba(255,255,255,.6);">Portfolio</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#fff;">
              New Portfolio Inquiry
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("Name",      esc(p.name))}
              ${row("Email",     `<a href="mailto:${esc(p.email)}" style="color:#ef1206;">${esc(p.email)}</a>`)}
              ${row("Phone",     esc(p.phone))}
              ${row("Message",   esc(p.message).replace(/\n/g, "<br>"), true)}
              ${row("Submitted", esc(p.submitted))}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#999;">
              Sent from your portfolio contact form.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
