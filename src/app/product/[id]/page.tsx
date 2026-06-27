import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../../data/products';
import './ProductDetails.css';

interface ProductDescriptionSection {
  title: string;
  items: string[];
}

interface ProductDescriptionStructured {
  intro: string;
  sections: ProductDescriptionSection[];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return {
      title: 'Услуга не найдена - Antiprofi',
    };
  }

  return {
    title: `${product.name} - Antiprofi`,
    description: typeof product.description === 'string' ? product.description : product.description.intro,
    openGraph: {
      images: [product.image],
    },
  };
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

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    redirect('/');
  }

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <Link href="/" className="product-details-back-link">
          <Image src="/images/arrow-back.png" alt="Назад" width={20} height={20} className="product-details-back-icon" />
          Назад к каталогу
        </Link>
      </div>
      <div className="product-details-card">
        <Image src={product.image} alt={product.name} width={800} height={400} priority className="product-details-image" />
        <div className="product-details-content">
          <h1 className="product-details-title">{product.name}</h1>
          {renderDescription(product.description)}
        </div>
      </div>
      <div className="product-details-footer">
        <Link href="/" className="product-details-back-link">
          <Image src="/images/arrow-back.png" alt="Назад" width={20} height={20} className="product-details-back-icon" />
          Назад к каталогу
        </Link>
      </div>
    </div>
  );
}
