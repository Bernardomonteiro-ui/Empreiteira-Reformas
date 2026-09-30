import { site, whatsappUrl, real } from '@/data/site';
import { ctaSecondary } from '@/data/navigation';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { WhatsApp } from '@/components/ui/Icons';
import { ContactForm } from './ContactForm';

const next = [
  'Lemos o que você enviou e retornamos para entender o projeto.',
  'Agendamos uma visita técnica ao imóvel.',
  'Você recebe escopo, orçamento por etapa e cronograma.',
];

/** Fl. 09 — Contato. Presente no fim de todas as páginas (âncora #contato). */
export function ContactSection({ sheet = '09' }: { sheet?: string }) {
  return (
    <section id="contato" aria-labelledby="contato-title" data-sheet={sheet} data-sheet-title="Contato" className="theme-dark relative border-b border-[var(--line)] py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet={sheet} title="Contato" className="text-muted-dark" />

        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealLines
              id="contato-title"
              className="display display-lg"
              lines={['Conte o que', 'você está', <span key="c" className="serif-i text-oxido-claro">planejando.</span>]}
            />
            <p className="lead mt-10 max-w-[36ch] text-muted-dark" data-reveal>
              Quanto mais soubermos sobre o imóvel e o que você imagina, mais precisa será a primeira conversa. Quem
              responde é o {site.responsible}, responsável pela empresa.
            </p>

            <ol className="mt-12 border-t border-[var(--line)]">
              {next.map((step, i) => (
                <li key={step} className="flex gap-6 border-b border-[var(--line)] py-4" data-reveal>
                  <span className="label pt-1 text-oxido-claro tabular-nums">0{i + 1}</span>
                  <span className="text-muted-dark">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col items-start gap-5" data-reveal>
              <ButtonLink href={whatsappUrl()} external tone="dark" variant="outline" icon={<WhatsApp className="size-4" />}>
                {ctaSecondary.label}
              </ButtonLink>
              <p className="text-muted-dark">
                <a href={`tel:+${site.whatsapp}`} className="text-bone hover:text-oxido-claro">
                  {site.phoneDisplay}
                </a>
                <br />
                {site.openingHours}
              </p>
              {real(site.email) && (
                <a href={`mailto:${site.email}`} className="label text-muted-dark hover:text-bone">
                  {site.email}
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
