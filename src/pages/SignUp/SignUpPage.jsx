import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from 'axios';

const SignUpPage = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    termsAgree: false,
  });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();

  const t = (key) => {
    const translations = {
      en: {
        joinEduViz: "Join EduViz and Elevate Your Learning",
        accessCourses: "Access high-quality courses, interactive content, and expert guidance.",
        unlimitedAccess: "Unlimited Course Access",
        unlimitedDesc: "Get access to a variety of courses in different domains.",
        personalizedLearning: "Personalized Learning Paths",
        personalizedDesc: "Customize your learning experience with AI-driven recommendations.",
        careerTraining: "Career-Oriented Training",
        careerDesc: "Gain skills that help you land jobs and internships.",
        createAccount: "Create Your EduViz Account",
        startLearning: "Start learning today",
        fullName: "Full Name",
        enterFullName: "Enter your full name",
        emailAddress: "Email Address",
        enterEmail: "Enter your email address",
        password: "Password",
        createPassword: "Create a strong password",
        agreeTerms: "I agree to the",
        termsService: "Terms of Service",
        and: "and",
        privacyPolicy: "Privacy Policy",
        sendingOtp: "Sending OTP...",
        sendOtp: "Send OTP",
        or: "OR",
        haveAccount: "Already have an account?",
        signIn: "Sign in",
        verificationCode: "Enter Verification Code",
        enterCode: "Enter the code sent to your email",
        verifying: "Verifying...",
        verifyOtp: "Verify OTP",
        backToSignUp: "Back to Sign Up",
        otpSuccess: "OTP sent successfully! Please check your email.",
        accountSuccess: "Account created successfully!",
        emailRequired: "Please enter your email address",
        termsRequired: "You must agree to the Terms of Service and Privacy Policy"
      },
      ta: {
        joinEduViz: "EduViz-இல் சேர்ந்து உங்கள் கற்றலை உயர்த்துங்கள்",
        accessCourses: "உயர்தர பாடங்கள், ஊடாடும் உள்ளடக்கம் மற்றும் நிபுணர் வழிகாட்டுதலை அணுகவும்.",
        unlimitedAccess: "வரம்பற்ற பாடநெறி அணுகல்",
        unlimitedDesc: "பல்வேறு துறைகளில் பல்வேறு பாடங்களை அணுகவும்.",
        personalizedLearning: "தனிப்பயனாக்கப்பட்ட கற்றல் பாதைகள்",
        personalizedDesc: "AI உந்துதல் பரிந்துரைகளுடன் உங்கள் கற்றல் அனுபவத்தை தனிப்பயனாக்கவும்.",
        careerTraining: "வேலைவாய்ப்பு சார்ந்த பயிற்சி",
        careerDesc: "வேலைகள் மற்றும் பயிற்சிகளைப் பெற உதவும் திறன்களைப் பெறுங்கள்.",
        createAccount: "உங்கள் EduViz கணக்கை உருவாக்கவும்",
        startLearning: "இன்றே கற்க தொடங்குங்கள்",
        fullName: "முழு பெயர்",
        enterFullName: "உங்கள் முழு பெயரை உள்ளிடவும்",
        emailAddress: "மின்னஞ்சல் முகவரி",
        enterEmail: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        password: "கடவுச்சொல்",
        createPassword: "வலுவான கடவுச்சொல்லை உருவாக்கவும்",
        agreeTerms: "நான் ஒப்புக்கொள்கிறேன்",
        termsService: "சேவை விதிமுறைகள்",
        and: "மற்றும்",
        privacyPolicy: "தனியுரிமைக் கொள்கை",
        sendingOtp: "OTP அனுப்புகிறது...",
        sendOtp: "OTP அனுப்பு",
        or: "அல்லது",
        haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
        signIn: "உள்நுழைய",
        verificationCode: "சரிபார்ப்பு குறியீட்டை உள்ளிடவும்",
        enterCode: "உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்",
        verifying: "சரிபார்க்கிறது...",
        verifyOtp: "OTP-ஐ சரிபார்க்கவும்",
        backToSignUp: "பதிவுக்கு திரும்பவும்",
        otpSuccess: "OTP வெற்றிகரமாக அனுப்பப்பட்டது! உங்கள் மின்னஞ்சலை சரிபார்க்கவும்.",
        accountSuccess: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!",
        emailRequired: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        termsRequired: "சேவை விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஒப்புக்கொள்ள வேண்டும்"
      },
      hi: {
        joinEduViz: "EduViz में शामिल हों और अपनी सीखने की क्षमता बढ़ाएं",
        accessCourses: "उच्च गुणवत्ता वाले पाठ्यक्रम, इंटरैक्टिव सामग्री और विशेषज्ञ मार्गदर्शन प्राप्त करें।",
        unlimitedAccess: "असीमित पाठ्यक्रम पहुंच",
        unlimitedDesc: "विभिन्न डोमेन में विभिन्न पाठ्यक्रमों तक पहुंच प्राप्त करें।",
        personalizedLearning: "व्यक्तिगत सीखने के मार्ग",
        personalizedDesc: "AI-संचालित सिफारिशों के साथ अपने सीखने के अनुभव को अनुकूलित करें।",
        careerTraining: "करियर-उन्मुख प्रशिक्षण",
        careerDesc: "नौकरियां और इंटर्नशिप पाने में मदद करने वाले कौशल प्राप्त करें।",
        createAccount: "अपना EduViz खाता बनाएं",
        startLearning: "आज ही सीखना शुरू करें",
        fullName: "पूरा नाम",
        enterFullName: "अपना पूरा नाम दर्ज करें",
        emailAddress: "ईमेल पता",
        enterEmail: "अपना ईमेल पता दर्ज करें",
        password: "पासवर्ड",
        createPassword: "एक मजबूत पासवर्ड बनाएं",
        agreeTerms: "मैं सहमत हूं",
        termsService: "सेवा की शर्तें",
        and: "और",
        privacyPolicy: "गोपनीयता नीति",
        sendingOtp: "OTP भेजा जा रहा है...",
        sendOtp: "OTP भेजें",
        or: "या",
        haveAccount: "पहले से खाता है?",
        signIn: "साइन इन करें",
        verificationCode: "सत्यापन कोड दर्ज करें",
        enterCode: "अपने ईमेल पर भेजा गया कोड दर्ज करें",
        verifying: "सत्यापित किया जा रहा है...",
        verifyOtp: "OTP सत्यापित करें",
        backToSignUp: "साइन अप पर वापस जाएं",
        otpSuccess: "OTP सफलतापूर्वक भेजा गया! कृपया अपना ईमेल जांचें।",
        accountSuccess: "खाता सफलतापूर्वक बनाया गया!",
        emailRequired: "कृपया अपना ईमेल पता दर्ज करें",
        termsRequired: "आपको सेवा की शर्तों और गोपनीयता नीति से सहमत होना होगा"
      },
      de: {
        joinEduViz: "Treten Sie EduViz bei und steigern Sie Ihr Lernen",
        accessCourses: "Zugang zu hochwertigen Kursen, interaktiven Inhalten und Expertenberatung.",
        unlimitedAccess: "Unbegrenzter Kurszugang",
        unlimitedDesc: "Erhalten Sie Zugang zu verschiedenen Kursen in unterschiedlichen Bereichen.",
        personalizedLearning: "Personalisierte Lernpfade",
        personalizedDesc: "Passen Sie Ihre Lernerfahrung mit KI-gesteuerten Empfehlungen an.",
        careerTraining: "Karriereorientierte Ausbildung",
        careerDesc: "Erwerben Sie Fähigkeiten, die Ihnen bei der Jobsuche und Praktika helfen.",
        createAccount: "Erstellen Sie Ihr EduViz-Konto",
        startLearning: "Beginnen Sie heute mit dem Lernen",
        fullName: "Vollständiger Name",
        enterFullName: "Geben Sie Ihren vollständigen Namen ein",
        emailAddress: "E-Mail-Adresse",
        enterEmail: "Geben Sie Ihre E-Mail-Adresse ein",
        password: "Passwort",
        createPassword: "Erstellen Sie ein sicheres Passwort",
        agreeTerms: "Ich stimme zu den",
        termsService: "Nutzungsbedingungen",
        and: "und der",
        privacyPolicy: "Datenschutzerklärung",
        sendingOtp: "OTP wird gesendet...",
        sendOtp: "OTP senden",
        or: "ODER",
        haveAccount: "Haben Sie bereits ein Konto?",
        signIn: "Anmelden",
        verificationCode: "Bestätigungscode eingeben",
        enterCode: "Geben Sie den an Ihre E-Mail gesendeten Code ein",
        verifying: "Überprüfung...",
        verifyOtp: "OTP überprüfen",
        backToSignUp: "Zurück zur Registrierung",
        otpSuccess: "OTP erfolgreich gesendet! Bitte überprüfen Sie Ihre E-Mail.",
        accountSuccess: "Konto erfolgreich erstellt!",
        emailRequired: "Bitte geben Sie Ihre E-Mail-Adresse ein",
        termsRequired: "Sie müssen den Nutzungsbedingungen und der Datenschutzerklärung zustimmen"
      },
      ja: {
        joinEduViz: "EduVizに参加して学習を向上させましょう",
        accessCourses: "高品質のコース、インタラクティブなコンテンツ、専門家のガイダンスにアクセス。",
        unlimitedAccess: "無制限のコースアクセス",
        unlimitedDesc: "様々な分野の多様なコースにアクセスできます。",
        personalizedLearning: "パーソナライズされた学習パス",
        personalizedDesc: "AI駆動の推奨事項で学習体験をカスタマイズ。",
        careerTraining: "キャリア指向のトレーニング",
        careerDesc: "就職やインターンシップに役立つスキルを習得。",
        createAccount: "EduVizアカウントを作成",
        startLearning: "今日から学習を始めましょう",
        fullName: "氏名",
        enterFullName: "氏名を入力してください",
        emailAddress: "メールアドレス",
        enterEmail: "メールアドレスを入力してください",
        password: "パスワード",
        createPassword: "強力なパスワードを作成してください",
        agreeTerms: "私は同意します",
        termsService: "利用規約",
        and: "および",
        privacyPolicy: "プライバシーポリシー",
        sendingOtp: "OTPを送信中...",
        sendOtp: "OTPを送信",
        or: "または",
        haveAccount: "すでにアカウントをお持ちですか？",
        signIn: "サインイン",
        verificationCode: "確認コードを入力",
        enterCode: "メールに送信されたコードを入力してください",
        verifying: "確認中...",
        verifyOtp: "OTPを確認",
        backToSignUp: "サインアップに戻る",
        otpSuccess: "OTPが正常に送信されました！メールをご確認ください。",
        accountSuccess: "アカウントが正常に作成されました！",
        emailRequired: "メールアドレスを入力してください",
        termsRequired: "利用規約とプライバシーポリシーに同意する必要があります"
      }
    };
    return translations[selectedLanguage][key];
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('preferredLanguage');
      if (newLanguage) {
        setSelectedLanguage(newLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('localStorageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    // Particle animation code (unchanged)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const connections = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.6 + Math.random() * 0.3,
      });
    }

    for (let i = 0; i < 20; i++) {
      const startIndex = Math.floor(Math.random() * particles.length);
      const endIndex = Math.floor(Math.random() * particles.length);
      connections.push({
        start: startIndex,
        end: endIndex,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((connection) => {
        const start = particles[connection.start];
        const end = particles[connection.end];
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, `rgba(174, 109, 242, ${connection.opacity})`);
        gradient.addColorStop(1, "rgba(174, 109, 242, 0)");
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(174, 109, 242, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError(t('emailRequired'));
      return;
    }
    if (!formData.termsAgree) {
      setError(t('termsRequired'));
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-otp`, {
        email: formData.email,
      });
      setMessage(t('otpSuccess'));
      setShowOtpInput(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-otp`, {
        email: formData.email,
        otp,
      });

      const signupResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Store the token from signup response
      const { token } = signupResponse.data;
      localStorage.setItem('token', token);

      setMessage(t('accountSuccess'));
      setTimeout(() => {
        navigate("/RoleSelection");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to verify OTP or signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "https://eduviz-backend-1.onrender.com";
    if (!apiUrl) {
      console.error("API URL is not configured");
      alert("Configuration error. Please try again later.");
      return;
    }
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className={styles.signupRoot}>
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <div className={styles.modelBackground}>
            <canvas ref={canvasRef} className={styles.particlesCanvas}></canvas>
            <div className={styles.modelGrid}></div>
          </div>
          <div className={styles.signupOverlay} />
          <div className={styles.signupContentWrapper}>
            <div className={styles.signupContent}>
              <div className={styles.signupInfo}>
                <div className={styles.signupLogo}>
                  <div className={styles.logoIcon}><span>EV</span></div>
                  EduViz
                </div>
                <h1 className={styles.signupHeadline}>
                  {t('joinEduViz')}
                </h1>
                <p className={styles.signupSubtext}>
                  {t('accessCourses')}
                </p>
                <div className={styles.signupFeatures}>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>📚</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        {t('unlimitedAccess')}
                      </h3>
                      <p className={styles.featurePointDescription}>
                        {t('unlimitedDesc')}
                      </p>
                    </div>
                  </div>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>🎯</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        {t('personalizedLearning')}
                      </h3>
                      <p className={styles.featurePointDescription}>
                        {t('personalizedDesc')}
                      </p>
                    </div>
                  </div>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>💼</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        {t('careerTraining')}
                      </h3>
                      <p className={styles.featurePointDescription}>
                        {t('careerDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.signupFormContainer}>
                <div className={`${styles.formDecoration} ${styles.formDecoration1}`} />
                <div className={`${styles.formDecoration} ${styles.formDecoration2}`} />
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>{t('createAccount')}</h2>
                  <p className={styles.formSubtitle}>{t('startLearning')}</p>
                </div>
                {!showOtpInput ? (
                  <form className={styles.signupForm} onSubmit={handleSendOTP}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="fullName">{t('fullName')}</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t('enterFullName')}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="email">{t('emailAddress')}</label>
                      <input
                        type="email"
                        className={styles.formControl}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('enterEmail')}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="password">{t('password')}</label>
                      <input
                        type="password"
                        className={styles.formControl}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t('createPassword')}
                        required
                      />
                    </div>
                    <div className={styles.formCheckbox}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        id="termsAgree"
                        name="termsAgree"
                        checked={formData.termsAgree}
                        onChange={handleInputChange}
                        required
                      />
                      <label className={styles.checkboxLabel} htmlFor="termsAgree">
                        {t('agreeTerms')} <a href="#">{t('termsService')}</a> {t('and')} <a href="#">{t('privacyPolicy')}</a>
                      </label>
                    </div>
                    <button type="submit" className={styles.signupButton} disabled={loading}>
                      <span>{loading ? t('sendingOtp') : t('sendOtp')}</span>
                    </button>
                    {message && <div className={styles.successMessage}>{message}</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <div className={styles.orDivider}>
                      <div className={styles.dividerLine} /><span className={styles.dividerText}>{t('or')}</span><div className={styles.dividerLine} />
                    </div>
                    <div className={styles.socialLogin}>
                      <button type="button" className={styles.socialButton} onClick={handleGoogleSignUp}>
                        <span className={styles.socialIcon}>G</span>
                      </button>
                      <button type="button" className={styles.socialButton}>
                        <span className={styles.socialIcon}>in</span>
                      </button>
                    </div>
                    <div className={styles.signinLink}>
                      {t('haveAccount')} <a href="/login">{t('signIn')}</a>
                    </div>
                  </form>
                ) : (
                  <form className={styles.signupForm} onSubmit={handleVerifyOTP}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="otp">{t('verificationCode')}</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder={t('enterCode')}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.signupButton} disabled={loading}>
                      <span>{loading ? t('verifying') : t('verifyOtp')}</span>
                    </button>
                    {message && <div className={styles.successMessage}>{message}</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <div className={styles.signinLink}>
                      <button
                        type="button"
                        onClick={() => { setShowOtpInput(false); setOtp(''); setMessage(''); setError(''); }}
                        className={styles.backButton}
                      >
                        {t('backToSignUp')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;