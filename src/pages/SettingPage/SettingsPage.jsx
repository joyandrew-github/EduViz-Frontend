import React, { useState, useEffect, useRef } from 'react';
import styles from './SettingPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({ fullName: '', email: '', profilePicture: '' });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'https://eduviz-backend-1.onrender.com';

  const settingsSections = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'account', label: 'Account Security', icon: '🔒' },
    { key: 'purchase-history', label: 'Purchase History', icon: '📋' },
    { key: 'view-profile', label: 'View Profile', icon: '👀' },
    { key: 'logout', label: 'Logout', icon: '🚪' }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const { fullName, email, profilePicture } = response.data;
          setUserData({ 
            fullName: fullName || '', 
            email: email || '', 
            profilePicture: profilePicture || '' 
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData({ 
            fullName: '', 
            email: '', 
            profilePicture: '' 
          });
        }
      }
    };
    fetchUserData();
  }, [apiUrl]);

  const ProfileSettings = () => {
    const [firstName, setFirstName] = useState(userData.fullName.split(' ')[0] || '');
    const [lastName, setLastName] = useState(userData.fullName.split(' ')[1] || '');
    const [headline, setHeadline] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [language, setLanguage] = useState('English (US)');
    const [profileImage, setProfileImage] = useState(userData.profilePicture);
    const [previewImage, setPreviewImage] = useState(
      userData.profilePicture 
        ? `${apiUrl}/uploads/profile-pictures/${userData.profilePicture}` 
        : null
    );

    const handleImageChange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
          setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profileImage', file);

        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${apiUrl}/api/auth/upload-profile-image`, formData, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          });

          if (response.data.profilePicture) {
            const newProfilePicture = response.data.profilePicture;
            setUserData(prev => ({ ...prev, profilePicture: newProfilePicture }));
            setProfileImage(newProfilePicture);
            setPreviewImage(`${apiUrl}/uploads/profile-pictures/${newProfilePicture}`);
            
            // Update the user's profile picture in the database
            await axios.put(`${apiUrl}/api/users/me`, 
              { profilePicture: newProfilePicture },
              {
                headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                withCredentials: true
              }
            );
          }
        } catch (error) {
          console.error('Upload error:', error.response ? error.response.data : error.message);
          alert('Failed to upload profile image. Please try again.');
          // Reset preview image on error
          setPreviewImage(userData.profilePicture 
            ? `${apiUrl}/uploads/profile-pictures/${userData.profilePicture}` 
            : null
          );
        }
      }
    };

    const triggerFileInput = () => {
      fileInputRef.current.click();
    };

    const handleSave = () => {
      alert('Profile updated successfully!');
      // TODO: Implement API call to update user data (fullName, etc.) if needed
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const { fullName, email, profilePicture } = response.data;
          setUserData({ fullName, email, profilePicture });
          setPreviewImage(profilePicture ? `${apiUrl}/uploads/profile-pictures/${profilePicture}` : null);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>Public Profile</h1>
        <p className={styles.welcomeSubtitle}>Add information about yourself</p>

        <div className={styles.settingsContainer}>
          <div className={styles.profileImageContainer}>
            <div className={`${styles.profileAvatar} ${styles.largeAvatar}`} onClick={triggerFileInput}>
              {previewImage ? (
                <img src={previewImage} alt="Profile" className={styles.avatarImage} />
              ) : (
                userData.fullName[0] || 'D'
              )}
              <div className={styles.avatarUploadOverlay}>
                <span className={styles.avatarUploadIcon}>📷</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                className={styles.fileInputHidden} 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
            <button className={styles.textButton} onClick={triggerFileInput}>
              Change Photo
            </button>
          </div>

          <div className={styles.settingsForm}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basics</h3>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className={styles.settingsInput}
              />
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className={styles.settingsInput}
              />
              <input 
                type="text" 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Headline"
                className={styles.settingsInput}
                maxLength={60}
              />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={styles.settingsInput}
              >
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Links</h3>
              <div className={styles.linkInputGroup}>
                <span className={styles.linkPrefix}>https://</span>
                <input 
                  type="text" 
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website URL"
                  className={styles.settingsInputWithPrefix}
                />
              </div>
              <div className={styles.linkInputGroup}>
                <span className={styles.linkPrefix}>facebook.com/</span>
                <input 
                  type="text" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="Username"
                  className={styles.settingsInputWithPrefix}
                />
              </div>
              <div className={styles.linkInputGroup}>
                <span className={styles.linkPrefix}>instagram.com/</span>
                <input 
                  type="text" 
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Username"
                  className={styles.settingsInputWithPrefix}
                />
              </div>
              <div className={styles.linkInputGroup}>
                <span className={styles.linkPrefix}>linkedin.com/</span>
                <input 
                  type="text" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Public Profile URL"
                  className={styles.settingsInputWithPrefix}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button 
                className={styles.primaryButton}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AccountSecurity = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = () => {
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      alert('Password changed successfully!');
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>Account Security</h1>
        <p className={styles.welcomeSubtitle}>Manage your account security settings</p>

        <div className={styles.securitySection}>
          <h3 className={styles.sectionTitle}>Change Password</h3>
          <div className={styles.passwordInputGroup}>
            <input 
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.settingsInput}
            />
            <input 
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.settingsInput}
            />
            <button 
              className={styles.primaryButton}
              onClick={handlePasswordChange}
            >
              Change Password
            </button>
          </div>

          <div className={styles.mfaSection}>
            <h3 className={styles.sectionTitle}>Multi-factor Authentication</h3>
            <p className={styles.securityDescription}>
              Increase your account security by requiring a code emailed to you when logging in.
            </p>
            <button className={styles.primaryButton}>
              Enable Multi-factor Authentication
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ViewProfile = () => {
    const profileImageUrl = userData.profilePicture ? `${apiUrl}/uploads/profile-pictures/${userData.profilePicture}` : null;
    const [currentLocation, setCurrentLocation] = useState('Detecting location...');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
      // Get current date
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentDate(formattedDate);

      // Get exact current location
      const getExactLocation = () => {
        if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          };

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                
                // First try with Google Maps Geocoding API
                const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
                );
                
                if (!response.ok) {
                  throw new Error('Geocoding service failed');
                }

                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                  const address = data.results[0].formatted_address;
                  setCurrentLocation(address);
                } else {
                  // Fallback to OpenStreetMap if Google fails
                  const osmResponse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                  );
                  const osmData = await osmResponse.json();
                  
                  if (osmData.address) {
                    const { city, town, village, county, state, country } = osmData.address;
                    const location = city || town || village || county || state || country || 'Unknown Location';
                    setCurrentLocation(location);
                  } else {
                    setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                  }
                }
              } catch (error) {
                console.error('Error getting location:', error);
                setCurrentLocation('Location service unavailable');
              }
            },
            (error) => {
              console.error('Geolocation error:', error);
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  setCurrentLocation('Location access denied');
                  break;
                case error.POSITION_UNAVAILABLE:
                  setCurrentLocation('Location information unavailable');
                  break;
                case error.TIMEOUT:
                  setCurrentLocation('Location request timed out');
                  break;
                default:
                  setCurrentLocation('Error getting location');
              }
            },
            options
          );
        } else {
          setCurrentLocation('Geolocation not supported');
        }
      };

      getExactLocation();
    }, []);

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <div className={styles.profileViewContainer}>
          <div className={`${styles.profileAvatar} ${styles.largeAvatar}`}>
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" className={styles.avatarImage} />
            ) : (
              userData.fullName[0] || ''
            )}
          </div>
          <h2>{userData.fullName}</h2>
          <p>Web Developer</p>
          <div className={styles.profileDetails}>
            <p>Email: {userData.email}</p>
            <p>Location: {currentLocation}</p>
            <p>Member Since: {currentDate}</p>
          </div>
        </div>
      </div>
    );
  };

  const LogoutConfirmation = () => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>Logout</h1>
        <div className={styles.logoutContainer}>
          <p>Are you sure you want to log out?</p>
          <button 
            className={styles.primaryButton}
            onClick={handleLogout}
          >
            Confirm Logout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.settingsPageContainer}>
      <div className={styles.settingsSidebar}>
        <div className={styles.stackedProfileHeader}>
          <div className={styles.stackedProfileAvatar}>{userData.fullName[0] || ''}</div>
          <div className={styles.stackedProfileInfo}>
            <span className={styles.stackedProfileName}>{userData.fullName}</span>
            <span className={styles.stackedProfileEmail}>{userData.email}</span>
          </div>
        </div>
        
        <div className={styles.settingsNavigation}>
          {settingsSections.map((section) => (
            <button
              key={section.key}
              className={`${styles.settingsNavItem} ${activeSection === section.key ? styles.active : ''}`}
              onClick={() => setActiveSection(section.key)}
            >
              <span className={styles.navItemIcon}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.settingsMainContent}>
        {activeSection === 'profile' && <ProfileSettings />}
        {activeSection === 'account' && <AccountSecurity />}
        {activeSection === 'view-profile' && <ViewProfile />}
        {activeSection === 'logout' && <LogoutConfirmation />}
        {['purchase-history'].includes(activeSection) && (
          <div className={styles.settingsContent}>
            <h1 className={styles.pageTitle}>{settingsSections.find(s => s.key === activeSection).label}</h1>
            <p className={styles.welcomeSubtitle}>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;