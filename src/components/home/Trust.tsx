import { testimonials } from '@/data/content';
import { site, mapsUrl } from '@/data/site';
import { PlaceholderMarker } from '@/components/ui/Placeholder';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Testimonials } from './Testimonials';

/** Fl. 08 — Confiança. */
export function Trust() {
  const hasSamples = testimonials.some((t) => t.sample);

  return (
    <section aria-labelledby="confianca-title" data-sheet="08" data-sheet-title="Confiança" className="relative bg-cal-2 py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet="08" title="Confiança" />
        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 md:mt-20">
          <h2 id="confianca-title" className="label text-muted">
            Quem já reformou com a gente
          </h2>
          <a
            href={mapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Nota ${site.googleRating.value.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} no Google, com ${site.googleRating.count} avaliações`}
            className="group flex items-baseline gap-3"
          >
            <span className="display text-4xl tabular-nums">
              {site.googleRating.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
            </span>
            <span aria-hidden="true" className="text-oxido">
              ★★★★★
            </span>
            <span className="text-sm text-muted underline-offset-4 group-hover:underline">
              {site.googleRating.count} avaliações no Google
            </span>
          </a>
        </div>
        <div className="mt-8 md:mt-10" data-reveal>
          <Testimonials
            items={testimonials}
            placeholderNote={
              hasSamples ? (
                <p className="mt-8">
                  <PlaceholderMarker label="Depoimentos de exemplo — substituir por depoimentos reais autorizados" />
                </p>
              ) : null
            }
          />
        </div>
      </div>
    </section>
  );
}
