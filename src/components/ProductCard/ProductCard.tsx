import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, description, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h2 className="product-card-title">{name}</h2>
        <p className="product-card-description">{description}</p>
      </div>
      <div className="product-card-actions">
        <button className="product-card-button" type="button">
          Подробнее
        </button>
      </div>
    </div>
  );
};
