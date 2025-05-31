
import Header from "@/components/layout/header";
import ServicesSection from "@/components/sections/services-section";
import ClientsSection from "@/components/sections/clients-section"; // Importar a nova seção
import ContactSection from "@/components/sections/contact-section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";


export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 -z-10">
            {/* Optional: subtle background pattern or image */}
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Soluções Industriais e <span className="text-primary">Projeto ideal para sua necessidade</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl">
                Soluções de automação industrial que impulsionam a eficiência, reduzem custos e elevam a produtividade do seu negócio.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="shadow-md">
                  <Link href="#services">
                    Nossos Serviços <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-md">
                  <Link href="#contact">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>
          </div>
           <div 
            className="absolute bottom-0 left-0 right-0 h-20" 
            style={{
              background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
            }}
          />
        </section>
        
        <ServicesSection />

        <ClientsSection /> {/* Adicionar a nova seção aqui */}
        
        <Separator className="my-12 md:my-16" />
        
        <ContactSection />
      </main>
      <footer className="bg-muted py-8 text-center text-muted-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Automação Eficiente. Todos os direitos reservados.
          </p>
           <p className="text-xs mt-1">
            Desenvolvido com <span className="text-primary">&hearts;</span> para a Indústria 4.0
          </p>
        </div>
      </footer>
    </div>
  );
}
