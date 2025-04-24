// pages/HomePage.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import HowItWorksSection from '../../components/HowItWorksSection/HowItWorksSection';
import FeaturedModelsSection from '../../components/FeaturedModelsSection/FeaturedModelsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import CTASection from '../../components/CTASection/CTASection';
import Footer from '../../components/Footer/Footer';
import styles from './HomePage.module.css';
import Header from '../../components/Header/Header';

const HomePage = () => {
  useEffect(() => {
    gsap.set('body', { 
      backgroundColor: '#0A0A0F',
      color: '#E4E6EB'
    });
  }, []);

  return (
    <div className={styles.homepage}>
      <Header />
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="features-section">
        <FeatureSection />
      </div>
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedModelsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;