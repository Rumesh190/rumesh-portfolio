type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
};

export default function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="section-label" data-reveal="">
      <span aria-hidden="true">/</span> {index} — {children}
    </div>
  );
}
