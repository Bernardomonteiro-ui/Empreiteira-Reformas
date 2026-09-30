'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ProcessStep } from '@/data/content';
import { Scene } from '@/components/motion/Scene';

/**
 * Timeline vertical: à esquerda (desktop), um painel preso com o número
 * e a imagem da etapa ativa; à direita, as etapas e uma linha que se
 * preenche com o scroll. No mobile, vira uma timeline de leitura simples.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-8">
      {/* Painel preso — somente desktop */}
      <div aria-hidden="true" className="hidden md:col-span-5 md:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative h-[clamp(8rem,17vw,16rem)] overflow-hidden">
            {steps.map((s, i) => (
              <span
                key={s.n}
                className="display absolute inset-0 text-[clamp(8rem,19vw,18rem)] leading-[0.8] tabular-nums transition-[opacity,transform] duration-700 ease-[var(--ease-arch)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `translate3d(0, ${i === active ? 0 : i < active ? -40 : 40}%, 0)`,
                }}
              >
                {s.n}
              </span>
            ))}
          </div>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-cal-2">
            {steps.map((s, i) => (
              <Image
                key={s.n}
                src={s.photo.src}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 1px"
                className="object-cover transition-[opacity,transform] duration-1000 ease-[var(--ease-arch)]"
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.06)' }}
              />
            ))}
          </div>
          <p className="label mt-4 flex justify-between text-muted">
            <span>Etapa {steps[active].n} / 0{steps.length}</span>
            <span>{steps[active].deliverable}</span>
          </p>
        </div>
      </div>

      {/* Etapas */}
      <Scene as="ol" center media="(min-width: 0px)" className="relative md:col-span-6 md:col-start-7">
        {/* Trilho e preenchimento */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.3125rem] w-px bg-[var(--line)]" />
        <span aria-hidden="true" className="tl-fill absolute top-2 bottom-2 left-[0.3125rem] w-px bg-oxido" />

        {steps.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className="relative pb-16 pl-10 last:pb-0 md:flex md:min-h-[62vh] md:flex-col md:justify-center md:pb-0 md:pl-14"
          >
            <span
              aria-hidden="true"
              className={`absolute top-2 left-0 size-[0.6875rem] border transition-colors duration-500 md:top-1/2 md:-translate-y-1/2 ${
                i <= active ? 'border-oxido bg-oxido' : 'border-[var(--line-strong)] bg-cal'
              }`}
            />
            <div data-reveal>
              <p className="label text-oxido tabular-nums">{s.n}</p>
              <h3 className="display display-md mt-3">{s.title}</h3>
              <p className="lead mt-6 max-w-[34ch]">{s.lead}</p>
              <p className="mt-4 max-w-[46ch] text-muted">{s.text}</p>
              <p className="label mt-6 inline-block border-t border-[var(--line-strong)] pt-3 text-muted">
                Entregável — {s.deliverable}
              </p>
            </div>
          </li>
        ))}
      </Scene>
    </div>
  );
}
