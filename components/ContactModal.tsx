"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Fields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof Fields, string>>;

const LABEL: React.CSSProperties = {
  display: "block",
  fontFamily: "'Space Mono'",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: ".1em",
  opacity: 0.6,
  marginBottom: "6px",
  color: "var(--ink)",
};

const ERR: React.CSSProperties = {
  display: "block",
  fontFamily: "'Space Mono'",
  fontSize: "11px",
  color: "var(--accent)",
  marginTop: "4px",
};

const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup toast timer on unmount
  useEffect(() => {
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);

  // Mount → double-RAF → transition in; close → transition out → unmount
  useEffect(() => {
    if (isOpen) {
      setFields(EMPTY);
      setErrors({});
      setSubmitError(null);
      setMounted(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Focus first field after entry animation
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => firstRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [visible]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mounted]);

  // Render while modal is open OR toast is showing
  if (!mounted && !toast) return null;

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!fields.name.trim()) e.name = "Required";
    if (!fields.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email";
    if (!fields.phone.trim()) e.phone = "Required";
    if (!fields.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("leads").insert({
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      message: fields.message.trim(),
    });

    setLoading(false);

    if (error) {
      console.error("[ContactModal] Supabase insert error:", error);
      setSubmitError(error.message || "Something went wrong. Please try again.");
      return;
    }

    // Success: close modal, show toast
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast("Thanks! I'll contact you soon.");
    toastTimer.current = setTimeout(() => setToast(null), 4000);
    onClose();
  };

  const change =
    (field: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  const easing = "cubic-bezier(.2,.7,.2,1)";

  return (
    <>
      <style>{`
        .cm-input {
          width: 100%;
          padding: 12px 16px;
          background: var(--bg);
          border: 1.5px solid rgba(127,127,127,.3);
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--ink);
          outline: none;
          box-sizing: border-box;
          transition: border-color .2s, box-shadow .2s, opacity .2s;
          display: block;
        }
        .cm-input::placeholder { opacity: .4; }
        .cm-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(239,18,6,.1);
        }
        .cm-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .cm-input.cm-err { border-color: var(--accent) !important; }
        .cm-close:hover  { opacity: 1   !important; }
        .cm-cancel:hover { opacity: 1   !important; }
        .cm-submit:not(:disabled):hover { opacity: .82 !important; transform: translateY(-1px) !important; }
        @keyframes cm-toast-in {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .cm-toast {
          animation: cm-toast-in .35s cubic-bezier(.2,.85,.25,1) forwards;
        }
      `}</style>

      {/* Toast — rendered independently so it survives modal close */}
      {toast && (
        <div
          className="cm-toast"
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2000,
            background: "var(--ink)",
            color: "var(--bg)",
            fontFamily: "'Space Mono'",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            padding: "14px 24px",
            borderRadius: "999px",
            boxShadow: "0 12px 40px rgba(0,0,0,.28)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {toast}
        </div>
      )}

      {/* Modal */}
      {mounted && (
        <div
          onClick={onBackdrop}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(16px,4vw,32px)",
            background: "rgba(0,0,0,.58)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            opacity: visible ? 1 : 0,
            transition: `opacity .35s ${easing}`,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
            style={{
              background: "var(--card)",
              borderRadius: "24px",
              padding: "clamp(24px,4vw,44px)",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 28px 80px rgba(0,0,0,.32)",
              transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)",
              opacity: visible ? 1 : 0,
              transition: `transform .4s cubic-bezier(.2,.85,.25,1), opacity .35s ${easing}`,
            }}
          >
            {/* Close × */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cm-close"
              disabled={loading}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "30px",
                height: "30px",
                border: "1.5px solid var(--ink)",
                borderRadius: "50%",
                background: "none",
                color: "var(--ink)",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.45,
                fontSize: "18px",
                lineHeight: 1,
                padding: 0,
                transition: "opacity .2s",
              }}
            >
              ×
            </button>

            <h2
              id="cm-title"
              style={{
                fontFamily: "'Bricolage Grotesque'",
                fontWeight: 800,
                fontSize: "clamp(22px,3.5vw,36px)",
                letterSpacing: "-.03em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                paddingRight: "44px",
                marginBottom: "12px",
                color: "var(--ink)",
              }}
            >
              Let&apos;s Build Together
            </h2>

            <p
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                opacity: 0.55,
                marginBottom: "28px",
                lineHeight: 1.6,
                color: "var(--ink)",
              }}
            >
              Tell me a little about your project<br />and I&apos;ll get back to you.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Name */}
                <div>
                  <label htmlFor="cm-name" style={LABEL}>Name *</label>
                  <input
                    ref={firstRef}
                    id="cm-name"
                    type="text"
                    value={fields.name}
                    onChange={change("name")}
                    placeholder="Your name"
                    className={`cm-input${errors.name ? " cm-err" : ""}`}
                    autoComplete="name"
                    disabled={loading}
                  />
                  {errors.name && <span style={ERR}>{errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="cm-email" style={LABEL}>Email *</label>
                  <input
                    id="cm-email"
                    type="email"
                    value={fields.email}
                    onChange={change("email")}
                    placeholder="your@email.com"
                    className={`cm-input${errors.email ? " cm-err" : ""}`}
                    autoComplete="email"
                    disabled={loading}
                  />
                  {errors.email && <span style={ERR}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="cm-phone" style={LABEL}>Phone *</label>
                  <input
                    id="cm-phone"
                    type="tel"
                    value={fields.phone}
                    onChange={change("phone")}
                    placeholder="+91 99999 99999"
                    className={`cm-input${errors.phone ? " cm-err" : ""}`}
                    autoComplete="tel"
                    disabled={loading}
                  />
                  {errors.phone && <span style={ERR}>{errors.phone}</span>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="cm-message" style={LABEL}>Message *</label>
                  <textarea
                    id="cm-message"
                    value={fields.message}
                    onChange={change("message")}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className={`cm-input${errors.message ? " cm-err" : ""}`}
                    style={{ resize: "vertical", minHeight: "100px" }}
                    disabled={loading}
                  />
                  {errors.message && <span style={ERR}>{errors.message}</span>}
                </div>
              </div>

              {/* Submit error */}
              {submitError && (
                <p
                  style={{
                    fontFamily: "'Space Mono'",
                    fontSize: "12px",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    marginTop: "16px",
                  }}
                >
                  {submitError}
                </p>
              )}

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="cm-cancel"
                  disabled={loading}
                  style={{
                    padding: "12px 22px",
                    background: "none",
                    border: "1.5px solid var(--ink)",
                    borderRadius: "999px",
                    fontFamily: "'Space Mono'",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "var(--ink)",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.35 : 0.6,
                    transition: "opacity .2s",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cm-submit"
                  disabled={loading}
                  style={{
                    padding: "12px 22px",
                    background: "var(--ink)",
                    border: "none",
                    borderRadius: "999px",
                    fontFamily: "'Space Mono'",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "var(--bg)",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.65 : 1,
                    transition: `opacity .2s, transform .25s ${easing}`,
                  }}
                >
                  {loading ? "Sending..." : "Send Inquiry →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
