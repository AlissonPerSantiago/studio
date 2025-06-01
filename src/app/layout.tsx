import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// INSTRUÇÃO IMPORTANTE PARA VOCÊ:
// Substitua 'https://www.URL_DO_SEU_SITE.com.br' pela URL real e definitiva do seu site.
const siteUrl = 'https://vatecaut.ind.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Essencial para URLs relativas em metadados (ex: openGraph image)
  title: 'VATEC Automação Industrial',
  description: 'VATEC Automação Industrial: Serviços de automação industrial para otimizar seus processos e impulsionar a eficiência do seu negócio.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'VATEC Automação Industrial - Soluções Inteligentes',
    description: 'Serviços de automação industrial para otimizar seus processos e impulsionar a eficiência.',
    url: siteUrl,
    siteName: 'VATEC Automação Industrial',
    images: [
      {
        url: '/logo.png', // Caminho relativo, `metadataBase` resolverá para absoluto
        width: 140, // Largura original da sua logo
        height: 35,  // Altura original da sua logo
        alt: 'Logo VATEC Automação Industrial',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  // Para favicons e ícones, o Next.js recomenda colocá-los diretamente na pasta /app ou /public
  // e nomeá-los de acordo com as convenções (favicon.ico, apple-icon.png, etc.)
  // As tags abaixo são adicionadas manualmente para garantir compatibilidade e cobrir mais casos.
  // No entanto, com o App Router, o Next.js pode gerar automaticamente algumas dessas tags se os arquivos estiverem nos locais corretos.
  // Veja: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
};

// Dados estruturados JSON-LD para a Organização
// Certifique-se de que 'siteUrl' e a URL da logo estejam corretas.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VATEC Automação Industrial",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`, // URL absoluta da logo
  "description": "VATEC Automação Industrial oferece serviços de automação industrial para otimizar processos e aumentar a eficiência.",
  // Você pode adicionar mais detalhes aqui, como "contactPoint", "address", "sameAs" (redes sociais).
  // Exemplo (substitua com dados reais se desejar adicionar):
  // "contactPoint": {
  //   "@type": "ContactPoint",
  //   "telephone": "+55-XX-XXXXX-XXXX", // Formato internacional E.164
  //   "contactType": "Atendimento ao Cliente",
  //   "areaServed": "BR", // Código do país ISO 3166-1 alpha-2
  //   "availableLanguage": ["Portuguese"]
  // }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Tags meta básicas já são gerenciadas pelo Next.js através do objeto metadata */}
        {/* <meta charSet="utf-8" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        
        {/* Favicons e ícones - Coloque os arquivos correspondentes na pasta /public */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" /> {/* Se tiver um SVG */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> {/* Ex: 180x180px */}
        <link rel="manifest" href="/site.webmanifest" /> {/* Para PWA e adicionar à tela inicial */}
        
        {/* Thema color para navegadores móveis */}
        {/* <meta name="theme-color" content="#FFFFFF" /> */} {/* Substitua #FFFFFF pela cor principal do seu tema */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          key="organization-schema"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
