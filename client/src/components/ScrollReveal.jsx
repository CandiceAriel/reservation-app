import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Always register the plugin outside the component lifecycle
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollReveal({ 
  children, 
  animation = 'fade-up', 
  className = '',
  delay = 0 
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const element = triggerRef.current;
    
    // Define preset animation configurations
    const animationPresets = {
      'fade-up': {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      'fade-scale': {
        from: { scale: 0.9, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      'fade-left': {
        from: { x: -50, opacity: 0 },
        to: { x: 0, opacity: 1 }
      }
    };

    // Fallback to fade-up if variant doesn't match
    const preset = animationPresets[animation] || animationPresets['fade-up'];

    // Create the GSAP animation instance
    const ctx = gsap.context(() => {
      gsap.fromTo(element, 
        preset.from,
        {
          ...preset.to,
          duration: 1.2,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            // Fires once 15%-20% of the container passes up past the bottom viewport line
            start: 'top 85%', 
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Perfectly sweeps up and handles cleanup on unmount
    return () => ctx.revert();
  }, [animation, delay]);

  return (
    <div ref={triggerRef} className={className}>
      {children}
    </div>
  );
}