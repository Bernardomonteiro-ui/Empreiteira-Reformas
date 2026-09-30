import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { ViewTransition } from 'react';
import '@/styles/globals.css';

import { site } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { SheetIndicator } from '@/components/motion/SheetIndicator';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false, // rótulos pequenos: não competem com o LCP
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.descriptor} | Empresa de reformas em ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: `Empresa de reformas em ${site.city}: reforma completa de apartamentos, casas e espaços comerciais com planejamento, orçamento por etapa e gerenciamento de obra.`,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#151411',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Habilita os estados iniciais de animação só quando há JS — antes da primeira pintura. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="label fixed top-3 left-3 z-[60] -translate-y-24 bg-ink px-4 py-3 text-cal transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>

        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />

        <MobileActionBar />
        <SheetIndicator />
        <RevealObserver />
        <CustomCursor />

        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
