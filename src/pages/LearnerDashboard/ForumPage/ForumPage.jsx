import React, { useState, useEffect } from "react";
import styles from "./ForumPage.module.css";
import axios from "axios";

function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [myDiscussions, setMyDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General"
  });

  // Sample forum categories
  const forumCategories = [
    "All", 
    "General", 
    "Biology", 
    "Physics", 
    "Chemistry", 
    "Astronomy", 
    "Computer Science", 
    "Help & Support"
  ];

  // Fetch forum discussions
  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        // const response = await axios.get("https://eduviz-backend-1.onrender.com/api/forum/discussions", {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        //   withCredentials: true,
        // });
        // setDiscussions(response.data);
        
        // For now, using mock data
        setTimeout(() => {
          setDiscussions(mockDiscussions);
          setMyDiscussions(mockDiscussions.filter(d => d.author.id === "currentUser"));
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching forum discussions:", error);
        setDiscussions([]);
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  // Handle new post submission
  const handleSubmitPost = (e) => {
    e.preventDefault();
    
    // Create a new post object
    const postData = {
      ...newPost,
      id: `post-${Date.now()}`,
      date: new Date(),
      author: {
        id: "currentUser",
        name: "John Doe",
        avatar: null,
      },
      replies: [],
      likes: 0,
      views: 0
    };

    // Add to discussions
    setDiscussions([postData, ...discussions]);
    setMyDiscussions([postData, ...myDiscussions]);
    
    // Reset form
    setNewPost({
      title: "",
      content: "",
      category: "General"
    });
    setShowNewPostForm(false);
  };

  // Filter discussions based on active category and search query
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = activeCategory === "All" || discussion.category === activeCategory;
    const matchesSearch = 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.forumContainer}>
      {/* Forum Header */}
      <div className={styles.forumHeader}>
        <h1 className={styles.pageTitle}>Community Forum</h1>
        <div className={styles.forumActions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search discussions..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={styles.primaryButton}
            onClick={() => setShowNewPostForm(true)}
          >
            Create New Discussion
          </button>
        </div>
      </div>

      {/* Forum Navigation */}
      <div className={styles.forumNav}>
        <div className={styles.categoryNav}>
          {forumCategories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategoryButton : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.forumStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{discussions.length}</span>
            <span className={styles.statLabel}>Discussions</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {discussions.reduce((acc, disc) => acc + disc.replies.length, 0)}
            </span>
            <span className={styles.statLabel}>Replies</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{myDiscussions.length}</span>
            <span className={styles.statLabel}>My Posts</span>
          </div>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className={styles.newPostFormContainer}>
          <div className={styles.newPostForm}>
            <div className={styles.formHeader}>
              <h3>Create New Discussion</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowNewPostForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitPost}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter discussion title"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newPost.category}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                >
                  {forumCategories.filter(cat => cat !== "All").map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                  className={styles.formTextarea}
                  placeholder="Share your thoughts, questions, or insights..."
                  rows={6}
                />
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setShowNewPostForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forum Content */}
      <div className={styles.forumContent}>
        {loading ? (
          <div className={styles.loadingContainer}>Loading discussions...</div>
        ) : filteredDiscussions.length > 0 ? (
          <div className={styles.discussionsList}>
            {filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className={styles.discussionCard}>
                <div className={styles.discussionVotes}>
                  <button className={styles.voteButton}>▲</button>
                  <span className={styles.voteCount}>{discussion.likes}</span>
                  <button className={styles.voteButton}>▼</button>
                </div>
                <div className={styles.discussionContent}>
                  <h3 className={styles.discussionTitle}>{discussion.title}</h3>
                  <p className={styles.discussionExcerpt}>
                    {discussion.content.length > 150
                      ? `${discussion.content.substring(0, 150)}...`
                      : discussion.content}
                  </p>
                  <div className={styles.discussionMeta}>
                    <span className={styles.discussionCategory}>
                      {discussion.category}
                    </span>
                    <span className={styles.discussionStats}>
                      <span className={styles.repliesCount}>
                        {discussion.replies.length} replies
                      </span>
                      <span className={styles.viewsCount}>
                        {discussion.views} views
                      </span>
                    </span>
                  </div>
                </div>
                <div className={styles.discussionAuthor}>
                  <div className={styles.authorAvatar}>
                    {discussion.author.avatar ? (
                      <img 
                        src={discussion.author.avatar} 
                        alt={discussion.author.name} 
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {discussion.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>
                      {discussion.author.name}
                    </span>
                    <span className={styles.discussionDate}>
                      {formatDate(discussion.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No discussions found for this category or search query.</p>
            <button 
              className={styles.primaryButton}
              onClick={() => setShowNewPostForm(true)}
            >
              Start a New Discussion
            </button>
          </div>
        )}
      </div>

      {/* Trending Topics */}
      <div className={styles.trendingTopics}>
        <h3 className={styles.sectionTitle}>Trending Topics</h3>
        <div className={styles.topicsList}>
          {trendingTopics.map((topic) => (
            <div key={topic.id} className={styles.topicItem}>
              <span className={styles.topicTitle}>{topic.title}</span>
              <span className={styles.topicActivity}>{topic.activity} posts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Utility function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes === 0 ? 'Just now' : `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Mock data for discussions
const mockDiscussions = [
  {
    id: "disc-1",
    title: "Understanding 3D Models of DNA Structure",
    content: "I've been exploring the DNA structure model, but I'm having trouble understanding how the base pairs connect. Can someone explain the hydrogen bonding in a more visual way?",
    category: "Biology",
    date: new Date(Date.now() - 3600000 * 24), // 1 day ago
    author: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: null
    },
    replies: [
      {
        id: "reply-1",
        content: "The hydrogen bonds between base pairs are represented by the dashed lines in the model. If you rotate the view and zoom in, you can see them more clearly.",
        date: new Date(Date.now() - 3600000 * 12), // 12 hours ago
        author: {
          id: "user-2",
          name: "Prof. Smith",
          avatar: null
        }
      }
    ],
    likes: 15,
    views: 87
  },
  {
    id: "disc-2",
    title: "Physics Simulation Not Loading Properly",
    content: "When I try to load the 'Forces and Motion' simulation, I get a black screen. Has anyone else encountered this issue? I'm using Chrome on Windows 10.",
    category: "Physics",
    date: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    author: {
      id: "currentUser",
      name: "John Doe",
      avatar: null
    },
    replies: [
      {
        id: "reply-2",
        content: "Try clearing your browser cache or using an incognito window. The WebGL might be blocked.",
        date: new Date(Date.now() - 3600000 * 1), // 1 hour ago
        author: {
          id: "user-3",
          name: "Tech Support",
          avatar: null
        }
      },
      {
        id: "reply-3",
        content: "I had the same issue. Updating my graphics drivers fixed it for me.",
        date: new Date(Date.now() - 3600000 * 0.5), // 30 minutes ago
        author: {
          id: "user-4",
          name: "Emma Wilson",
          avatar: null
        }
      }
    ],
    likes: 8,
    views: 42
  },
  {
    id: "disc-3",
    title: "Looking for Advanced Astronomy Models",
    content: "I've completed all the basic astronomy models. Are there any advanced models that show more detailed planetary movements or galaxy formations?",
    category: "Astronomy",
    date: new Date(Date.now() - 3600000 * 48), // 2 days ago
    author: {
      id: "user-5",
      name: "Stargazer",
      avatar: null
    },
    replies: [],
    likes: 4,
    views: 31
  },
  {
    id: "disc-4",
    title: "Chemical Reaction Simulation Tips",
    content: "The chemical reaction simulations are amazing! I found that slowing down the speed to 0.5x helps to observe the electron transfers better. Any other tips for getting the most out of these models?",
    category: "Chemistry",
    date: new Date(Date.now() - 3600000 * 72), // 3 days ago
    author: {
      id: "user-6",
      name: "ChemWhiz",
      avatar: null
    },
    replies: [
      {
        id: "reply-4",
        content: "Great tip! I also like to use the 'highlight elements' feature to track specific atoms through the reaction.",
        date: new Date(Date.now() - 3600000 * 48), // 2 days ago
        author: {
          id: "user-7",
          name: "Lab Assistant",
          avatar: null
        }
      }
    ],
    likes: 23,
    views: 119
  },
  {
    id: "disc-5",
    title: "Request: 3D Models for Computer Architecture",
    content: "The Computer Science section has great software models, but I'd love to see some hardware models too. Particularly CPU architecture or memory systems would be really helpful. Any plans for these?",
    category: "Computer Science",
    date: new Date(Date.now() - 3600000 * 96), // 4 days ago
    author: {
      id: "user-8",
      name: "CodeExplorer",
      avatar: null
    },
    replies: [
      {
        id: "reply-5",
        content: "I second this request! Visual models of cache hierarchies would be incredibly useful.",
        date: new Date(Date.now() - 3600000 * 72), // 3 days ago
        author: {
          id: "user-9",
          name: "SiliconSage",
          avatar: null
        }
      }
    ],
    likes: 17,
    views: 64
  },
  {
    id: "disc-6",
    title: "Study Group for Biology Models",
    content: "I'm forming a study group to go through all the biology models together. We'll meet online twice a week to discuss and help each other understand complex concepts. Anyone interested?",
    category: "Biology",
    date: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    author: {
      id: "user-10",
      name: "BioEnthusiast",
      avatar: null
    },
    replies: [
      {
        id: "reply-6",
        content: "I'd love to join! The cell division model particularly confuses me.",
        date: new Date(Date.now() - 3600000 * 8), // 8 hours ago
        author: {
          id: "user-11",
          name: "CellularExplorer",
          avatar: null
        }
      },
      {
        id: "reply-7",
        content: "Count me in! What platform will we be using to meet?",
        date: new Date(Date.now() - 3600000 * 6), // 6 hours ago
        author: {
          id: "currentUser",
          name: "John Doe",
          avatar: null
        }
      }
    ],
    likes: 12,
    views: 58
  }
];

// Trending topics data
const trendingTopics = [
  { id: 1, title: "Virtual Reality Integration", activity: 28 },
  { id: 2, title: "Quantum Mechanics Visualizations", activity: 23 },
  { id: 3, title: "Interactive Cell Biology", activity: 19 },
  { id: 4, title: "New Physics Simulation Engine", activity: 15 },
  { id: 5, title: "Tips for First-Time Users", activity: 12 }
];

export default ForumPage;