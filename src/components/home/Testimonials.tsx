'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Testimonial } from '@/data/content';
import { ArrowRight } from '@/components/ui/Icons';

const INTERVAL = 9000;

/**
 * Uma frase de cliente ocupando a tela. Troca sozinha (pausa ao passar o
 * mouse, ao focar ou com movimento reduzido) e pode ser navegada.
 * As frases ficam empilhadas na mesma célula do grid: a altura é a da
 * maior delas, então a troca nunca desloca o layout.
 */
export function Testimonials({ items, placeholderNote }: { items: Testimonial[]; placeholderNote?: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length), [items.length]);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const t = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, go, items.length]);

  const running = !paused && !reduced;

  return (
    <div
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="grid" aria-live={interacted ? 'polite' : 'off'}>
        {items.map((t, i) => (
          <figure
            key={i}
            aria-hidden={i !== index}
            className="col-start-1 row-start-1 transition-[opacity,transform] duration-1000 ease-[var(--ease-arch)]"
            style={{
              opacity: i === index ? 1 : 0,
              transform: `translate3d(0, ${i === index ? 0 : '1.5rem'}, 0)`,
              visibility: i === index ? 'visible' : 'hidden',
              transitionProperty: 'opacity, transform, visibility',
            }}
          >
            <blockquote>
              <p className="font-serif text-[clamp(2rem,4.9vw,5.25rem)] leading-[1.02] tracking-[-0.015em] text-balance">
                <span aria-hidden="true" className="text-oxido">
                  “
                </span>
                {t.quote}
                <span aria-hidden="true" className="text-oxido">
                  ”
                </span>
              </p>
            </blockquote>
            <figcaption className="mt-10 grid gap-1 border-t border-[var(--line-strong)] pt-6 sm:grid-cols-3 md:mt-14">
              <span className="label">{t.name}</span>
              <span className="label text-muted">{t.project}</span>
              <span className="label text-muted sm:text-right">{t.location}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-6">
        <p className="label tabular-nums" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div aria-hidden="true" className="relative h-px flex-1 bg-[var(--line)]">
          <span
            key={`${index}-${running}`}
            className="absolute inset-0 origin-left bg-ink"
            style={{
              transform: running ? undefined : 'scaleX(0)',
              animation: running ? `progress-x ${INTERVAL}ms linear both` : undefined,
            }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setInteracted(true);
              go(-1);
            }}
            className="grid size-11 place-items-center border border-[var(--line-strong)] transition-colors hover:bg-ink hover:text-cal"
            aria-label="Depoimento anterior"
          >
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => {
              setInteracted(true);
              go(1);
            }}
            className="grid size-11 place-items-center border border-[var(--line-strong)] transition-colors hover:bg-ink hover:text-cal"
            aria-label="Próximo depoimento"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      {placeholderNote}
    </div>
  );
}
