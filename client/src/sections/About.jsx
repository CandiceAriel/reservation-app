import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal';
import { Utensils, Wine, Heart } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';

function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-cream flex flex-col justify-center px-8">
       {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #F3E4C9 0%, #FDF8F0 100%)',
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal animation="fade-scale" className="order-1">
            <div className="relative rounded-[24px] overflow-hidden shadow-card">
              <img
                src="/images/about.jpg"
                alt="Restaurant interior with warm ambiance"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-cream/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                    <Heart size={18} className="text-navy" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-navy">Est. 2018</p>
                    <p className="text-muted-text text-xs">Family Owned</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-scale" className="order-2">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className='font-bold font-heading text-3xl lg:text-[48px] text-navy leading-[1.1] mt-6'>Where Warmth Meets Flavor</h2>
            <p className='mt-6 mb-4'>Nestled in the heart of the city, Reserve was born from a simple belief: dining should feel like coming home. Our chefs craft seasonal dishes using locally-sourced ingredients, while our team ensures every guest feels like family.</p>
            <p>Whether it's a romantic dinner for two, a celebration with friends, or a quiet evening alone, we've created a space where great food and genuine connection come together effortlessly.</p>
            <ScrollReveal animation="fade-scale" className="order-3">
              <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-card-sage flex items-center justify-center mx-auto mb-2">
                      <Utensils size={22} className="text-brown" />
                    </div>
                    <p className="font-display font-bold text-sm text-navy">Farm Fresh</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-card-sage flex items-center justify-center mx-auto mb-2">
                      <Wine size={22} className="text-brown" />
                    </div>
                    <p className="font-display font-bold text-sm text-navy">Curated Wine</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-card-sage flex items-center justify-center mx-auto mb-2">
                      <Heart size={22} className="text-brown" />
                    </div>
                    <p className="font-display font-bold text-sm text-navy">Made with Love</p>
                  </div>
                </div>
            </ScrollReveal>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  )
}

export default AboutSection