import Link from 'next/link';
import { site, whatsappUrl, mapsUrl, real, isPlaceholder } from '@/data/site';
import { services } from '@/data/services';
import { mainNav } from '@/data/navigation';
import { PlaceholderMarker } from '@/components/ui/Placeholder';

/**
 * Rodapé no formato de carimbo de prancha técnica: células com linhas finas,
 * rótulos em mono e informações organizadas como num selo de projeto.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const cellLabel = 'label text-muted-dark mb-4 block';
  const hasPlaceholders = [site.name === 'Estrato' ? '[nome]' : '', site.email, site.region, site.legalName].some(isPlaceholder);
  const socials = [
    { label: 'Instagram', href: site.social.instagram },
    { label: 'LinkedIn', href: site.social.linkedin },
  ].filter((s) => s.href && !isPlaceholder(s.href));

  return (
    <footer className="theme-dark relative overflow-hidden pb-24 lg:pb-0">
      <div className="container-x pt-24 lg:pt-32">
        <p className="display display-lg max-w-[14ch]">
          Transformar espaços,{' '}
          <span className="serif-i text-oxido-claro">sem transformar a sua vida</span> em uma obra.
        </p>
        {hasPlaceholders && (
          <p className="mt-8">
            <PlaceholderMarker label="Nome, e-mail, CNPJ e região de atendimento provisórios" />
          </p>
        )}
      </div>

      <div className="container-x mt-20">
        <div className="grid grid-cols-1 border-t border-l border-[var(--line)] sm:grid-cols-2 lg:grid-cols-12">
          <div className="border-r border-b border-[var(--line)] p-6 lg:col-span-4">
            <span className={cellLabel}>Empresa</span>
            <p className="text-lg">
              {site.name} {site.descriptor}
            </p>
            <p className="mt-2 text-sm text-muted-dark">
              Empresa de reformas e gerenciamento de obras em {site.city}. Reformas residenciais, comerciais e corporativas.
            </p>
          </div>

          <nav aria-label="Serviços" className="border-r border-b border-[var(--line)] p-6 lg:col-span-3">
            <span className={cellLabel}>Serviços</span>
            <ul className="space-y-2">
              {services
                .filter((s) => s.page)
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="hover:text-oxido-claro">
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Institucional" className="border-r border-b border-[var(--line)] p-6 lg:col-span-2">
            <span className={cellLabel}>Navegação</span>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-oxido-claro">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#contato" className="hover:text-oxido-claro">
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div className="border-r border-b border-[var(--line)] p-6 lg:col-span-3">
            <span className={cellLabel}>Contato</span>
            <address className="space-y-2 not-italic">
              <p>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-oxido-claro">
                  WhatsApp {site.phoneDisplay}
                </a>
              </p>
              {real(site.email) && (
                <p>
                  <a href={`mailto:${site.email}`} className="break-all hover:text-oxido-claro">
                    {site.email}
                  </a>
                </p>
              )}
              <p className="text-sm text-muted-dark">
                <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  {site.address.street}, {site.address.district}
                  <br />
                  {site.city}/{site.state}, CEP {site.address.postalCode}
                </a>
              </p>
              <p className="text-sm text-muted-dark">{site.openingHours}</p>
            </address>
          </div>

          <div className="border-r border-b border-[var(--line)] p-6 sm:col-span-2 lg:col-span-8">
            <span className={cellLabel}>Região de atendimento</span>
            <p className="text-sm text-muted-dark">
              {[site.city, real(site.region)].filter(Boolean).join(' e ')}.
              {site.neighborhoods.some((n) => !isPlaceholder(n)) &&
                ` Bairros atendidos: ${site.neighborhoods.filter((n) => !isPlaceholder(n)).join(', ')}.`}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:col-span-2 lg:col-span-4">
            <div className="border-r border-b border-[var(--line)] p-6">
              <span className={cellLabel}>Revisão</span>
              <span className="display text-3xl">R.01</span>
            </div>
            <div className="border-r border-b border-[var(--line)] p-6">
              <span className={cellLabel}>Escala</span>
              <span className="display text-3xl">1:1</span>
            </div>
            <div className="border-r border-b border-[var(--line)] p-6">
              <span className={cellLabel}>Data</span>
              <span className="display text-3xl">{year}</span>
            </div>
          </div>
        </div>

        <div className="label flex flex-col gap-3 py-8 text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · CNPJ {site.cnpj}
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        data-watermark={site.name}
        className="display pointer-events-none -mb-[0.2em] text-center text-[27vw] leading-none text-bone/[0.06] select-none before:content-[attr(data-watermark)]"
      />
    </footer>
  );
}
