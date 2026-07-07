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

const PIGODI_PRODUCT_ID = 2;

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return {
      title: 'Услуга не найдена - Antiprofi',
    };
  }

  if (product.id === PIGODI_PRODUCT_ID) {
    return {
      title: 'Пигоди на заказ - Мастер пигоди и мантов | Antiprofi',
      description: 'Пигоди, пьянсе и манты на заказ: домашняя корейская кухня и кейтеринг с приготовлением на вашей кухне по согласованному меню.',
      keywords: ['пигоди', 'пигоди на заказ', 'пьянсе', 'пянсе', 'кейтеринг', 'домашние пигоди', 'корейская кухня', 'манты на заказ'],
      alternates: {
        canonical: '/product/2',
      },
      openGraph: {
        title: 'Пигоди на заказ - Мастер пигоди и мантов | Antiprofi',
        description: 'Домашние пигоди, пьянсе и манты на заказ, а также кейтеринг в стиле корейской кухни.',
        url: '/product/2',
        images: [product.image],
        type: 'article',
      },
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

  const isPigodiPage = product.id === PIGODI_PRODUCT_ID;
  const seoStructuredData = isPigodiPage
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Пигоди на заказ',
        description: 'Услуга приготовления домашних пигоди, пьянсе и мантов, а также кейтеринг на территории заказчика.',
        serviceType: ['Пигоди на заказ', 'Пьянсе', 'Кейтеринг'],
        areaServed: 'RU',
        provider: {
          '@type': 'Organization',
          name: 'Antiprofi',
        },
        url: 'https://anti-profi.ru/product/2',
      }
    : null;

  return (
    <div className="product-details-container">
      {seoStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoStructuredData) }}
        />
      )}
      <div className="product-details-header">
        <Link href="/" className="product-details-back-link">
          <Image src="/images/arrow-back.webp" alt="Назад" width={20} height={20} className="product-details-back-icon" />
          Назад к каталогу
        </Link>
      </div>
      <div className="product-details-card">
        <Image src={product.image} alt={product.name} width={800} height={400} priority sizes="(max-width: 800px) 100vw, 800px" className="product-details-image" />
        <div className="product-details-content">
          <h1 className="product-details-title">{product.name}</h1>
          {renderDescription(product.description)}
          {isPigodiPage && (
            <section className="product-details-seo-block" aria-label="Информация о пигоди на заказ">
              <h2>Пигоди на заказ</h2>
              <p>
                Эта услуга подходит тем, кто ищет домашние пигоди и пьянсе с аутентичным вкусом
                корейской кухни. Приготовление проходит на вашей кухне, с учетом предпочтений по начинке и объему.
              </p>
              <p>
                Если вам нужны пигоди на заказ для семьи, гостей или мероприятия, мы заранее согласуем
                меню, список продуктов и формат подачи, включая кейтеринг для небольших событий.
              </p>
            </section>
          )}
        </div>
      </div>
      <div className="product-details-footer">
        <Link href="/" className="product-details-back-link">
          <Image src="/images/arrow-back.webp" alt="Назад" width={20} height={20} className="product-details-back-icon" />
          Назад к каталогу
        </Link>
      </div>
    </div>
  );
}
