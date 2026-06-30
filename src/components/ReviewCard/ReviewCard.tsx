import React, { useState, useEffect, useRef } from 'react';
import { Review } from '../../data/reviews';
import './ReviewCard.css';

interface ReviewCardProps extends Review {
  isActive?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ name, age, text, type, avatarInitials, isActive = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if text is truncated
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [text, isActive]); // Re-check when card becomes active (resizes)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`review-card ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
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
        <div className={`review-card-text ${isExpanded ? 'expanded' : ''}`} ref={textRef}>
          "{text}"
        </div>
        {(isTruncated || isExpanded) && (
          <button className="review-card-read-more" onClick={toggleExpand}>
            {isExpanded ? 'Скрыть' : 'Читать весь отзыв'}
          </button>
        )}
      </div>
    </div>
  );
};
