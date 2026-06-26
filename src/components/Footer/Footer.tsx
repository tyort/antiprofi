import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Логотип" className="footer-logo-img" />
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
