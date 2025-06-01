
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
                Seu parceiro ideal em <span className="text-primary">Elétrica e Automação Industrial</span>
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
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18.425 5.575a12.001 12.001 0 0 0-16.85 16.85A12.001 12.001 0 0 0 12 24c2.195 0 4.28-.586 6.073-1.646l3.537.943-.942-3.537A11.95 11.95 0 0 0 22.354 12a11.955 11.955 0 0 0-3.929-6.425ZM12 2.027a9.974 9.974 0 0 1 7.053 2.923A9.973 9.973 0 0 1 21.973 12c0 2.333-.806 4.5-2.193 6.206l.71 2.654-2.655-.71a9.94 9.94 0 0 1-11.732-1.458 9.974 9.974 0 0 1-1.457-11.733A9.974 9.974 0 0 1 12 2.027Zm0 2.958A6.987 6.987 0 0 0 5.016 12a6.987 6.987 0 0 0 11.968 4.984 6.987 6.987 0 0 0-4.984-11.969Zm3.812 8.282c-.118-.06-.694-.342-.802-.382s-.188-.06-.268.06c-.079.118-.303.382-.372.461s-.138.09-.257.03c-.118-.06-.504-.185-.96-.582s-.758-.666-.847-.825c-.089-.158-.009-.242.05-.321.054-.07.118-.185.177-.274s.04-.158.06-.257c.02-.1-.015-.194-.044-.253s-.268-.321-.367-.44c-.099-.118-.2-.099-.268-.1a1.67 1.67 0 0 0-.232-.015c-.07 0-.188.015-.287.09-.099.074-.382.367-.382.886s.392 1.024.446 1.093c.054.07.773 1.195 1.874 1.653.25.103.446.167.596.211.21.06.397.053.536-.009.167-.074.694-.495.792-.582s.158-.138.118-.217Z" clipRule="evenodd"/></svg>
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
