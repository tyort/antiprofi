import localFont from 'next/font/local'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import '../index.css'
import '../App.css'

export const metadata = {
  metadataBase: new URL('https://anti-profi.ru'),
  title: 'Antiprofi',
  description: 'Antiprofi Store',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Antiprofi',
    description: 'Antiprofi Store',
    url: '/',
    siteName: 'Antiprofi',
    locale: 'ru_RU',
    type: 'website',
  },
}

const nunito = localFont({
  src: '../fonts/ofont.ru_Nunito.woff2',
  variable: '--font-nunito',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={nunito.variable}>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
