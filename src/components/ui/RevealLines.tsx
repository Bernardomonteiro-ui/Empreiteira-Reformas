import type { CSSProperties, ElementType, ReactNode } from 'react';

type Props = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
};

/**
 * Título revelado linha a linha por máscara. As quebras são definidas
 * editorialmente (não dependem do navegador), como numa diagramação de revista.
 */
export function RevealLines({ as: Tag = 'h2', lines, className, delay = 0, id }: Props) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ '--d': delay } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span style={{ '--i': i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
