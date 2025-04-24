// components/FeaturedModelsSection/FeaturedModelsSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import styles from './FeaturedModelsSection.module.css'; // Use the component-specific CSS

const FeaturedModelsSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const languageButtonRef = useRef(null);
  const modalRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' }
  ];

  const translations = {
    en: {
      title: "Featured Models",
      subtitle: "Top-rated and popular 3D learning resources",
      viewModel: "View Model",
      exploreAll: "Explore All Models",
      selectLanguage: "Select language",
      models: [
        {
          title: "Human Heart Anatomy",
          category: "Medical",
          rating: "4.9",
          price: "$29.99"
        },
        {
          title: "Electric Motor Components",
          category: "Engineering",
          rating: "4.8",
          price: "$24.99"
        },
        {
          title: "Solar System",
          category: "Science",
          rating: "4.7",
          price: "$19.99"
        },
        {
          title: "Sustainable House Design",
          category: "Architecture",
          rating: "4.9",
          price: "$34.99"
        }
      ]
    },
    ta: {
      title: "சிறப்பு மாதிரிகள்",
      subtitle: "உயர்-மதிப்பிடப்பட்ட மற்றும் பிரபலமான 3D கற்றல் வளங்கள்",
      viewModel: "மாதிரியைக் காண்க",
      exploreAll: "அனைத்து மாதிரிகளையும் ஆராயுங்கள்",
      selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்",
      models: [
        {
          title: "மனித இதய உடற்கூறியல்",
          category: "மருத்துவம்",
          rating: "4.9",
          price: "₹2,499"
        },
        {
          title: "மின்மோட்டார் கூறுகள்",
          category: "பொறியியல்",
          rating: "4.8",
          price: "₹1,999"
        },
        {
          title: "சூரிய குடும்பம்",
          category: "அறிவியல்",
          rating: "4.7",
          price: "₹1,499"
        },
        {
          title: "நிலையான வீட்டு வடிவமைப்பு",
          category: "கட்டிடக்கலை",
          rating: "4.9",
          price: "₹2,999"
        }
      ]
    },
    hi: {
      title: "विशेष मॉडल",
      subtitle: "उच्च-रेटेड और लोकप्रिय 3D शिक्षण संसाधन",
      viewModel: "मॉडल देखें",
      exploreAll: "सभी मॉडल देखें",
      selectLanguage: "भाषा चुनें",
      models: [
        {
          title: "मानव हृदय शरीर रचना",
          category: "चिकित्सा",
          rating: "4.9",
          price: "₹2,499"
        },
        {
          title: "विद्युत मोटर घटक",
          category: "इंजीनियरिंग",
          rating: "4.8",
          price: "₹1,999"
        },
        {
          title: "सौर मंडल",
          category: "विज्ञान",
          rating: "4.7",
          price: "₹1,499"
        },
        {
          title: "स्थायी घर डिजाइन",
          category: "वास्तुकला",
          rating: "4.9",
          price: "₹2,999"
        }
      ]
    },
    de: {
      title: "Ausgewählte Modelle",
      subtitle: "Bestbewertete und beliebte 3D-Lernressourcen",
      viewModel: "Modell ansehen",
      exploreAll: "Alle Modelle erkunden",
      selectLanguage: "Sprache auswählen",
      models: [
        {
          title: "Anatomie des menschlichen Herzens",
          category: "Medizin",
          rating: "4.9",
          price: "29,99 €"
        },
        {
          title: "Elektromotor-Komponenten",
          category: "Ingenieurwesen",
          rating: "4.8",
          price: "24,99 €"
        },
        {
          title: "Sonnensystem",
          category: "Wissenschaft",
          rating: "4.7",
          price: "19,99 €"
        },
        {
          title: "Nachhaltiges Hausdesign",
          category: "Architektur",
          rating: "4.9",
          price: "34,99 €"
        }
      ]
    },
    ja: {
      title: "注目のモデル",
      subtitle: "高評価で人気の3D学習リソース",
      viewModel: "モデルを見る",
      exploreAll: "すべてのモデルを見る",
      selectLanguage: "言語を選択",
      models: [
        {
          title: "人体心臓の解剖学",
          category: "医学",
          rating: "4.9",
          price: "¥3,999"
        },
        {
          title: "電気モーターの構成部品",
          category: "工学",
          rating: "4.8",
          price: "¥2,999"
        },
        {
          title: "太陽系",
          category: "科学",
          rating: "4.7",
          price: "¥2,499"
        },
        {
          title: "持続可能な住宅設計",
          category: "建築",
          rating: "4.9",
          price: "¥4,499"
        }
      ]
    }
  };

  const handleLanguageSelect = (lang) => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      // Dispatch a custom event for language change
      const event = new Event('languageChange');
      window.dispatchEvent(event);
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
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('preferredLanguage');
      if (newLanguage && translations[newLanguage]) {
        setSelectedLanguage(newLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Preload images
  useEffect(() => {
    const imageUrls = [
      "https://img.freepik.com/premium-photo/anatomy-human-heart-3d-illustration_97886-26368.jpg",
      "https://c8.alamy.com/comp/2GMJ9XN/electric-motor-parts-and-structure-on-black-background-3d-illustration-2GMJ9XN.jpg",
      "https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/01/19/23/46/church-1993645_1280.jpg"
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, []);

  const t = (key, index) => {
    const currentTranslations = translations[selectedLanguage] || translations['en'];
    if (index !== undefined && key === 'models') {
      return currentTranslations[key][index];
    }
    return currentTranslations[key];
  };

  return (
    <section id="featured-models-section" className={styles.featuredModelsSection}>
      <div className={styles.heroBackground}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
          <div className={styles.languageSelector}>
            {/* <button
              ref={languageButtonRef}
              className={styles.languageButton}
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              aria-label="Select language"
            >
              <FaGlobe className={styles.globeIcon} />
            </button> */}
            {showLanguageModal && (
              <div ref={modalRef} className={styles.languageModal}>
                <div className={styles.modalHeader}>
                  {t('selectLanguage')}
                </div>
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
        </div>
        <div className={styles.modelsGrid}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={styles.modelCard}>
              <div className={`${styles.modelImage} ${styles[`model${index + 1}Bg`]}`}>
                {!imagesLoaded && <div className={styles.imagePlaceholder}>Loading...</div>}
              </div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>{t('models', index).title}</h3>
                <p className={styles.modelCategory}>{t('models', index).category}</p>
                <div className={styles.modelStats}>
                  <span className={styles.modelRating}>★ {t('models', index).rating}</span>
                  <span className={styles.modelPrice}>{t('models', index).price}</span>
                </div>
                <Link to={`/model/${index + 1}`} className={styles.btnModel}>
                  {t('viewModel')}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.modelsCta}>
          <Link to="/signup" className={styles.btnPrimary}>
            {t('exploreAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModelsSection;