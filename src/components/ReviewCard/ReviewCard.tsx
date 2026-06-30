import React, { useState, useEffect, useRef } from 'react';
import { Review } from '../../data/reviews';
import './ReviewCard.css';

interface ReviewCardProps extends Review {
  isActive?: boolean;
  onReadMore?: () => void;
  onClick?: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ name, age, text, type, avatarInitials, isActive = false, onReadMore, onClick }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if text is truncated
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [text, isActive]); // Re-check when card becomes active (resizes)

  return (
    <div className={`review-card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="review-card-header">
        <div className="review-card-avatar">
          {avatarInitials}
        </div>
        <div className="review-card-info">
          <div className="review-card-name">{name}, {age}</div>
          <div className={`review-card-badge ${type === 'Антипрофи' ? 'badge-antiprofi' : 'badge-customer'}`}>
            {type}
          </div>
        </div>
      </div>
      <div className="review-card-content">
        <div className="review-card-text" ref={textRef}>
          "{text}"
        </div>
        {isTruncated && (
          <button className="review-card-read-more" onClick={(e) => {
            e.stopPropagation();
            if (onReadMore) onReadMore();
          }}>
            Читать весь отзыв
          </button>
        )}
      </div>
    </div>
  );
};
