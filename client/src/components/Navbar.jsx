import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { PrimaryButton } from '../components/PrimaryButton';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Removed TypeScript string typing from parameter
  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[100] h-[72px]
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'bg-navy shadow-nav' : 'bg-transparent'}
        `}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="font-display font-extrabold text-2xl text-cream hover:text-sage transition-colors duration-300"
          >
            Reserve
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="
                  font-display font-semibold text-base text-cream
                  link-underline hover:text-sage
                  transition-colors duration-300
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <PrimaryButton
              size="sm"
              onClick={() => handleNavClick('#hero')}
            >
              Book a Table
            </PrimaryButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-cream hover:text-sage transition-colors"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-[200] bg-navy/95
          flex flex-col items-center justify-center
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-cream hover:text-sage transition-colors"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Mobile Nav Links */}
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`
                font-display font-bold text-3xl text-cream
                hover:text-sage transition-colors duration-300
                ${mobileMenuOpen ? 'animate-fade-up' : ''}
              `}
              style={{
                animationDelay: mobileMenuOpen ? `${0.1 + index * 0.1}s` : '0s',
                opacity: mobileMenuOpen ? undefined : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className={`mt-4 ${mobileMenuOpen ? 'animate-fade-up' : ''}`}
            style={{
              animationDelay: mobileMenuOpen ? `${0.1 + navLinks.length * 0.1}s` : '0s',
              opacity: mobileMenuOpen ? undefined : 0,
            }}
          >
            <PrimaryButton size="lg" onClick={() => handleNavClick('#hero')}>
              Book a Table
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}