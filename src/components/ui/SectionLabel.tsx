type Props = {
  sheet: string;
  title: string;
  className?: string;
};

/** Rótulo de prancha: "FL. 02 — Antes de construir", com linha fina que se desenha. */
export function SectionLabel({ sheet, title, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="label tabular-nums">Fl. {sheet}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-current opacity-25" data-reveal="draw" />
      <span className="label text-right">{title}</span>
    </div>
  );
}
