import React from 'react';
import './contact.css';
import Link from 'next/link';
import Image from 'next/image';
import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Свяжитесь с нами - Antiprofi',
  description: 'Форма обратной связи Антипрофи',
};

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Свяжитесь с нами</h1>
      <ContactForm />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/" className="contact-back-link">
          <Image src="/images/arrow-back.webp" alt="Назад" width={20} height={20} className="contact-back-icon" />
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  );
}
