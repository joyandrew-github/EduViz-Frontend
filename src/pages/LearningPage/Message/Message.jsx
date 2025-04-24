import React, { useState, useEffect, useRef } from "react";
import styles from "./Message.module.css";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { FaSmile, FaImage, FaTimes } from "react-icons/fa";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const [instructorInfo, setInstructorInfo] = useState({
    online: false,
    lastActive: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageListRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("https://eduviz-backend-1.onrender.com", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Join as student with unique identifier
    const studentId = localStorage.getItem("studentId") || Date.now().toString();
    localStorage.setItem("studentId", studentId);

    socketRef.current.emit("join", {
      userType: "student",
      userId: studentId,
    });

    // Debug socket connection
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server as student");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Listen for new messages
    socketRef.current.on("new-message", (message) => {
      console.log("New message received in student component:", message);
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((m) => m._id === message._id);
        if (!messageExists) {
          console.log("Adding new message to state:", message);
          scrollToBottom();
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    // Remove duplicate event listeners
    socketRef.current.off("instructor-message");
    socketRef.current.off("student-message");

    // Listen for instructor messages only
    socketRef.current.on("instructor-message", (message) => {
      console.log("Instructor message received:", message);
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((m) => m._id === message._id);
        if (!messageExists) {
          console.log("Adding instructor message to state:", message);
          scrollToBottom();
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    // Listen for typing indicators
    socketRef.current.on("typing", (data) => {
      if (data.userType === "instructor") {
        setTypingUsers((prev) => {
          if (data.isTyping && !prev.includes("instructor")) {
            return [...prev, "instructor"];
          } else if (!data.isTyping) {
            return prev.filter((type) => type !== "instructor");
          }
          return prev;
        });
      }
    });

    // Listen for online status updates
    socketRef.current.on("user-status", (users) => {
      const instructor = users.find((u) => u.userType === "instructor");
      if (instructor) {
        setInstructorInfo((prev) => ({
          ...prev,
          online: true,
          lastActive: "Active now",
        }));
      } else {
        setInstructorInfo((prev) => ({
          ...prev,
          online: false,
          lastActive: "Offline",
        }));
      }
    });

    // Load initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://eduviz-backend-1.onrender.com/api/messages");
        console.log("Initial messages loaded:", response.data);
        if (response.data) {
          setMessages(response.data);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchMessages();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave", {
          userType: "student",
          userId: studentId,
        });
        socketRef.current.disconnect();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socketRef.current.emit("typing", true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketRef.current.emit("typing", false);
    }, 2000);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedImage) return;

    try {
      let imageUrl = null;

      if (selectedImage) {
        try {
          const formData = new FormData();
          formData.append("image", selectedImage);

          const uploadResponse = await axios.post(
            "https://eduviz-backend-1.onrender.com/api/messages/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (uploadResponse.data && uploadResponse.data.url) {
            imageUrl = uploadResponse.data.url;
            console.log("Image uploaded successfully:", imageUrl);
          } else {
            throw new Error("Invalid response from image upload");
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          alert("Failed to upload image. Please try again.");
          return;
        }
      }

      const messageData = {
        sender: "student",
        userId: localStorage.getItem("studentId"),
        text: newMessage.trim(),
        image: imageUrl,
        timestamp: new Date(),
        read: false,
      };

      try {
        console.log("Sending student message:", messageData);
        const response = await axios.post(
          "https://eduviz-backend-1.onrender.com/api/messages",
          messageData
        );
        console.log("Message saved to database:", response.data);

        if (response.data && response.data._id) {
          const savedMessage = {
            ...messageData,
            _id: response.data._id,
          };

          socketRef.current.emit("student-message", savedMessage);
          console.log("Emitted student message:", savedMessage);

          setNewMessage("");
          setSelectedImage(null);
          setImagePreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          setIsTyping(false);
          socketRef.current.emit("typing", {
            isTyping: false,
            userType: "student",
          });
        } else {
          throw new Error("Invalid response from message save");
        }
      } catch (messageError) {
        console.error("Error saving message:", messageError);
        alert("Failed to save message. Please try again.");
      }
    } catch (error) {
      console.error("Error in message handling:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add click outside handler for emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiData) => {
    const cursor = messageInputRef.current.selectionStart;
    const text =
      newMessage.slice(0, cursor) +
      emojiData.emoji +
      newMessage.slice(cursor);
    setNewMessage(text);
    messageInputRef.current.focus();
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setModalImage(null);
    setShowImageModal(false);
  };

  // Update message content rendering to handle images
  const renderMessageContent = (message) => {
    const isInstructor = message.sender === "instructor";
    const apiUrl = import.meta.env.VITE_API_URL || "https://eduviz-backend-1.onrender.com";

    return (
      <div
        className={`${styles.messageItem} ${
          isInstructor ? styles.instructorMessage : styles.userMessage
        }`}
      >
        {isInstructor && (
          <div className={styles.messageSenderAvatar}>I</div>
        )}
        <div className={styles.messageContent}>
          {message.text && (
            <p
              className={
                message.text.match(/^(\p{Emoji}|\s)*$/u)
                  ? styles.emojiOnlyMessage
                  : styles.messageText
              }
            >
              {message.text}
            </p>
          )}
          {message.image && (
            <div className={styles.imageWrapper}>
              <img
                src={
                  message.image.startsWith("http")
                    ? message.image
                    : `${apiUrl}${message.image}`
                }
                alt="Shared"
                className={styles.sharedImage}
                onClick={() =>
                  openImageModal(
                    message.image.startsWith("http")
                      ? message.image
                      : `${apiUrl}${message.image}`
                  )
                }
                onError={(e) => {
                  console.error("Image load error:", e);
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
              />
            </div>
          )}
          <div className={styles.messageTime}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {!isInstructor && (
          <div className={styles.messageSenderAvatar}>You</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.messagingContainer}>
      {/* Chat header */}
      <div className={styles.chatHeader}>
        <div className={styles.instructorProfile}>
          <div className={styles.instructorAvatar}>I</div>
          <div className={styles.instructorInfo}>
            <h3 className={styles.instructorName}>Instructor</h3>
          </div>
        </div>
        <div className={styles.instructorStatus}>
          <span
            className={`${styles.statusIndicator} ${
              instructorInfo.online ? styles.online : styles.offline
            }`}
          ></span>
          <span className={styles.statusText}>
            {typingUsers.length > 0 ? "Typing..." : instructorInfo.lastActive}
          </span>
        </div>
      </div>

      {/* Message list */}
      <div className={styles.messageList} ref={messageListRef}>
        {loading ? (
          <div className={styles.loadingMessages}>Loading conversation...</div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message._id}>{renderMessageContent(message)}</div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <div className={styles.messageInputContainer}>
        {imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={removeSelectedImage}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
        <div className={styles.messageComposer}>
          <textarea
            ref={messageInputRef}
            className={styles.messageInput}
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
          />
          <div className={styles.messageControls}>
            <div className={styles.inputActions}>
              <button
                type="button"
                className={styles.emojiButton}
                onClick={toggleEmojiPicker}
              >
                <FaSmile />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className={styles.fileInput}
                accept="image/*"
                onChange={handleImageSelect}
              />
              <button
                type="button"
                className={styles.emojiButton}
                onClick={() => fileInputRef.current.click()}
              >
                <FaImage />
              </button>
              {showEmojiPicker && (
                <div
                  className={styles.emojiPickerContainer}
                  ref={emojiPickerRef}
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    theme="dark"
                    width={300}
                    height={400}
                  />
                </div>
              )}
            </div>
            <button
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === "" && !selectedImage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showImageModal && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Full size"
              className={styles.modalImage}
              onError={(e) => {
                console.error("Modal image load error:", e);
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
              }}
            />
            <button
              className={styles.closeModalButton}
              onClick={closeImageModal}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;