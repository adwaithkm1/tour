
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Educational travel destination"
          className="w-full h-full object-cover object-center image-mask transition-transform duration-10000 transform scale-105"
          style={{ 
            transformOrigin: 'center',
            animation: 'slow-zoom 40s infinite alternate ease-in-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className={cn(
          "opacity-0",
          loaded && "animate-fade-in-down"
        )}>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-6 backdrop-blur-sm">
            DISCOVER • LEARN • EXPLORE
          </span>
        </div>
        
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl mb-6 opacity-0",
          loaded && "animate-fade-in-down"
        )}
          style={{ animationDelay: "0.2s" }}
        >
          Transform Education Through <span className="text-gradient">Immersive Travel</span>
        </h1>
        
        <p className={cn(
          "text-lg md:text-xl text-white/90 max-w-2xl mb-10 opacity-0",
          loaded && "animate-fade-in-down"
        )}
          style={{ animationDelay: "0.4s" }}
        >
          Crafting educational journeys that blend discovery, learning, and adventure 
          for schools, colleges, and curious minds of all ages.
        </p>
        
        <div className={cn(
          "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0",
          loaded && "animate-fade-in-up"
        )}
          style={{ animationDelay: "0.6s" }}
        >
          <Button 
            size="lg" 
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white"
            onClick={() => {
              const builderSection = document.getElementById('tour-builder');
              if (builderSection) {
                builderSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Create Your Journey
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-white text-white hover:bg-white/10"
            onClick={() => {
              const destSection = document.getElementById('destinations');
              if (destSection) {
                destSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Destinations
          </Button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <button 
          onClick={scrollToNextSection}
          className="text-white opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-10 w-10 animate-float" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
