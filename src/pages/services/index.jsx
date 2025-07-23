import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import ServiceHero from "./components/ServiceHero";
import ServiceCategories from "./components/ServiceCategories";
import ProcessVisualization from "./components/ProcessVisualization";
import TechnologyShowcase from "./components/TechnologyShowcase";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Services - Kayease Digital Agency | Web Development, Mobile Apps &
          Digital Solutions
        </title>
        <meta
          name="description"
          content="Explore Kayease's comprehensive digital services including web development, mobile apps, e-commerce solutions, and digital strategy. Get instant project estimates with our pricing calculator."
        />
        <meta
          name="keywords"
          content="web development, mobile apps, e-commerce, digital strategy, Next.js, React, custom software development"
        />
        <meta property="og:title" content="Services - Kayease Digital Agency" />
        <meta
          property="og:description"
          content="Transform your digital vision with our comprehensive services. From web development to mobile apps and digital strategy."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://Kayease.com/services" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <main>
          <ServiceHero />
          <ServiceCategories />
          <TechnologyShowcase />
          <ProcessVisualization />
        </main>
      </div>
    </>
  );
};

export default ServicesPage;
