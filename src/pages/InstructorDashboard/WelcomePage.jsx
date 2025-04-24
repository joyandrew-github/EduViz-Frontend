import React from "react";
import styles from "./InstructorDashboard.module.css";

const WelcomePage = ({ models, instructorStats }) => {
  const publishedModels = models.filter(model => model.isPublished).length;
  const totalViews = models.reduce((total, model) => total + model.views, 0);
  const totalParts = models.reduce((total, model) => total + (model.parts?.length || 0), 0);
  const completionPercentage = Math.round((publishedModels / models.length) * 100) || 0;

  // Find the last created model based on createdAt
  const lastCreatedModel = models.reduce((latest, current) => {
    return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
  }, models[0] || {});

  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomeHero}>
        <div className={styles.welcomeIntro}>
          <h1 className={styles.welcomeTitle}>Welcome back, Professor</h1>
          <p className={styles.welcomeSubtitle}>Create and manage your 3D educational models:</p>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${completionPercentage}%` }}></div>
            </div>
            <p className={styles.progressText}>{completionPercentage}% Published - {publishedModels}/{models.length} Models</p>
          </div>
          <div className={styles.upcomingCourse}>
            <h3>Recently Updated</h3>
            {models.length > 0 && (
              <div className={styles.coursePreview}>
                <div className={styles.coursePreviewIcon}>
                  {lastCreatedModel.modelCover && lastCreatedModel.modelCover !== "default_cover.jpg" ? (
                    <img
                      src={`https://eduviz-backend-1.onrender.com/model/${lastCreatedModel.modelCover}`}
                      alt={`${lastCreatedModel.title} cover`}
                      className={styles.recentModelImage}
                      onError={(e) => {
                        console.error(`Failed to load image for model ${lastCreatedModel.id}:`, e);
                        e.target.style.display = "none"; // Hide broken image
                      }}
                    />
                  ) : (
                    <div className={styles.modelPlaceholder}>{lastCreatedModel.category?.charAt(0) || 'M'}</div>
                  )}
                </div>
                <div className={styles.coursePreviewInfo}>
                  <h4>{lastCreatedModel.title}</h4>
                  <button className={styles.primaryButton}>Continue Editing</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.statsOverview}>
          <div className={styles.statCard}>
            <h2 className={styles.statValue}>{models.length}</h2>
            <p className={styles.statLabel}>Total Models</p>
          </div>
          <div className={styles.statCard}>
            <h2 className={styles.statValue}>{totalViews.toLocaleString()}</h2>
            <p className={styles.statLabel}>Total Views</p>
          </div>
        </div>
      </div>
      <div className={styles.recentModelsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Models</h2>
          <button className={styles.textButton}>View All Models</button>
        </div>
        <div className={styles.modelList}>
          {models.slice(0, 3).map((model) => (
            <div className={styles.modelCard} key={model.id}>
              <div className={styles.modelImageContainer}>
                {model.modelCover && model.modelCover !== "default_cover.jpg" ? (
                  <img
                    src={`https://eduviz-backend-1.onrender.com/model/${model.modelCover}`}
                    alt={`${model.title} cover`}
                    className={styles.modelImage}
                    onError={(e) => {
                      console.error(`Failed to load image for model ${model.id}:`, e);
                      e.target.style.display = "none"; // Hide broken image
                    }}
                  />
                ) : (
                  <div className={styles.modelPlaceholder}>{model.category.charAt(0)}</div>
                )}
                {!model.isPublished && <span className={styles.modelBadge}>DRAFT</span>}
              </div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelDescription}>{model.description}</p>
                <div className={styles.modelFooter}>
                  <div className={styles.modelMetadata}>
                    <span className={styles.modelCategory}>{model.category}</span>
                    <span className={styles.modelViews}>{model.views} views</span>
                  </div>
                  <button className={styles.modelActionButton}>Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.insightsSection}>
        <h2 className={styles.sectionTitle}>Instructor Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <h3>Content Status</h3>
            <div className={styles.contentStatusChart}>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Published</span>
                <div className={styles.statusBar}>
                  <div className={`${styles.statusFill} ${styles.publishedFill}`} style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <span className={styles.statusValue}>{publishedModels}</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Drafts</span>
                <div className={styles.statusBar}>
                  <div className={`${styles.statusFill} ${styles.draftFill}`} style={{ width: `${100 - completionPercentage}%` }}></div>
                </div>
                <span className={styles.statusValue}>{models.length - publishedModels}</span>
              </div>
            </div>
          </div>
          <div className={styles.insightCard}>
            <h3>Model Engagement</h3>
            <div className={styles.engagementDetail}>
              <div className={styles.engagementMetric}>
                <span className={styles.metricValue}>{totalParts}</span>
                <span className={styles.metricLabel}>Total Parts</span>
              </div>
              <div className={styles.engagementMetric}>
                <span className={styles.metricValue}>{Math.round(totalViews / Math.max(models.length, 1))}</span>
                <span className={styles.metricLabel}>Avg. Views</span>
              </div>
            </div>
            <p className={styles.insightTip}>Models with 3+ interactive parts get 40% more engagement!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;