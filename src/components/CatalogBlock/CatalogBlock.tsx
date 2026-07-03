import React from 'react';
import './CatalogBlock.css';

export const CatalogBlock: React.FC = () => {
  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="catalog-content">
        <h2 id="catalog-title" className="catalog-title">Каталог услуг</h2>
        <p className="catalog-text">
          Здесь собраны основные форматы, чтобы было проще сориентироваться по задачам и выбрать
          подходящий вариант. Каждый пункт в каталоге описан без лишних деталей — только то, что
          важно для быстрого понимания.
        </p>
      </div>
    </section>
  );
};
