import Image from 'next/image';
import { CartButton } from './CartButton';
import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <Image src="/images/logo.png" alt="Логотип Антипрофи" width={150} height={50} className="app-header-logo-img" />
      </div>
      <nav className="app-header-nav">
        <CartButton />
      </nav>
      <h1 className="app-title">Антипрофи</h1>
      <p className="app-slogan">Мы предлагаем услуги, за которые нам немного стыдно</p>
    </header>
  );
}
