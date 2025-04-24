// components/TestimonialsSection/TestimonialsSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './TestimonialsSection.module.css';


const translations = {
  en: {
    title: "What Our Users Say",
    subtitle: "Discover how our platform is transforming education through 3D models and interactive learning",
    prevButton: "Previous",
    nextButton: "Next",
    testimonials: [
      {
        id: 1,
        name: "Joyandrew",
        role: "Medical Student",
        content: "The 3D models have revolutionized how I study anatomy. The detail and interactivity make complex structures easy to understand.",
        rating: 4,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 2,
        name: "Dhusyanth",
        role: "Engineering Student",
        content: "Being able to examine mechanical components from every angle has greatly improved my understanding of engineering principles.",
        rating: 2,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 3,
        name: "PraveenKumar",
        role: "Architecture Student",
        content: "The architectural models are incredibly detailed and accurate. They've become an essential part of my design process.",
        rating: 3,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 4,
        name: "Arjun",
        role: "Science Educator",
        content: "These 3D models have transformed how I teach science. My students are more engaged and grasp concepts faster.",
        rating: 8,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      }
    ]
  },
  ta: {
    title: "எங்கள் பயனர்கள் என்ன சொல்கிறார்கள்",
    subtitle: "எங்கள் தளம் கல்வியை எவ்வாறு மாற்றுகிறது என்பதைக் கண்டறியுங்கள்",
    prevButton: "முந்தைய",
    nextButton: "அடுத்து",
    testimonials: [
      {
        id: 1,
        name: "ஜாய் ஆண்ட்ரூ",
        role: "மருத்துவ மாணவர்",
        content: "3D மாதிரிகள் நான் உடற்கூறியலை படிக்கும் விதத்தை புரட்சிகரமாக மாற்றியுள்ளன. விரிவான மற்றும் ஊடாடும் தன்மை சிக்கலான கட்டமைப்புகளை புரிந்துகொள்ள எளிதாக்குகிறது.",
        rating: 4,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 2,
        name: "துஷ்யந்த்",
        role: "பொறியியல் மாணவர்",
        content: "இயந்திர கூறுகளை ஒவ்வொரு கோணத்திலிருந்தும் ஆராய முடிவது பொறியியல் கோட்பாடுகளைப் புரிந்துகொள்வதை மேம்படுத்தியுள்ளது.",
        rating: 6,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 3,
        name: "பிரவீன்குமார்",
        role: "கட்டிடக்கலை மாணவர்",
        content: "கட்டிடக்கலை மாதிரிகள் மிகவும் விரிவானவை மற்றும் துல்லியமானவை. அவை எனது வடிவமைப்பு செயல்முறையின் அத்தியாவசிய பகுதியாக மாறிவிட்டன.",
        rating: 4,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 4,
        name: "அர்ஜுன்",
        role: "அறிவியல் ஆசிரியர்",
        content: "இந்த 3D மாடல்கள் நான் அறிவியலை கற்பிக்கும் விதத்தை மாற்றியுள்ளன. என் மாணவர்கள் அதிக ஈடுபாடு கொண்டுள்ளனர் மற்றும் கருத்துக்களை வேகமாக புரிந்துகொள்கின்றனர்.",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      }
    ]
  },
  hi: {
    title: "हमारे उपयोगकर्ता क्या कहते हैं",
    subtitle: "जानें कैसे हमारा प्लेटफॉर्म शिक्षा को बदल रहा है",
    prevButton: "पिछला",
    nextButton: "अगला",
    testimonials: [
      {
        id: 1,
        name: "जॉयएंड्रयू",
        role: "मेडिकल छात्र",
        content: "3डी मॉडल ने शरीर रचना विज्ञान को पढ़ने के तरीके में क्रांति ला दी है। विवरण और इंटरैक्टिविटी जटिल संरचनाओं को समझने में आसान बनाते हैं।",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 2,
        name: "धुष्यंत",
        role: "इंजीनियरिंग छात्र",
        content: "मैकेनिकल कंपोनेंट्स को हर एंगल से एग्जामिन करने की क्षमता ने इंजीनियरिंग प्रिंसिपल्स की मेरी समझ को बेहतर बनाया है।",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 3,
        name: "प्रवीण कुमार",
        role: "आर्किटेक्चर छात्र",
        content: "आर्किटेक्चरल मॉडल्स अविश्वसनीय रूप से विस्तृत और सटीक हैं। वे मेरी डिज़ाइन प्रक्रिया का एक आवश्यक हिस्सा बन गए हैं।",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 4,
        name: "अर्जुन",
        role: "विज्ञान शिक्षक",
        content: "इन 3डी मॉडल्स ने विज्ञान पढ़ाने के मेरे तरीके को बदल दिया है। मेरे छात्र अधिक संलग्न हैं और अवधारणाओं को तेजी से समझते हैं।",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      }
    ]
  },
  de: {
    title: "Was unsere Nutzer sagen",
    subtitle: "Entdecken Sie, wie unsere Plattform die Bildung verändert",
    prevButton: "Zurück",
    nextButton: "Weiter",
    testimonials: [
      {
        id: 1,
        name: "Joyandrew",
        role: "Medizinstudent",
        content: "Die 3D-Modelle haben revolutioniert, wie ich Anatomie studiere. Die Details und Interaktivität machen komplexe Strukturen leicht verständlich.",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 2,
        name: "Dhusyanth",
        role: "Ingenieurstudent",
        content: "Die Möglichkeit, mechanische Komponenten aus jedem Winkel zu untersuchen, hat mein Verständnis für technische Prinzipien stark verbessert.",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 3,
        name: "PraveenKumar",
        role: "Architekturstudent",
        content: "Die Architekturmodelle sind unglaublich detailliert und präzise. Sie sind zu einem wesentlichen Teil meines Designprozesses geworden.",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 4,
        name: "Arjun",
        role: "Wissenschaftslehrer",
        content: "Diese 3D-Modelle haben die Art und Weise, wie ich Wissenschaft unterrichte, verändert. Meine Schüler sind engagierter und verstehen Konzepte schneller.",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      }
    ]
  },
  ja: {
    title: "ユーザーの声",
    subtitle: "私たちのプラットフォームが教育をどのように変革しているかをご覧ください",
    prevButton: "前へ",
    nextButton: "次へ",
    testimonials: [
      {
        id: 1,
        name: "ジョイアンドリュー",
        role: "医学生",
        content: "3Dモデルは解剖学の学習方法を革新的に変えました。詳細な情報とインタラクティブ性により、複雑な構造を理解しやすくなりました。",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 2,
        name: "ドゥシャント",
        role: "工学生",
        content: "機械部品をあらゆる角度から検証できる機能により、工学原理の理解が大幅に向上しました。",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 3,
        name: "プラヴィーンクマール",
        role: "建築学生",
        content: "建築モデルは信じられないほど詳細で正確です。デザインプロセスに不可欠な要素となっています。",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      },
      {
        id: 4,
        name: "アルジュン",
        role: "理科教師",
        content: "これらの3Dモデルは、私の科学の教え方を変えました。生徒たちはより積極的に参加し、概念をより速く理解しています。",
        rating: 5,
        avatar: "https://portfolio-response-d767c.web.app/Developer.avif"
      }
    ]
  }
};

const TestimonialsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'en';
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);
  const testimonials = translations[currentLanguage]?.testimonials || translations.en.testimonials;

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('preferredLanguage');
      if (newLanguage && translations[newLanguage]) {
        setCurrentLanguage(newLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleLanguageChange);
    return () => window.removeEventListener('localStorageChange', handleLanguageChange);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const play = () => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    autoPlayRef.current = play;
  }, [isPaused, testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoPlayRef.current();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (trackRef.current) {
      const translateX = -currentIndex * 100;
      trackRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  const currentTranslation = translations[currentLanguage] || translations.en;

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{currentTranslation.title}</h2>
        <p className={styles.subtitle}>{currentTranslation.subtitle}</p>
        </div>
  
      <div 
        className={styles.sliderContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}  // Fixed template literal syntax
          onClick={handlePrevSlide}
          aria-label={currentTranslation.prevButton}
        >
          ←
        </button>
  
        <div className={styles.sliderWindow}>
          <div ref={trackRef} className={styles.sliderTrack}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`${styles.testimonialCard} ${index === currentIndex ? styles.active : ''}`}  // Fixed template literal syntax
              >
            <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>{testimonial.content}</p>
                  <div className={styles.testimonialProfile}>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className={styles.testimonialAvatar}
                    />
                    <h3 className={styles.testimonialName}>{testimonial.name}</h3>
                    <p className={styles.testimonialRole}>{testimonial.role}</p>
                    <div className={styles.rating}>
                      {'⭐'.repeat(testimonial.rating)}
            </div>
          </div>
                </div>
              </div>
            ))}
                </div>
              </div>
  
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}  // Fixed template literal syntax
          onClick={handleNextSlide}
          aria-label={currentTranslation.nextButton}
        >
          →
        </button>
  
        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}  // Already correct
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;