
import Header from "@/components/layout/header";
import ServicesSection from "@/components/sections/services-section";
import ClientsSection from "@/components/sections/clients-section";
import ProjectsSection from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import AnimatedItem from "@/components/ui/animated-item";


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
              <AnimatedItem animationType="fadeInUp" delay={100}>
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Seu parceiro ideal em <span className="text-primary">Elétrica e Automação Industrial</span>
                </h1>
              </AnimatedItem>
              <AnimatedItem animationType="fadeInUp" delay={250}>
                <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl">
                  Soluções de automação industrial que impulsionam a eficiência, reduzem custos e elevam a produtividade do seu negócio.
                </p>
              </AnimatedItem>
              <AnimatedItem animationType="fadeInUp" delay={400}>
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
              </AnimatedItem>
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

        <ProjectsSection /> 

        <ClientsSection />

        <Separator className="my-12 md:my-16" />

        <ContactSection />
      </main>
      <footer className="bg-muted py-12 text-muted-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-sm">
            {/* Coluna Contato */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground mb-4">Fale Conosco</h3>
              <p>
                <a href="tel:+5511984215208" className="flex items-center hover:text-primary transition-colors group">
                  <Phone size={18} className="mr-3 flex-shrink-0 text-primary group-hover:text-accent" />
                  <span>(11) 98421-5208</span>
                </a>
              </p>
              <p>
                <a href="mailto:contato@vatecaut.ind.br" className="flex items-center hover:text-primary transition-colors group">
                  <Mail size={18} className="mr-3 flex-shrink-0 text-primary group-hover:text-accent" />
                  <span>contato@vatecaut.ind.br</span>
                </a>
              </p>
            </div>

            {/* Coluna Endereço */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground mb-4">Nosso Endereço</h3>
              <div className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-primary" />
                <span>
                  Mogi das Cruzes - SP
                  {/* Você pode adicionar mais detalhes do endereço aqui se desejar */}
                  {/* Ex: Rua Exemplo, 123 - Bairro */}
                </span>
              </div>
            </div>

            {/* Coluna WhatsApp */}
            <div className="space-y-3 md:flex md:flex-col md:items-start">
              <h3 className="font-semibold text-lg text-foreground mb-4">Atendimento Rápido</h3>
              <Button 
                asChild 
                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                size="lg"
              >
                <a 
                  href="https://wa.me/5511984215208?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20VATEC%20Automação." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} VATEC Automação Industrial. Todos os direitos reservados.
            </p>
            <p className="text-xs mt-1">
              Desenvolvido por Alisson Pereira Santiago
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
