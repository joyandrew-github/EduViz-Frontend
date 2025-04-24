import React, { useState, useEffect } from 'react';
import styles from './QuizPage.module.css'; // Create a separate CSS module

const QuizPage = ({ partTitle, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const apiUrl = import.meta.env.VITE_API_URL || 'https://eduviz-backend-1.onrender.com';

  useEffect(() => {
    const generateQuestions = () => {
      const sampleQuestions = [
        { 
          question: `What is the primary material used in the ${partTitle}?`, 
          options: ['Steel', 'Aluminum', 'Plastic', 'Wood'], 
          correct: 'Aluminum' 
        },
        { 
          question: `What is the main function of the ${partTitle}?`, 
          options: ['Support', 'Propulsion', 'Steering', 'Braking'], 
          correct: 'Support' 
        },
        { 
          question: `How is the ${partTitle} manufactured?`, 
          options: ['3D Printing', 'CNC Machining', 'Hand Crafting', 'Injection Molding'], 
          correct: 'CNC Machining' 
        },
        { 
          question: `Which of these is NOT a common issue with the ${partTitle}?`, 
          options: ['Corrosion', 'Wear and tear', 'Electromagnetic interference', 'Structural failure'], 
          correct: 'Electromagnetic interference' 
        },
        { 
          question: `What maintenance does the ${partTitle} typically require?`, 
          options: ['Regular cleaning', 'Periodic replacement', 'Software updates', 'No maintenance required'], 
          correct: 'Regular cleaning' 
        },
      ];
      setQuestions(sampleQuestions);
    };
    generateQuestions();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (score === null) handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [partTitle]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) newScore += 3; // 3 points per correct answer for total of 15
    });
    setScore(newScore);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const navigateQuestion = (direction) => {
    if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <h2 className={styles.quizTitle}>{`Quiz: ${partTitle}`}</h2>
        <div className={styles.quizTimer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
        ></div>
      </div>

      <div className={styles.questionIndicators}>
        {questions.map((_, index) => (
          <button 
            key={index}
            className={`${styles.questionIndicator} ${currentQuestion === index ? styles.activeQuestion : ''} ${answers[index] ? styles.answeredQuestion : ''}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {score === null && questions.length > 0 && (
        <div className={styles.questionCard}>
          <h3 className={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</h3>
          <p className={styles.questionText}>{questions[currentQuestion].question}</p>
          
          <div className={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, optIndex) => (
              <div 
                key={optIndex}
                className={`${styles.optionItem} ${answers[currentQuestion] === option ? styles.selectedOption : ''}`}
                onClick={() => handleAnswerChange(currentQuestion, option)}
              >
                <div className={styles.radioCustom}>
                  <div className={styles.radioInner}></div>
                </div>
                <label>{option}</label>
              </div>
            ))}
          </div>

          <div className={styles.navigationButtons}>
            <button 
              className={styles.navButton} 
              onClick={() => navigateQuestion('prev')}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button 
                className={styles.navButton} 
                onClick={() => navigateQuestion('next')}
              >
                Next
              </button>
            ) : (
              <button 
                className={`${styles.navButton} ${styles.submitButton}`} 
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {score !== null && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <h3>Quiz Complete!</h3>
            <div className={styles.scoreCircle}>
              <svg viewBox="0 0 36 36" className={styles.scoreChart}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6617cb" />
                    <stop offset="100%" stopColor="#cb218e" />
                  </linearGradient>
                </defs>
                <circle 
                  className={styles.scoreCircleBg}
                  cx="18" 
                  cy="18" 
                  r="16"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                />
                <circle
                  className={styles.scoreCircleFill}
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 15) * 100}, 100`}
                  transform="rotate(-90 18 18)"
                />
                <text 
                  x="18" 
                  y="18" 
                  className={styles.scoreText}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#f0f0f0"
                >
                  {`${Math.round((score / 15) * 100)}%`}
                </text>
              </svg>
            </div>
          </div>
          <p className={styles.scoreDetail}>Your Score: {score}/15 points</p>
          <div className={styles.resultButtons}>
            <button className={styles.reviewAnswersButton}>Review Answers</button>
            <button className={styles.returnButton} onClick={onBack}>Back to Assessments</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;