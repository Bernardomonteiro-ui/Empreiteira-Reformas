import type { Metadata } from 'next';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { BeforeBuilding } from '@/components/home/BeforeBuilding';
import { Problem } from '@/components/home/Problem';
import { Process } from '@/components/home/Process';
import { Portfolio } from '@/components/home/Portfolio';
import { Services } from '@/components/home/Services';
import { Numbers } from '@/components/home/Numbers';
import { Trust } from '@/components/home/Trust';
import { ContactSection } from '@/components/contact/ContactSection';

export const metadata: Metadata = pageMetadata({
  title: `${site.name} ${site.descriptor} | Empresa de reformas em ${site.city}`,
  absoluteTitle: true,
  description: `Empresa de reformas em ${site.city}: reforma completa de apartamentos, casas e espaços comerciais, com planejamento, orçamento por etapa e gerenciamento de obra.`,
  path: '/',
});

/**
 * A home é uma narrativa em nove pranchas — não a sequência padrão
 * "hero → sobre → serviços". O visitante entende o problema e o método
 * antes de ver o portfólio e o convite para conversar.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BeforeBuilding />
      <Problem />
      <Process />
      <Portfolio />
      <Services />
      <Numbers />
      <Trust />
      <ContactSection />
    </>
  );
}
