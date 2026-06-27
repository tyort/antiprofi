'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function CartButton() {
  return (
    <a href="#order" className="app-header-nav-link">
      <ShoppingCartIcon fontSize="small" />
      <span>Сделать заказ</span>
    </a>
  );
}
