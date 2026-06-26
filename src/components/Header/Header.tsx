import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <img src="/images/logo.png" alt="Логотип Антипрофи" className="app-header-logo-img" />
      </div>
      <h1 className="app-title">Антипрофи</h1>
      <p className="app-slogan">Мы предлагаем услуги, за которые нам немного стыдно</p>
    </header>
  );
}
