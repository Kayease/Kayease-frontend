import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import TeamSpotlight from './components/TeamSpotlight';
import CompanyCulture from './components/CompanyCulture';
import ValuesSection from './components/ValuesSection';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About Us - Kayease Digital Agency | Our Story, Team & Values';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Kayease Digital Agency\'s story, meet our expert team, and learn about our values. We\'re your trusted digital transformation partner, turning challenges into scalable solutions.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <HeroSection />
      
        
        {/* Philosophy Section */}
        <PhilosophySection />
        
        {/* Team Spotlight */}
        <TeamSpotlight />
        
        {/* Company Culture */}
        <CompanyCulture />
        
        {/* Values Section */}
        <ValuesSection />
        
      </main>
      
    </div>
  );
};

export default About;