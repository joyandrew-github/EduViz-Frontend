import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from 'axios';

const LoginPage = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();

  const t = (key) => {
    const translations = {
      en: {
        welcomeBack: "Welcome Back to",
        signInContinue: "Sign in to continue your learning journey!",
        signInToEduViz: "Sign In to EduViz",
        welcomeSignIn: "Welcome back! Please sign in",
        emailAddress: "Email Address",
        enterEmail: "Enter your email address",
        password: "Password",
        enterPassword: "Enter your password",
        signIn: "Sign In",
        signingIn: "Signing In...",
        or: "OR",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
        loginSuccess: "Logged in successfully!"
      },
      ta: {
        welcomeBack: "மீண்டும் வரவேற்கிறோம்",
        signInContinue: "உங்கள் கற்றல் பயணத்தைத் தொடர உள்நுழையவும்!",
        signInToEduViz: "EduViz-இல் உள்நுழையவும்",
        welcomeSignIn: "மீண்டும் வரவேற்கிறோம்! உள்நுழையவும்",
        emailAddress: "மின்னஞ்சல் முகவரி",
        enterEmail: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        password: "கடவுச்சொல்",
        enterPassword: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
        signIn: "உள்நுழைய",
        signingIn: "உள்நுழைகிறது...",
        or: "அல்லது",
        noAccount: "கணக்கு இல்லையா?",
        signUp: "பதிவு செய்யவும்",
        loginSuccess: "வெற்றிகரமாக உள்நுழைந்தது!"
      },
      hi: {
        welcomeBack: "वापसी पर स्वागत है",
        signInContinue: "अपनी सीखने की यात्रा जारी रखने के लिए साइन इन करें!",
        signInToEduViz: "EduViz में साइन इन करें",
        welcomeSignIn: "वापसी पर स्वागत है! कृपया साइन इन करें",
        emailAddress: "ईमेल पता",
        enterEmail: "अपना ईमेल पता दर्ज करें",
        password: "पासवर्ड",
        enterPassword: "अपना पासवर्ड दर्ज करें",
        signIn: "साइन इन करें",
        signingIn: "साइन इन हो रहा है...",
        or: "या",
        noAccount: "खाता नहीं है?",
        signUp: "साइन अप करें",
        loginSuccess: "सफलतापूर्वक लॉग इन हो गया!"
      },
      de: {
        welcomeBack: "Willkommen zurück bei",
        signInContinue: "Melden Sie sich an, um Ihre Lernreise fortzusetzen!",
        signInToEduViz: "Bei EduViz anmelden",
        welcomeSignIn: "Willkommen zurück! Bitte melden Sie sich an",
        emailAddress: "E-Mail-Adresse",
        enterEmail: "Geben Sie Ihre E-Mail-Adresse ein",
        password: "Passwort",
        enterPassword: "Geben Sie Ihr Passwort ein",
        signIn: "Anmelden",
        signingIn: "Anmeldung läuft...",
        or: "ODER",
        noAccount: "Noch kein Konto?",
        signUp: "Registrieren",
        loginSuccess: "Erfolgreich angemeldet!"
      },
      ja: {
        welcomeBack: "おかえりなさい",
        signInContinue: "学習の旅を続けるにはサインインしてください！",
        signInToEduViz: "EduVizにサインイン",
        welcomeSignIn: "おかえりなさい！サインインしてください",
        emailAddress: "メールアドレス",
        enterEmail: "メールアドレスを入力してください",
        password: "パスワード",
        enterPassword: "パスワードを入力してください",
        signIn: "サインイン",
        signingIn: "サインイン中...",
        or: "または",
        noAccount: "アカウントをお持ちでない方は",
        signUp: "サインアップ",
        loginSuccess: "ログインに成功しました！"
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      // Store the token from login response
      const { token, user } = response.data;
      localStorage.setItem('token', token);

      setMessage(t('loginSuccess'));
      setTimeout(() => {
        console.log("User data:",user); // Log user data for debugging
        if (!user.role) {
          navigate("/RoleSelection"); // Redirect to role selection if no role
        } else {
          navigate(`/${user.role}`); // Redirect to dashboard if role exists
        }
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
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
                  {t('welcomeBack')} <span>EduViz</span>
                </h1>
                <p className={styles.signupSubtext}>
                  {t('signInContinue')}
                </p>
              </div>
              <div className={styles.signupFormContainer}>
                <div className={styles.formDecoration + " " + styles.formDecoration1} />
                <div className={styles.formDecoration + " " + styles.formDecoration2} />
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>{t('signInToEduViz')}</h2>
                  <p className={styles.formSubtitle}>{t('welcomeSignIn')}</p>
                </div>
                <form className={styles.signupForm} onSubmit={handleLogin}>
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
                      placeholder={t('enterPassword')}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.signupButton} disabled={loading}>
                    <span>{loading ? t('signingIn') : t('signIn')}</span>
                  </button>
                  {message && <div className={styles.successMessage}>{message}</div>}
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  <div className={styles.orDivider}>
                    <div className={styles.dividerLine} /><span className={styles.dividerText}>{t('or')}</span><div className={styles.dividerLine} />
                  </div>
                  <div className={styles.socialLogin}>
                    <button type="button" className={styles.socialButton} onClick={handleGoogleLogin}>
                      <span className={styles.socialIcon}>G</span>
                    </button>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>in</span>
                    </button>
                  </div>
                  <div className={styles.signinLink}>
                    {t('noAccount')} <a href="/signup">{t('signUp')}</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;