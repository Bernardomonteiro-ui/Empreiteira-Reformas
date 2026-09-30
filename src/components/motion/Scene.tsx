'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { useScrollProgress } from './useScrollProgress';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Mede o progresso enquanto o elemento está "preso" (position: sticky). */
  sticky?: boolean;
  /** Progresso acompanha o centro da viewport. */
  center?: boolean;
  /** Media query em que a cena fica ativa. Fora dela, `--p` = 1 (estado final). */
  media?: string;
  id?: string;
  'aria-labelledby'?: string;
};

/**
 * Invólucro de cena guiada por scroll. O conteúdo continua sendo
 * renderizado no servidor — este componente só escreve `--p` via estilo.
 */
export function Scene({ as: Tag = 'div', children, className, sticky = false, center = false, media = '(min-width: 768px)', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(media);
    const sync = () => {
      setEnabled(mq.matches);
      if (!mq.matches) ref.current?.style.setProperty('--p', '1');
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [media]);

  useScrollProgress(ref, { sticky, center, disabled: !enabled });

  return (
    <Tag ref={ref} data-scene="" className={className} {...rest}>
      {children}
    </Tag>
  );
}
