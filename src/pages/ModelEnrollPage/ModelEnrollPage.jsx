import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ModelEnrollPage.module.css";
import img from "../../images/img.jpg"; // Default fallback image
import { jsPDF } from "jspdf"; // Add jsPDF import
import PurchaseConfirmation from "../../components/PurchaseConfirmation/PurchaseConfirmation";

function ModelEnrollPage() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        // Fix: Use template literal for URL
        const response = await axios.get(`https://eduviz-backend-1.onrender.com/api/models/${modelId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Fix: Proper string interpolation
          withCredentials: true,
        });

        const modelData = response.data;

        let imageUrl = img; // Default fallback
        if (modelData.modelCover && modelData.modelCover !== "default_cover.jpg") {
          try {
            // Fix: Use template literal for URL
            const imageResponse = await fetch(`https://eduviz-backend-1.onrender.com/model/${modelData.modelCover}`, {
              headers: { Authorization: `Bearer ${token}` }, // Fix: Proper string interpolation
              credentials: "include",
            });
            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              imageUrl = URL.createObjectURL(blob);
            } else {
              // Fix: Use template literal for console.warn
              console.warn(`Failed to fetch model cover for ID ${modelData.modelCover}`);
            }
          } catch (error) {
            // Fix: Use template literal for console.error
            console.error(`Error fetching model cover for ID ${modelData.modelCover}:`, error);
          }
        }

        setModel({
          id: modelData.id,
          title: modelData.title,
          price: `₹${modelData.price}`, // Assuming price is a number
          imageUrl,
          category: modelData.category,
          difficulty: modelData.difficulty,
          description: modelData.description,
          instructor: "EduViz Instructor",
          lastUpdated: modelData.createdAt
            ? new Date(modelData.createdAt).toLocaleDateString()
            : "Unknown",
          learningPoints: modelData.learningPoints || [],
          isNew: new Date() - new Date(modelData.createdAt) < 7 * 24 * 60 * 60 * 1000,
        });
      } catch (error) {
        // Fix: Use template literal for console.error
        console.error(`Error fetching model ${modelId}:`, error);
        setModel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  const checkEnrolledStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token || !model) return false;

    try {
      const response = await axios.get("https://eduviz-backend-1.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }, // Fix: Proper string interpolation
        withCredentials: true,
      });
      const enrolledCourses = response.data.enrolledCourses || [];
      return enrolledCourses.includes(model.id);
    } catch (error) {
      console.error("Error checking enrolled status:", error);
      return false;
    }
  };


  const handleBuyNow = async () => {
    if (!model || paymentLoading) return;

    const isAlreadyEnrolled = await checkEnrolledStatus();
    if (isAlreadyEnrolled) {
      alert("You have already enrolled in this course.");
      return;
    }

    setPaymentLoading(true);
    try {
      const amountInRupees = parseFloat(model.price.replace("₹", ""));

      const { data: keyData } = await axios.get("https://eduviz-backend-1.onrender.com/key");
      const { key } = keyData;

      const { data: orderData } = await axios.post("https://eduviz-backend-1.onrender.com/process", {
        amount: amountInRupees,
      });
      const { order } = orderData;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "EduViz Learning Platform",
        // Fix: Use template literal for description
        description: `Purchase: ${model.title}`,
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment success response:", response);
          try {
            const token = localStorage.getItem("token");
            if (!token || !model || !model.id) {
              throw new Error("Invalid session or model data");
            }

            console.log("Enrolling course with modelId:", model.id);
            await axios.post(
              "https://eduviz-backend-1.onrender.com/api/users/enroll",
              { modelId: model.id },
              {
                headers: { Authorization: `Bearer ${token}` }, // Fix: Proper string interpolation
                withCredentials: true,
              }
            );

            // Set purchase details and show confirmation
            setPurchaseDetails({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              model: model,
            });
            setShowConfirmation(true);

          } catch (error) {
            console.error("Error enrolling course:", error.response ? error.response.data : error.message);
            alert(
              error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Payment successful, but failed to enroll course. Please contact support."
            );
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "+917806895713",
        },
        theme: {
          color: "#3399cc",
        },
        notes: {
          modelId: model.id,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        console.error(response.error);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!model || !model.id) {
      console.error("Model data is invalid or not loaded");
      alert("Model data is not available. Please try again.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        alert("Please log in to add to wishlist.");
        return;
      }

      console.log("Adding to wishlist with modelId:", model.id);
      await axios.post(
        "https://eduviz-backend-1.onrender.com/api/users/wishlist",
        { modelId: model.id },
        {
          headers: { Authorization: `Bearer ${token}` }, // Fix: Proper string interpolation
          withCredentials: true,
        }
      );
      setIsAddedToCart(true);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to wishlist:", error.response ? error.response.data : error.message);
      alert(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Failed to add to wishlist. Please try again."
      );
    }
  };

  const handleBackToMarketplace = () => {
    navigate("/learner");
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading model details...</div>;
  }

  if (!model) {
    return (
      <div className={styles.errorContainer}>
        <h2>Model not found</h2>
        <button className={styles.backButton} onClick={handleBackToMarketplace}>
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.modelEnrollContainer}>
        <button className={styles.backButton} onClick={handleBackToMarketplace}>
          ← Back to Marketplace
        </button>

        <div className={styles.modelHeader}>
          <h1 className={styles.modelTitle}>{model.title}</h1>
          {model.isNew && <span className={styles.newBadge}>NEW</span>}
          <div className={styles.modelMeta}>
            <span className={styles.category}>{model.category}</span>
            <span className={styles.difficulty}>{model.difficulty}</span>
            <span className={styles.instructor}>By {model.instructor}</span>
            <span className={styles.updated}>Last updated: {model.lastUpdated}</span>
          </div>
        </div>

        <div className={styles.modelContent}>
          <div className={styles.modelPreview}>
            <div className={styles.modelImageContainer}>
              <img
                src={model.imageUrl}
                alt={model.title}
                className={styles.modelImage}
                onError={(e) => {
                  e.target.src = img;
                }}
              />
            </div>
            <div className={styles.pricingCard}>
              <h2 className={styles.priceTag}>{model.price}</h2>
              <div className={styles.actionButtons}>
                <button
                  className={styles.buyButton}
                  onClick={handleBuyNow}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Processing..." : "Buy Now"}
                </button>
                <button
                  // Fix: Correct className syntax
                  className={`${styles.cartButton} ${isAddedToCart ? styles.added : ""}`}
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.modelDescription}>
            <div className={styles.descriptionBox}>
              <h2 className={styles.sectionTitle}>About this 3D Model</h2>
              <p className={styles.descriptionText}>{model.description}</p>
            </div>

            <div className={styles.learningPoints}>
              <h2 className={styles.sectionTitle}>What You'll Learn</h2>
              <ul className={styles.learningList}>
                {model.learningPoints.map((point, index) => (
                  <li key={index} className={styles.learningItem}>
                    <span className={styles.checkmark}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PurchaseConfirmation
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          navigate("/learner");
        }}
        purchaseDetails={purchaseDetails}
      />
    </div>
  );
}

export default ModelEnrollPage;