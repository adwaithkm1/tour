
import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    tourType: 'school'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible!",
      });
    }, 1500);
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

    const title = document.querySelector('.contact-title');
    if (title) observer.observe(title);

    const content = document.querySelector('.contact-content');
    if (content) observer.observe(content);

    return () => {
      if (title) observer.unobserve(title);
      if (content) observer.unobserve(content);
    };
  }, []);

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 contact-title">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Plan Your <span className="text-primary">Educational Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact us to discuss your educational travel goals, request a detailed quote, 
            or learn more about our custom programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 opacity-0 contact-content">
          {/* Contact information */}
          <div className="lg:col-span-2 bg-secondary rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">info@learnscape.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Office</h4>
                  <p className="text-muted-foreground">
                    123 Education Avenue<br />
                    Boston, MA 02108
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-soft">
              <h4 className="font-medium mb-2">Typical Response Time</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our team typically responds within 24-48 hours on business days.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>Available for virtual consultations</span>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="jane@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium mb-2">
                      Organization/School
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your organization or school"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="tourType" className="block text-sm font-medium mb-2">
                    What type of tour are you interested in? <span className="text-primary">*</span>
                  </label>
                  <select
                    id="tourType"
                    name="tourType"
                    required
                    value={formData.tourType}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-800"
                  >
                    <option value="school">School Program</option>
                    <option value="university">University Excursion</option>
                    <option value="family">Family Adventure</option>
                    <option value="custom">Custom Group Tour</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tell us about your educational goals, desired destinations, or specific requirements..."
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Message Sent Successfully!</h3>
                <p className="text-muted-foreground max-w-md mb-8">
                  Thank you for reaching out to us. Our team will review your message 
                  and get back to you shortly.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      organization: '',
                      message: '',
                      tourType: 'school'
                    });
                  }}
                  className="rounded-lg"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
