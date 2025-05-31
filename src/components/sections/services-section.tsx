import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cog, Activity, Network, Briefcase as BriefcaseIcon } from "lucide-react"; // Renamed to avoid conflict
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Cog,
    title: "Automação de Processos",
    description: "Otimizamos seus processos industriais com soluções de automação personalizadas, aumentando a eficiência e reduzindo custos operacionais.",
  },
  {
    icon: Activity,
    title: "Manutenção Preventiva e Corretiva",
    description: "Implementamos sistemas de monitoramento e análise de dados para prever falhas em equipamentos, minimizando paradas inesperadas.",
  },
  {
    icon: Network,
    title: "Sistemas SCADA & HMI",
    description: "Desenvolvemos e integramos sistemas supervisórios (SCADA) e interfaces homem-máquina (HMI) intuitivas para controle total da sua planta.",
  },
  {
    icon: BriefcaseIcon,
    title: "Consultoria Especializada",
    description: "Oferecemos consultoria técnica para identificar oportunidades de melhoria e implementar as melhores práticas em automação industrial.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluções inovadoras para a automação da sua indústria.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl">
              <CardHeader className="bg-muted/30 p-6">
                <div className="mb-4 flex justify-center">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardDescription className="text-base text-muted-foreground text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
