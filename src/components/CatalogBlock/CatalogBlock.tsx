'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './CatalogBlock.css';

const serviceNames = [
  'Названивать должнику',
  'Прервать свидание',
  'Позвонить вместо вас',
  'Убраться в квартире',
  'Забрать вещи',
  'Помочь переехать',
  'Отстоять очередь',
  'Тайный покупатель',
  'Выбить скидку',
  'Составить компанию',
  'Приготовить еду'
];

export const CatalogBlock: React.FC = () => {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState('');
  const trimmedCustomService = customService.trim();
  const isCustomServiceEmpty = trimmedCustomService.length === 0;

  const handleServiceClick = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev : [...prev, serviceName]
    );
  };

  const handleCustomServiceSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCustomServiceEmpty) {
      return;
    }

    handleServiceClick(trimmedCustomService);
    setCustomService('');
  };

  const handleServiceRemove = (serviceName: string) => {
    setSelectedServices((prev) => prev.filter((item) => item !== serviceName));
  };

  const handleMakeOrder = () => {
    if (selectedServices.length === 0) {
      return;
    }

    const servicesQuery = encodeURIComponent(JSON.stringify(selectedServices));
    router.push(`/contact?services=${servicesQuery}`);
  };

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="catalog-content">
        <h2 id="catalog-title" className="catalog-title">Каталог услуг</h2>
        <p className="catalog-text">
          Появилась задача, которую не хочется решать самому? Иногда проще нанять человека, чем объяснять друзьям, зачем это вообще нужно. Поэтому мы собрали самые популярные задачи в одном каталоге.
        </p>
        <div className="catalog-tags" role="list" aria-label="Список услуг">
          {serviceNames.map((serviceName) => {
            const isSelected = selectedServices.includes(serviceName);

            return (
              <button
                key={serviceName}
                type="button"
                className={`catalog-tag ${isSelected ? 'catalog-tag--active' : ''}`}
                onClick={() => handleServiceClick(serviceName)}
              >
                {serviceName}
              </button>
            );
          })}
        </div>

        <h3 className="catalog-selected-title">Итоговый список</h3>
        <div className="catalog-selected" aria-live="polite">
          {selectedServices.length === 0 ? (
            <p className="catalog-selected-empty">Пока ничего не выбрано.</p>
          ) : (
            <div className="catalog-selected-line" role="list" aria-label="Выбранные услуги">
              {selectedServices.map((serviceName) => (
                <span key={serviceName} className="catalog-selected-item" role="listitem">
                  {serviceName}
                  <button
                    type="button"
                    className="catalog-selected-remove"
                    onClick={() => handleServiceRemove(serviceName)}
                    aria-label={`Удалить услугу ${serviceName}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <form className="catalog-selected-manual" onSubmit={handleCustomServiceSubmit}>
            <input
              className="catalog-selected-input"
              type="text"
              value={customService}
              onChange={(event) => setCustomService(event.target.value)}
              placeholder="Добавить свою услугу"
              aria-label="Добавить свою услугу"
            />
            <button className="catalog-selected-add" type="submit" disabled={isCustomServiceEmpty}>
              Добавить
            </button>
          </form>
        </div>
        <button
          className="catalog-order-button"
          type="button"
          onClick={handleMakeOrder}
          disabled={selectedServices.length === 0}
        >
          Сделать заказ
        </button>
      </div>
    </section>
  );
};
