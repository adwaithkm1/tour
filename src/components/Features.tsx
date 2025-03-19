
import React, { useEffect } from 'react';
import { BookOpen, Compass, Globe, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Curriculum Integration",
    description: "Journeys carefully aligned with educational standards to enhance classroom learning."
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Experiential Learning",
    description: "Hands-on activities and immersive experiences that bring subjects to life."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Cultural Exchange",
    description: "Meaningful interactions with local communities for authentic global perspective."
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Expert Guidance",
    description: "Knowledgeable educators and guides specialized in their fields."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Citizenship",
    description: "Foster responsibility and awareness for our interconnected world."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Personalized Learning",
    description: "Tailored experiences that meet specific educational objectives and interests."
  }
];

const Features = () => {
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

    const elements = document.querySelectorAll('.feature-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Education Beyond <span className="text-primary">Boundaries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in learning that transcends traditional classrooms, offering transformative 
            experiences that inspire curiosity and foster personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "feature-card bg-white dark:bg-gray-800 rounded-xl p-8 shadow-soft opacity-0 transition-all duration-500",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
