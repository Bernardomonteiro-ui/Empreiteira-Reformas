import Image from 'next/image';
import type { CSSProperties } from 'react';
import { photos } from '@/assets/images';
import { site } from '@/data/site';
import { ctaPrimary } from '@/data/navigation';
import { ButtonLink } from '@/components/ui/ButtonLink';

const d = (ms: number) => ({ '--d': ms }) as CSSProperties;

/**
 * Fl. 01 — Abertura: "O resultado começa antes da obra".
 * A fotografia é o LCP: carregamento imediato, fetchpriority alta, sem
 * animação de opacidade (só escala), para não atrasar a métrica.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-sheet="01"
      data-sheet-title="Abertura"
      className="theme-dark relative isolate flex min-h-[640px] flex-col overflow-hidden h-svh"
    >
      <div className="hero-drift absolute inset-0 -z-10">
        <div className="hero-img absolute inset-0">
          <Image
            src={photos.heroSalaIntegrada.src}
            alt={photos.heroSalaIntegrada.alt}
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="object-cover object-[60%_50%]"
          />
        </div>
      </div>
      {/* Véu para legibilidade do texto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/90 md:from-ink/55 md:via-ink/15 md:to-ink/85" />

      {/* Guias verticais da prancha */}
      <div aria-hidden="true" className="container-x pointer-events-none absolute inset-0 -z-10 hidden grid-cols-12 md:grid">
        {[3, 6, 9].map((c) => (
          <span
            key={c}
            className="hero-fade h-full border-r border-bone/10"
            style={{ gridColumn: `${c} / span 1`, ...d(600 + c * 40) }}
          />
        ))}
      </div>

      <div className="container-x flex flex-1 flex-col pt-[calc(var(--header-h)+1.5rem)]">
        <div className="hero-fade flex items-start justify-between gap-6" style={d(900)}>
          <p className="label max-w-[18rem] text-bone/80">Fl. 01 — O resultado começa antes da obra</p>
          <p className="label hidden text-right text-bone/80 md:block">
            Empresa de reformas
            <br />
            {site.city} — {site.state}
          </p>
        </div>

        <div className="mt-auto pb-8 md:pb-10">
          <p className="label hero-fade mb-6 text-bone/80 md:hidden" style={d(900)}>
            Empresa de reformas em {site.city}
          </p>
          <h1 id="hero-title" className="display display-xl">
            {/* Quebras fixas + nowrap: a altura do título não muda quando a fonte
                condensada substitui a de fallback (evita CLS). */}
            <span className="hero-settle block whitespace-nowrap">Seu espaço.</span>
            <span className="hero-settle block whitespace-nowrap">
              Nossa <br className="sm:hidden" />
              execução<span className="text-oxido-claro">.</span>
            </span>
          </h1>

          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
            <p className="lead hero-fade text-bone/90 md:col-span-6 lg:col-span-5" style={d(700)}>
              Reformas completas, planejamento e execução para transformar ambientes com previsibilidade, qualidade e
              cuidado em cada etapa.
            </p>
            <div
              className="hero-fade flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end lg:col-span-7"
              style={d(850)}
            >
              <ButtonLink href={ctaPrimary.href} tone="dark">
                {ctaPrimary.label}
              </ButtonLink>
              <ButtonLink href="#projetos" tone="dark" variant="outline">
                Ver projetos
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4 md:mt-14">
            <span aria-hidden="true" className="hero-draw hidden h-px flex-1 bg-bone/35 sm:block" style={d(1000)} />
            <p className="label hero-fade text-bone/80 sm:shrink-0" style={d(1100)}>
              Reformas residenciais <span className="text-oxido-claro">•</span> comerciais{' '}
              <span className="text-oxido-claro">•</span> corporativas
            </p>
            <span aria-hidden="true" className="hero-draw hidden h-px w-16 bg-bone/35 md:block" style={d(1150)} />
          </div>
        </div>
      </div>
    </section>
  );
}
