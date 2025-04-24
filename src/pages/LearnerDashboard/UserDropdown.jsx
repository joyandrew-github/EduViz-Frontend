import React, { useState } from 'react';
import styles from "./LearnerDashboard.module.css";

const UserDropup = () => {
  const [isDropupOpen, setIsDropupOpen] = useState(false);
  
  const toggleDropup = () => {
    setIsDropupOpen(!isDropupOpen);
  };

  const menuSections = [
    {
      items: [
        { label: 'My learning', icon: '📚' },
        { label: 'My cart', icon: '🛒' },
        { label: 'Wishlist', icon: '❤️' },
        { label: 'Teach on Udemy', icon: '👩‍🏫' }
      ]
    },
    {
      items: [
        { label: 'Notifications', icon: '🔔' },
        { label: 'Messages', icon: '💬' }
      ]
    },
    {
      items: [
        { label: 'Account settings', icon: '⚙️' },
        { label: 'Payment methods', icon: '💳' },
        { label: 'Subscriptions', icon: '📅' },
        { label: 'Udemy credits', icon: '💡' },
        { label: 'Purchase history', icon: '📋' }
      ]
    },
    {
      items: [
        { label: 'Help and Support', icon: '❓' }
      ]
    }
  ];

  return (
    <div className={styles.userDropupContainer}>
      <div 
        className={styles.profileTrigger}
        onClick={toggleDropup}
      >
        <div className={styles.profileAvatar}>D</div>
        <div className={styles.profileDetails}>
          <span className={styles.profileName}>Dhusyanth</span>
        </div>
        <svg 
          className={`${styles.dropupIcon} ${isDropupOpen ? styles.rotated : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
      {isDropupOpen && (
        <div className={styles.userDropupMenu}>
          <div className={styles.userDropupHeader}>
            <div className={styles.userDropupHeaderProfile}>
              <div className={`${styles.profileAvatar} ${styles.largeAvatar}`}>D</div>
              <div className={styles.userProfileInfo}>
                <div className={styles.userProfileName}>Dhusyanth</div>
                
                <button className={styles.viewProfileButton}>View profile</button>
              </div>
            </div>
          </div>
          {menuSections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.items.map((item, itemIndex) => (
                <button 
                  key={itemIndex} 
                  className={styles.dropupMenuItem}
                  onClick={() => {
                    setIsDropupOpen(false);
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              {sectionIndex < menuSections.length - 1 && (
                <div className={styles.menuSeparator}></div>
              )}
            </React.Fragment>
          ))}
          <div className={styles.menuSeparator}></div>
          <button 
            className={styles.dropupMenuItem}
            onClick={() => {
              setIsDropupOpen(false);
            }}
          >
            <span className="mr-2">🚪</span>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropup;