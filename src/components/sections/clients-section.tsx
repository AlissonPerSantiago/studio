
// src/components/sections/clients-section.tsx
"use client";

import Image from 'next/image';
import type { StaticImageData } from 'next/image'; 

interface Client {
  name: string;
  logoUrl: string | StaticImageData;
  logoAlt: string;
  dataAiHint: string;
}

const clients: Client[] = [
  { name: 'Cliente Alpha', logoUrl: '/clients/cliente1.png', logoAlt: 'Pedreira Massaguaçu', dataAiHint: 'technology company' },
  { name: 'Cliente Beta', logoUrl: '/clients/cliente2.png', logoAlt: 'Manikraft Papel e Celulose', dataAiHint: 'industrial solutions' },
  { name: 'Cliente Gamma', logoUrl: '/clients/cliente3.jpg', logoAlt: 'PKO Vidros', dataAiHint: 'energy sector' },
  { name: 'Cliente Delta', logoUrl: '/clients/cliente4.avif', logoAlt: 'IPEL Papeis', dataAiHint: 'construction group' },
  { name: 'Cliente Epsilon', logoUrl: '/clients/cliente5.png', logoAlt: 'Auti Automação', dataAiHint: 'logistics services' },
];

const extendedClients = [...clients, ...clients];

export default function ClientsSection() {
  return (
    <section id="clients" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Clientes e Parceiros
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Empresas que confiam em nossas soluções e expertise.
            </p>
          </div>
        
        
          <div className="relative w-full overflow-hidden group">
            <div className="flex animate-marquee group-hover:pause-animation whitespace-nowrap">
              {extendedClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="mx-8 flex h-24 flex-shrink-0 items-center justify-center"
                  title={client.name}
                >
                  <Image
                    src={client.logoUrl as string} 
                    alt={client.logoAlt}
                    width={150}
                    height={75}
                    className="max-h-[60px] w-auto object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
                    data-ai-hint={client.dataAiHint}
                  />
                </div>
              ))}
            </div>
          </div>
        
      </div>
    </section>
  );
}
