'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { reviews } from '../../data/reviews';
import './ReviewsBlock.css';

export const ReviewsBlock: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      // Find the card closest to the center
      const children = Array.from(container.children[0].children) as HTMLElement[];
      let minDistance = Infinity;
      let newActiveIndex = activeIndex;

      children.forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize active index after mount
    setTimeout(handleScroll, 100);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

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
          &larr;
        </button>
        <div className="reviews-slider-container" ref={scrollContainerRef}>
          <div className="reviews-slider">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} {...review} isActive={index === activeIndex} />
            ))}
          </div>
        </div>
        <button 
          className={`reviews-control-btn next-btn ${activeIndex === reviews.length - 1 ? 'hidden' : ''}`} 
          onClick={scrollRight} 
          aria-label="Следующий отзыв"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
};
