
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Users, Medal, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Tour types
const tourTypes = [
  { id: 'school', name: 'School Programs', icon: '🏫' },
  { id: 'university', name: 'University Excursions', icon: '🎓' },
  { id: 'family', name: 'Family Adventures', icon: '👨‍👩‍👧‍👦' },
  { id: 'custom', name: 'Custom Group Tours', icon: '✨' },
];

// Subjects
const subjects = [
  { id: 'history', name: 'History & Culture' },
  { id: 'science', name: 'Science & Nature' },
  { id: 'arts', name: 'Arts & Literature' },
  { id: 'stem', name: 'STEM Education' },
  { id: 'languages', name: 'Language Immersion' },
  { id: 'business', name: 'Business & Economics' },
];

// Durations
const durations = [
  { id: 'short', name: '1-3 Days', description: 'Weekend or short break' },
  { id: 'medium', name: '4-7 Days', description: 'Week-long experience' },
  { id: 'long', name: '8-14 Days', description: 'Comprehensive experience' },
  { id: 'extended', name: '15+ Days', description: 'In-depth immersion' },
];

// Group sizes
const groupSizes = [
  { id: 'small', name: 'Small (5-15)', description: 'Intimate experience' },
  { id: 'medium', name: 'Medium (16-30)', description: 'Balanced group size' },
  { id: 'large', name: 'Large (31-50)', description: 'Class/team size group' },
  { id: 'custom', name: 'Custom Size', description: 'Tell us your needs' },
];

const TourBuilder = () => {
  const [tourType, setTourType] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);
  
  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };
  
  const handleSubmit = () => {
    if (tourType && selectedSubjects.length > 0 && duration && groupSize) {
      setShowEstimate(true);
    }
  };
  
  const resetForm = () => {
    setTourType('');
    setSelectedSubjects([]);
    setDuration('');
    setGroupSize('');
    setShowEstimate(false);
  };

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

    const title = document.querySelector('.tour-builder-title');
    if (title) observer.observe(title);

    const container = document.querySelector('.tour-builder-container');
    if (container) observer.observe(container);

    return () => {
      if (title) observer.unobserve(title);
      if (container) observer.unobserve(container);
    };
  }, []);
  
  return (
    <section id="tour-builder" className="py-24 px-6 bg-gradient-to-b from-white to-secondary dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 tour-builder-title">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            EXPLORE OPTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Build Your <span className="text-primary">Educational Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a customized educational experience tailored to your specific needs and interests.
          </p>
        </div>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 md:p-8 lg:p-10 opacity-0 tour-builder-container">
          {/* Form steps */}
          {!showEstimate ? (
            <div className="space-y-8">
              {/* Tour Type */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What type of tour are you looking for?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tourTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTourType(type.id)}
                      className={cn(
                        "p-6 rounded-xl text-left transition-all duration-300",
                        tourType === type.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-primary/50"
                      )}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <h4 className="font-medium">{type.name}</h4>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Subjects */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Select subjects of interest (choose at least one)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300",
                        selectedSubjects.includes(subject.id)
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-primary/50"
                      )}
                    >
                      <h4 className="font-medium">{subject.name}</h4>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Duration */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Preferred duration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {durations.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setDuration(option.id)}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300",
                        duration === option.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-primary/50"
                      )}
                    >
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Group Size */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Group size</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {groupSizes.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setGroupSize(option.id)}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300",
                        groupSize === option.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-primary/50"
                      )}
                    >
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Submit */}
              <div className="pt-4 text-center">
                <Button 
                  onClick={handleSubmit} 
                  className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                  disabled={!tourType || selectedSubjects.length === 0 || !duration || !groupSize}
                >
                  View Journey Estimate
                </Button>
              </div>
            </div>
          ) : (
            /* Results / Estimate */
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <span className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <Medal className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-bold mb-2">Your Journey Summary</h3>
                <p className="text-muted-foreground">
                  Based on your selections, here's a preview of your educational adventure
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Tour Type</h4>
                      <p>{tourTypes.find(t => t.id === tourType)?.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Duration</h4>
                      <p>{durations.find(d => d.id === duration)?.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Group Size</h4>
                      <p>{groupSizes.find(g => g.id === groupSize)?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-xl mb-10">
                <h4 className="font-semibold mb-4">Selected Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map(subjectId => (
                    <span
                      key={subjectId}
                      className="py-1 px-3 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {subjects.find(s => s.id === subjectId)?.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-xl mb-10 border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Estimated Investment</h4>
                </div>
                
                <p className="mb-4">Based on your selections, an educational journey of this type typically ranges from:</p>
                
                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                  <span className="text-2xl font-bold text-primary">$1,200 - $2,800</span>
                  <p className="text-sm text-muted-foreground">per participant</p>
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  Final pricing depends on specific destinations, accommodations, activities, and season.
                  Our team will provide a detailed quote upon consultation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white"
                >
                  Request Detailed Quote
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="rounded-full px-8"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourBuilder;
