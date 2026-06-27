import Image from 'next/image';
import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Image src="/images/logo.png" alt="Логотип" width={150} height={50} className="footer-logo-img" />
        </div>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li><a href="#contact">Написать нам</a></li>
            <li><a href="#reviews">Отзывы</a></li>
            <li><a href="#promotions">Акции</a></li>
            <li><a href="#events">Мероприятия</a></li>
            <li><a href="#about">О центре услуг</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
