import React, { useState, useEffect } from "react";
import styles from "./LearnerDashboard.module.css";
import instructorStyles from "../InstructorDashboard/InstructorDashboard.module.css"; // Import InstructorDashboard styles
import img from "../../images/img.jpg"; // Default fallback image
import { useNavigate } from "react-router-dom";
import SettingsPage from "../SettingPage/SettingsPage";
import axios from "axios";
import ForumPage from "./ForumPage/ForumPage";

function LearnerDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Welcome");
  const [createdModels, setCreatedModels] = useState([]); // Non-enrolled models
  const [enrolledCourses, setEnrolledCourses] = useState([]); // User's enrolled courses
  const [wishlistModels, setWishlistModels] = useState([]); // User's wishlist models
  const [loadingEnrolled, setLoadingEnrolled] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [userName, setUserName] = useState(""); // State for user name
  const navigate = useNavigate();

  // Fetch user data to get enrolledCourses, wishlist IDs, and name
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("https://eduviz-backend-1.onrender.com/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const { enrolledCourses = [], wishlist = [], fullName = "User" } = response.data;
          setUserName(fullName); // Set the user's full name
          setEnrolledCourses([]); // Reset before fetching details
          setWishlistModels([]); // Reset before fetching details
          setLoadingEnrolled(true);
          setLoadingWishlist(true);

          // Fetch details for enrolled courses
          const enrolledDetails = await Promise.all(
            enrolledCourses.map(async (courseId) => {
              try {
                const modelResponse = await axios.get(
                  `https://eduviz-backend-1.onrender.com/api/models/${courseId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                  }
                );
                const modelData = modelResponse.data;
                let imageUrl = img;
                if (modelData.modelCover && modelData.modelCover !== "default_cover.jpg") {
                  try {
                    const imageResponse = await fetch(
                      `https://eduviz-backend-1.onrender.com/model/${modelData.modelCover}`,
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
                    console.error(`Error fetching model cover for ID ${modelData.modelCover}:`, error);
                  }
                }
                return {
                  id: modelData.id,
                  title: modelData.title,
                  price: `₹${modelData.price}`,
                  imageUrl: imageUrl,
                  difficulty: modelData.difficulty,
                  description: modelData.description,
                  category: modelData.category,
                };
              } catch (error) {
                console.error(`Error fetching details for course ${courseId}:`, error);
                return null;
              }
            })
          ).then((results) => results.filter((model) => model !== null));
          setEnrolledCourses(enrolledDetails);

          // Fetch details for wishlist models
          const wishlistDetails = await Promise.all(
            wishlist.map(async (modelId) => {
              try {
                const modelResponse = await axios.get(
                  `https://eduviz-backend-1.onrender.com/api/models/${modelId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                  }
                );
                const modelData = modelResponse.data;
                let imageUrl = img;
                if (modelData.modelCover && modelData.modelCover !== "default_cover.jpg") {
                  try {
                    const imageResponse = await fetch(
                      `https://eduviz-backend-1.onrender.com/model/${modelData.modelCover}`,
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
                    console.error(`Error fetching model cover for ID ${modelData.modelCover}:`, error);
                  }
                }
                return {
                  id: modelData.id,
                  title: modelData.title,
                  price: `₹${modelData.price}`,
                  imageUrl: imageUrl,
                  difficulty: modelData.difficulty,
                  description: modelData.description,
                  category: modelData.category,
                };
              } catch (error) {
                console.error(`Error fetching details for wishlist model ${modelId}:`, error);
                return null;
              }
            })
          ).then((results) => results.filter((model) => model !== null));
          setWishlistModels(wishlistDetails);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setEnrolledCourses([]);
          setWishlistModels([]);
          setUserName("User"); // Fallback name if fetch fails
        } finally {
          setLoadingEnrolled(false);
          setLoadingWishlist(false);
        }
      }
    };

    fetchUserData();
  }, []);

  // Fetch all models and filter out enrolled and wishlist models
  useEffect(() => {
    const fetchAllModels = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, skipping model fetch");
        setCreatedModels([]);
        return;
      }

      try {
        const response = await fetch("https://eduviz-backend-1.onrender.com/api/models/all", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.statusText}`);
        }

        const modelData = await response.json();

        const mappedModels = await Promise.all(
          modelData.map(async (model) => {
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
            return {
              id: model._id,
              title: model.title,
              price: `₹${model.price}`,
              imageUrl: imageUrl,
              difficulty: model.difficulty,
              description: model.description,
              isNew: new Date() - new Date(model.createdAt) < 7 * 24 * 60 * 60 * 1000,
              category: model.category,
              views: model.views,
              instructorId: model.instructorId,
            };
          })
        );

        const enrolledCourseIds = enrolledCourses.map((course) => course.id);
        const wishlistIds = wishlistModels.map((model) => model.id);
        const filteredModels = mappedModels.filter(
          (model) => !enrolledCourseIds.includes(model.id)
        );
        setCreatedModels(filteredModels);
      } catch (error) {
        console.error("Error fetching models:", error);
        setCreatedModels([]);
      }
    };

    fetchAllModels();
  }, [enrolledCourses, wishlistModels]);

  // Handle remove from wishlist
  const handleRemoveFromCart = async (modelId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.put(
          `https://eduviz-backend-1.onrender.com/api/users/wishlist/remove/${modelId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Update wishlistModels state by filtering out the removed model
          setWishlistModels(wishlistModels.filter((model) => model.id !== modelId));
          console.log("Model removed from wishlist");
        }
      } catch (error) {
        console.error("Error removing model from wishlist:", error);
      }
    }
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handlebuttonmodelroute = () => {
    setActiveMenuItem("Marketplace");
  };

  const learningProgress = {
    exploredModels: 4,
    totalModels: 10,
    explorationPercentage: 40,
    nextModel: "Physics of Motion",
    hoursSpent: 15,
  };

  const userStats = [
    { label: "Models Purchased", value: enrolledCourses.length },
    { label: "Models in Cart", value: wishlistModels.length },
  ];

  const WelcomePage = () => (
    <div className={styles.welcomePage}>
      <div className={styles.welcomeHero}>
        <div className={styles.welcomeIntro}>
          <h1 className={styles.welcomeTitle}>Welcome back, {userName}</h1>
          <p className={styles.welcomeSubtitle}>
            Explore interactive 3D models and enhance your visual learning:
          </p>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${learningProgress.explorationPercentage}%` }}
              ></div>
            </div>
            <p className={styles.progressText}>
              {learningProgress.explorationPercentage}% Explored -{" "}
              {learningProgress.exploredModels}/{learningProgress.totalModels}{" "}
              Models
            </p>
          </div>
          <div className={styles.upcomingCourse}>
            <h3>Next to Explore</h3>
            <div className={styles.coursePreview}>
              <div className={styles.coursePreviewIcon}></div>
              <div className={styles.coursePreviewInfo}>
                <h4>{learningProgress.nextModel}</h4>
                <button className={styles.primaryButton}>Start Exploring</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statsOverview}>
          {userStats.map((stat, index) => (
            <div
              className={styles.statCard}
              key={index}
            >
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.recommendedSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended 3D Models</h2>
          <button
            className={styles.textButton}
            onClick={handlebuttonmodelroute}
          >
            Browse Marketplace
          </button>
        </div>
        <div className={styles.modelList}>
        {createdModels.length > 0 ? (
  createdModels.map((model) => (
    <div className={styles.modelCard} key={model.id}>
      <div className={styles.modelImageContainer}>
        <img
          src={model.imageUrl}
          alt={model.title}
          className={styles.modelImage}
          onError={(e) => {
            e.target.src = img;
          }}
        />
        {model.isNew && <span className={styles.modelBadge}>NEW</span>}
      </div>
      <div className={styles.modelContent}>
        <h3 className={styles.modelTitle}>{model.title}</h3>
        <p className={instructorStyles.modelDescription}>{model.description}</p>
        <div className={styles.modelFooter}>
          <div className={styles.modelMetadata}>
            <span className={styles.modelCategory}>{model.category}</span>
            <p className={styles.modelPrice}>{model.price}</p>
          </div>
          <button
            className={styles.modelActionButton}
            onClick={() => navigate(`/model/${model.id}`)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  ))
) : (
  <p className={styles.placeholderText}>No models available.</p>
)}
        </div>
      </div>
      <div className={styles.insightsSection}>
        <h2 className={styles.sectionTitle}>Your Exploration Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <h3>Exploration Streak</h3>
            <div className={styles.streakDisplay}>
              <span className={styles.streakNumber}>5</span>
              <span className={styles.streakText}>days</span>
            </div>
            <p className={styles.insightTip}>
              Keep exploring daily to unlock new achievements!
            </p>
          </div>
          <div className={styles.insightCard}>
            <h3>Weekly Activity</h3>
            <div className={styles.focusChart}>
              <div className={styles.chartBar} style={{ height: "20%" }}></div>
              <div className={styles.chartBar} style={{ height: "35%" }}></div>
              <div className={styles.chartBar} style={{ height: "50%" }}></div>
              <div className={styles.chartBar} style={{ height: "65%" }}></div>
              <div className={styles.chartBar} style={{ height: "30%" }}></div>
              <div className={styles.chartBar} style={{ height: "15%" }}></div>
              <div
                className={`${styles.chartBar} ${styles.active}`}
                style={{ height: "45%" }}
              ></div>
            </div>
            <div className={styles.chartLabels}>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ModelViewer = () => {
    if (loadingEnrolled) {
      return <div className={styles.loadingContainer}>Loading enrolled models...</div>;
    }

    return (
      <div className={styles.modelViewer}>
        <h1 className={styles.pageTitle}>My 3D Models</h1>
        <div className={styles.modelViewerList}>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((model) => (
              <div className={styles.modelViewerCard} key={model.id}>
                <div className={styles.modelViewerImageContainer}>
                  <img
                    src={model.imageUrl}
                    alt={model.title}
                    className={styles.modelViewerImage}
                    onError={(e) => {
                      e.target.src = img;
                    }}
                  />
                  <span className={styles.modelViewerBadge}>Enrolled</span>
                </div>
                <div className={styles.modelViewerContent}>
                  <h3 className={styles.modelViewerTitle}>{model.title}</h3>
                  <p className={styles.modelViewerDescription}>
                    Status: Ready to Learn | Category: {model.category}
                  </p>
                  <div className={styles.modelViewerFooter}>
                    <p className={styles.modelViewerPrice}>{model.price}</p>
                    <button
                      className={styles.modelViewerActionButton}
                      onClick={() => navigate(`/learning/${model.id}`)}
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.placeholderText}>
              You haven't enrolled in any models yet.
            </p>
          )}
        </div>
      </div>
    );
  };

  const CartModel = () => {
    if (loadingWishlist) {
      return <div className={styles.loadingContainer}>Loading wishlist models...</div>;
    }

    return (
      <div className={styles.cartModel}>
        <h1 className={styles.pageTitle}>Cart Models</h1>
        <div className={styles.cartModelList}>
          {wishlistModels.length > 0 ? (
            wishlistModels.map((model) => {
              const isEnrolled = enrolledCourses.some(
                (enrolled) => enrolled.id === model.id
              );
              return (
                <div className={styles.cartModelCard} key={model.id}>
                  <div className={styles.cartModelImageContainer}>
                    <img
                      src={model.imageUrl}
                      alt={model.title}
                      className={styles.cartModelImage}
                      onError={(e) => {
                        e.target.src = img;
                      }}
                    />
                    <span className={styles.cartModelBadge}>In Cart</span>
                  </div>
                  <div className={styles.cartModelContent}>
                    <h3 className={styles.cartModelTitle}>{model.title}</h3>
                    <p className={styles.cartModelDescription}>
                      Status: In Wishlist | Category: {model.category}
                    </p>
                    <div className={styles.cartModelFooter}>
                      <p className={styles.cartModelPrice}>{model.price}</p>
                      {isEnrolled ? (
                        <>
                          <span className={styles.cartModelPurchased}>Purchased</span>
                          <button
                            className={styles.cartModelRemoveButton}
                            onClick={() => handleRemoveFromCart(model.id)}
                          >
                            Remove from Cart
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={styles.cartModelActionButton}
                            onClick={() => navigate(`/model/${model.id}`)}
                          >
                            View Details
                          </button>
                          <button
                            className={styles.cartModelRemoveButton}
                            onClick={() => handleRemoveFromCart(model.id)}
                          >
                            Remove from Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.placeholderText}>
              Your cart is empty. Add models from the Marketplace!
            </p>
          )}
        </div>
      </div>
    );
  };

  const MarketplacePage = () => (
    <div className={styles.marketplacePage}>
      <div className={styles.categoryFilter}>
        {["All", "Biology", "Mechanical", "Electronics", "Architecture", "Astronomy"].map(
          (category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.activeCategoryButton : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>
      <div className={styles.marketplaceHeader}>
        <h2 className={styles.sectionTitle}>3D Model Marketplace</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search models..."
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.modelList}>
      {filteredModels.length > 0 ? (
  filteredModels.map((model) => (
    <div className={styles.modelCard} key={model.id}>
      <div className={styles.modelImageContainer}>
        <img
          src={model.imageUrl}
          alt={model.title}
          className={styles.modelImage}
          onError={(e) => {
            e.target.src = img;
          }}
        />
        {model.isNew && <span className={styles.modelBadge}>NEW</span>}
        <span className={styles.difficultyBadge}>{model.difficulty}</span>
      </div>
      <div className={styles.modelContent}>
        <h3 className={styles.modelTitle}>{model.title}</h3>
        <p className={instructorStyles.modelDescription}>{model.description}</p>
        <div className={styles.modelFooter}>
          <div className={styles.modelMetadata}>
            <span className={styles.modelCategory}>{model.category}</span>
            <p className={styles.modelPrice}>{model.price}</p>
          </div>
          <button
            className={styles.modelActionButton}
            onClick={() => handleModelDetails(model.id)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  ))
) : (
  <p className={styles.placeholderText}>No models available.</p>
)}
      </div>
    </div>
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredModels =
    selectedCategory === "All"
      ? createdModels
      : createdModels.filter((model) => model.category === selectedCategory);
  const handleModelDetails = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.logoContainer}>
            <h2 className={styles.logo}>EduViz</h2>
          </div>
          <nav className={styles.sidebarNav}>
            <ul className={styles.menuList}>
              {["Welcome", "My Models", "Cart Model", "Marketplace", "Forum", "Settings"].map(
                (item) => (
                  <li key={item} className={styles.menuItem}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      className={`${styles.menuButton} ${
                        activeMenuItem === item ? styles.active : ""
                      }`}
                    >
                      <span className={styles.menuText}>{item}</span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            {activeMenuItem !== "Welcome" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
            {activeMenuItem === "My Models" && (
              <div className={styles.headerActions}>
                <button
                  className={styles.modelActionButton}
                  onClick={handlebuttonmodelroute}
                >
                  Explore more
                </button>
              </div>
            )}
            {activeMenuItem === "Cart Model" && (
              <div className={styles.headerActions}>
                <button
                  className={styles.modelActionButton}
                  onClick={handlebuttonmodelroute}
                >
                  Explore more
                </button>
              </div>
            )}
          </header>
          {activeMenuItem === "Welcome" && <WelcomePage />}
          {activeMenuItem === "My Models" && <ModelViewer />}
          {activeMenuItem === "Cart Model" && <CartModel />}
          {activeMenuItem === "Marketplace" && <MarketplacePage />}
          {activeMenuItem === "Forum" && (
            <ForumPage/>
          )}
          {activeMenuItem === "Settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default LearnerDashboard;