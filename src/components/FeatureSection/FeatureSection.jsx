import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaCubes, FaLaptopCode, FaGraduationCap, FaTools, FaUniversity, FaIndustry } from 'react-icons/fa';
import styles from './Features.module.css';

// ModelViewerComponent (if you still need it separately)
const ModelViewerComponent = () => {
  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      import('@google/model-viewer');
    }
  }, []);

  return null; // We don't need to render anything here since we're using it in Swiper
};

const FeatureSection = () => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [modelLoading, setModelLoading] = useState(true);
  const [currentModelInfo, setCurrentModelInfo] = useState({
    title: 'Planetary System',
    description: 'Explore orbital mechanics and planetary motion in this interactive model'
  });

  const translations = {
    en: {
      title: "Immersive 3D Learning",
      subtitle: "Experience complex concepts through interactive visualization without expensive hardware",
      showcase: {
        title: "Interactive Exploration Engine",
        description: "Our WebGL-powered platform lets you manipulate realistic 3D models with intuitive controls. Dismantle complex structures, view cross-sections, and observe real-time simulations to truly understand how systems work at a molecular, mechanical, and computational level.",
        features: [
          "Advanced model manipulation with 6 degrees of freedom",
          "Real-time functional simulations with accurate physics",
          "Multi-layer cross-sectional visualization",
          "Interactive annotations with contextual information",
          "Progressive learning paths with adaptive difficulty"
        ],
        exploreButton: "Explore EduViz Technology"
      },
      cards: [
        {
          title: "High-Fidelity 3D Models",
          description: "Scientifically accurate models with industry-leading detail for astronomy, geology, and atmospheric visualization based on research-grade data."
        },
        {
          title: "Web-Based Immersion",
          description: "Experience VR-quality visualization without specialized hardware - our platform delivers advanced 3D rendering on any modern web browser with WebGL support."
        },
        {
          title: "Adaptive Learning Paths",
          description: "Follow personalized exploration sequences with interactive assessments, challenges, and progress tracking built around sophisticated 3D models."
        },
        {
          title: "Domain-Specific Tools",
          description: "Access specialized interaction tools for different disciplines - from astronomy to meteorology to planetary geology visualization."
        },
        {
          title: "Research-Grade Education",
          description: "Designed by educators and domain experts to make complex celestial concepts accessible with the same tools used in cutting-edge research labs."
        },
        {
          title: "Professional Applications",
          description: "Beyond education: our platform serves industrial clients with professional-grade visualization for satellite tracking, weather modeling, and space exploration."
        }
      ],
      metrics: {
        models: "Interactive 3D Models",
        simulations: "Advanced Simulations",
        compatibility: "Browser Compatibility",
        rating: "Educator Rating"
      }
    },
    ta: {
      title: "உள்ளடக்க 3D கற்றல்",
      subtitle: "விலையுயர்ந்த வன்பொருள் இல்லாமல் ஊடாடும் காட்சிப்படுத்தல் மூலம் சிக்கலான கருத்துக்களை அனுபவியுங்கள்",
      showcase: {
        title: "ஊடாடும் ஆய்வு இயந்திரம்",
        description: "எங்கள் WebGL-ஆல் இயக்கப்படும் தளம் உண்மையான 3D மாதிரிகளை எளிதான கட்டுப்பாடுகளுடன் கையாள அனுமதிக்கிறது. சிக்கலான கட்டமைப்புகளை பிரித்து, குறுக்குவெட்டுகளைப் பார்த்து, நேரடி சிமுலேஷன்களை கவனித்து அமைப்புகள் மூலக்கூறு, இயந்திர மற்றும் கணினி மட்டத்தில் எவ்வாறு செயல்படுகின்றன என்பதை உண்மையாகப் புரிந்துகொள்ளுங்கள்.",
        features: [
          "6 சுதந்திர டிகிரிகளுடன் மேம்பட்ட மாதிரி கையாளுதல்",
          "துல்லியமான இயற்பியலுடன் நேரடி செயல்பாட்டு சிமுலேஷன்கள்",
          "பல அடுக்கு குறுக்குவெட்டு காட்சிப்படுத்தல்",
          "சூழல் தகவலுடன் ஊடாடும் குறிப்புகள்",
          "தகவமைக்கப்பட்ட சிரமத்துடன் முன்னேற்ற கற்றல் பாதைகள்"
        ],
        exploreButton: "EduViz தொழில்நுட்பத்தை ஆராயுங்கள்"
      },
      cards: [
        {
          title: "உயர்-நம்பகத்தன்மை 3D மாதிரிகள்",
          description: "ஆராய்ச்சி-தர தரவின் அடிப்படையில் வானியல், புவியியல் மற்றும் வளிமண்டல காட்சிப்படுத்தலுக்கான தொழில்துறை முன்னணி விவரங்களுடன் அறிவியல் ரீதியாக துல்லியமான மாதிரிகள்."
        },
        {
          title: "வலை-அடிப்படையிலான உள்ளடக்கம்",
          description: "சிறப்பு வன்பொருள் இல்லாமல் VR-தர காட்சிப்படுத்தலை அனுபவிக்கவும் - எங்கள் தளம் WebGL ஆதரவுடன் எந்த நவீன வலை உலாவியிலும் மேம்பட்ட 3D ரெண்டரிங்கை வழங்குகிறது."
        },
        {
          title: "தகவமைக்கப்பட்ட கற்றல் பாதைகள்",
          description: "நுட்பமான 3D மாதிரிகளைச் சுற்றி கட்டமைக்கப்பட்ட ஊடாடும் மதிப்பீடுகள், சவால்கள் மற்றும் முன்னேற்ற கண்காணிப்புடன் தனிப்பயனாக்கப்பட்ட ஆய்வு வரிசைகளைப் பின்பற்றவும்."
        },
        {
          title: "துறை-குறிப்பிட்ட கருவிகள்",
          description: "வானியல் முதல் வானிலை ஆய்வு வரை புவியியல் காட்சிப்படுத்தல் வரை பல்வேறு துறைகளுக்கான சிறப்பு ஊடாடும் கருவிகளை அணுகவும்."
        },
        {
          title: "ஆராய்ச்சி-தர கல்வி",
          description: "நவீன ஆராய்ச்சி ஆய்வகங்களில் பயன்படுத்தப்படும் அதே கருவிகளுடன் சிக்கலான வானியல் கருத்துக்களை அணுகக்கூடியதாக மாற்ற கல்வியாளர்கள் மற்றும் துறை வல்லுநர்களால் வடிவமைக்கப்பட்டது."
        },
        {
          title: "தொழில்முறை பயன்பாடுகள்",
          description: "கல்விக்கு அப்பால்: எங்கள் தளம் செயற்கைக்கோள் கண்காணிப்பு, வானிலை மாதிரியாக்கம் மற்றும் விண்வெளி ஆய்வுக்கான தொழில்முறை-தர காட்சிப்படுத்தலுடன் தொழில்துறை வாடிக்கையாளர்களுக்கு சேவை செய்கிறது."
        }
      ],
      metrics: {
        models: "ஊடாடும் 3D மாதிரிகள்",
        simulations: "மேம்பட்ட சிமுலேஷன்கள்",
        compatibility: "உலாவி இணக்கத்தன்மை",
        rating: "கல்வியாளர் மதிப்பீடு"
      }
    },
    hi: {
      title: "इमर्सिव 3D लर्निंग",
      subtitle: "महंगे हार्डवेयर के बिना इंटरैक्टिव विजुअलाइजेशन के माध्यम से जटिल अवधारणाओं का अनुभव करें",
      showcase: {
        title: "इंटरैक्टिव एक्सप्लोरेशन इंजन",
        description: "हमारा WebGL-संचालित प्लेटफॉर्म आपको सहज नियंत्रणों के साथ यथार्थवादी 3D मॉडल को संभालने की अनुमति देता है। जटिल संरचनाओं को विघटित करें, क्रॉस-सेक्शन देखें, और रीयल-टाइम सिमुलेशन का निरीक्षण करें ताकि आप वास्तव में समझ सकें कि सिस्टम आणविक, यांत्रिक और कम्प्यूटेशनल स्तर पर कैसे काम करते हैं।",
        features: [
          "6 डिग्री ऑफ फ्रीडम के साथ उन्नत मॉडल मैनिपुलेशन",
          "सटीक भौतिकी के साथ रीयल-टाइम फंक्शनल सिमुलेशन",
          "मल्टी-लेयर क्रॉस-सेक्शनल विजुअलाइजेशन",
          "संदर्भगत जानकारी के साथ इंटरैक्टिव एनोटेशन",
          "अनुकूली कठिनाई के साथ प्रगतिशील लर्निंग पाथ"
        ],
        exploreButton: "EduViz टेक्नोलॉजी एक्सप्लोर करें"
      },
      cards: [
        {
          title: "हाई-फिडेलिटी 3D मॉडल्स",
          description: "खगोल विज्ञान, भूविज्ञान और वायुमंडलीय विजुअलाइजेशन के लिए अनुसंधान-ग्रेड डेटा पर आधारित उद्योग-अग्रणी विवरण के साथ वैज्ञानिक रूप से सटीक मॉडल।"
        },
        {
          title: "वेब-आधारित इमर्शन",
          description: "विशेष हार्डवेयर के बिना VR-गुणवत्ता वाले विजुअलाइजेशन का अनुभव करें - हमारा प्लेटफॉर्म WebGL समर्थन के साथ किसी भी आधुनिक वेब ब्राउज़र पर उन्नत 3D रेंडरिंग प्रदान करता है।"
        },
        {
          title: "अनुकूली लर्निंग पाथ",
          description: "परिष्कृत 3D मॉडल के आसपास निर्मित इंटरैक्टिव असेसमेंट, चुनौतियों और प्रगति ट्रैकिंग के साथ व्यक्तिगत एक्सप्लोरेशन सीक्वेंस का पालन करें।"
        },
        {
          title: "डोमेन-विशिष्ट टूल्स",
          description: "विभिन्न विषयों के लिए विशेष इंटरैクション टूल्स तक पहुंच - खगोल विज्ञान से मौसम विज्ञान तक ग्रहीय भूविज्ञान विजुअलाइजेशन।"
        },
        {
          title: "रिसर्च-ग्रेड एजुकेशन",
          description: "अत्याधुनिक अनुसंधान प्रयोगशालाओं में उपयोग किए जाने वाले समान उपकरणों के साथ जटिल खगोलीय अवधारणाओं को सुलभ बनाने के लिए शिक्षकों और डोमेन विशेषज्ञों द्वारा डिज़ाइन किया गया।"
        },
        {
          title: "प्रोफेशनल एप्लिकेशन्स",
          description: "शिक्षा से परे: हमारा प्लेटफॉर्म उपग्रह ट्रैकिंग, मौसम मॉडलिंग और अंतरिक्ष अन्वेषण के लिए प्रोफेशनल-ग्रेड विजुअलाइजेशन के साथ औद्योगिक ग्राहकों की सेवा करता है।"
        }
      ],
      metrics: {
        models: "इंटरैक्टिव 3D मॉडल्स",
        simulations: "उन्नत सिमुलेशन",
        compatibility: "ब्राउज़र कंपैटिबिलिटी",
        rating: "एजुकेटर रेटिंग"
      }
    },
    de: {
      title: "Immersives 3D-Lernen",
      subtitle: "Erleben Sie komplexe Konzepte durch interaktive Visualisierung ohne teure Hardware",
      showcase: {
        title: "Interaktive Erkundungs-Engine",
        description: "Unsere WebGL-gestützte Plattform ermöglicht es Ihnen, realistische 3D-Modelle mit intuitiven Steuerungen zu manipulieren. Zerlegen Sie komplexe Strukturen, betrachten Sie Querschnitte und beobachten Sie Echtzeit-Simulationen, um wirklich zu verstehen, wie Systeme auf molekularer, mechanischer und rechnerischer Ebene funktionieren.",
        features: [
          "Fortgeschrittene Modellmanipulation mit 6 Freiheitsgraden",
          "Echtzeit-Funktionssimulationen mit präziser Physik",
          "Mehrschichtige Querschnittsvisualisierung",
          "Interaktive Anmerkungen mit kontextuellen Informationen",
          "Progressive Lernpfade mit adaptiver Schwierigkeit"
        ],
        exploreButton: "EduViz-Technologie erkunden"
      },
      cards: [
        {
          title: "Hochauflösende 3D-Modelle",
          description: "Wissenschaftlich genaue Modelle mit branchenführenden Details für Astronomie, Geologie und atmosphärische Visualisierung basierend auf Forschungsdaten."
        },
        {
          title: "Webbasierte Immersion",
          description: "Erleben Sie VR-Qualitätsvisualisierung ohne spezielle Hardware - unsere Plattform bietet fortschrittliches 3D-Rendering auf jedem modernen Webbrowser mit WebGL-Unterstützung."
        },
        {
          title: "Adaptive Lernpfade",
          description: "Folgen Sie personalisierten Erkundungssequenzen mit interaktiven Bewertungen, Herausforderungen und Fortschrittsverfolgung, aufgebaut um ausgefeilte 3D-Modelle."
        },
        {
          title: "Domänenspezifische Werkzeuge",
          description: "Zugriff auf spezialisierte Interaktionswerkzeuge für verschiedene Disziplinen - von Astronomie bis Meteorologie zur planetarischen Geologievisualisierung."
        },
        {
          title: "Forschungsqualität-Bildung",
          description: "Von Pädagogen und Domänenexperten entwickelt, um komplexe Himmelkonzepte mit denselben Werkzeugen zugänglich zu machen, die in modernsten Forschungslaboren verwendet werden."
        },
        {
          title: "Professionelle Anwendungen",
          description: "Über die Bildung hinaus: Unsere Plattform bedient Industriekunden mit professioneller Visualisierung für Satellitenverfolgung, Wettermodellierung und Weltraumforschung."
        }
      ],
      metrics: {
        models: "Interaktive 3D-Modelle",
        simulations: "Fortgeschrittene Simulationen",
        compatibility: "Browser-Kompatibilität",
        rating: "Pädagogen-Bewertung"
      }
    },
    ja: {
      title: "没入型3D学習",
      subtitle: "高価なハードウェアなしでインタラクティブな視覚化を通じて複雑な概念を体験",
      showcase: {
        title: "インタラクティブ探索エンジン",
        description: "WebGLを活用したプラットフォームで、直感的な操作で現実的な3Dモデルを操作できます。複雑な構造を分解し、断面図を表示し、リアルタイムシミュレーションを観察して、分子レベル、機械レベル、計算レベルでシステムがどのように機能するかを真に理解できます。",
        features: [
          "6自由度の高度なモデル操作",
          "正確な物理演算によるリアルタイム機能シミュレーション",
          "マルチレイヤー断面視覚化",
          "文脈情報を含むインタラクティブな注釈",
          "適応的な難易度を持つ段階的な学習パス"
        ],
        exploreButton: "EduVizテクノロジーを探索"
      },
      cards: [
        {
          title: "高精細3Dモデル",
          description: "研究グレードのデータに基づく天文学、地質学、大気視覚化のための業界をリードする詳細な科学的に正確なモデル。"
        },
        {
          title: "ウェブベースの没入感",
          description: "特別なハードウェアなしでVRクオリティの視覚化を体験 - プラットフォームはWebGLサポートを備えた最新のウェブブラウザで高度な3Dレンダリングを提供します。"
        },
        {
          title: "適応型学習パス",
          description: "洗練された3Dモデルを中心に構築されたインタラクティブな評価、チャレンジ、進捗追跡を備えたパーソナライズされた探索シーケンスに従います。"
        },
        {
          title: "ドメイン固有ツール",
          description: "天文学から気象学、惑星地質学の視覚化まで、さまざまな分野に特化したインタラクションツールにアクセス。"
        },
        {
          title: "研究グレードの教育",
          description: "最先端の研究室で使用されているのと同じツールで複雑な天体概念にアクセスできるよう、教育者とドメインエキスパートによって設計。"
        },
        {
          title: "プロフェッショナルアプリケーション",
          description: "教育を超えて：衛星追跡、気象モデリング、宇宙探査のためのプロフェッショナルグレードの視覚化で産業クライアントにサービスを提供。"
        }
      ],
      metrics: {
        models: "インタラクティブ3Dモデル",
        simulations: "高度なシミュレーション",
        compatibility: "ブラウザ互換性",
        rating: "教育者評価"
      }
    }
  };

  const t = (key, index) => {
    const lang = translations[selectedLanguage];
    if (!lang) return '';
    
    if (index !== undefined) {
      return lang[key][index];
    }
    
    return lang[key];
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

  const modelShowcases = [
    {
      id: '1',
      modelSrc: '/public/model/cycle.glb',
      alt: 'Planetary System Model',
      title: 'Planetary System',
      description: 'Explore orbital mechanics and planetary motion in this interactive model'
    },
    {
      id: '2',
      modelSrc: '/public/model/Astronaut (3).glb',
      alt: 'Astronaut Model',
      title: 'Astronaut Exploration',
      description: 'Examine spacesuit design and functionality for extraterrestrial missions'
    },
    {
      id: '3',
      modelSrc: '/public/model/micro2.0.glb',
      alt: 'Molecular Structure Model',
      title: 'Molecular Structure',
      description: 'Visualize complex molecular bonds and atomic interactions in 3D space'
    },
    {
      id: '4',
      modelSrc: '/public/model/cycle.glb',
      alt: 'Atmospheric Simulation Model',
      title: 'Atmospheric Layers',
      description: 'Study atmospheric composition and weather pattern formation'
    }
  ];

  return (
    <section 
      id="features-section"
      className={styles.featuresSection} 
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        
        <div className={styles.featureShowcase}>
          <div className={styles.featureShowcaseContent}>
            <h3 className={styles.featureShowcaseTitle}>{t('showcase').title}</h3>
            <p className={styles.featureShowcaseDescription}>{t('showcase').description}</p>
            <ul className={styles.featureShowcaseList}>
              {t('showcase').features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Link to="/" className={styles.btnOutline}>
              {t('showcase').exploreButton}
            </Link>
          </div>
          <div className={styles.featureShowcaseImage}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => {
                setActiveModelIndex(swiper.activeIndex);
                setModelLoading(true);
                setCurrentModelInfo({
                  title: modelShowcases[swiper.activeIndex].title,
                  description: modelShowcases[swiper.activeIndex].description
                });
                setTimeout(() => setModelLoading(false), 1500);
              }}
              className={`${styles.featureSwiper} h-full w-full`}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
            >
              {modelShowcases.map((model, index) => (
                <SwiperSlide key={model.id}>
                  <div className={styles.featureImagePlaceholder}>
                    <div className={`${styles.modelProgress} ${modelLoading ? styles.loading : ''}`}></div>
                    <model-viewer
                      src={model.modelSrc}
                      alt={model.alt}
                      auto-rotate
                      camera-controls
                      shadow-intensity="1"
                      environment-image="neutral"
                      exposure="0.9"
                      style={{ width: '100%', height: '100%' }}
                      onLoad={() => index === activeModelIndex && setModelLoading(false)}
                    ></model-viewer>
                    <div className={styles.modelShowcase}>
                      <div className={styles.modelOverlay}>
                        <h4 className={styles.modelTitle}>{model.title}</h4>
                        <p className={styles.modelDescription}>{model.description}</p>
                        <div className={styles.modelControls}>
                          <button className={styles.modelButton}>Explore</button>
                          <button className={styles.modelButton}>Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        <div className={styles.featuresGrid}>
          {t('cards').map((card, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {index === 0 && <FaCubes />}
                {index === 1 && <FaLaptopCode />}
                {index === 2 && <FaGraduationCap />}
                {index === 3 && <FaTools />}
                {index === 4 && <FaUniversity />}
                {index === 5 && <FaIndustry />}
              </div>
              <h3 className={styles.featureTitle}>{card.title}</h3>
              <p className={styles.featureDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;