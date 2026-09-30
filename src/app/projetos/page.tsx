import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectTile } from '@/components/projects/ProjectTile';
import { ContactSection } from '@/components/contact/ContactSection';

export const metadata: Metadata = pageMetadata({
  title: `Projetos de reforma em ${site.city} — Portfólio`,
  description: `Portfólio de reformas residenciais, comerciais e corporativas em ${site.city}: apartamentos, casas e escritórios com desafio, solução e registro de antes e depois.`,
  path: '/projetos',
});

/** Proporções alternadas — nenhuma linha repete a anterior. */
const layout = [
  { cls: 'md:col-span-12', aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]', sizes: '100vw', size: 'lg' as const },
  { cls: 'md:col-span-5', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw', size: 'md' as const },
  { cls: 'md:col-span-6 md:col-start-7 md:mt-[38%]', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 48vw, 100vw', size: 'md' as const },
  { cls: 'md:col-span-10 md:col-start-3', aspect: 'aspect-[4/3] lg:aspect-[16/9]', sizes: '(min-width: 768px) 80vw, 100vw', size: 'lg' as const },
  { cls: 'md:col-span-7', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 58vw, 100vw', size: 'md' as const },
];

export default function ProjectsPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Portfólio"
        title="Projetos"
        lead="Reformas completas de apartamentos, casas e espaços corporativos. Cada projeto traz o desafio, a solução adotada e o registro da obra."
        crumbs={crumbs}
      />

      <section aria-label="Lista de projetos" className="py-20 md:py-32">
        <div className="container-x grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-36">
          {projects.map((p, i) => {
            const l = layout[i % layout.length];
            return (
              <ProjectTile
                key={p.slug}
                project={p}
                index={i}
                className={l.cls}
                aspect={l.aspect}
                sizes={l.sizes}
                titleSize={l.size}
                headingLevel="h2"
              />
            );
          })}
        </div>
      </section>

      <ContactSection sheet="03" />
    </>
  );
}
