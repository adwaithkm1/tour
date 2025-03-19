
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    quote: "Our two-week immersion in Spain transformed our students' language abilities and cultural awareness. The carefully planned curriculum integration made this so much more than a typical field trip.",
    author: "Sarah Johnson",
    title: "Spanish Teacher, Lincoln High School",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    quote: "The STEM-focused tour to Silicon Valley ignited a passion for technology in our engineering students. The hands-on workshops and company visits provided invaluable real-world context to their studies.",
    author: "Michael Chen",
    title: "Department Chair, MIT Engineering Program",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    quote: "As parents, we were impressed by how the family archaeology adventure made history come alive for our children. The guides brilliantly balanced education with fun, creating memories we'll cherish forever.",
    author: "Emma and David Williams",
    title: "Family Travelers, Chicago",
    image: "https://images.unsplash.com/photo-1623082574085-157d955f1d35?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 4,
    quote: "LearnScape tailored the perfect biology expedition for our university students. The research opportunities and field work experience in Costa Rica exceeded all our academic objectives.",
    author: "Dr. Alicia Ramirez",
    title: "Professor of Biology, Stanford University",
    image: "https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextTestimonial = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const prevTestimonial = () => {
    if (!animating) {
      setAnimating(true);
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [animating]);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        entry.target.classList.remove('opacity-0');
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const title = document.querySelector('.testimonials-title');
    if (title) observer.observe(title);

    const container = document.querySelector('.testimonials-container');
    if (container) observer.observe(container);

    return () => {
      if (title) observer.unobserve(title);
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 testimonials-title">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="text-primary">Travelers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from educators, students, and families who have experienced our educational journeys.
          </p>
        </div>

        <div className="relative opacity-0 testimonials-container">
          <div className="flex justify-center mb-16">
            <div className="relative w-20 h-20 md:w-28 md:h-28">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute top-0 left-0 right-0 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md transition-all duration-500",
                    index === activeIndex
                      ? "w-20 h-20 md:w-28 md:h-28 opacity-100 z-10 scale-100"
                      : index === (activeIndex + 1) % testimonials.length
                      ? "w-12 h-12 md:w-16 md:h-16 opacity-70 translate-x-16 md:translate-x-20 translate-y-4 scale-90 z-0"
                      : index === (activeIndex - 1 + testimonials.length) % testimonials.length
                      ? "w-12 h-12 md:w-16 md:h-16 opacity-70 -translate-x-16 md:-translate-x-20 translate-y-4 scale-90 z-0"
                      : "w-0 h-0 opacity-0 scale-75"
                  )}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Quote className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-12 w-12 text-primary/20" />
            
            <div className="relative overflow-hidden w-full h-[280px] md:h-[220px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center px-4",
                    index === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  <blockquote className="text-center max-w-3xl mx-auto mb-6">
                    <p className="text-lg md:text-xl italic">"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
              disabled={animating}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!animating) {
                      setAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setAnimating(false), 500);
                    }
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary w-5" : "bg-gray-300 dark:bg-gray-700"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  disabled={animating}
                ></button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              disabled={animating}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
