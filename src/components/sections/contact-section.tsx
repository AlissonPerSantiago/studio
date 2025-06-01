import ContactForm from "@/components/forms/contact-form";
import AnimatedItem from '@/components/ui/animated-item';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <AnimatedItem animationType="fadeInUp">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Entre em Contato
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tem alguma dúvida ou projeto em mente? Fale conosco!
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem animationType="fadeInUp" delay={150}>
            <ContactForm />
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}
