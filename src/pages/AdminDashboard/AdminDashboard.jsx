import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  // State for active tab and other UI states
  const [activeTab, setActiveTab] = useState('overview');
  const [activeUserType, setActiveUserType] = useState('instructors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Mock data for statistics
  const stats = {
    totalUsers: 2456,
    activeUsers: 1893,
    instructors: 342,
    learners: 2114,
    courses: 475,
    revenue: 187650
  };

  // Mock data for instructors
  const instructors = [
    {
      id: 1,
      name: 'Dr. Eleanor Richards',
      email: 'eleanor@eduviz.com',
      status: 'active',
      courses: 12,
      students: 453,
      rating: 4.8,
      joined: '2023-05-12',
      revenue: '$12,450',
      avatar: 'ER'
    },
    {
      id: 2,
      name: 'Prof. James Wilson',
      email: 'jwilson@eduviz.com',
      status: 'active',
      courses: 8,
      students: 321,
      rating: 4.6,
      joined: '2023-07-23',
      revenue: '$8,970',
      avatar: 'JW'
    },
    {
      id: 3,
      name: 'Dr. Sarah Kim',
      email: 'sarahkim@eduviz.com',
      status: 'pending',
      courses: 4,
      students: 167,
      rating: 4.7,
      joined: '2024-01-05',
      revenue: '$4,230',
      avatar: 'SK'
    }
  ];

  // Mock data for learners
  const learners = [
    {
      id: 1,
      name: 'Michael Johnson',
      email: 'michael@gmail.com',
      status: 'active',
      enrolled: 5,
      completed: 3,
      lastLogin: '2024-04-15',
      joined: '2023-06-18',
      spent: '$325',
      avatar: 'MJ'
    },
    {
      id: 2,
      name: 'Lisa Chen',
      email: 'lisa.chen@outlook.com',
      status: 'active',
      enrolled: 8,
      completed: 7,
      lastLogin: '2024-04-17',
      joined: '2023-04-02',
      spent: '$499',
      avatar: 'LC'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert.davis@yahoo.com',
      status: 'inactive',
      enrolled: 2,
      completed: 0,
      lastLogin: '2024-03-22',
      joined: '2023-11-14',
      spent: '$89',
      avatar: 'RD'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Dr. Eleanor Richards',
      action: 'Uploaded a new 3D model',
      course: 'Human Anatomy: Cardiovascular System',
      time: '2 hours ago',
      avatar: 'ER'
    },
    {
      id: 2,
      user: 'Michael Johnson',
      action: 'Purchased a course',
      course: 'Mechanical Engineering: Jet Engine',
      time: '5 hours ago',
      avatar: 'MJ'
    },
    {
      id: 3,
      user: 'Prof. James Wilson',
      action: 'Updated course content',
      course: 'Electrical Engineering: Circuit Design',
      time: '1 day ago',
      avatar: 'JW'
    },
    {
      id: 4,
      user: 'Lisa Chen',
      action: 'Completed a course',
      course: 'Architectural Design: Modern Structures',
      time: '2 days ago',
      avatar: 'LC'
    }
  ];

  // Filter users based on search term
  const filteredUsers = activeUserType === 'instructors' 
    ? instructors.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : learners.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Handle adding new user
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.adminContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.platformTitle}>
            <span className={styles.logoText}>EduViz</span>
            <span className={styles.adminPanel}>Admin Panel</span>
          </div>
          
          <nav className={styles.navMenu}>
            <button 
              className={[styles.navItem, activeTab === 'overview' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('overview')}
            >
              <span className={styles.navIcon}>📊</span>
              Dashboard Overview
            </button>
            <button 
              className={[styles.navItem, activeTab === 'users' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('users')}
            >
              <span className={styles.navIcon}>👥</span>
              User Management
            </button>
            <button 
              className={[styles.navItem, activeTab === 'courses' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('courses')}
            >
              <span className={styles.navIcon}>📚</span>
              Course Management
            </button>
            <button 
              className={[styles.navItem, activeTab === 'models' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('models')}
            >
              <span className={styles.navIcon}>🧩</span>
              3D Models
            </button>
            <button 
              className={[styles.navItem, activeTab === 'analytics' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('analytics')}
            >
              <span className={styles.navIcon}>📈</span>
              Analytics
            </button>
            <button 
              className={[styles.navItem, activeTab === 'payments' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('payments')}
            >
              <span className={styles.navIcon}>💰</span>
              Payments
            </button>
            <button 
              className={[styles.navItem, activeTab === 'settings' ? styles.active : ''].join(' ')}
              onClick={() => setActiveTab('settings')}
            >
              <span className={styles.navIcon}>⚙</span>
              Settings
            </button>
          </nav>
          
          <div className={styles.adminProfile}>
            <div className={styles.adminAvatar}>AD</div>
            <div className={styles.adminInfo}>
              <h4>Admin User</h4>
              <p>admin@eduviz.com</p>
            </div>
            <button className={styles.logoutButton}>
              <span className={styles.logoutIcon}>🚪</span>
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Header with page title and actions */}
          <div className={styles.contentHeader}>
            <div>
              <h1 className={styles.pageTitle}>
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'courses' && 'Course Management'}
                {activeTab === 'models' && '3D Models Library'}
                {activeTab === 'analytics' && 'Platform Analytics'}
                {activeTab === 'payments' && 'Payment Management'}
                {activeTab === 'settings' && 'Platform Settings'}
              </h1>
              <div className={styles.breadcrumbs}>
                Admin Panel / {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchContainer}>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className={styles.searchIcon}>🔍</span>
              </div>
              <button className={styles.actionButton}>
                <span className={styles.buttonIcon}>🔔</span>
              </button>
              <button className={styles.actionButton}>
                <span className={styles.buttonIcon}>✉</span>
              </button>
            </div>
          </div>
          
          {/* Dashboard Overview */}
          {activeTab === 'overview' && (
            <div className={styles.overviewSection}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(102, 23, 203, 0.1)' }}>👥</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.totalUsers.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Total Users</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(203, 33, 142, 0.1)' }}>👨‍🏫</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.instructors.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Instructors</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)' }}>🧑‍🎓</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.learners.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Learners</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)' }}>📚</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.courses.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Courses</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)' }}>👁</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.activeUsers.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Active Users</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: 'rgba(8, 145, 178, 0.1)' }}>💵</div>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>${stats.revenue.toLocaleString()}</h3>
                    <p className={styles.statLabel}>Total Revenue</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.recentActivitySection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Recent Activities</h2>
                  <button className={styles.viewAllButton}>View All</button>
                </div>
                <div className={styles.activityList}>
                  {recentActivities.map(activity => (
                    <div key={activity.id} className={styles.activityCard}>
                      <div className={styles.activityAvatar}>{activity.avatar}</div>
                      <div className={styles.activityInfo}>
                        <p className={styles.activityText}>
                          <span className={styles.activityUser}>{activity.user}</span> {activity.action} - <span className={styles.activityHighlight}>{activity.course}</span>
                        </p>
                        <span className={styles.activityTime}>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.quickAccessSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Quick Access</h2>
                </div>
                <div className={styles.quickAccessGrid}>
                  <button className={styles.quickAccessCard}>
                    <span className={styles.quickAccessIcon}>➕</span>
                    <span className={styles.quickAccessLabel}>Add New User</span>
                  </button>
                  <button className={styles.quickAccessCard}>
                    <span className={styles.quickAccessIcon}>🧩</span>
                    <span className={styles.quickAccessLabel}>Upload 3D Model</span>
                  </button>
                  <button className={styles.quickAccessCard}>
                    <span className={styles.quickAccessIcon}>📊</span>
                    <span className={styles.quickAccessLabel}>Revenue Report</span>
                  </button>
                  <button className={styles.quickAccessCard}>
                    <span className={styles.quickAccessIcon}>🔍</span>
                    <span className={styles.quickAccessLabel}>Audit Logs</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* User Management */}
          {activeTab === 'users' && (
            <div className={styles.usersSection}>
              <div className={styles.userControls}>
                <div className={styles.userTypeToggle}>
                  <button 
                    className={[styles.userTypeButton, activeUserType === 'instructors' ? styles.active : ''].join(' ')}
                    onClick={() => setActiveUserType('instructors')}
                  >
                    Instructors
                  </button>
                  <button 
                    className={[styles.userTypeButton, activeUserType === 'learners' ? styles.active : ''].join(' ')}
                    onClick={() => setActiveUserType('learners')}
                  >
                    Learners
                  </button>
                </div>
                <div className={styles.userActions}>
                  <button className={styles.filterButton}>
                    <span className={styles.buttonIcon}>🔍</span>
                    Filter
                  </button>
                  <button className={styles.addUserButton} onClick={handleAddUser}>
                    <span className={styles.buttonIcon}>➕</span>
                    Add {activeUserType === 'instructors' ? 'Instructor' : 'Learner'}
                  </button>
                </div>
              </div>
              
              <div className={styles.usersContainer}>
                <div className={styles.usersTable}>
                  <div className={styles.tableHeader}>
                    <div className={styles.tableCell}>Name</div>
                    <div className={styles.tableCell}>Email</div>
                    <div className={styles.tableCell}>Status</div>
                    {activeUserType === 'instructors' ? (
                      <>
                        <div className={styles.tableCell}>Courses</div>
                        <div className={styles.tableCell}>Students</div>
                        <div className={styles.tableCell}>Rating</div>
                      </>
                    ) : (
                      <>
                        <div className={styles.tableCell}>Enrolled</div>
                        <div className={styles.tableCell}>Completed</div>
                        <div className={styles.tableCell}>Last Login</div>
                      </>
                    )}
                    <div className={styles.tableCell}>Actions</div>
                  </div>
                  
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id} 
                      className={[styles.tableRow, selectedUser?.id === user.id ? styles.selectedRow : ''].join(' ')}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className={styles.tableCell}>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar}>{user.avatar}</div>
                          <span>{user.name}</span>
                        </div>
                      </div>
                      <div className={styles.tableCell}>{user.email}</div>
                      <div className={styles.tableCell}>
                        <span className={[styles.statusBadge, styles[user.status]].join(' ')}>
                          {user.status}
                        </span>
                      </div>
                      {activeUserType === 'instructors' ? (
                        <>
                          <div className={styles.tableCell}>{user.courses}</div>
                          <div className={styles.tableCell}>{user.students}</div>
                          <div className={styles.tableCell}>
                            <div className={styles.ratingCell}>
                              <span className={styles.ratingValue}>{user.rating}</span>
                              <span className={styles.ratingIcon}>⭐</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.tableCell}>{user.enrolled}</div>
                          <div className={styles.tableCell}>{user.completed}</div>
                          <div className={styles.tableCell}>{user.lastLogin}</div>
                        </>
                      )}
                      <div className={styles.tableCell}>
                        <div className={styles.actionButtons}>
                          <button className={styles.iconButton}>📝</button>
                          <button className={styles.iconButton}>🔒</button>
                          <button className={styles.iconButton}>🗑</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedUser && (
                  <div className={styles.userDetailPanel}>
                    <div className={styles.userDetailHeader}>
                      <h3 className={styles.detailTitle}>User Details</h3>
                      <button className={styles.closeDetailButton} onClick={() => setSelectedUser(null)}>×</button>
                    </div>
                    
                    <div className={styles.userProfile}>
                      <div className={styles.profileAvatar}>{selectedUser.avatar}</div>
                      <h3 className={styles.profileName}>{selectedUser.name}</h3>
                      <span className={[styles.statusBadge, styles[selectedUser.status]].join(' ')}>
                        {selectedUser.status}
                      </span>
                    </div>
                    
                    <div className={styles.userDetails}>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span className={styles.detailValue}>{selectedUser.email}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Joined:</span>
                        <span className={styles.detailValue}>{selectedUser.joined}</span>
                      </div>
                      
                      {activeUserType === 'instructors' ? (
                        <>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Courses:</span>
                            <span className={styles.detailValue}>{selectedUser.courses}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Students:</span>
                            <span className={styles.detailValue}>{selectedUser.students}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Rating:</span>
                            <span className={styles.detailValue}>{selectedUser.rating} ⭐</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Revenue:</span>
                            <span className={styles.detailValue}>{selectedUser.revenue}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Enrolled:</span>
                            <span className={styles.detailValue}>{selectedUser.enrolled} courses</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Completed:</span>
                            <span className={styles.detailValue}>{selectedUser.completed} courses</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Last Login:</span>
                            <span className={styles.detailValue}>{selectedUser.lastLogin}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Total Spent:</span>
                            <span className={styles.detailValue}>{selectedUser.spent}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className={styles.userActions}>
                      <button className={styles.actionButton}>
                        <span className={styles.buttonIcon}>📝</span>
                        Edit Profile
                      </button>
                      <button className={styles.actionButton}>
                        <span className={styles.buttonIcon}>✉</span>
                        Message
                      </button>
                      {activeUserType === 'instructors' ? (
                        <button className={styles.actionButton}>
                          <span className={styles.buttonIcon}>📚</span>
                          View Courses
                        </button>
                      ) : (
                        <button className={styles.actionButton}>
                          <span className={styles.buttonIcon}>📋</span>
                          View Enrollments
                        </button>
                      )}
                      <button className={[styles.actionButton, styles.dangerButton].join(' ')}>
                        <span className={styles.buttonIcon}>🚫</span>
                        {selectedUser.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add User Modal (shown when showAddUserModal is true) */}
          {showAddUserModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Add New {activeUserType === 'instructors' ? 'Instructor' : 'Learner'}</h2>
                  <button className={styles.closeModalButton} onClick={() => setShowAddUserModal(false)}>×</button>
                </div>
                
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <input type="text" className={styles.formInput} placeholder="Enter full name" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input type="email" className={styles.formInput} placeholder="Enter email address" />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Password</label>
                      <input type="password" className={styles.formInput} placeholder="Create password" />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Confirm Password</label>
                      <input type="password" className={styles.formInput} placeholder="Confirm password" />
                    </div>
                  </div>
                  
                  {activeUserType === 'instructors' && (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Specialization</label>
                        <input type="text" className={styles.formInput} placeholder="e.g. Mechanical Engineering, Anatomy" />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Qualification</label>
                        <input type="text" className={styles.formInput} placeholder="e.g. PhD in Mechanical Engineering" />
                      </div>
                    </>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Status</label>
                    <select className={styles.formSelect}>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button className={styles.cancelButton} onClick={() => setShowAddUserModal(false)}>Cancel</button>
                  <button className={styles.submitButton}>Create Account</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder for other tabs - you would expand these as needed */}
          {activeTab === 'courses' && <div className={styles.comingSoon}>Course Management Interface Coming Soon</div>}
          {activeTab === 'models' && <div className={styles.comingSoon}>3D Models Management Interface Coming Soon</div>}
          {activeTab === 'analytics' && <div className={styles.comingSoon}>Analytics Dashboard Coming Soon</div>}
          {activeTab === 'payments' && <div className={styles.comingSoon}>Payment Management Interface Coming Soon</div>}
          {activeTab === 'settings' && <div className={styles.comingSoon}>Settings Interface Coming Soon</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;