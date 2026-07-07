import Link from 'next/link';
import Image from 'next/image';
import { CartButton } from './CartButton';
import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-media">
        <Image
          src="/images/header.webp"
          alt="Антипрофи - берёмся за заказы, которые другим кажутся странными"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={50}
          className="app-header-image"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="app-header-logo">
        <Link href="/" className="app-header-logo-link" aria-label="На главную">
          <Image
            src="/images/logo.webp"
            alt="Логотип Антипрофи"
            width={96}
            height={96}
            sizes="96px"
            className="app-header-logo-img"
          />
        </Link>
      </div>
      <nav className="app-header-nav">
        <CartButton />
      </nav>
      <div className="app-header-content">
        <div className="app-title">Антипрофи</div>
        <p className="app-slogan">Берёмся за заказы, которые другим кажутся странными</p>
      </div>
    </header>
  );
}
