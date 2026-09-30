import { services } from '@/data/services';
import { site } from '@/data/site';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesList } from './ServicesList';

/** Fl. 06 — Serviços, como lista editorial interativa (sem cards). */
export function Services() {
  const items = services.map(({ slug, name, short, image, page }) => ({ slug, name, short, image, hasPage: Boolean(page) }));

  return (
    <section id="servicos" aria-labelledby="servicos-title" data-sheet="06" data-sheet-title="Serviços" className="theme-dark relative py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet="06" title="Serviços" className="text-muted-dark" />

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <RevealLines
            id="servicos-title"
            className="display display-lg md:col-span-8"
            lines={[
              'Da primeira medição',
              <span key="b">
                à <span className="serif-i text-oxido-claro">última</span> entrega.
              </span>,
            ]}
          />
          <p className="lead text-muted-dark md:col-span-4 md:self-end" data-reveal>
            Uma empresa de reformas em {site.city} com equipe para conduzir a obra inteira — ou a etapa que você precisa.
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          <ServicesList items={items} />
        </div>
      </div>
    </section>
  );
}
