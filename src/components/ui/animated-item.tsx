
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
    // Ensure IntersectionObserver is available, though it's widely supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true); // Fallback for very old browsers or environments
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            if (once && itemRef.current) { // Check ref.current exists before unobserving
              observer.unobserve(itemRef.current);
            }
          } else if (!once) {
             // setIsVisible(false); // Option to re-trigger animation
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
    };
  }, [delay, animationType, threshold, once]);

  const animationClasses = {
    // Simplified fadeInUp to only use opacity for now
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
