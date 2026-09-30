import type { CSSProperties } from 'react';
import { stats } from '@/data/content';
import { CountUp } from '@/components/motion/CountUp';
import { PlaceholderMarker } from '@/components/ui/Placeholder';
import { SectionLabel } from '@/components/ui/SectionLabel';

/** Fl. 07 — Números. Minimalista: tipografia grande e linhas finas. */
export function Numbers() {
  return (
    <section aria-labelledby="numeros-title" data-sheet="07" data-sheet-title="Números" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet="07" title="Números" />
        <h2 id="numeros-title" className="display display-sm mt-14 max-w-[22ch] md:mt-20" data-reveal>
          O que a experiência acumulou, <span className="serif-i text-muted">em números.</span>
        </h2>

        <dl className="mt-14 grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col-reverse justify-end border-b border-[var(--line)] py-10 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:py-14 lg:last:border-r-0 lg:first:pl-0"
              data-reveal
              style={{ '--d': i * 100 } as CSSProperties}
            >
              <dt className="label mt-6 text-muted">
                {s.label}
                {s.placeholder && (
                  <span className="mt-3 block">
                    <PlaceholderMarker label="Número provisório" />
                  </span>
                )}
              </dt>
              <dd className="display text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.85] whitespace-nowrap">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
