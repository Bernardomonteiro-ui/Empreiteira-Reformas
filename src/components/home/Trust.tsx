import { testimonials } from '@/data/content';
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
        <h2 id="confianca-title" className="label mt-14 text-muted md:mt-20">
          Quem já reformou com a gente
        </h2>
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
