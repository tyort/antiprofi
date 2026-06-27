import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import '../index.css'
import '../App.css'

export const metadata = {
  title: 'Antiprofi',
  description: 'Antiprofi Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
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
