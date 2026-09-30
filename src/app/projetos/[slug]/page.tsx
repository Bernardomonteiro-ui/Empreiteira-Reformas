import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition, type CSSProperties } from 'react';

import { projects, getProject, getNextProject, phaseLabel } from '@/data/projects';
import { getService } from '@/data/services';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, projectSchema } from '@/lib/schema';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { Cota } from '@/components/ui/Cota';
import { PlaceholderMarker } from '@/components/ui/Placeholder';
import { RevealLines } from '@/components/ui/RevealLines';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ArrowUpRight } from '@/components/ui/Icons';
import { ContactSection } from '@/components/contact/ContactSection';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/projetos/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${project.type}, ${project.area} m²`,
    description: `${project.summary} Veja desafio, solução e o registro de antes, durante e depois da obra.`,
    path: `/projetos/${project.slug}`,
    image: { src: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt },
  });
}

/** Composição assimétrica da galeria, repetida em ciclo. */
const galleryLayout = [
  { cls: 'md:col-span-7', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 58vw, 100vw' },
  { cls: 'md:col-span-4 md:col-start-9 md:mt-[45%]', aspect: 'aspect-[3/4]', sizes: '(min-width: 768px) 33vw, 100vw' },
  { cls: 'md:col-span-12', aspect: 'aspect-[4/3] md:aspect-[16/9]', sizes: '100vw' },
  { cls: 'md:col-span-8 md:col-start-3', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 66vw, 100vw' },
];

export default async function ProjectPage(props: PageProps<'/projetos/[slug]'>) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: project.name, path: `/projetos/${project.slug}` },
  ];

  const facts = [
    { k: 'Localização', v: project.location },
    { k: 'Tipo de reforma', v: project.type },
    { k: 'Prazo de obra', v: project.duration },
    { k: 'Ano', v: project.year },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), projectSchema(project)]} />

      <PageHero
        eyebrow={project.type}
        title={project.name}
        lead={project.summary}
        photo={project.cover}
        crumbs={crumbs}
        wrapImage={(img) => (
          <ViewTransition name={`projeto-${project.slug}`} share="morph" default="none">
            {img}
          </ViewTransition>
        )}
      />

      {/* Ficha técnica */}
      <section aria-labelledby="ficha-title" className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-center justify-between gap-4">
            <h2 id="ficha-title" className="label">
              Ficha técnica
            </h2>
            {project.sample && <PlaceholderMarker label="Projeto de exemplo — dados provisórios" />}
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="display text-[clamp(5rem,13vw,12rem)] leading-[0.8] tabular-nums" data-reveal>
                {project.area}
                <span className="serif-i ml-2 text-[0.35em] text-muted">m²</span>
              </p>
              <Cota className="mt-8 text-muted">Área reformada · {project.area} <span className="normal-case">m²</span></Cota>
            </div>
            <dl className="grid grid-cols-2 border-t border-l border-[var(--line)] md:col-span-6 md:col-start-7">
              {facts.map((f, i) => (
                <div key={f.k} className="border-r border-b border-[var(--line)] p-5 md:p-6" data-reveal style={{ '--d': i * 80 } as CSSProperties}>
                  <dt className="label text-muted">{f.k}</dt>
                  <dd className="mt-3 text-lg">{f.v}</dd>
                </div>
              ))}
              <div className="col-span-2 border-r border-b border-[var(--line)] p-5 md:p-6">
                <dt className="label text-muted">Serviços</dt>
                <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {project.services.map((slug) => {
                    const s = getService(slug);
                    if (!s) return null;
                    return s.page ? (
                      <Link key={slug} href={`/${slug}`} className="underline decoration-[var(--line-strong)] underline-offset-4 hover:text-oxido">
                        {s.name}
                      </Link>
                    ) : (
                      <span key={slug}>{s.name}</span>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Desafio e solução */}
      <section aria-label="Desafio e solução" className="border-t border-[var(--line)] py-20 md:py-32">
        <div className="container-x grid gap-16 md:grid-cols-12 md:gap-8">
          <article className="md:col-span-5">
            <p className="label text-oxido">01</p>
            <h2 className="display display-md mt-4">O desafio</h2>
            <p className="lead mt-8 text-muted" data-reveal>
              {project.challenge}
            </p>
          </article>
          <article className="md:col-span-6 md:col-start-7 md:mt-40">
            <p className="label text-oxido">02</p>
            <h2 className="display display-md mt-4">A solução</h2>
            <p className="lead mt-8" data-reveal>
              {project.solution}
            </p>
            <ul className="mt-10 border-t border-[var(--line)]">
              {project.highlights.map((h) => (
                <li key={h} className="label flex items-center gap-4 border-b border-[var(--line)] py-4" data-reveal>
                  <span aria-hidden="true" className="h-px w-6 bg-oxido" />
                  {h}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Galeria antes / durante / depois */}
      <section aria-labelledby="galeria-title" className="pb-24 md:pb-36">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-10">
            <RevealLines
              id="galeria-title"
              className="display display-lg"
              lines={[<span key="a">Antes, durante</span>, <span key="b">e <span className="serif-i text-oxido">depois.</span></span>]}
            />
            <ul className="label flex gap-6 text-muted" aria-label="Fases registradas">
              {(['antes', 'durante', 'depois'] as const).map((ph) => (
                <li key={ph}>
                  {phaseLabel[ph]} · {project.gallery.filter((g) => g.phase === ph).length}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-28">
            {project.gallery.map((item, i) => {
              const l = galleryLayout[i % galleryLayout.length];
              return (
                <figure key={i} className={l.cls}>
                  <div className={`relative overflow-hidden bg-cal-2 ${l.aspect}`} data-reveal="curtain">
                    <div className="parallax absolute inset-0 overflow-hidden" style={{ '--px': 5 } as CSSProperties}>
                      <div className="curtain-img absolute inset-0">
                        <Image src={item.photo.src} alt={item.photo.alt} fill sizes={l.sizes} placeholder="blur" className="object-cover" />
                      </div>
                    </div>
                    <div aria-hidden="true" className="curtain" />
                    <span className="label absolute top-4 left-4 z-[2] bg-cal px-2 py-1 text-ink">{phaseLabel[item.phase]}</span>
                  </div>
                  <figcaption className="mt-4 grid grid-cols-[auto_1fr] gap-4 text-muted">
                    <span className="label pt-0.5 tabular-nums">Fig. {String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm">{item.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Próximo projeto */}
      {next && next.slug !== project.slug && (
        <section aria-label="Próximo projeto" className="border-t border-[var(--line)]">
          <Link href={`/projetos/${next.slug}`} className="group block" data-cursor="view" data-cursor-label="Próximo">
            <div className="container-x grid items-center gap-8 py-16 md:grid-cols-12 md:py-24">
              <div className="md:col-span-7">
                <p className="label text-muted">Próximo projeto</p>
                <p className="display display-lg mt-4 transition-colors duration-500 group-hover:text-oxido">{next.name}</p>
                <p className="label mt-4 text-muted">
                  {next.type} · {next.area} <span className="normal-case">m²</span>
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-4 md:col-start-9">
                <ViewTransition name={`projeto-${next.slug}`} share="morph" default="none">
                  <div className="img-hover absolute inset-0">
                    <Image src={next.cover.src} alt={next.cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="object-cover" />
                  </div>
                </ViewTransition>
                <span className="absolute right-4 bottom-4 grid size-12 place-items-center bg-cal text-ink">
                  <ArrowUpRight />
                </span>
              </div>
            </div>
          </Link>
          <div className="container-x pb-16">
            <ButtonLink href="/projetos" variant="text">
              Todos os projetos
            </ButtonLink>
          </div>
        </section>
      )}

      <ContactSection sheet="05" />
    </>
  );
}
