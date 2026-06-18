import { useState, useEffect } from 'react';
import { Calendar, Users, Clock, ChevronDown } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { createReservation } from '../api/reservationApi';

export default function HeroSection() {
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const [formData, setFormData] = useState({
    reservation_date: '',
    reservation_time: '',
    guests: '2',
    customer_name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the API with the correctly mapped state
      await createReservation(formData);
      
      setSubmitted(true);
      // Reset form after submission
      setFormData({ 
        reservation_date: '', 
        reservation_time: '', 
        guests: '2', 
        customer_name: '', 
        phone: '' 
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Could not complete reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="min-h-dvh bg-navy flex flex-col justify-center px-8">
      {/* Video Background */}
      <div
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,41,71,0.55) 0%, rgba(10,41,71,0.75) 100%)',
        }}
      />

      <div className='relative z-[2] max-w-[1200px] mx-auto px-6 py-32 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/*Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-text-light text-4xl font-display font-bold">Reserve Your Perfect Table</h2>
            <p className="text-text-light mt-4 max-w-md font-sans">
              Experience warm hospitality and exquisite cuisine at our intimate dining venue. 
              Book your table in seconds and let us take care of the rest.
            </p>
             <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <PrimaryButton size="lg" onClick={() => {
                const form = document.getElementById('booking-form');
                form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}>
                Book Now
              </PrimaryButton>
              <button
                onClick={() => {
                  const about = document.getElementById('about');
                  about?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="
                  font-display font-bold text-lg
                  py-4 px-9 rounded-2xl
                  border-2 border-cream/40 text-cream bg-transparent
                  transition-all duration-300
                  hover:bg-cream/10 hover:border-cream/60
                "
              >
                Learn More
              </button>
            </div>
          </div>
          {/* Right: Booking Form */}
          <div id="booking-form" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-cream/95 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 shadow-2xl">
              <h3 className="font-display font-bold text-2xl text-navy mb-1">
                Book a Table
              </h3>
              <p className="text-muted-text text-sm mb-6">
                Fill in your details and we&apos;ll confirm your reservation
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-xl text-navy mb-2">Reservation Requested!</h4>
                  <p className="text-muted-text">We&apos;ll send you a confirmation shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Date */}
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brown pointer-events-none" size={20} />
                    <input
                      type="date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      className="
                        w-full pl-12 pr-4 py-3.5 rounded-xl
                        bg-white border border-navy/15
                        font-body text-base text-dark-text
                        focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/15
                        transition-all duration-200
                      "
                    />
                  </div>

                  {/* Time & Guests Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brown pointer-events-none" size={20} />
                      <input
                        type="time"
                        required
                        value={formData.reservation_time}
                        onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                        className="
                          w-full pl-12 pr-4 py-3.5 rounded-xl
                          bg-white border border-navy/15
                          font-body text-base text-dark-text
                          focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/15
                          transition-all duration-200
                        "
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-brown pointer-events-none" size={20} />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="
                          w-full pl-12 pr-4 py-3.5 rounded-xl
                          bg-white border border-navy/15
                          font-body text-base text-dark-text
                          focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/15
                          transition-all duration-200
                          appearance-none
                        "
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="
                      w-full px-5 py-3.5 rounded-xl
                      bg-white border border-navy/15
                      font-body text-base text-dark-text placeholder:text-[#9A9A8E]
                      focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/15
                      transition-all duration-200
                    "
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="
                      w-full px-5 py-3.5 rounded-xl
                      bg-white border border-navy/15
                      font-body text-base text-dark-text placeholder:text-[#9A9A8E]
                      focus:outline-none focus:border-brown focus:ring-2 focus:ring-brown/15
                      transition-all duration-200
                    "
                  />

                  <PrimaryButton type="submit" fullWidth size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Reserve My Table'
                    )}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </div>
        
      </div>
      
    </section>
  );
}