import Image from 'next/image';
import type { CSSProperties } from 'react';
import { photos } from '@/assets/images';
import { Scene } from '@/components/motion/Scene';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';

const groundwork = [
  { k: 'A', title: 'Levantamento', text: 'Medições, instalações existentes, estrutura e condições do imóvel.' },
  { k: 'B', title: 'Escopo', text: 'O que será feito, o que fica e o que muda — por escrito.' },
  { k: 'C', title: 'Orçamento', text: 'Aberto por etapa, com materiais e mão de obra identificados.' },
  { k: 'D', title: 'Cronograma', text: 'Sequência de obra com marcos e datas que você acompanha.' },
];

/**
 * Fl. 02 — Antes de construir. Narrativa no lugar do "Sobre nós".
 * No desktop, a imagem fica presa enquanto o texto passa e revela, aos
 * poucos, a planta, um ponto de detalhe e a ampliação desse detalhe.
 */
export function BeforeBuilding() {
  return (
    <section aria-labelledby="antes-title" data-sheet="02" data-sheet-title="Antes de construir" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionLabel sheet="02" title="Antes de construir" />

        <Scene className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-6">
            <RevealLines
              id="antes-title"
              className="display text-[clamp(2.6rem,5.4vw,6rem)]"
              lines={[
                'Uma boa reforma',
                <>
                  <span className="serif-i text-oxido">não começa</span> com
                </>,
                'uma demolição.',
              ]}
            />

            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-6">
              <p className="lead lg:col-span-5" data-reveal>
                Começa com perguntas. Como você vive o espaço, o que precisa mudar, o que as paredes escondem, quanto
                tempo a obra pode durar e quanto ela deve custar.
              </p>
              <div className="prose-editorial text-muted lg:col-span-4 lg:col-start-2" data-reveal style={{ '--d': 120 } as CSSProperties}>
                <p>
                  A maior parte dos problemas de uma reforma nasce antes do primeiro martelo: um levantamento
                  apressado, um orçamento genérico, um escopo que ninguém escreveu. Por isso, nosso trabalho começa na
                  prancheta.
                </p>
                <p>
                  Visitamos o imóvel, medimos, verificamos instalações e estrutura, e só então propomos. Você recebe
                  escopo, orçamento e cronograma antes de qualquer demolição — e decide com clareza.
                </p>
              </div>
            </div>

            <ol className="mt-16 border-t border-[var(--line)] md:mt-24">
              {groundwork.map((item, i) => (
                <li
                  key={item.k}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-[var(--line)] py-6 sm:grid-cols-[3rem_15rem_1fr] lg:grid-cols-[3rem_16rem_1fr]"
                  data-reveal
                  style={{ '--d': i * 80 } as CSSProperties}
                >
                  <span className="label pt-1 text-oxido">{item.k}.</span>
                  <h3 className="display display-sm">{item.title}</h3>
                  <p className="col-start-2 mt-2 text-muted sm:col-start-3 sm:mt-0 sm:pt-1">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <figure className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-cal-2">
                <Image
                  src={photos.planejamentoProjeto.src}
                  alt={photos.planejamentoProjeto.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
                {/* Cortina que se recolhe com o scroll */}
                <div aria-hidden="true" className="bb-cover absolute inset-0 bg-cal" />

                {/* Marcador de detalhe, como numa prancha */}
                <div aria-hidden="true" className="bb-marker absolute top-[48%] left-[52%] -translate-1/2">
                  <span className="grid size-16 place-items-center rounded-full border border-bone">
                    <span className="label text-bone">A</span>
                  </span>
                </div>

                <p className="bb-note label absolute top-5 left-5 bg-ink/70 px-2 py-1 text-bone" style={{ '--s': 0.55 } as CSSProperties}>
                  Levantamento · 1:50
                </p>
                <p className="bb-note label absolute right-5 bottom-5 bg-ink/70 px-2 py-1 text-bone" style={{ '--s': 0.65 } as CSSProperties}>
                  Escopo aprovado
                </p>
              </div>

              {/* Ampliação do detalhe A */}
              <div className="bb-detail relative -mt-24 ml-auto w-[48%] border-8 border-cal md:-mt-32">
                <div className="relative aspect-square overflow-hidden bg-cal-2">
                  <Image
                    src={photos.planejamentoProjeto.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 20vw, 50vw"
                    className="origin-[52%_48%] scale-[2.4] object-cover"
                  />
                </div>
              </div>

              <figcaption className="label mt-4 flex justify-between gap-4 text-muted">
                <span>Det. A — definição de escopo</span>
                <span>Fig. 02</span>
              </figcaption>
            </figure>
          </div>
        </Scene>
      </div>
    </section>
  );
}
