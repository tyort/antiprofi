'use client';

import dynamic from 'next/dynamic';

const CatalogBlock = dynamic(
  () => import('../CatalogBlock/CatalogBlock').then((module) => module.CatalogBlock),
  {
    ssr: false,
    loading: () => <section aria-hidden="true" style={{ minHeight: 520 }} />,
  }
);

const ReviewsBlock = dynamic(
  () => import('../ReviewsBlock/ReviewsBlock').then((module) => module.ReviewsBlock),
  {
    ssr: false,
    loading: () => <section aria-hidden="true" style={{ minHeight: 460 }} />,
  }
);

export function HomeDeferredSections() {
  return (
    <>
      <CatalogBlock />
      <ReviewsBlock />
    </>
  );
}
