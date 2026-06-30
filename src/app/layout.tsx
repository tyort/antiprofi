import localFont from 'next/font/local'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import '../index.css'
import '../App.css'

export const metadata = {
  metadataBase: new URL('https://anti-profi.ru'),
  title: 'Antiprofi',
  description: 'Antiprofi Store',
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
