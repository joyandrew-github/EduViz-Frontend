import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";
import axios from "axios"; // Added for API calls

const RoleSelection = () => {
  const canvasRef = useRef(null);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(false); // Added for loading state
  const [error, setError] = useState(''); // Added for error state
  const navigate = useNavigate();

  const t = (key) => {
    const translations = {
      en: {
        chooseLearning: "Choose Your Learning Journey",
        selectRole: "Select your role to personalized your EduViz experience",
        student: "Student",
        teacher: "Teacher",
        studentDesc: "Access courses, track your progress, and engage with interactive learning materials.",
        teacherDesc: "Create courses, manage classrooms, and track student performance.",
        studentFeatures: [
          "Personalized learning paths",
          "Progress tracking dashboard",
          "Connect with peers"
        ],
        teacherFeatures: [
          "Course creation tools",
          "Student analytics dashboard",
          "Assessment generator"
        ],
        continueAsStudent: "Continue as Student",
        continueAsTeacher: "Continue as Teacher",
        notSure: "Not sure which role to choose?",
        learnMore: "Learn more about roles",
        roleSuccess: "Role selected successfully!",
        roleError: "Failed to select role. Please try again."
      },
      ta: {
        chooseLearning: "உங்கள் கற்றல் பயணத்தைத் தேர்வு செய்யவும்",
        selectRole: "உங்கள் EduViz அனுபவத்தை தனிப்பயனாக்க உங்கள் பங்கை தேர்ந்தெடுக்கவும்",
        student: "மாணவர்",
        teacher: "ஆசிரியர்",
        studentDesc: "பாடங்களை அணுகவும், உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும், ஊடாடும் கற்றல் பொருட்களுடன் ஈடுபடவும்.",
        teacherDesc: "பாடங்களை உருவாக்கவும், வகுப்பறைகளை நிர்வகிக்கவும், மாணவர் செயல்திறனைக் கண்காணிக்கவும்.",
        studentFeatures: [
          "தனிப்பயனாக்கப்பட்ட கற்றல் பாதைகள்",
          "முன்னேற்ற கண்காணிப்பு டாஷ்போர்டு",
          "சக மாணவர்களுடன் இணைக்கவும்"
        ],
        teacherFeatures: [
          "பாடத்திட்ட உருவாக்க கருவிகள்",
          "மாணவர் பகுப்பாய்வு டாஷ்போர்டு",
          "மதிப்பீடு உருவாக்கி"
        ],
        continueAsStudent: "மாணவராக தொடரவும்",
        continueAsTeacher: "ஆசிரியராக தொடரவும்",
        notSure: "எந்த பங்கைத் தேர்வு செய்வது என்று தெரியவில்லையா?",
        learnMore: "பங்குகள் பற்றி மேலும் அறிக",
        roleSuccess: "பங்கு வெற்றிகரமாக தேர்ந்தெடுக்கப்பட்டது!",
        roleError: "பங்கைத் தேர்ந்தெடுக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்."
      },
      hi: {
        chooseLearning: "अपनी सीखने की यात्रा चुनें",
        selectRole: "अपने EduViz अनुभव को वैयक्तिकृत करने के लिए अपनी भूमिका चुनें",
        student: "छात्र",
        teacher: "शिक्षक",
        studentDesc: "पाठ्यक्रमों तक पहुंचें, अपनी प्रगति को ट्रैक करें, और इंटरैक्टिव लर्निंग सामग्री के साथ जुड़ें।",
        teacherDesc: "पाठ्यक्रम बनाएं, कक्षाओं का प्रबंधन करें, और छात्र प्रदर्शन को ट्रैक करें।",
        studentFeatures: [
          "व्यक्तिगत सीखने के मार्ग",
          "प्रगति ट्रैकिंग डैशबोर्ड",
          "साथियों से जुड़ें"
        ],
        teacherFeatures: [
          "पाठ्यक्रम निर्माण उपकरण",
          "छात्र विश्लेषण डैशबोर्ड",
          "मूल्यांकन जनरेटर"
        ],
        continueAsStudent: "छात्र के रूप में जारी रखें",
        continueAsTeacher: "शिक्षक के रूप में जारी रखें",
        notSure: "कौन सी भूमिका चुनें, यह तय नहीं कर पा रहे?",
        learnMore: "भूमिकाओं के बारे में और जानें",
        roleSuccess: "भूमिका सफलतापूर्वक चुनी गई!",
        roleError: "भूमिका चुनने में विफल। कृपया पुनः प्रयास करें।"
      },
      de: {
        chooseLearning: "Wählen Sie Ihre Lernreise",
        selectRole: "Wählen Sie Ihre Rolle, um Ihr EduViz-Erlebnis zu personalisieren",
        student: "Student",
        teacher: "Lehrer",
        studentDesc: "Greifen Sie auf Kurse zu, verfolgen Sie Ihren Fortschritt und nutzen Sie interaktive Lernmaterialien.",
        teacherDesc: "Erstellen Sie Kurse, verwalten Sie Klassenräume und verfolgen Sie die Leistung der Schüler.",
        studentFeatures: [
          "Personalisierte Lernpfade",
          "Fortschrittsverfolgung-Dashboard",
          "Mit Gleichgesinnten verbinden"
        ],
        teacherFeatures: [
          "Kurs-Erstellungswerkzeuge",
          "Schüleranalyse-Dashboard",
          "Bewertungsgenerator"
        ],
        continueAsStudent: "Als Student fortfahren",
        continueAsTeacher: "Als Lehrer fortfahren",
        notSure: "Nicht sicher, welche Rolle Sie wählen sollen?",
        learnMore: "Mehr über Rollen erfahren",
        roleSuccess: "Rolle erfolgreich ausgewählt!",
        roleError: "Rolle konnte nicht ausgewählt werden. Bitte versuchen Sie es erneut."
      },
      ja: {
        chooseLearning: "学習の旅を選択",
        selectRole: "EduVizでの体験をカスタマイズするためにロールを選択してください",
        student: "学生",
        teacher: "教師",
        studentDesc: "コースにアクセスし、進捗状況を追跡し、インタラクティブな学習教材に取り組みます。",
        teacherDesc: "コースを作成し、教室を管理し、学生のパフォーマンスを追跡します。",
        studentFeatures: [
          "パーソナライズされた学習パス",
          "進捗追跡ダッシュボード",
          "仲間とつながる"
        ],
        teacherFeatures: [
          "コース作成ツール",
          "学生分析ダッシュボード",
          "評価ジェネレーター"
        ],
        continueAsStudent: "学生として続ける",
        continueAsTeacher: "教師として続ける",
        notSure: "どの役割を選ぶか迷っていますか？",
        learnMore: "役割について詳しく知る",
        roleSuccess: "ロールが正常に選択されました！",
        roleError: "ロールの選択に失敗しました。もう一度お試しください。"
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
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
        gradient.addColorStop(0, `rgba(123, 44, 191, ${connection.opacity})`);
        gradient.addColorStop(1, "rgba(123, 44, 191, 0)");
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
        ctx.fillStyle = `rgba(123, 44, 191, ${particle.opacity})`;
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

  const handleMouseEnter = useCallback((role) => setHoveredRole(role), []);
  const handleMouseLeave = useCallback(() => setHoveredRole(null), []);

  const handleRoleSelection = async (role) => {
    setLoading(true);
    setError("");
  
    const backendRole = role === "student" ? "learner" : "instructor";
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("No authentication token found. Please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/select-role`,
        { role: backendRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const { token: newToken } = response.data;
      localStorage.setItem("token", newToken);
  
      alert(t("roleSuccess"));
      navigate(backendRole === "learner" ? "/learner" : "/instructor");
    } catch (err) {
      setError(t("roleError"));
      console.error("Role selection error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="RoleSection">
      <div
        className={`role-selection-page ${
          hoveredRole === "student"
            ? "student-hovered"
            : hoveredRole === "teacher"
            ? "teacher-hovered"
            : ""
        }`}
      >
        <div className="model-background">
          <canvas ref={canvasRef} className="particles-canvas"></canvas>
          <div className="model-grid" />
        </div>

        <div className="role-selection-overlay" />

        <div className="role-selection-container">
          <div className="logo-container">
            <div className="logo-icon">
              <span>EV</span>
            </div>
            <div className="logo-text">EduViz</div>
          </div>

          <h1 className="selection-title">{t('chooseLearning')}</h1>
          <p className="selection-subtitle">{t('selectRole')}</p>

          <div className="roles-container">
            <div
              className={`role-card ${hoveredRole === "student" ? "hovered" : ""}`}
              onMouseEnter={() => handleMouseEnter("student")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="role-icon">👨‍🎓</div>
              <h2 className="role-title">{t('student')}</h2>
              <p className="role-description">{t('studentDesc')}</p>
              <ul className="role-features">
                {t('studentFeatures').map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                className="role-button student"
                onClick={() => handleRoleSelection("student")}
                disabled={loading}
              >
                <span>{loading ? "Processing..." : t('continueAsStudent')}</span>
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div
              className={`role-card ${hoveredRole === "teacher" ? "hovered" : ""}`}
              onMouseEnter={() => handleMouseEnter("teacher")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="role-icon">👩‍🏫</div>
              <h2 className="role-title">{t('teacher')}</h2>
              <p className="role-description">{t('teacherDesc')}</p>
              <ul className="role-features">
                {t('teacherFeatures').map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                className="role-button teacher"
                onClick={() => handleRoleSelection("teacher")}
                disabled={loading}
              >
                <span>{loading ? "Processing..." : t('continueAsTeacher')}</span>
                <span className="button-arrow">→</span>
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          <div className="help-text">
            {t('notSure')} <a href="#">{t('learnMore')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;