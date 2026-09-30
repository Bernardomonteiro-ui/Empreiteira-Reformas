import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import type { Photo } from '@/assets/images';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

const d = (ms: number) => ({ '--d': ms }) as CSSProperties;

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  photo?: Photo;
  crumbs: Crumb[];
  children?: ReactNode;
  /** Envolve a imagem (ex.: <ViewTransition> na página de projeto). */
  wrapImage?: (img: ReactNode) => ReactNode;
};

/** Abertura escura das páginas internas: mesma linguagem da home, mais compacta. */
export function PageHero({ eyebrow, title, lead, photo, crumbs, children, wrapImage = (i) => i }: Props) {
  return (
    <section
      className={`theme-dark relative isolate flex flex-col overflow-hidden ${photo ? 'min-h-[560px] md:min-h-[82svh]' : 'min-h-[480px] md:min-h-[64svh]'}`}
    >
      {photo && (
        <>
          {wrapImage(
            <div className="absolute inset-0 -z-10">
              <div className="hero-img absolute inset-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>,
          )}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/90" />
        </>
      )}

      <div className="container-x flex flex-1 flex-col pt-[calc(var(--header-h)+1.5rem)] pb-10 md:pb-14">
        <Breadcrumbs items={crumbs} className="hero-fade text-bone/80" />
        <div className="mt-auto pt-24">
          <p className="label hero-fade mb-6 text-oxido-claro" style={d(200)}>
            {eyebrow}
          </p>
          <h1 className="display display-lg hero-settle max-w-[16ch]">{title}</h1>
          {lead && (
            <p className="lead hero-fade mt-8 max-w-[52ch] text-bone/85" style={d(500)}>
              {lead}
            </p>
          )}
          {children && (
            <div className="hero-fade mt-10" style={d(700)}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
