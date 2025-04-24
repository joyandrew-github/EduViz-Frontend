import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes, FaRupeeSign } from 'react-icons/fa';
import jsPDF from 'jspdf';
import styles from './PurchaseConfirmation.module.css';

const PurchaseConfirmation = ({ isOpen, onClose, purchaseDetails }) => {
  if (!isOpen || !purchaseDetails) return null;

  const downloadReceipt = () => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add background color/graphic
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add colored header band
    doc.setFillColor(51, 153, 204); // EduViz blue color
    doc.rect(0, 0, 210, 40, 'F');
    
    // Add EduViz logo/header with drop shadow effect
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('EduViz Learning Platform', 105, 20, { align: 'center' });
    
    // Add receipt title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text('Purchase Receipt', 105, 55, { align: 'center' });
    
    // Add divider line
    doc.setDrawColor(51, 153, 204);
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);
    
    // Add date in formatted style
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(85, 85, 85);
    doc.text(`Date: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`, 20, 75);
    
    // Add receipt ID with modern formatting
    doc.setFont('helvetica', 'italic');
    doc.text(`Receipt #: INV-${purchaseDetails.orderId.substring(0, 8)}`, 190, 75, { align: 'right' });
    
    // Create styled section for payment details
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(20, 85, 170, 50, 3, 3, 'F');
    
    // Add payment details with improved formatting
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text('Payment Details', 30, 100);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(85, 85, 85);
    doc.text(`Order ID:`, 30, 115);
    doc.text(`Payment ID:`, 30, 125);
    
    // Add payment values in bold
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text(`${purchaseDetails.orderId}`, 90, 115);
    doc.text(`${purchaseDetails.paymentId}`, 90, 125);
    
    // Create styled section for model details
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(20, 145, 170, 80, 3, 3, 'F');
    
    // Add model details with improved formatting
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text('Model Details', 30, 160);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(85, 85, 85);
    doc.text(`Title:`, 30, 175);
    doc.text(`Category:`, 30, 185);
    doc.text(`Difficulty:`, 30, 195);
    doc.text(`Price:`, 30, 205);
    
    // Add model values in bold
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.text(`${purchaseDetails.model?.title || 'N/A'}`, 90, 175);
    doc.text(`${purchaseDetails.model?.category || 'N/A'}`, 90, 185);
    doc.text(`${purchaseDetails.model?.difficulty || 'N/A'}`, 90, 195);
    
    // Add price with currency symbol in highlight color
    doc.setTextColor(51, 153, 204);
    doc.text(`₹ ${purchaseDetails.model?.price || '0'}`, 90, 205);
    
    // Add payment status with colored badge effect
    doc.setFillColor(39, 174, 96); // Green color
    doc.roundedRect(20, 235, 80, 15, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Payment Status: Successful', 30, 245);
    
    // Add decorated footer
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, 270, 190, 270);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for learning with EduViz!', 105, 280, { align: 'center' });
    
    // Add additional footer text
    doc.setFontSize(8);
    doc.text('If you have any questions, please contact support@eduviz.com', 105, 285, { align: 'center' });
    
    // Save the PDF with improved filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    doc.save(`EduViz_Receipt_${purchaseDetails.orderId}_${timestamp}.pdf`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={styles.modalContent}
          >
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              <FaTimes className={styles.closeIcon} />
            </button>

            <div className={styles.successHeader}>
              <FaCheckCircle className={styles.successIcon} />
              <h2 className={styles.successTitle}>Purchase Successful!</h2>
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.paymentDetails}>
                <h3 className={styles.sectionTitle}>Payment Details</h3>
                <div className={styles.detailsList}>
                  <p className={styles.detailItem}>
                    <span className={styles.detailLabel}>Order ID:</span>
                    <span className={styles.detailValue}>{purchaseDetails.orderId}</span>
                  </p>
                  <p className={styles.detailItem}>
                    <span className={styles.detailLabel}>Payment ID:</span>
                    <span className={styles.detailValue}>{purchaseDetails.paymentId}</span>
                  </p>
                </div>
              </div>

              <div className={styles.modelDetails}>
                <h3 className={styles.sectionTitle}>Model Details</h3>
                <div className={styles.modelInfo}>
                  <img
                    src={purchaseDetails.model?.imageUrl}
                    alt={purchaseDetails.model?.title}
                    className={styles.modelImage}
                  />
                  <div className={styles.modelText}>
                    <h4 className={styles.modelTitle}>{purchaseDetails.model?.title}</h4>
                    <p className={styles.modelCategory}>{purchaseDetails.model?.category}</p>
                    <p className={styles.modelDifficulty}>Difficulty: {purchaseDetails.model?.difficulty}</p>
                    <div className={styles.modelPrice}>
                      <FaRupeeSign className={styles.rupeeIcon} />
                      {purchaseDetails.model?.price}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.paymentStatus}>
                <div className={styles.statusContainer}>
                  <span className={styles.statusLabel}>Payment Status</span>
                  <span className={styles.statusBadge}>
                    Successful
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={onClose}
                className={styles.closeActionButton}
              >
                Close
              </button>
              <button
                onClick={downloadReceipt}
                className={styles.downloadButton}
              >
                Download Receipt
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseConfirmation;