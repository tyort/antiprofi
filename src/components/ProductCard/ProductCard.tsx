import React from 'react';
import './ProductCard.css';

interface ProductDescriptionSection {
  title: string;
  items: string[];
}

interface ProductDescriptionStructured {
  intro: string;
  sections: ProductDescriptionSection[];
}

interface ProductCardProps {
  id: number;
  name: string;
  description: string | ProductDescriptionStructured;
  image: string;
}

const renderDescription = (description: string | ProductDescriptionStructured) => {
  if (typeof description === 'string') {
    return <p className="product-card-description">{description}</p>;
  }

  return (
    <div className="product-card-description">
      <p className="product-card-description-intro">{description.intro}</p>
      {description.sections.map((section) => (
        <div key={section.title} className="product-card-description-section">
          <h3 className="product-card-description-title">{section.title}</h3>
          <ul className="product-card-description-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ name, description, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h2 className="product-card-title">{name}</h2>
        {renderDescription(description)}
      </div>
      <div className="product-card-actions">
        <button className="product-card-button" type="button">
          Подробнее
        </button>
      </div>
    </div>
  );
};
