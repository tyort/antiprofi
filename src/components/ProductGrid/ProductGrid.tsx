import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

interface ProductDescriptionSection {
  title: string;
  items: string[];
}

interface ProductDescriptionStructured {
  intro: string;
  sections: ProductDescriptionSection[];
}

interface Product {
  id: number;
  name: string;
  description: string | ProductDescriptionStructured;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="product-grid-container">
      <h1 className="product-grid-title">Каталог услуг</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
