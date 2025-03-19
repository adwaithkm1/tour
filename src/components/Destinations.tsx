
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const destinations = [
  {
    id: 1,
    title: "Ancient Greece",
    subtitle: "History & Philosophy",
    description: "Walk in the footsteps of Socrates and Plato, exploring the birthplace of democracy and Western philosophy.",
    image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=800",
    tags: ["History", "Philosophy", "Architecture"]
  },
  {
    id: 2,
    title: "Galápagos Islands",
    subtitle: "Biology & Evolution",
    description: "Witness Darwin's living laboratory with unique wildlife and geological formations found nowhere else on Earth.",
    image: "https://images.unsplash.com/photo-1533309907656-7b1c2ee85468?auto=format&fit=crop&w=800",
    tags: ["Science", "Biology", "Conservation"]
  },
  {
    id: 3,
    title: "Kyoto, Japan",
    subtitle: "Cultural Studies",
    description: "Immerse in traditional Japanese arts, Zen gardens, and centuries-old temples and ceremonies.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800",
    tags: ["Culture", "Arts", "History"]
  },
  {
    id: 4,
    title: "CERN, Switzerland",
    subtitle: "Physics & Engineering",
    description: "Explore the frontier of particle physics at the world's largest laboratory and home of the Large Hadron Collider.",
    image: "https://images.unsplash.com/photo-1628595351029-c2962b0fbf3f?auto=format&fit=crop&w=800",
    tags: ["Physics", "Technology", "Research"]
  },
  {
    id: 5,
    title: "Amazon Rainforest",
    subtitle: "Ecology & Sustainability",
    description: "Study the world's most biodiverse ecosystem and learn about conservation efforts from indigenous guides.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800",
    tags: ["Ecology", "Sustainability", "Indigenous Knowledge"]
  }
];

const Destinations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToDestination = (index: number) => {
    if (index < 0) {
      setActiveIndex(destinations.length - 1);
    } else if (index >= destinations.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const selectedCard = cardRefs.current[activeIndex];
    if (selectedCard && containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = selectedCard.offsetLeft - (container.clientWidth / 2) + (selectedCard.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

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

    const title = document.querySelector('.destinations-title');
    if (title) observer.observe(title);

    const container = document.querySelector('.destinations-container');
    if (container) observer.observe(container);

    return () => {
      if (title) observer.unobserve(title);
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <section id="destinations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 destinations-title">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            FEATURED DESTINATIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Educational <span className="text-primary">Adventures</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated destinations designed to inspire curiosity 
            and facilitate meaningful learning experiences.
          </p>
        </div>

        <div className="relative opacity-0 destinations-container">
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                ref={el => (cardRefs.current[index] = el)}
                className={cn(
                  "flex-shrink-0 w-[280px] md:w-[350px] rounded-xl overflow-hidden shadow-soft transition-all duration-300 snap-center transform",
                  index === activeIndex ? "scale-105 ring-2 ring-primary" : "scale-100 opacity-80"
                )}
              >
                <div className="relative h-[200px] md:h-[230px]">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-xs text-white/80">{destination.subtitle}</span>
                    <h3 className="text-xl font-semibold text-white">{destination.title}</h3>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <p className="text-sm text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-block py-1 px-2 rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollToDestination(activeIndex - 1)}
              className="rounded-full"
              aria-label="Previous destination"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToDestination(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary w-5" : "bg-gray-300 dark:bg-gray-700"
                  )}
                  aria-label={`Go to destination ${index + 1}`}
                ></button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollToDestination(activeIndex + 1)}
              className="rounded-full"
              aria-label="Next destination"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
