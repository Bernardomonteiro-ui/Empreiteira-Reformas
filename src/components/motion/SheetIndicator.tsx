'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Indicador de progresso da página no formato de numeração de prancha:
 * "Fl. 04 / 09 — Processo". Só desktop; decorativo (aria-hidden), pois a
 * estrutura de títulos já comunica as seções a leitores de tela.
 */
export function SheetIndicator() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<{ n: string; title: string } | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-sheet]'));
    setTotal(sections.length);
    setCurrent(null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          setCurrent(el.dataset.sheet === '01' ? null : { n: el.dataset.sheet ?? '', title: el.dataset.sheetTitle ?? '' });
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  if (total < 3) return null;

  return (
    <div
      aria-hidden="true"
      className={`label pointer-events-none fixed bottom-8 left-[calc(var(--gutter)/2)] z-30 hidden -translate-x-1/2 rotate-180 text-bone mix-blend-difference transition-opacity duration-500 [writing-mode:vertical-rl] xl:flex xl:items-center xl:gap-3 ${
        current ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="tabular-nums">
        Fl. {current?.n} / {String(total).padStart(2, '0')}
      </span>
      <span className="h-8 w-px bg-current" />
      <span>{current?.title}</span>
    </div>
  );
}
