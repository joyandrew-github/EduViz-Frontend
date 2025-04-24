import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.css'; // Use the component-specific CSS

const CTASection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      title: "Ready to Transform Your Learning Experience?",
      subtitle: "Join thousands of students, educators, and creators on EduViz today",
      ctaButton: "Get Started for Free",
      learnButton: "Learn About Creating"
    },
    ta: {
      title: "உங்கள் கற்றல் அனுபவத்தை மாற்ற தயாரா?",
      subtitle: "இன்றே EduViz இல் ஆயிரக்கணக்கான மாணவர்கள், கல்வியாளர்கள் மற்றும் படைப்பாளர்களுடன் சேரவும்",
      ctaButton: "இலவசமாக தொடங்கவும்",
      learnButton: "உருவாக்குவது பற்றி அறியவும்"
    },
    hi: {
      title: "अपने सीखने के अनुभव को बदलने के लिए तैयार हैं?",
      subtitle: "आज ही EduViz पर हजारों छात्रों, शिक्षकों और रचनाकारों से जुड़ें",
      ctaButton: "मुफ्त में शुरू करें",
      learnButton: "बनाने के बारे में जानें"
    },
    de: {
      title: "Bereit, Ihr Lernerlebnis zu verändern?",
      subtitle: "Schließen Sie sich noch heute Tausenden von Studenten, Pädagogen und Schöpfern auf EduViz an",
      ctaButton: "Kostenlos starten",
      learnButton: "Erfahren Sie mehr über das Erstellen"
    },
    ja: {
      title: "学習体験を変える準備はできましたか？",
      subtitle: "今日からEduVizで何千人もの学生、教育者、クリエイターと一緒に",
      ctaButton: "無料で始める",
      learnButton: "作成について学ぶ"
    }
  };

  const t = (key) => translations[selectedLanguage][key] || translations['en'][key];

  useEffect(() => {
    // Load initial language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    // Listen for language changes from Footer or other components
    const handleLanguageChange = (e) => {
      if (e.key === 'preferredLanguage') {
        setSelectedLanguage(e.newValue || 'en');
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  // Listen for language changes within the same window
  useEffect(() => {
    const handleLocalLanguageChange = () => {
      const currentLanguage = localStorage.getItem('preferredLanguage');
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    };

    // Add event listener for local storage changes
    window.addEventListener('localStorageChange', handleLocalLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('localStorageChange', handleLocalLanguageChange);
    };
  }, [selectedLanguage]);

  return (
    <section id="cta-section" className={styles.ctaSection}>
      {/* Particle Effects */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>
      {/* Decorative Circles */}
      <div className={`${styles.decorativeCircle} ${styles.circle1}`}></div>
      <div className={`${styles.decorativeCircle} ${styles.circle2}`}></div>
      {/* Main Content */}
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{t('title')}</h2>
        <p className={styles.ctaText}>{t('subtitle')}</p>
        <div className={styles.ctaButtons}>
          <Link to="/signup" className={styles.btnPrimary}>{t('ctaButton')}</Link>
          <Link to="/signup" className={styles.btnSecondary}>{t('learnButton')}</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;