import Link from 'next/link';
import Image from 'next/image';
import { CartButton } from './CartButton';
import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <Link href="/" className="app-header-logo-link" aria-label="На главную">
          <Image src="/images/logo.png" alt="Логотип Антипрофи" width={150} height={50} priority className="app-header-logo-img" />
        </Link>
      </div>
      <nav className="app-header-nav">
        <CartButton />
      </nav>
      <div className="app-title">Антипрофи</div>
      <p className="app-slogan">Мы предлагаем услуги, за которые нам немного стыдно</p>
    </header>
  );
}
