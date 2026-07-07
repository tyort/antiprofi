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
            <li><a href="#promotions">Акции</a></li>
            <li><a href="#events">Мероприятия</a></li>
            <li><Link href="/about">О центре услуг</Link></li>
          </ul>
        </nav>
        <div className="footer-contacts" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Antiprofi" />
          <p className="footer-city" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">г. Москва</span>
          </p>
          <p className="footer-schedule">Ежедневно с 7:00 до 23:00</p>
          <div className="footer-socials">
            <a href="mailto:neotyo1986@gmail.com" className="footer-social-icon" aria-label="Email" itemProp="email">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="https://t.me/tyort" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Telegram">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a5.96 5.96 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.393 4.025-1.636 4.476-1.643z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
