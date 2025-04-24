import React, { useState, useEffect} from "react";
import styles from "./LearningPage.module.css";
import Message from "./Message/Message";
import Assessment from "./Assessment/Assessment"; // Import the Assessment component
import img from "../../images/img.jpg"; // Default fallback image
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get model ID from URL
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
const LearningPage = () => {
  const [activeSection, setActiveSection] = useState("modelContent");
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { modelId } = useParams(); 
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  useEffect(() => {
    const fetchModelData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`https://eduviz-backend-1.onrender.com/api/models/${modelId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const model = response.data;
          let imageUrl = img;
          if (model.modelCover && model.modelCover !== "default_cover.jpg") {
            try {
              const imageResponse = await fetch(
                `https://eduviz-backend-1.onrender.com/model/${model.modelCover}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  credentials: "include",
                }
              );
              if (imageResponse.ok) {
                const blob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(blob);
              }
            } catch (error) {
              console.error(`Error fetching model cover for ID ${model.modelCover}:`, error);
            }
          }
          setModelData({ ...model, imageUrl });
        } catch (error) {
          console.error("Error fetching model data:", error);
          setModelData({ imageUrl: img, title: "Interactive 3D Bicycle Mechanics" }); // Fallback
        } finally {
          setLoading(false);
        }
      }
    };
    fetchModelData();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "modelContent":
        return <ModelContent modelData={modelData} loading={loading} navigate={navigate} />;
      case "messages":
        return <Message />;
      case "assessment":
        return <Assessment modelId = {modelId} />;
      case "resources":
        return <Resources />;
      default:
        return <ModelContent modelData={modelData} loading={loading} />;
    }
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.learningContainer}>
        <div className={styles.sidebar}>
          <h2 className={styles.courseTitle}>
            {modelData ? modelData.title : "Interactive 3D Bicycle Mechanics"}
          </h2>
          <nav className={styles.navMenu}>
            <button
              className={`${styles.navItem} ${activeSection === "modelContent" ? styles.active : ""}`}
              onClick={() => setActiveSection("modelContent")}
            >
              <span className={styles.navIcon}>📝</span>
              Model Content
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "messages" ? styles.active : ""}`}
              onClick={() => setActiveSection("messages")}
            >
              <span className={styles.navIcon}>💬</span>
              Messages
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "assessment" ? styles.active : ""}`}
              onClick={() => setActiveSection("assessment")}
            >
              <span className={styles.navIcon}>📊</span>
              Assessment
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "resources" ? styles.active : ""}`}
              onClick={() => setActiveSection("resources")}
            >
              <span className={styles.navIcon}>📚</span>
              Resources
            </button>
          </nav>

          <div className={styles.moduleProgress}>
            <h3 className={styles.progressTitle}>Course Progress</h3>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "45%" }}></div>
            </div>
            <p className={styles.progressText}>45% Complete</p>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h1 className={styles.sectionTitle}>
              {activeSection === "modelContent" && "Interactive 3D Model Content"}
              {activeSection === "messages" && "Course Messages & Discussions"}
              {activeSection === "assessment" && "Module Assessments & Quizzes"}
              {activeSection === "resources" && "Learning Resources & Materials"}
            </h1>
            <div className={styles.contentMeta}>
              <span className={styles.moduleIndicator}>Module 3</span>
              <span className={styles.moduleType}>Interactive Learning</span>
            </div>
          </div>

          <div className={styles.mainContent}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

// Updated ModelContent Component
const ModelContent = ({ modelData, loading,navigate }) => {
    if (loading) {
        return <div className={styles.loadingContainer}>Loading model content...</div>;
      }
    
      const handleExplore = () => {
        if (modelData && modelData.id) {
          navigate(`/${modelData.id}`);
        }
      };
    
      return (
        <div className={styles.modelContentSection}>
          <div className={styles.modelViewerContainer}>
            <img
              src={modelData.imageUrl}
              alt={modelData.title || "3D Bicycle Model"}
              className={styles.modelCoverImage}
              onError={(e) => {
                e.target.src = img;
              }}
            />
          </div>
          <div className={styles.modelInfo}>
            <div className={styles.infoBox}>
              <h3 className={`${styles.infoTitle} ${styles.descriptionTitle}`}>Description</h3>
              <p className={styles.infoDescription}>
                {modelData.description ||
                  "This interactive 3D model explores the mechanics of a bicycle, focusing on the drivetrain system. Learn how the crankset, chain, derailleurs, and cassette work together to transfer power from the pedals to the wheels, enabling efficient propulsion. Rotate, zoom, and dismantle the model to understand each component's role."}
              </p>
            </div>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>What You Will Learn</h3>
              <div className={styles.learningSections}>
                <div className={styles.learningSection}>
                  <ul className={styles.componentList}>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      The function of the drivetrain in bicycle mechanics.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      How to identify and assemble key components like the crankset, chainrings, and derailleurs.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      Techniques for troubleshooting common drivetrain issues.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      The impact of gear ratios on pedaling efficiency.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modelControls}>
            <h3 className={styles.controlsTitle}>Viewer Functionalities</h3>
            <div className={styles.controlsGrid}>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔍</span>
                Zoom
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔄</span>
                Rotate
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔧</span>
                Dismantle
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>⚙️</span>
                Assemble
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🎬</span>
                Animate
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>💬</span>
                Measure
              </button>
            </div>
            <button className={styles.exploreButton} onClick={handleExplore}>
              Explore on EduViz Viewer
            </button>
          </div>
        </div>
      );
    };


const Resources = () => {
  return (
    <div className={styles.resourcesSection}>
      <div className={styles.resourceCategories}>
        <button className={`${styles.categoryButton} ${styles.active}`}>All Resources</button>
        <button className={styles.categoryButton}>Video Tutorials</button>
        <button className={styles.categoryButton}>Reading Materials</button>
        <button className={styles.categoryButton}>External Links</button>
        <button className={styles.categoryButton}>Downloads</button>
      </div>

      <div className={styles.resourcesList}>
        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>📹</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Understanding Bicycle Drivetrains</h4>
            <p className={styles.resourceDescription}>
              A comprehensive video walkthrough of bicycle drivetrain mechanics and maintenance.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>Video Tutorial</span>
              <span className={styles.resourceDuration}>32 minutes</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Watch</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>📄</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Drivetrain Maintenance Guide</h4>
            <p className={styles.resourceDescription}>
              Step-by-step guide to maintaining and troubleshooting common drivetrain issues.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>PDF Document</span>
              <span className={styles.resourceSize}>2.4 MB</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Download</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>🔗</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Sheldon Brown's Bicycle Technical Info</h4>
            <p className={styles.resourceDescription}>
              External resource with in-depth information about bicycle components and mechanics.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>External Link</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Visit</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>💻</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Gear Ratio Calculator</h4>
            <p className={styles.resourceDescription}>
              Interactive tool to calculate and visualize gear ratios for different drivetrain setups.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>Interactive Tool</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Open</button>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;