# Site institucional — Empresa de reformas

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Todas as páginas são geradas estaticamente.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run build:static   # versão estática em out/ (GitHub Pages)
npm run typecheck
```

## Publicação

**GitHub Pages (automático).** O workflow `.github/workflows/deploy-pages.yml` compila e publica o site a cada push na `main`. Configuração única: no repositório, **Settings → Pages → Build and deployment → Source: GitHub Actions**. O endereço fica `https://<usuario>.github.io/<repositorio>/`.

No modo estático, o build gera variantes WebP responsivas das fotos (`scripts/static-images.mjs`) e ajusta os arquivos de prefetch para hospedagens sem reescrita de URL (`scripts/flatten-export.mjs`).

**Vercel / servidor Node.** `npm run build && npm start`, ou conecte o repositório na Vercel. Nesse modo as imagens são otimizadas sob demanda (AVIF/WebP).

## Conceito

**"Transformar espaços, sem transformar a vida do cliente em uma obra."**

O site segue a lógica de um **jogo de pranchas técnicas**: cada seção da home é uma folha numerada ("Fl. 02 — Antes de construir"), com linhas de cota, rodapé em formato de carimbo e um único acento de cor (óxido). A home conta uma história em nove pranchas, sem a sequência padrão "hero → sobre → serviços":

| Fl. | Seção | O que faz |
|-----|-------|-----------|
| 01 | Abertura | Fotografia em tela cheia, H1, CTAs |
| 02 | Antes de construir | Narrativa no lugar do "sobre"; imagem presa que revela detalhes com o scroll |
| 03 | O problema | Quatro dores surgem uma a uma e recebem um traço de correção |
| 04 | Processo | Timeline vertical com linha que acompanha o scroll |
| 05 | Portfólio | Composição editorial assimétrica |
| 06 | Serviços | Lista interativa (hover revela imagem; acordeão no mobile) |
| 07 | Números | Contagem animada |
| 08 | Confiança | Um depoimento por vez, em tela cheia |
| 09 | Contato | Formulário com opção de WhatsApp |

## Estrutura

```
src/
  app/                    rotas (App Router)
    page.tsx              home
    [servico]/page.tsx    landing pages de serviço (SEO)
    projetos/             portfólio + página de cada projeto
    sitemap.ts, robots.ts, not-found.tsx, icon.svg
  components/
    home/                 seções da home
    layout/               Header, Footer, barra de ação mobile
    motion/               reveal, cenas de scroll, contagem, cursor
    projects/ contact/ ui/
  data/                   TODO o conteúdo editável (textos, serviços, projetos, números)
  assets/images/          fotografias + registro central (index.ts)
  lib/                    metadata (seo.ts) e schema JSON-LD (schema.ts)
  styles/                 globals.css (tokens) e scenes.css (cenas de scroll)
scripts/optimize-images.mjs
```

### Rotas

- `/` — home
- `/reforma-completa`, `/reforma-de-apartamentos`, `/reforma-residencial`, `/reforma-comercial`, `/gerenciamento-de-obras`
- `/projetos` e `/projetos/[slug]`
- `/sitemap.xml`, `/robots.txt`

Para criar uma nova página de serviço, adicione um item com `page` em `src/data/services.ts`. Para um novo projeto, adicione-o em `src/data/projects.ts`. Rotas, sitemap e schema são gerados automaticamente.

## ⚠️ Antes de publicar: substituir os placeholders

Nenhum dado comercial foi inventado. Tudo que é provisório está marcado e aparece no layout com um selo tracejado **PLACEHOLDER**.

| Onde | O que preencher |
|------|-----------------|
| `src/data/site.ts` | Nome, razão social, CNPJ, cidade/UF, região, bairros atendidos, endereço, WhatsApp, e-mail, horário, redes sociais, ano de fundação |
| `src/data/content.ts` → `stats` | **Números reais** da empresa (projetos, anos, m², % de indicação) e `placeholder: false` |
| `src/data/content.ts` → `testimonials` | Depoimentos reais **e autorizados**, com `sample: false` |
| `src/data/projects.ts` | Obras reais: nome, local, metragem, prazo, ano, desafio, solução, fotos e `sample: false` |
| `src/assets/images/` | As fotos atuais são de banco de imagens (Unsplash), usadas só para o layout. Troque pelos registros reais das obras |
| `src/components/layout/Wordmark.tsx` | Logotipo oficial (SVG) |
| `.env` | `NEXT_PUBLIC_SITE_URL` (domínio definitivo) |

Tudo que ainda estiver entre colchetes — `[ASSIM]` — é removido automaticamente do schema JSON-LD, então nenhum dado fictício chega ao Google. Depois de preencher tudo, defina `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true` para esconder os selos.

### Fotografias

```bash
npm run images -- ./fotos-originais
```

Redimensiona para até 2400px e recomprime. O `next/image` gera AVIF/WebP responsivos e o placeholder "blur". Use nomes descritivos e registre cada foto (com texto alternativo) em `src/assets/images/index.ts`.

### Formulário

O formulário funciona no navegador (compatível com hospedagem estática): valida os campos e envia um POST em JSON para `NEXT_PUBLIC_FORM_ENDPOINT`, que pode ser um serviço como Formspree/Getform ou uma API própria. No GitHub, defina essa variável em **Settings → Secrets and variables → Actions → Variables**. Sem endpoint configurado, o contato segue pelo WhatsApp com a mensagem já preenchida. A lógica está em `src/lib/contact.ts`.

## SEO

- Um H1 por página, hierarquia H2/H3, HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- `title`, `description`, canonical e Open Graph únicos por página (`lib/seo.ts`).
- JSON-LD: `Organization`, `GeneralContractor` (LocalBusiness), `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `CreativeWork` (projetos) e `Review` (só depoimentos reais).
- Observação: o Google não exibe estrelas para avaliações que a própria empresa publica sobre si mesma. O schema `Review` descreve o conteúdo corretamente, mas não gera estrelas nos resultados. Para isso, use o Perfil da Empresa no Google.

## Performance e acessibilidade

- Motion só com `transform`/`opacity`; cenas guiadas por scroll escrevem uma única variável CSS (`--p`) por quadro, e só enquanto estão visíveis.
- Parallax e barra de progresso usam CSS scroll-driven animations (aprimoramento progressivo, desligado no mobile).
- Mobile: sem cenas presas nem parallax; timeline simplificada; barra fixa com orçamento e WhatsApp.
- `prefers-reduced-motion` desliga todas as animações. Sem JavaScript, todo o conteúdo continua visível.
- CSS inline no `<head>`, fotografia de abertura com `fetchpriority="high"`, demais imagens com lazy loading.
- Cursor customizado só com mouse; o cursor nativo continua visível.

Lighthouse medido localmente (build de produção): Acessibilidade, Boas práticas e SEO em 100; desktop com Performance 86, LCP 1,3 s, CLS 0,05. A máquina usada tem CPU lenta (benchmark 635), o que infla o TBT. Meça de novo no ambiente de produção.
