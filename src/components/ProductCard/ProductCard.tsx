import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

const renderPreviewDescription = (description: string | ProductDescriptionStructured) => {
  if (typeof description === 'string') {
    const preview = description.length > 120 ? `${description.slice(0, 120)}...` : description;

    return <p className="product-card-description">{preview}</p>;
  }

  return <p className="product-card-description">{description.intro}</p>;
};

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, image }) => {
  return (
    <div className="product-card">
      <Image src={image} alt={name} width={400} height={200} className="product-card-image" />
      <div className="product-card-content">
        <h2 className="product-card-title">{name}</h2>
        {renderPreviewDescription(description)}
      </div>
      <div className="product-card-actions">
        <Link href={`/product/${id}`} className="product-card-button">
          Подробнее
        </Link>
      </div>
    </div>
  );
};
