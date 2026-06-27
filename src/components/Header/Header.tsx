'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <img src="/images/logo.png" alt="Логотип Антипрофи" className="app-header-logo-img" />
      </div>
      <nav className="app-header-nav">
        <a href="#order" className="app-header-nav-link">
          <ShoppingCartIcon fontSize="small" />
          <span>Сделать заказ</span>
        </a>
      </nav>
      <h1 className="app-title">Антипрофи</h1>
      <p className="app-slogan">Мы предлагаем услуги, за которые нам немного стыдно</p>
    </header>
  );
}
