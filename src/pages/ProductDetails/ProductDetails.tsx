import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { products } from '../../data/products';
import './ProductDetails.css';

interface ProductDescriptionSection {
  title: string;
  items: string[];
}

interface ProductDescriptionStructured {
  intro: string;
  sections: ProductDescriptionSection[];
}

const renderDescription = (description: string | ProductDescriptionStructured) => {
  if (typeof description === 'string') {
    return <p className="product-details-description">{description}</p>;
  }

  return (
    <div className="product-details-description">
      <p className="product-details-description-intro">{description.intro}</p>
      {description.sections.map((section) => (
        <div key={section.title} className="product-details-description-section">
          <h3 className="product-details-description-title">{section.title}</h3>
          <ul className="product-details-description-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <Link to="/" className="product-details-back-link">
          &larr; Назад к каталогу
        </Link>
      </div>
      <div className="product-details-card">
        <img src={product.image} alt={product.name} className="product-details-image" />
        <div className="product-details-content">
          <h1 className="product-details-title">{product.name}</h1>
          {renderDescription(product.description)}
        </div>
      </div>
    </div>
  );
};
