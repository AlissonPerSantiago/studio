"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; 
  animationType?: 'fadeInUp' | 'fadeIn';
  threshold?: number;
  once?: boolean;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className,
  delay = 0,
  animationType = 'fadeInUp',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
             // Option to re-trigger animation if it leaves and re-enters viewport
            // setIsVisible(false); 
          }
        });
      },
      {
        threshold: threshold,
      }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, animationType, threshold, once]);

  const animationClasses = {
    fadeInUp: `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
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