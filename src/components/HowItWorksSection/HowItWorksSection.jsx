import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaStore, FaChalkboardTeacher } from 'react-icons/fa';
import styles from './HowItWorksSection.module.css'; // Use the component-specific CSS

const HowItWorksSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      title: "How It Works",
      subtitle: "Join our community as a learner or creator in three simple steps",
      steps: [
        {
          title: "Create an Account",
          description: "Sign up for free as a learner or creator and set up your profile"
        },
        {
          title: "Browse or Upload",
          description: "Discover models as a learner or upload your creations as a creator"
        },
        {
          title: "Learn or Earn",
          description: "Interact with models to learn or earn money by selling your creations"
        }
      ]
    },
    ta: {
      title: "இது எப்படி செயல்படுகிறது",
      subtitle: "மூன்று எளிய படிகளில் கற்பவராகவோ படைப்பாளராகவோ எங்கள் சமூகத்தில் இணையுங்கள்",
      steps: [
        {
          title: "கணக்கை உருவாக்கவும்",
          description: "கற்பவராகவோ படைப்பாளராகவோ இலவசமாக பதிவு செய்து உங்கள் சுயவிவரத்தை அமைக்கவும்"
        },
        {
          title: "உலாவ அல்லது பதிவேற்றவும்",
          description: "கற்பவராக மாதிரிகளைக் கண்டறியவும் அல்லது படைப்பாளராக உங்கள் படைப்புகளை பதிவேற்றவும்"
        },
        {
          title: "கற்றுக்கொள்ளுங்கள் அல்லது சம்பாதியுங்கள்",
          description: "கற்க மாதிரிகளுடன் தொடர்புகொள்ளுங்கள் அல்லது உங்கள் படைப்புகளை விற்று பணம் சம்பாதியுங்கள்"
        }
      ]
    },
    hi: {
      title: "यह कैसे काम करता है",
      subtitle: "तीन सरल चरणों में एक शिक्षार्थी या निर्माता के रूप में हमारे समुदाय में शामिल हों",
      steps: [
        {
          title: "खाता बनाएं",
          description: "एक शिक्षार्थी या निर्माता के रूप में मुफ्त में साइन अप करें और अपनी प्रोफ़ाइल सेट करें"
        },
        {
          title: "ब्राउज़ या अपलोड करें",
          description: "एक शिक्षार्थी के रूप में मॉडल खोजें या एक निर्माता के रूप में अपनी रचनाएं अपलोड करें"
        },
        {
          title: "सीखें या कमाएं",
          description: "सीखने के लिए मॉडल के साथ इंटरैक्ट करें या अपनी रचनाएं बेचकर पैसे कमाएं"
        }
      ]
    },
    de: {
      title: "Wie es funktioniert",
      subtitle: "Werden Sie in drei einfachen Schritten Teil unserer Community als Lernender oder Ersteller",
      steps: [
        {
          title: "Konto erstellen",
          description: "Melden Sie sich kostenlos als Lernender oder Ersteller an und richten Sie Ihr Profil ein"
        },
        {
          title: "Durchsuchen oder Hochladen",
          description: "Entdecken Sie Modelle als Lernender oder laden Sie Ihre Kreationen als Ersteller hoch"
        },
        {
          title: "Lernen oder Verdienen",
          description: "Interagieren Sie mit Modellen zum Lernen oder verdienen Sie Geld durch den Verkauf Ihrer Kreationen"
        }
      ]
    },
    ja: {
      title: "使い方",
      subtitle: "3つの簡単なステップで学習者またはクリエイターとしてコミュニティに参加",
      steps: [
        {
          title: "アカウントを作成",
          description: "学習者またはクリエイターとして無料で登録し、プロフィールを設定"
        },
        {
          title: "閲覧またはアップロード",
          description: "学習者としてモデルを探索、またはクリエイターとして作品をアップロード"
        },
        {
          title: "学習または収益化",
          description: "モデルを使って学習、または作品を販売して収益を得る"
        }
      ]
    }
  };

  const t = (key, index) => {
    if (index !== undefined && key === 'steps') {
      return translations[selectedLanguage][key][index] || translations['en'][key][index];
    }
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

  return (
    <section id="how-it-works-section" className={styles.howItWorksSection}>
      {/* Particle Effects */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{t('title')}</h2>
        <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
      </div>
      {/* Main Content */}
      <div className={styles.stepsContainer}>
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepIcon}><FaUserGraduate /></div>
          <h3 className={styles.stepTitle}>{t('steps', 0).title}</h3>
          <p className={styles.stepDescription}>{t('steps', 0).description}</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepIcon}><FaStore /></div>
          <h3 className={styles.stepTitle}>{t('steps', 1).title}</h3>
          <p className={styles.stepDescription}>{t('steps', 1).description}</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepIcon}><FaChalkboardTeacher /></div>
          <h3 className={styles.stepTitle}>{t('steps', 2).title}</h3>
          <p className={styles.stepDescription}>{t('steps', 2).description}</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;