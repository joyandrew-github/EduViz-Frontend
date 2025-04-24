import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          quickLinks: 'Quick Links',
          home: 'Home',
          exploreModels: 'Explore Models',
          howItWorks: 'How It Works',
          pricing: 'Pricing',
          contactUs: 'Contact Us',
          forCreators: 'For Creators',
          becomeCreator: 'Become a Creator',
          creatorGuidelines: 'Creator Guidelines',
          creatorFAQ: 'Creator FAQ',
          resources: 'Resources',
          newsletter: 'Newsletter',
          subscribeText: 'Subscribe to get the latest updates on new models and features.',
          emailPlaceholder: 'Your email address',
          subscribe: 'Subscribe',
          allRightsReserved: 'All rights reserved.',
          termsOfService: 'Terms of Service',
          privacyPolicy: 'Privacy Policy'
        }
      },
      ta: {
        translation: {
          quickLinks: 'விரைவு இணைப்புகள்',
          home: 'முகப்பு',
          exploreModels: 'மாதிரிகளை ஆராயுங்கள்',
          howItWorks: 'இது எப்படி செயல்படுகிறது',
          pricing: 'விலை',
          contactUs: 'எங்களை தொடர்பு கொள்ள',
          forCreators: 'படைப்பாளர்களுக்கு',
          becomeCreator: 'படைப்பாளராகுங்கள்',
          creatorGuidelines: 'படைப்பாளர் வழிகாட்டுதல்கள்',
          creatorFAQ: 'படைப்பாளர் கேள்விகள்',
          resources: 'வளங்கள்',
          newsletter: 'செய்திமடல்',
          subscribeText: 'புதிய மாதிரிகள் மற்றும் அம்சங்கள் பற்றிய சமீபத்திய புதுப்பிப்புகளைப் பெற குழுசேரவும்.',
          emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரி',
          subscribe: 'குழுசேர்',
          allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
          termsOfService: 'சேவை விதிமுறைகள்',
          privacyPolicy: 'தனியுரிமைக் கொள்கை'
        }
      },
      hi: {
        translation: {
          quickLinks: 'त्वरित लिंक',
          home: 'होम',
          exploreModels: 'मॉडल एक्सप्लोर करें',
          howItWorks: 'यह कैसे काम करता है',
          pricing: 'मूल्य निर्धारण',
          contactUs: 'संपर्क करें',
          forCreators: 'निर्माताओं के लिए',
          becomeCreator: 'निर्माता बनें',
          creatorGuidelines: 'निर्माता दिशानिर्देश',
          creatorFAQ: 'निर्माता FAQ',
          resources: 'संसाधन',
          newsletter: 'न्यूज़लेटर',
          subscribeText: 'नए मॉडल और सुविधाओं के बारे में नवीनतम अपडेट प्राप्त करने के लिए सदस्यता लें।',
          emailPlaceholder: 'आपका ईमेल पता',
          subscribe: 'सदस्यता लें',
          allRightsReserved: 'सर्वाधिकार सुरक्षित।',
          termsOfService: 'सेवा की शर्तें',
          privacyPolicy: 'गोपनीयता नीति'
        }
      },
      de: {
        translation: {
          quickLinks: 'Schnelllinks',
          home: 'Startseite',
          exploreModels: 'Modelle erkunden',
          howItWorks: 'Wie es funktioniert',
          pricing: 'Preise',
          contactUs: 'Kontakt',
          forCreators: 'Für Ersteller',
          becomeCreator: 'Ersteller werden',
          creatorGuidelines: 'Ersteller-Richtlinien',
          creatorFAQ: 'Ersteller-FAQ',
          resources: 'Ressourcen',
          newsletter: 'Newsletter',
          subscribeText: 'Abonnieren Sie, um die neuesten Updates zu neuen Modellen und Funktionen zu erhalten.',
          emailPlaceholder: 'Ihre E-Mail-Adresse',
          subscribe: 'Abonnieren',
          allRightsReserved: 'Alle Rechte vorbehalten.',
          termsOfService: 'Nutzungsbedingungen',
          privacyPolicy: 'Datenschutzrichtlinie'
        }
      },
      ja: {
        translation: {
          quickLinks: 'クイックリンク',
          home: 'ホーム',
          exploreModels: 'モデルを探索',
          howItWorks: '使い方',
          pricing: '料金',
          contactUs: 'お問い合わせ',
          forCreators: 'クリエイター向け',
          becomeCreator: 'クリエイターになる',
          creatorGuidelines: 'クリエイターガイドライン',
          creatorFAQ: 'クリエイターFAQ',
          resources: 'リソース',
          newsletter: 'ニュースレター',
          subscribeText: '新しいモデルや機能に関する最新情報を受け取るには、購読してください。',
          emailPlaceholder: 'メールアドレス',
          subscribe: '購読',
          allRightsReserved: '全著作権所有。',
          termsOfService: '利用規約',
          privacyPolicy: 'プライバシーポリシー'
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 