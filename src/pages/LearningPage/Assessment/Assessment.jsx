import React, { useState, useEffect } from 'react';
import styles from './Assessment.module.css';
import QuizPage from './QuizPage'; // Adjust the path as necessary

const Assessment = ({modelId}) => {
  const [modelData, setModelData] = useState(null);
  const [activeSection, setActiveSection] = useState('upcoming');
  const [selectedPart, setSelectedPart] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://eduviz-backend-1.onrender.com';

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/models/${modelId}`, { credentials: 'include' });
        if (!response.ok) throw new Error(`Failed to fetch model data: ${response.status}`);
        const data = await response.json();
        setModelData(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchModelData();
  }, [apiUrl]);

  const parts = modelData?.parts ? Object.keys(modelData.parts).map(key => ({ key, ...modelData.parts[key] })) : [];

  const handleStartQuiz = (partTitle) => {
    setActiveSection('quiz');
    setSelectedPart(partTitle);
  };

  const handleBack = () => {
    setActiveSection('upcoming');
    setSelectedPart(null);
  };

  return (
    <div className={styles.assessmentSection}>
      {activeSection === 'upcoming' && (
        <>
          <div className={styles.upcomingAssessments}>
            <h3 className={styles.assessmentSectionTitle}>Upcoming Assessments</h3>
            {parts.map((part, index) => (
              <div key={index} className={styles.assessmentCard}>
                <div className={styles.assessmentHeader}>
                  <h4 className={styles.assessmentTitle}>{`Assessment ${index + 1}: ${part.title}`}</h4>
                  <span className={styles.assessmentDue}>Due: April 18, 11:59 PM</span>
                </div>
                <div className={styles.assessmentDetails}>
                  <p>Test your knowledge of the {part.title} and its functions.</p>
                  <div className={styles.assessmentMeta}>
                    <span className={styles.assessmentType}>Multiple Choice</span>
                    <span className={styles.assessmentPoints}>15 Points</span>
                    <span className={styles.assessmentTime}>30 Minutes</span>
                  </div>
                </div>
                <button className={styles.startButton} onClick={() => handleStartQuiz(part.title)}>Start Quiz</button>
              </div>
            ))}
            <div className={styles.assessmentCard}>
              <div className={styles.assessmentHeader}>
                <h4 className={styles.assessmentTitle}>Assembly Challenge</h4>
                
              </div>
              <div className={styles.assessmentDetails}>
                <p>Using the 3D model, assemble the model in the correct order.</p>
                <div className={styles.assessmentMeta}>
                  <span className={styles.assessmentType}>Interactive</span>
                  <span className={styles.assessmentPoints}>30 Points</span>
                  <span className={styles.assessmentTime}>45 Minutes</span>
                </div>
              </div>
              <button className={styles.startButton} disabled>Coming Soon</button>
            </div>
          </div>

          <div className={styles.completedAssessments}>
            <h3 className={styles.assessmentSectionTitle}>Completed Assessments</h3>
            <div className={`${styles.assessmentCard} ${styles.completedCard}`}>
              <div className={styles.assessmentHeader}>
                <h4 className={styles.assessmentTitle}>Bicycle Frame Quiz</h4>
                <span className={styles.assessmentScore}>Score: 92%</span>
              </div>
              <div className={styles.assessmentDetails}>
                <div className={styles.assessmentMeta}>
                  <span className={styles.assessmentType}>Multiple Choice</span>
                  <span className={styles.assessmentPoints}>15/15 Points</span>
                  <span className={styles.assessmentDate}>Completed: April 5</span>
                </div>
              </div>
              <button className={styles.reviewButton}>Review Results</button>
            </div>
          </div>
        </>
      )}
      {activeSection === 'quiz' && (
        <QuizPage partTitle={selectedPart} onBack={handleBack} />
      )}
    </div>
  );
};

export default Assessment;