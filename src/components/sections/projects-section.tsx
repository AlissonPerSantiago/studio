
"use client";

import Image from 'next/image';
import AnimatedItem from '@/components/ui/animated-item';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
}

const projectsData: Project[] = [
  {
    id: 'proj1',
    title: 'Sistema de Controle Avançado',
    description: 'Implementação de CLP e IHM para linha de produção automatizada.',
    imageUrl: '/projects/2.jpg',
    dataAiHint: 'factory automation',
  },
  {
    id: 'proj2',
    title: 'Monitoramento',
    description: 'Desenvolvimento de sistema supervisório para controle em tempo real.',
    imageUrl: '/projects/6.webp',
    dataAiHint: 'industrial control panel',
  },
  {
    id: 'proj3',
    title: 'Otimização Energética',
    description: 'Soluções para retrofit de máquinas e otimização de consumo energético industrial.',
    imageUrl: '/projects/1.jpg',
    dataAiHint: 'robotic arm assembly',
  },
  {
    id: 'proj4',
    title: 'Retrofit de Maquinário',
    description: 'Modernização de máquinas antigas com novas tecnologias de automação.',
    imageUrl: '/projects/4.jpg',
    dataAiHint: 'manufacturing plant',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedItem delay={0}>
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projetos em Destaque
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conheça alguns dos nossos trabalhos e soluções implementadas.
            </p>
          </div>
        </AnimatedItem>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectsData.map((project, index) => (
            <AnimatedItem key={project.id} delay={100 * (index + 1)}>
              <div
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl h-full"
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={project.dataAiHint}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                  <h3 className="font-headline text-xl font-semibold text-primary-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/90">
                    {project.description}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
