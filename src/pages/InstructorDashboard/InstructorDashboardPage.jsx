import React, { useState, useRef, useEffect } from "react";
import styles from "./InstructorDashboard.module.css";
import SettingPage from "../SettingPage/SettingsPage"
import WelcomePage from "./WelcomePage";
import AnalyticsPage from "./Analytics/AnalyticsPage";
import { useNavigate } from "react-router-dom";
import InstructorMessaging from "./Messages/InstructorMessaging";

function CreateModelForm({ onModelCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [mainModel, setMainModel] = useState(null);
  const [modelCover, setModelCover] = useState(null);
  const [keyframes, setKeyframes] = useState("");
  const [framesPerSecond, setFramesPerSecond] = useState("24");
  const [price, setPrice] = useState(0);
  const [difficulty, setDifficulty] = useState("Advanced");
  const [parts, setParts] = useState([]);
  const [learningPoints, setLearningPoints] = useState([]);
  const [newPart, setNewPart] = useState({
    title: "",
    description: "",
    uses: "",
    model: null,
  });
  const [newLearningPoint, setNewLearningPoint] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const userData = JSON.parse(jsonPayload);
        console.log("Decoded user data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid token detected. Please log in again.");
        navigate("/login");
      }
    } else {
      console.warn("No token found in localStorage. Redirecting to login.");
      alert("Please log in to access this page.");
      navigate("/login");
    }
  }, [navigate]);

  const mainModelInputRef = useRef(null);
  const modelCoverInputRef = useRef(null);
  const partModelInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "instructor") {
      alert("You must be logged in as an instructor to create models");
      return;
    }

    if (modelCover && !modelCover.type.startsWith("image/")) {
      alert("Please upload a valid image file for the model cover.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("keyframes", keyframes);
    formData.append("framesPerSecond", framesPerSecond);
    formData.append("price", price);
    formData.append("currency", "INR");
    formData.append("difficulty", difficulty);
    formData.append("learningPoints", JSON.stringify(learningPoints.map((point) => point.text)));
    formData.append("instructorId", user.id);

    if (mainModel) formData.append("mainModel", mainModel);
    if (modelCover) formData.append("modelCover", modelCover);

    const partsData = parts.map((part) => ({
      title: part.title,
      description: part.description,
      uses: part.uses,
    }));
    formData.append("partsData", JSON.stringify(partsData));
    parts.forEach((part) => {
      if (part.model) formData.append("parts", part.model);
    });

    try {
      const response = await fetch("https://eduviz-backend-1.onrender.com/create-model", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create model: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      const newModel = {
        id: result.modelId,
        title,
        description,
        category,
        mainModel: mainModel?.name || "No model uploaded",
        modelCover: result.modelCover || "default_cover.jpg",
        keyframes,
        framesPerSecond,
        price,
        difficulty,
        learningPoints: learningPoints.map((point) => point.text),
        parts,
        createdAt: new Date(),
        views: 0,
        isPublished: false,
        instructorId: user.id,
      };

      onModelCreated(newModel);

      setTitle("");
      setDescription("");
      setCategory("");
      setMainModel(null);
      setModelCover(null);
      setKeyframes("");
      setFramesPerSecond("24");
      setPrice(0);
      setDifficulty("Advanced");
      setLearningPoints([]);
      setParts([]);
      setNewLearningPoint("");
    } catch (error) {
      console.error("Error creating model:", error);
      alert(`Failed to create model: ${error.message}`);
    }
  };

  const handleUploadClick = (inputRef) => inputRef.current.click();

  const handleAddPart = () => {
    if (newPart.title && newPart.model) {
      setParts([...parts, { ...newPart, id: Date.now() }]);
      setNewPart({ title: "", description: "", uses: "", model: null });
    }
  };

  const handleRemovePart = (partId) => setParts(parts.filter((part) => part.id !== partId));

  const handleAddLearningPoint = () => {
    if (newLearningPoint.trim()) {
      setLearningPoints([...learningPoints, { text: newLearningPoint, id: Date.now() }]);
      setNewLearningPoint("");
    }
  };

  const handleRemoveLearningPoint = (pointId) =>
    setLearningPoints(learningPoints.filter((point) => point.id !== pointId));

  return (
    <div className={styles.createModelContainer}>
      <h2 className={styles.sectionTitle}>Create New 3D Model</h2>
      <form onSubmit={handleSubmit} className={styles.createModelForm}>
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Basic Information</h3>
          <div className={styles.formGroup}>
            <label>Model Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter model title"
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your 3D model"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="Biology">Biology</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electronics">Electronics</option>
              <option value="Architecture">Architecture</option>
              <option value="Astronomy">Astronomy</option>
            </select>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Model Files</h3>
          <div className={styles.formGroup}>
            <label>Upload Main 3D Model</label>
            <div className={styles.uploadContainer}>
              <input
                type="file"
                accept=".glb,.gltf,.fbx,.obj"
                onChange={(e) => setMainModel(e.target.files[0])}
                ref={mainModelInputRef}
                className={styles.hiddenFileInput}
              />
              <div className={styles.uploadIcon} onClick={() => handleUploadClick(mainModelInputRef)}>
                <span>↑</span>
              </div>
              {mainModel && <span className={styles.fileName}>{mainModel.name}</span>}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Upload Model Cover Image</label>
            <div className={styles.uploadContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setModelCover(e.target.files[0])}
                ref={modelCoverInputRef}
                className={styles.hiddenFileInput}
              />
              <div className={styles.uploadIcon} onClick={() => handleUploadClick(modelCoverInputRef)}>
                <span>↑</span>
              </div>
              {modelCover && <span className={styles.fileName}>{modelCover.name}</span>}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Keyframes</label>
              <input
                type="text"
                value={keyframes}
                onChange={(e) => setKeyframes(e.target.value)}
                placeholder="Number of keyframes"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Frames Per Second</label>
              <input
                type="text"
                value={framesPerSecond}
                onChange={(e) => setFramesPerSecond(e.target.value)}
                placeholder="FPS"
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Price (INR)</label>
              <div className={styles.currencyInput}>
                <span className={styles.currencySymbol}>₹</span>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Learning Points</h3>
          <div className={styles.addPartForm}>
            <h4>Add New Learning Point</h4>
            <div className={styles.formGroup}>
              <label>Learning Point</label>
              <input
                type="text"
                value={newLearningPoint}
                onChange={(e) => setNewLearningPoint(e.target.value)}
                placeholder="Enter a learning point"
              />
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleAddLearningPoint}
              disabled={!newLearningPoint.trim()}
            >
              Add Learning Point
            </button>
          </div>
          {learningPoints.length > 0 && (
            <div className={styles.partsListContainer}>
              <h4>Added Learning Points ({learningPoints.length})</h4>
              <div className={styles.partsList}>
                {learningPoints.map((point, index) => (
                  <div key={point.id} className={styles.partCard}>
                    <div className={styles.partCardHeader}>
                      <span className={styles.partNumber}>{index + 1}</span>
                      <h5 className={styles.partTitle}>{point.text}</h5>
                      <button
                        type="button"
                        className={styles.removePartButton}
                        onClick={() => handleRemoveLearningPoint(point.id)}
                        aria-label="Remove learning point"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Model Parts</h3>
          <div className={styles.addPartForm}>
            <h4>Add New Part</h4>
            <div className={styles.formGroup}>
              <label>Part Title</label>
              <input
                type="text"
                value={newPart.title}
                onChange={(e) => setNewPart({ ...newPart, title: e.target.value })}
                placeholder="Enter part title"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Part Description</label>
              <textarea
                value={newPart.description}
                onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                placeholder="Describe this part"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Part Uses</label>
              <textarea
                value={newPart.uses}
                onChange={(e) => setNewPart({ ...newPart, uses: e.target.value })}
                placeholder="Describe how this part can be used"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Upload Part Model</label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  accept=".glb,.gltf,.fbx,.obj"
                  onChange={(e) => setNewPart({ ...newPart, model: e.target.files[0] })}
                  ref={partModelInputRef}
                  className={styles.hiddenFileInput}
                />
                <div className={styles.uploadIcon} onClick={() => handleUploadClick(partModelInputRef)}>
                  <span>↑</span>
                </div>
                {newPart.model && <span className={styles.fileName}>{newPart.model.name}</span>}
              </div>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleAddPart}
              disabled={!newPart.title || !newPart.model}
            >
              Add Part
            </button>
          </div>
          {parts.length > 0 && (
            <div className={styles.partsListContainer}>
              <h4>Added Parts ({parts.length})</h4>
              <div className={styles.partsList}>
                {parts.map((part, index) => (
                  <div key={part.id} className={styles.partCard}>
                    <div className={styles.partCardHeader}>
                      <span className={styles.partNumber}>{index + 1}</span>
                      <h5 className={styles.partTitle}>{part.title}</h5>
                      <button
                        type="button"
                        className={styles.removePartButton}
                        onClick={() => handleRemovePart(part.id)}
                        aria-label="Remove part"
                      >
                        ×
                      </button>
                    </div>
                    <div className={styles.partCardBody}>
                      <p className={styles.partDescription}>{part.description}</p>
                      {part.uses && (
                        <p className={styles.partUses}>
                          <strong>Uses:</strong> {part.uses}
                        </p>
                      )}
                      <div className={styles.partFile}>
                        <span className={styles.fileIcon}>📄</span>
                        <span className={styles.fileName}>{part.model.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryButton}>
            Create Model
          </button>
          <button type="button" className={styles.secondaryButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function InstructorDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [models, setModels] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndModels = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage. Redirecting to login.");
        alert("Please log in to access this page.");
        navigate("/login");
        return;
      }
    
      try {
        // Decode token to get user data
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const userData = JSON.parse(jsonPayload);
        console.log("Decoded user data:", userData);
        setUser(userData);
    
        // Fetch models directly without filtering by createdCourses
        const response = await fetch(
          `https://eduviz-backend-1.onrender.com/api/models/instructor/${userData.id}`,
          { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
        );
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Model fetch failed:", response.status, errorText);
          throw new Error(`Failed to fetch models: ${response.status} - ${errorText}`);
        }
    
        const modelData = await response.json();
        console.log("Raw model data from API:", modelData);
        
        // Use models directly without filtering
        if (Array.isArray(modelData)) {
          setModels(modelData);
        } else {
          setModels([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(`Error loading dashboard: ${error.message}. Please log in again or contact support.`);
        navigate("/login");
      }
    };
    fetchUserAndModels();
  }, [navigate]);

  const handleMenuClick = (menuItem) => setActiveMenuItem(menuItem);

  const handleModelCreated = async (newModel) => {
    try {
      // First, add the new model directly to the state for immediate feedback
      setModels(prevModels => [...prevModels, newModel]);
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token available.");
      }
  
      // Directly fetch the models without filtering
      const response = await fetch(
        `https://eduviz-backend-1.onrender.com/api/models/instructor/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch updated models: ${response.status} - ${errorText}`);
      }
  
      const updatedModels = await response.json();
      console.log("Raw updated models from API:", updatedModels);
      
      // Set models directly without filtering
      if (Array.isArray(updatedModels)) {
        setModels(updatedModels);
      }
    } catch (error) {
      console.error("Error fetching updated models:", error);
      alert(`Error updating models: ${error.message}. Please try again or log in.`);
      if (error.message.includes("authentication") || error.message.includes("token")) {
        navigate("/login");
      }
    }
    setActiveMenuItem("My Models");
  };
  const togglePublishStatus = (id) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, isPublished: !model.isPublished } : model
      )
    );
  };

  const ModelManagement = () => (
    <div className={styles.modelManagement}>
      <div className={styles.modelListHeader}>
        <h2 className={styles.sectionTitle}>My 3D Models</h2>
        <button
          className={styles.primaryButton}
          onClick={() => setActiveMenuItem("Create Model")}
        >
          Create New Model
        </button>
      </div>
      <div className={styles.modelGrid}>
        {models.map((model) => (
          <div key={model.id} className={styles.modelCard}>
            <div className={styles.modelCardHeader}>
              <h3>{model.title}</h3>
              <span
                className={`${styles.publishBadge} ${
                  model.isPublished ? styles.published : styles.draft
                }`}
              >
                {model.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <div className={styles.modelCardContent}>
              <div className={styles.modelMetadata}>
                <span>
                  Created:{" "}
                  {new Date(model.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>Views: {model.views}</span>
                <span>Parts: {model.parts?.length || 0}</span>
                <span>Price: ₹{model.price || 0}</span>
                <span>Difficulty: {model.difficulty || "N/A"}</span>
              </div>
            </div>
            <div className={styles.modelCardActions}>
              <button
                className={styles.secondaryButton}
                onClick={() => togglePublishStatus(model.id)}
              >
                {model.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button className={styles.tertiaryButton}>Edit Model</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.logoContainer}>
            <h2 className={styles.logo}>EduViz</h2>
          </div>
          <nav className={styles.sidebarNav}>
            <ul className={styles.menuList}>
              {["Dashboard", "My Models", "Create Model","Messages","Analytics", "Settings"].map((item) => (
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
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            {activeMenuItem !== "Dashboard" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
          </header>
          {activeMenuItem === "Dashboard" && <WelcomePage models={models} />}
          {activeMenuItem === "My Models" && <ModelManagement />}
          {activeMenuItem === "Create Model" && (
            <CreateModelForm
              onModelCreated={handleModelCreated}
              onCancel={() => setActiveMenuItem("My Models")}
            />
          )}
          {activeMenuItem === "Messages" && <InstructorMessaging />}
          {activeMenuItem === "Analytics" && (
            <AnalyticsPage />
          )}
          {activeMenuItem === "Settings" && <SettingPage />}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;