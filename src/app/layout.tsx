
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
  icons: {
    icon: [ // Or an array of multiple icons, with different resolutions etc.
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // themeColor: '#FFFFFF', // Adicione aqui se desejar, substitua pela cor do seu tema
  // Link to Google Fonts
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  ],
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
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          key="organization-schema"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
