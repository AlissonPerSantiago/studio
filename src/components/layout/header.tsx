
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from 'react';

// Ícone do WhatsApp como um componente funcional
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const whatsAppUrl = "https://wa.me/5511984215208?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20VATEC%20Automação.";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Serviços", href: "#services" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex flex-col items-start" prefetch={false}>
          <Image
            src="/logo.png"
            alt="VATEC Logo"
            width={140} 
            height={35}
            className="h-auto"
            priority
            data-ai-hint="logo company"
          />
          <span className="font-headline text-sm font-semibold text-foreground mt-1">
            Automação Industrial
          </span>
        </Link>
        
        {/* Desktop navigation and CTAs */}
        <div className="hidden items-center gap-3 md:flex"> {/* Reduced gap from 4 to 3 for tighter fit */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary px-2 py-1"
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-green-500 hover:bg-green-600 text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
            <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp
            </Link>
          </Button>
          <Button asChild size="sm" className="shadow-md">
            <Link href="#contact">
              Fale Conosco
            </Link>
          </Button>
        </div>

        {/* Mobile navigation trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-6">
              <Link href="/" className="flex flex-col items-start mb-4" prefetch={false}>
                 <Image
                    src="/logo.png"
                    alt="VATEC Logo"
                    width={120} 
                    height={30}
                    className="h-auto"
                    data-ai-hint="logo company"
                  />
                <span className="font-headline text-xs font-semibold text-foreground mt-1">
                  Automação Industrial
                </span>
              </Link>
              <nav className="grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* CTAs in mobile sheet */}
                <Button 
                  asChild 
                  size="lg" // Using "lg" for better touch target on mobile
                  className="w-full justify-center text-base bg-green-500 hover:bg-green-600 text-white mt-2 py-3" // Adjusted for mobile
                >
                  <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <WhatsAppIcon /> 
                    WhatsApp
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" // Using "lg" for better touch target on mobile
                  className="w-full justify-center text-base py-3" // Adjusted for mobile
                >
                  <Link href="#contact" className="flex items-center">
                    Fale Conosco
                  </Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
