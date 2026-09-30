import { projects } from '@/data/projects';
import { ProjectTile } from '@/components/projects/ProjectTile';
import { RevealLines } from '@/components/ui/RevealLines';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ButtonLink } from '@/components/ui/ButtonLink';

/**
 * Fl. 05 — Portfólio editorial. Cada projeto ocupa uma proporção
 * diferente da página, como numa revista de arquitetura:
 *   [ grande, panorâmica ]
 *   [ vertical ]   [ horizontal, deslocada ]
 *        [ grande, recuada ]
 */
export function Portfolio() {
  const [a, b, c, d] = projects;

  return (
    <section id="projetos" aria-labelledby="projetos-title" data-sheet="05" data-sheet-title="Portfólio" className="relative pb-24 md:pb-36">
      <div className="container-x">
        <SectionLabel sheet="05" title="Portfólio" />

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:items-end">
          <RevealLines
            id="projetos-title"
            className="display display-xl md:col-span-9"
            lines={['O resultado', <span key="b">é o que <span className="serif-i text-oxido">fica.</span></span>]}
          />
          <p className="text-muted md:col-span-3 md:pb-3" data-reveal>
            Uma seleção de obras residenciais, comerciais e corporativas. Em cada uma, o desafio, a solução e o registro
            do antes, durante e depois.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-x-8 md:gap-y-36">
          {a && (
            <ProjectTile
              project={a}
              index={0}
              titleSize="lg"
              className="md:col-span-12"
              aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
              sizes="(min-width: 1792px) 1700px, 100vw"
            />
          )}
          {b && (
            <ProjectTile
              project={b}
              index={1}
              className="md:col-span-5"
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          )}
          {c && (
            <ProjectTile
              project={c}
              index={2}
              className="md:col-span-6 md:col-start-7 md:mt-[38%]"
              aspect="aspect-square sm:aspect-[4/3]"
              sizes="(min-width: 768px) 48vw, 100vw"
            />
          )}
          {d && (
            <ProjectTile
              project={d}
              index={3}
              titleSize="lg"
              className="md:col-span-10 md:col-start-3"
              aspect="aspect-[4/3] lg:aspect-[16/9]"
              sizes="(min-width: 768px) 80vw, 100vw"
            />
          )}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center md:mt-32">
          <p className="display display-sm">
            {projects.length} projetos <span className="serif-i text-muted">no portfólio</span>
          </p>
          <ButtonLink href="/projetos" variant="outline">
            Ver todos os projetos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
