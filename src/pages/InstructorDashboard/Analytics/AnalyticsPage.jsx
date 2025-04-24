import React from "react";
import styles from "./Analytics.module.css";
import { FaUsers, FaGraduationCap, FaChartLine, FaBook, FaStar, FaClock } from "react-icons/fa";

const AnalyticsPage = () => {
  // Mock data for demonstration
  const metrics = [
    { title: "Total Students", value: "1,234", icon: <FaUsers />, change: "+12%", trend: "up" },
    { title: "Active Courses", value: "8", icon: <FaBook />, change: "+2", trend: "up" },
    { title: "Completion Rate", value: "87%", icon: <FaGraduationCap />, change: "+5%", trend: "up" },
    { title: "Average Rating", value: "4.8", icon: <FaStar />, change: "+0.2", trend: "up" },
  ];

  const recentActivity = [
    { course: "Web Development Basics", students: 45, progress: 78 },
    { course: "Advanced JavaScript", students: 32, progress: 65 },
    { course: "React Fundamentals", students: 28, progress: 92 },
    { course: "Node.js Backend", students: 19, progress: 45 },
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h1>Analytics Dashboard</h1>
        <div className={styles.timeFilter}>
          <select defaultValue="30">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <div className={styles.metricIcon}>{metric.icon}</div>
            <div className={styles.metricContent}>
              <h3>{metric.title}</h3>
              <div className={styles.metricValue}>
                <span>{metric.value}</span>
                <span className={`${styles.metricChange} ${styles[metric.trend]}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.analyticsGrid}>
        {/* Course Performance */}
        <div className={styles.analyticsCard}>
          <h2>Course Performance</h2>
          <div className={styles.chartPlaceholder}>
            <FaChartLine className={styles.chartIcon} />
            <p>Course performance chart will be displayed here</p>
          </div>
        </div>

        {/* Student Engagement */}
        <div className={styles.analyticsCard}>
          <h2>Student Engagement</h2>
          <div className={styles.chartPlaceholder}>
            <FaChartLine className={styles.chartIcon} />
            <p>Student engagement metrics will be displayed here</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.analyticsCard}>
          <h2>Recent Activity</h2>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityInfo}>
                  <h4>{activity.course}</h4>
                  <p>{activity.students} students</p>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${activity.progress}% `}}
                  />
                  <span>{activity.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Spent */}
        <div className={styles.analyticsCard}>
          <h2>Time Spent Analysis</h2>
          <div className={styles.timeSpentContent}>
            <div className={styles.timeSpentMetric}>
              <FaClock className={styles.timeIcon} />
              <div>
                <h3>Average Time per Course</h3>
                <p>2.5 hours</p>
              </div>
            </div>
            <div className={styles.timeSpentMetric}>
              <FaClock className={styles.timeIcon} />
              <div>
                <h3>Total Learning Time</h3>
                <p>1,234 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;