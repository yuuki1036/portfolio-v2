interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] uppercase text-accent ${className ?? ""}`}
    >
      <span>
        {index} / {label}
      </span>
      <span className="h-px flex-1 max-w-20 bg-border" aria-hidden="true" />
    </div>
  );
}
