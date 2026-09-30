import { processSteps } from '@/data/content';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProcessTimeline } from './ProcessTimeline';

/** Fl. 04 — Processo. */
export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" data-sheet="04" data-sheet-title="Processo" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet="04" title="Processo" />

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <RevealLines
            id="processo-title"
            className="display display-lg md:col-span-7"
            lines={['Seis etapas.', <span key="b" className="serif-i text-oxido">Um responsável.</span>]}
          />
          <p className="lead text-muted md:col-span-4 md:col-start-9 md:self-end" data-reveal>
            Um método aplicado em toda obra, do apartamento compacto à sede corporativa. Cada etapa termina com um
            entregável — e só então a próxima começa.
          </p>
        </div>

        <div className="mt-16 md:mt-28">
          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
