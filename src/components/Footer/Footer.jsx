import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGlobe } from 'react-icons/fa';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    subscribeText: "Subscribe to our newsletter for updates and new features",
    quickLinks: "Quick Links",
    home: "Home",
    exploreModels: "Explore Models",
    howItWorks: "How It Works",
    pricing: "Pricing",
    contactUs: "Contact Us",
    forCreators: "For Creators",
    becomeCreator: "Become a Creator",
    creatorGuidelines: "Creator Guidelines",
    creatorFAQ: "Creator FAQ",
    resources: "Resources",
    newsletter: "Newsletter",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    selectLanguage: "Select language",
    brandDescription: "Empowering learners worldwide with accessible, high-quality education. Join our community and transform your future.",
    support: "Support"
  },
  ta: {
    subscribeText: "புதுப்பிப்புகள் மற்றும் புதிய அம்சங்களுக்கு எங்கள் செய்திமடலுக்கு குழுசேரவும்",
    quickLinks: "விரைவு இணைப்புகள்",
    home: "முகப்பு",
    exploreModels: "மாதிரிகளை ஆராயுங்கள்",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    pricing: "விலை",
    contactUs: "எங்களை தொடர்பு கொள்ள",
    forCreators: "படைப்பாளர்களுக்கு",
    becomeCreator: "ஒரு படைப்பாளராகுங்கள்",
    creatorGuidelines: "படைப்பாளர் வழிகாட்டுதல்கள்",
    creatorFAQ: "படைப்பாளர் கேள்விகள்",
    resources: "வளங்கள்",
    newsletter: "செய்திமடல்",
    emailPlaceholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    subscribe: "குழுசேர்",
    allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை",
    termsOfService: "சேவை விதிமுறைகள்",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்",
    brandDescription: "அணுகக்கூடிய, உயர்தர கல்வியுடன் உலகெங்கிலும் உள்ள கற்பவர்களுக்கு அதிகாரம் அளித்தல். எங்கள் சமூகத்தில் சேர்ந்து உங்கள் எதிர்காலத்தை மாற்றுங்கள்.",
    support: "ஆதரவு"
  },
  hi: {
    subscribeText: "अपडेट और नई सुविधाओं के लिए हमारे न्यूजलेटर की सदस्यता लें",
    quickLinks: "त्वरित लिंक",
    home: "होम",
    exploreModels: "मॉडल एक्सप्लोर करें",
    howItWorks: "यह कैसे काम करता है",
    pricing: "मूल्य निर्धारण",
    contactUs: "संपर्क करें",
    forCreators: "क्रिएटर्स के लिए",
    becomeCreator: "क्रिएटर बनें",
    creatorGuidelines: "क्रिएटर दिशानिर्देश",
    creatorFAQ: "क्रिएटर FAQ",
    resources: "संसाधन",
    newsletter: "न्यूजलेटर",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    subscribe: "सदस्यता लें",
    allRightsReserved: "सर्वाधिकार सुरक्षित",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    selectLanguage: "भाषा चुनें",
    brandDescription: "सुलभ, उच्च गुणवत्ता वाली शिक्षा के साथ दुनिया भर के शिक्षार्थियों को सशक्त बनाना। हमारे समुदाय से जुड़ें और अपना भविष्य बदलें।",
    support: "सहायता"
  },
  de: {
    subscribeText: "Abonnieren Sie unseren Newsletter für Updates und neue Funktionen",
    quickLinks: "Schnellzugriff",
    home: "Startseite",
    exploreModels: "Modelle erkunden",
    howItWorks: "Funktionsweise",
    pricing: "Preise",
    contactUs: "Kontakt",
    forCreators: "Für Ersteller",
    becomeCreator: "Ersteller werden",
    creatorGuidelines: "Ersteller-Richtlinien",
    creatorFAQ: "Ersteller-FAQ",
    resources: "Ressourcen",
    newsletter: "Newsletter",
    emailPlaceholder: "E-Mail eingeben",
    subscribe: "Abonnieren",
    allRightsReserved: "Alle Rechte vorbehalten",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    selectLanguage: "Sprache auswählen",
    brandDescription: "Wir befähigen Lernende weltweit mit zugänglicher, hochwertiger Bildung. Treten Sie unserer Community bei und gestalten Sie Ihre Zukunft.",
    support: "Support"
  },
  ja: {
    subscribeText: "ニュースレターを購読して最新情報と新機能をチェック",
    quickLinks: "クイックリンク",
    home: "ホーム",
    exploreModels: "モデルを探す",
    howItWorks: "使い方",
    pricing: "料金",
    contactUs: "お問い合わせ",
    for : "クリエイター向け",
    becomeCreator: "クリエイターになる",
    creatorGuidelines: "クリエイターガイドライン",
    creatorFAQ: "クリエイターFAQ",
    resources: "リソース",
    newsletter: "ニュースレター",
    emailPlaceholder: "メールアドレスを入力",
    subscribe: "購読する",
    allRightsReserved: "全著作権所有",
    termsOfService: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    selectLanguage: "言語を選択",
    brandDescription: "アクセス可能で質の高い教育を通じて、世界中の学習者に力を与えます。コミュニティに参加して、あなたの未来を変革しましょう。",
    support: "サポート"
  }
};

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const footerRef = useRef(null);
  const sectionRefs = useRef([]);
  const bottomRef = useRef(null);
  const languageButtonRef = useRef(null);
  const modalRef = useRef(null);
  const [email, setEmail] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageSelect = (lang) => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
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
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('preferredLanguage');
      if (newLanguage && translations[newLanguage] && newLanguage !== selectedLanguage) {
        setSelectedLanguage(newLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleStorageChange);
    return () => window.removeEventListener('localStorageChange', handleStorageChange);
  }, [selectedLanguage]);

  useEffect(() => {
    if (!footerRef.current) return;

    const sections = sectionRefs.current;
    sections.forEach((section) => {
      if (section) {
        gsap.set(section, { opacity: 0, y: 30 });
        Array.from(section.children).forEach(child => {
          gsap.set(child, { opacity: 0, y: 20 });
        });
      }
    });

    sections.forEach((section, index) => {
      if (section) {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          ease: "power3.out"
        });

        gsap.to(section.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          ease: "power3.out"
        });
      }
    });

    if (bottomRef.current) {
      gsap.to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const t = translations[selectedLanguage] || translations.en;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footerWrapper} ref={footerRef}>
      <div className={styles.footerContent}>
        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <h3 className={styles.footerHeading}>EduPlatform</h3>
          <p className={styles.footerDescription}>
            {t.brandDescription}
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <FaFacebook />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaLinkedin />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaYoutube />
            </a>
          </div>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <h3 className={styles.footerHeading}>{t.quickLinks}</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">{t.home}</Link>
            </li>
            <li>
              <Link to="/">{t.exploreModels}</Link>
            </li>
            <li>
              <Link to="/">{t.howItWorks}</Link>
            </li>
            <li>
              <Link to="/">{t.pricing}</Link>
            </li>
            <li>
              <Link to="/">{t.contactUs}</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <h3 className={styles.footerHeading}>{t.forCreators}</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/signup?role=creator">{t.becomeCreator}</Link>
            </li>
            <li>
              <Link to="/">{t.creatorGuidelines}</Link>
            </li>
            <li>
              <Link to="/">{t.creatorFAQ}</Link>
            </li>
            <li>
              <Link to="/">{t.resources}</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          <h3 className={styles.footerHeading}>{t.newsletter}</h3>
          <p className={styles.footerDescription}>
            {t.subscribeText}
          </p>
          <div className={styles.newsletterForm}>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className={styles.newsletterInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.newsletterButton}>{t.subscribe}</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom} ref={bottomRef}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} EduPlatform. {t.allRightsReserved}
          </p>
          <div className={styles.footerLegal}>
            <Link to="/terms">{t.termsOfService}</Link>
            <Link to="/privacy">{t.privacyPolicy}</Link>
          </div>
          <div className={styles.languageSelector}>
            <button 
              ref={languageButtonRef}
              className={styles.languageButton}
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              aria-label={t.selectLanguage}
              aria-expanded={showLanguageModal}
              aria-haspopup="listbox"
            >
              <FaGlobe />
              <span className={styles.currentLanguage}>
                {languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}
              </span>
            </button>
            {showLanguageModal && (
              <div 
                ref={modalRef}
                className={styles.languageModal}
                role="listbox"
                aria-label={t.selectLanguage}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.languageOption} ${selectedLanguage === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                    role="option"
                    aria-selected={selectedLanguage === lang.code}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;