import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link href="/" className="footer-logo-link" aria-label="На главную">
            <Image
              src="/images/logo.webp"
              alt="Логотип"
              width={80}
              height={80}
              sizes="80px"
              className="footer-logo-img"
            />
          </Link>
        </div>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li><Link href="/contact">Написать нам</Link></li>
            <li><Link href="/contact">Отзывы</Link></li>
            <li><a href="#promotions">Акции</a></li>
            <li><a href="#events">Мероприятия</a></li>
            <li><Link href="/about">О центре услуг</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
