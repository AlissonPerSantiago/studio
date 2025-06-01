
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Propriedade delay ainda existe, mas será ignorada internamente para este teste
  animationType?: 'fadeInUp' | 'fadeIn';
  threshold?: number;
  once?: boolean;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className,
  delay = 0, // Valor do delay recebido, mas não usado no setTimeout
  animationType = 'fadeInUp',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // A lógica de timeoutId e setTimeout é removida para este teste.
    // let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Define isVisible como true diretamente, ignorando o delay.
            setIsVisible(true);
            
            if (once && itemRef.current) {
              observer.unobserve(itemRef.current);
            }
          }
        });
      },
      {
        threshold: threshold,
      }
    );

    const currentRefValue = itemRef.current;
    if (currentRefValue) {
      observer.observe(currentRefValue);
    }

    return () => {
      if (currentRefValue) {
        observer.unobserve(currentRefValue);
      }
      // if (timeoutId) { // Lógica de timeout removida
      //   clearTimeout(timeoutId);
      // }
    };
  // A dependência 'delay' é removida porque o setTimeout não está sendo usado aqui.
  }, [threshold, once]); 

  const animationClasses = {
    fadeInUp: `transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`,
    fadeIn: `transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`,
  };

  return (
    <div
      ref={itemRef}
      className={cn(animationClasses[animationType], className)}
    >
      {children}
    </div>
  );
};

export default AnimatedItem;
