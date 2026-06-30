'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { reviews, Review } from '../../data/reviews';
import './ReviewsBlock.css';

export const ReviewsBlock: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedReview]);

  useEffect(() => {
    if (!selectedReview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedReview(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedReview]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const children = Array.from(container.children[0].children) as HTMLElement[];
      let minDistance = Infinity;
      let newActiveIndex = -1;

      children.forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      if (newActiveIndex !== -1) {
        setActiveIndex(prev => prev !== newActiveIndex ? newActiveIndex : prev);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize active index after mount
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // scroll to previous item, considering gap
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const children = Array.from(container.children[0].children) as HTMLElement[];
    const child = children[index];
    if (child) {
      const containerRect = container.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();
      
      const scrollOffset = childRect.left - containerRect.left - (containerRect.width / 2) + (childRect.width / 2);
      
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="reviews-section">
      <div className="reviews-header-wrapper">
        <h2 className="reviews-title">Отзывы</h2>
      </div>
      <div className="reviews-content-wrapper">
        <button 
          className={`reviews-control-btn prev-btn ${activeIndex === 0 ? 'hidden' : ''}`} 
          onClick={scrollLeft} 
          aria-label="Предыдущий отзыв"
        >
          <Image src="/images/arrow.png" alt="" width={80} height={80} style={{ transform: 'scaleX(-1)' }} />
        </button>
        <div className="reviews-slider-container" ref={scrollContainerRef}>
          <div className="reviews-slider">
            {reviews.map((review, index) => (
              <ReviewCard 
                key={review.id} 
                {...review} 
                isActive={index === activeIndex} 
                onReadMore={() => setSelectedReview(review)}
                onClick={() => {
                  if (index !== activeIndex) {
                    scrollToIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <button 
          className={`reviews-control-btn next-btn ${activeIndex === reviews.length - 1 ? 'hidden' : ''}`} 
          onClick={scrollRight} 
          aria-label="Следующий отзыв"
        >
          <Image src="/images/arrow.png" alt="" width={80} height={80} />
        </button>
      </div>

      {selectedReview && (
        <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="review-modal-close" onClick={() => setSelectedReview(null)} aria-label="Закрыть">
              &times;
            </button>
            <div className="review-card-header">
              <div className="review-card-avatar">
                {selectedReview.avatarInitials}
              </div>
              <div className="review-card-info">
                <div className="review-card-name">{selectedReview.name}, {selectedReview.age}</div>
                <div className={`review-card-badge ${selectedReview.type === 'Антипрофи' ? 'badge-antiprofi' : 'badge-customer'}`}>
                  {selectedReview.type}
                </div>
              </div>
            </div>
            <div className="review-modal-text">
              &quot;{selectedReview.text}&quot;
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
