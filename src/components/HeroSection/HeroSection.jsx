import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./HeroSection.module.css";
import "@google/model-viewer";

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const modelContainerRef = useRef(null);
  const shapesRef = useRef([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  // Replace with your actual model path
  const modelPath = "/public/model/Astronaut (3).glb";

  const translations = {
    en: {
      badge: "Revolutionary Learning Platform",
      headline: "Learn Visually with Interactive 3D Models",
      subtext: "EduViz is a marketplace for interactive 3D learning models. Explore, learn, and create like never before!",
      feature1: "Explore 1000+ 3D Models",
      feature2: "Interactive Learning",
      feature3: "Sell Your Creations",
      exploreButton: "Explore Models",
      creatorButton: "Become a Creator"
    },
    ta: {
      badge: "புரட்சிகர கற்றல் தளம்",
      headline: "ஊடாடும் 3D மாதிரிகளுடன் காட்சி மூலம் கற்றுக்கொள்ளுங்கள்",
      subtext: "எடுவிஸ் என்பது ஊடாடும் 3D கற்றல் மாதிரிகளுக்கான சந்தை. முன்பு போலல்லாமல் ஆராயுங்கள், கற்றுக்கொள்ளுங்கள் மற்றும் உருவாக்குங்கள்!",
      feature1: "1000+ 3D மாதிரிகளை ஆராயுங்கள்",
      feature2: "ஊடாடும் கற்றல்",
      feature3: "உங்கள் படைப்புகளை விற்கவும்",
      exploreButton: "மாதிரிகளை ஆராயுங்கள்",
      creatorButton: "உருவாக்குநராக ஆகுங்கள்"
    },
    hi: {
      badge: "क्रांतिकारी शिक्षण मंच",
      headline: "इंटरैक्टिव 3D मॉडल के साथ दृश्य रूप से सीखें",
      subtext: "एडुविज़ इंटरैक्टिव 3D लर्निंग मॉडल के लिए एक मार्केटप्लेस है। पहले से कहीं बेहतर तरीके से एक्सप्लोर करें, सीखें और बनाएं!",
      feature1: "1000+ 3D मॉडल एक्सप्लोर करें",
      feature2: "इंटरैक्टिव लर्निंग",
      feature3: "अपनी कृतियों को बेचें",
      exploreButton: "मॉडल एक्सप्लोर करें",
      creatorButton: "निर्माता बनें"
    },
    de: {
      badge: "Revolutionäre Lernplattform",
      headline: "Lernen Sie visuell mit interaktiven 3D-Modellen",
      subtext: "EduViz ist ein Marktplatz für interaktive 3D-Lernmodelle. Entdecken, lernen und erstellen Sie wie nie zuvor!",
      feature1: "Entdecken Sie 1000+ 3D-Modelle",
      feature2: "Interaktives Lernen",
      feature3: "Verkaufen Sie Ihre Kreationen",
      exploreButton: "Modelle entdecken",
      creatorButton: "Ersteller werden"
    },
    ja: {
      badge: "革新的な学習プラットフォーム",
      headline: "インタラクティブな3Dモデルで視覚的に学ぶ",
      subtext: "EduVizはインタラクティブな3D学習モデルのマーケットプレイスです。これまでにない方法で探索し、学び、創造しましょう！",
      feature1: "1000以上の3Dモデルを探索",
      feature2: "インタラクティブな学習",
      feature3: "作品を販売",
      exploreButton: "モデルを探索",
      creatorButton: "クリエイターになる"
    }
  };

  const t = (key) => {
    return translations[selectedLanguage][key] || translations['en'][key];
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    const handleLanguageChange = (e) => {
      if (e.key === 'preferredLanguage') {
        setSelectedLanguage(e.newValue || 'en');
      }
    };

    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const handleLocalLanguageChange = () => {
      const currentLanguage = localStorage.getItem('preferredLanguage');
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleLocalLanguageChange);
    return () => {
      window.removeEventListener('localStorageChange', handleLocalLanguageChange);
    };
  }, [selectedLanguage]);

  useEffect(() => {
    // Set initial background opacity
    if (heroRef.current) {
      heroRef.current.style.opacity = 1;
    }

    setIsContentVisible(true);
    
    // Animation sequence
    const timer = setTimeout(() => {
      if (!heroRef.current || !contentRef.current || !modelContainerRef.current) return;

      // Animate shapes
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          // Initial animation
          gsap.fromTo(
            shape,
            {
              opacity: 0,
              scale: 0.8,
              x: index % 2 === 0 ? -200 : 200,
              y: index % 3 === 0 ? -150 : 150,
            },
            {
              opacity: 0.4,
              scale: 1,
              x: 0,
              y: 0,
              duration: 2,
              delay: index * 0.3,
              ease: "power3.out",
            }
          );

          // Continuous floating animation
          gsap.to(shape, {
            y: () => Math.sin(index + 1) * 70,
            x: () => Math.cos(index + 2) * 40,
            rotation: () => Math.sin(index + 1) * 15,
            duration: 8 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
      
      // Animate content from left with staggered effect
      gsap.set(contentRef.current.children, { 
        opacity: 0, 
        x: -80,
        rotationY: 15,
        transformOrigin: "left center" 
      });
      
      gsap.to(contentRef.current.children, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      
      // Animate model container with 3D effect
      gsap.fromTo(
        modelContainerRef.current,
        { 
          opacity: 0, 
          x: 100, 
          scale: 0.8,
          rotationY: -20,
          transformOrigin: "center center"
        },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          rotationY: 0,
          duration: 1.5, 
          ease: "power3.out"
        }
      );

      // Button hover effects
      const buttons = heroRef.current.querySelectorAll(`.${styles.ctaButton}`);
      buttons.forEach((button) => {
        const onEnter = () => {
          gsap.killTweensOf(button);
          gsap.to(button, {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(102, 23, 203, 0.5)",
            duration: 0.3,
          });
        };
        
        const onLeave = () => {
          gsap.killTweensOf(button);
          gsap.to(button, {
            scale: 1,
            boxShadow: "0 4px 10px rgba(102, 23, 203, 0.2)",
            duration: 0.3,
          });
        };

        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);

        return () => {
          button.removeEventListener("mouseenter", onEnter);
          button.removeEventListener("mouseleave", onLeave);
        };
      });
      
      // Feature items hover effect
      const features = heroRef.current.querySelectorAll(`.${styles.featureItem}`);
      features.forEach((feature) => {
        const onEnter = () => {
          gsap.to(feature, {
            backgroundColor: "rgba(102, 23, 203, 0.15)",
            y: -3,
            boxShadow: "0 10px 20px rgba(102, 23, 203, 0.15)",
            duration: 0.3
          });
        };
        
        const onLeave = () => {
          gsap.to(feature, {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            y: 0,
            boxShadow: "none",
            duration: 0.3
          });
        };
        
        feature.addEventListener("mouseenter", onEnter);
        feature.addEventListener("mouseleave", onLeave);
        
        return () => {
          feature.removeEventListener("mouseenter", onEnter);
          feature.removeEventListener("mouseleave", onLeave);
        };
      });
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (heroRef.current) {
        const buttons = heroRef.current.querySelectorAll(`.${styles.ctaButton}`);
        buttons.forEach((button) => {
          gsap.killTweensOf(button);
        });
        
        const features = heroRef.current.querySelectorAll(`.${styles.featureItem}`);
        features.forEach((feature) => {
          gsap.killTweensOf(feature);
        });
      }
    };
  }, [isContentVisible]);

  return (
    <section className={styles.heroWrapper} ref={heroRef}>
      {/* Gradient background that loads immediately */}
      <div className={styles.heroBackgroundPreload}></div>
      
      {/* Animated background shapes */}
      <div className={styles.heroBackground}>
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`${styles.shape} ${styles[`shape${num}`]}`}
            ref={(el) => (shapesRef.current[num - 1] = el)}
          />
        ))}
        <div className={styles.heroOverlay}></div>
      </div>
      
      <div className={styles.heroContainer}>
        {/* Left side - Content */}
        <div className={styles.heroContent} ref={contentRef}>
          <span className={styles.heroBadge}>{t('badge')}</span>
          <h1 className={styles.heroHeadline}>
            {t('headline')}
          </h1>
          <p className={styles.heroSubtext}>
            {t('subtext')}
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={styles.featureText}>{t('feature1')}</span>
            </div>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={styles.featureText}>{t('feature2')}</span>
            </div>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={styles.featureText}>{t('feature3')}</span>
            </div>
          </div>
          <div className={styles.heroCta}>
            <Link to="/">
              <button className={styles.ctaButton}>{t('exploreButton')}</button>
            </Link>
            <Link to="/signup">
              <button className={`${styles.ctaButton} ${styles.primary}`}>
                {t('creatorButton')}
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right side - 3D Model using model-viewer */}
        <div className={styles.heroModelContainer} ref={modelContainerRef}>
          <div className={styles.modelWrapper}>
            <model-viewer
              src={modelPath}
              alt="3D model"
              auto-rotate
              camera-controls
              disable-zoom
              rotation-per-second="30deg"
              environment-image="neutral"
              shadow-intensity="1"
              exposure="0.8"
              camera-orbit="0deg 75deg 105%"
              min-camera-orbit="auto auto 75%"
              max-camera-orbit="auto auto 150%"
              ar
              ar-modes="webxr scene-viewer quick-look"
              className={styles.modelViewer}
            >
              {/* Optional loading spinner */}
              <div slot="poster" className={styles.modelLoading}>
                <div className={styles.spinner}></div>
              </div>
            </model-viewer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;