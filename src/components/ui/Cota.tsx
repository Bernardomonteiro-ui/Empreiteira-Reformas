import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Linha de cota — a assinatura gráfica do site. Remete à dimensão num
 * desenho técnico: traço fino, marcas oblíquas nas extremidades e o valor ao centro.
 */
export function Cota({ children, className = '', delay = 0 }: Props) {
  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="relative h-3 flex-1" data-reveal="draw" style={{ '--d': delay } as CSSProperties}>
        <span className="absolute inset-x-0 top-1/2 h-px bg-current opacity-50" />
        <span className="absolute top-0 left-0 h-3 w-px rotate-45 bg-current" />
      </span>
      <span className="label shrink-0 tabular-nums">{children}</span>
      <span
        aria-hidden="true"
        className="relative h-3 flex-1"
        data-reveal="draw"
        style={{ '--d': delay + 150 } as CSSProperties}
      >
        <span className="absolute inset-x-0 top-1/2 h-px bg-current opacity-50" />
        <span className="absolute top-0 right-0 h-3 w-px rotate-45 bg-current" />
      </span>
    </div>
  );
}
