import { useState, useEffect, useRef } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(0); // Removed TypeScript <number> type annotation
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollRef.current = window.scrollY;
    };

    const updateScroll = () => {
      setScrollY(lastScrollRef.current);
      rafRef.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollY;
}