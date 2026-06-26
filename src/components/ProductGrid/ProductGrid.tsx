import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="product-grid-container">
      <h1 className="product-grid-title">Наши услуги</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
