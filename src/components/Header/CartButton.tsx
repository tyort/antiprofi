'use client';

import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function CartButton() {
  return (
    <Link href="/contact" className="app-header-nav-link">
      <ShoppingCartIcon fontSize="small" />
      <span>Сделать заказ</span>
    </Link>
  );
}
