import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaGlobe } from 'react-icons/fa';
import axios from 'axios';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const languageButtonRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
  ];

  const translations = {
    en: {
      home: 'Home',
      features: 'Features',
      categories: 'Categories',
      howItWorks: 'How It Works',
      models: 'Models',
      login: 'Login',
      signUp: 'Sign Up',
      selectLanguage: 'Select language',
      logout: 'Logout',
    },
    ta: {
      home: 'முகப்பு',
      features: 'அம்சங்கள்',
      categories: 'வகைகள்',
      howItWorks: 'எப்படி வேலை செய்கிறது',
      models: 'மாதிரிகள்',
      login: 'உள்நுழை',
      signUp: 'பதிவு செய்க',
      selectLanguage: 'மொழியை தேர்ந்தெடுக்கவும்',
      logout: 'வெளியேறு',
    },
    hi: {
      home: 'होम',
      features: 'विशेषताएं',
      categories: 'श्रेणियां',
      howItWorks: 'यह कैसे काम करता है',
      models: 'मॉडल',
      login: 'लॉग इन',
      signUp: 'साइन अप',
      selectLanguage: 'भाषा चुनें',
      logout: 'लॉग आउट',
    },
    de: {
      home: 'Startseite',
      features: 'Funktionen',
      categories: 'Kategorien',
      howItWorks: "So funktioniert's",
      models: 'Modelle',
      login: 'Anmelden',
      signUp: 'Registrieren',
      selectLanguage: 'Sprache auswählen',
      logout: 'Abmelden',
    },
    ja: {
      home: 'ホーム',
      features: '機能',
      categories: 'カテゴリー',
      howItWorks: '使い方',
      models: 'モデル',
      login: 'ログイン',
      signUp: 'サインアップ',
      selectLanguage: '言語を選択',
      logout: 'ログアウト',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get('https://eduviz-backend-1.onrender.com/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector(`.${styles.header}`)?.offsetHeight || 0;
      const offsetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        if (window.scrollY !== offsetPosition) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleLanguageSelect = (lang) => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      window.dispatchEvent(new Event('languageChange'));
      window.dispatchEvent(new Event('localStorageChange'));
    }
    setShowLanguageModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageButtonRef.current &&
        modalRef.current &&
        !languageButtonRef.current.contains(event.target) &&
        !modalRef.current.contains(event.target)
      ) {
        setShowLanguageModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && savedLanguage !== selectedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('localStorageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('localStorageChange', handleLanguageChange);
    };
  }, [selectedLanguage]);

  const t = (key) => {
    const currentTranslations = translations[selectedLanguage] || translations['en'];
    return currentTranslations[key] || translations['en'][key];
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoShape}></div>
          EduViz
        </Link>
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('hero-section')} className={styles.navLink}>
            {t('home')}
          </button>
          <button onClick={() => scrollToSection('features-section')} className={styles.navLink}>
            {t('features')}
          </button>
          <button onClick={() => scrollToSection('categories-section')} className={styles.navLink}>
            {t('categories')}
          </button>
          <button onClick={() => scrollToSection('how-it-works-section')} className={styles.navLink}>
            {t('howItWorks')}
          </button>
          <button onClick={() => scrollToSection('featured-models-section')} className={styles.navLink}>
            {t('models')}
          </button>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.languageSelector}>
            <button
              ref={languageButtonRef}
              className={styles.languageButton}
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              aria-label="Select language"
            >
              <FaGlobe className={styles.globeIcon} />
            </button>
            {showLanguageModal && (
              <div ref={modalRef} className={styles.languageModal}>
                <div className={styles.modalHeader}>{t('selectLanguage')}</div>
                <div className={styles.languageList}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`${styles.languageOption} ${
                        selectedLanguage === lang.code ? styles.selected : ''
                      }`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.authButtons}>
            {isAuthenticated ? (
              <button className={styles.button} onClick={handleLogout}>
                {t('logout')}
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className={styles.button}>{t('login')}</button>
                </Link>
                <Link to="/signup">
                  <button className={`${styles.button} ${styles.primary}`}>
                    {t('signUp')}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;