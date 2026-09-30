import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Cota } from '@/components/ui/Cota';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="theme-dark flex min-h-svh flex-col justify-end">
      <div className="container-x pt-[calc(var(--header-h)+4rem)] pb-16 md:pb-24">
        <p className="label text-oxido-claro">Erro 404</p>
        <h1 className="display display-xl mt-6">
          Fora
          <br />
          <span className="serif-i text-muted-dark">da planta.</span>
        </h1>
        <p className="lead mt-8 max-w-[40ch] text-muted-dark">
          A página que você procurou não existe ou mudou de endereço. Que tal voltar ao início ou ver nossos projetos?
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" tone="dark">
            Voltar ao início
          </ButtonLink>
          <ButtonLink href="/projetos" tone="dark" variant="outline">
            Ver projetos
          </ButtonLink>
        </div>
        <Cota className="mt-16 text-muted-dark">404 · sem cota</Cota>
      </div>
    </section>
  );
}
