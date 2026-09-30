import type { CSSProperties } from 'react';
import { Scene } from '@/components/motion/Scene';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';

const pains = [
  { word: 'Atrasos.', answer: 'Cronograma com marcos semanais, definido antes da obra e revisado a cada etapa.', tag: 'Prazo' },
  { word: 'Imprevistos.', answer: 'Diagnóstico técnico do imóvel antes do orçamento, para descobrir cedo o que costuma aparecer tarde.', tag: 'Diagnóstico' },
  { word: 'Falta de comunicação.', answer: 'Um gestor responsável e relatórios periódicos com fotos, avanço e próximos passos.', tag: 'Gestão' },
  { word: 'Orçamento que muda.', answer: 'Orçamento aberto por etapa. Qualquer mudança é apresentada com custo e prazo antes de ser executada.', tag: 'Custo' },
];

/**
 * Fl. 03 — O problema. No desktop, a cena fica presa enquanto as quatro
 * dores aparecem uma a uma e, no fim, recebem um traço de correção —
 * como uma revisão de projeto. No mobile, as palavras só surgem em sequência.
 */
export function Problem() {
  return (
    <section aria-labelledby="problema-title" data-sheet="03" data-sheet-title="O problema" className="theme-dark relative">
      <Scene sticky className="relative md:h-[340vh]">
        <div className="container-x flex flex-col py-24 md:sticky md:top-0 md:h-svh md:justify-center md:py-0">
          <SectionLabel sheet="03" title="O problema" className="text-muted-dark md:absolute md:inset-x-[var(--gutter)] md:top-[calc(var(--header-h)+1.5rem)]" />

          <ul className="mt-14 md:mt-0" aria-label="Problemas comuns em reformas">
            {pains.map((p, i) => (
              <li key={p.word} className="pb-word relative" style={{ '--i': i } as CSSProperties}>
                <span className="flex items-baseline gap-4 md:gap-8" data-reveal style={{ '--d': i * 90 } as CSSProperties}>
                  <span className="label w-6 shrink-0 text-muted-dark tabular-nums">0{i + 1}</span>
                  <span className="relative display display-lg">
                    {p.word}
                    <span aria-hidden="true" className="pb-strike absolute top-[52%] left-0 hidden h-[0.06em] w-full bg-oxido-claro md:block" style={{ '--i': i } as CSSProperties} />
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="pb-counter label mt-12 hidden max-w-xs text-muted-dark md:block">
            Quatro palavras que quase todo mundo que já reformou reconhece.
          </p>
        </div>
      </Scene>

      <div className="container-x pt-8 pb-24 md:pt-0 md:pb-36">
        <div className="grid gap-12 border-t border-[var(--line)] pt-16 md:grid-cols-12 md:pt-24">
          <RevealLines
            id="problema-title"
            className="display display-md md:col-span-7"
            lines={[
              'É por isso que',
              <>
                a <span className="serif-i text-oxido-claro">execução</span> importa.
              </>,
            ]}
          />
          <p className="lead text-muted-dark md:col-span-5 md:pt-3" data-reveal>
            Nenhuma obra está livre de surpresas. A diferença está em quem planeja para reduzi-las e sabe o que fazer
            quando aparecem. Gestão é o que transforma uma reforma em um processo previsível.
          </p>
        </div>

        <ol className="mt-16 grid border-t border-l border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
          {pains.map((p, i) => (
            <li
              key={p.tag}
              className="flex flex-col border-r border-b border-[var(--line)] p-6 md:p-8"
              data-reveal
              style={{ '--d': i * 90 } as CSSProperties}
            >
              <span className="label text-muted-dark">
                <s className="decoration-oxido-claro">{p.word.replace('.', '')}</s>
              </span>
              <h3 className="display display-sm mt-10">{p.tag}</h3>
              <p className="mt-4 text-muted-dark">{p.answer}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
