import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition, type CSSProperties } from 'react';
import type { Project } from '@/data/projects';
import { PlaceholderMarker } from '@/components/ui/Placeholder';
import { ArrowUpRight } from '@/components/ui/Icons';

type Props = {
  project: Project;
  /** Classe de proporção da imagem (ex.: "aspect-[4/5]"). */
  aspect: string;
  sizes: string;
  index: number;
  className?: string;
  /** Tamanho do nome do projeto. */
  titleSize?: 'lg' | 'md';
  headingLevel?: 'h2' | 'h3';
};

/**
 * Peça do portfólio editorial: imagem que surge por trás de uma cortina,
 * parallax sutil (CSS scroll-driven, só desktop) e legenda técnica.
 * A imagem compartilha o nome de transição com a abertura da página do
 * projeto — ao clicar, ela "viaja" até lá.
 */
export function ProjectTile({ project, aspect, sizes, index, className = '', titleSize = 'md', headingLevel: H = 'h3' }: Props) {
  return (
    <article className={className}>
      <Link
        href={`/projetos/${project.slug}`}
        className="group block"
        data-cursor="view"
        data-cursor-label="Ver projeto"
        aria-label={`${project.name} — ${project.type}, ${project.area} m²`}
      >
        <div className={`relative overflow-hidden bg-cal-2 ${aspect}`} data-reveal="curtain" style={{ '--d': 80 } as CSSProperties}>
          <ViewTransition name={`projeto-${project.slug}`} share="morph" default="none">
            <div className="img-hover parallax absolute inset-0 overflow-hidden" style={{ '--px': 6 } as CSSProperties}>
              <div className="curtain-img absolute inset-0">
                <Image src={project.cover.src} alt={project.cover.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
              </div>
            </div>
          </ViewTransition>
          <div aria-hidden="true" className="curtain" />
        </div>

        <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-2" data-reveal>
          <span className="label pt-1.5 text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <H className={`display ${titleSize === 'lg' ? 'display-md' : 'display-sm'}`}>{project.name}</H>
            <p className="label mt-3 text-muted">
              {project.type} <span aria-hidden="true">·</span> {project.location} <span aria-hidden="true">—</span>{' '}
              {project.area} <span className="normal-case">m²</span>
            </p>
            {project.sample && (
              <p className="mt-3">
                <PlaceholderMarker label="Projeto de exemplo" />
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className="mt-1 grid size-10 place-items-center border border-[var(--line-strong)] transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-cal"
          >
            <ArrowUpRight />
          </span>
        </div>
      </Link>
    </article>
  );
}
