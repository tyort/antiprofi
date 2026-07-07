import localFont from 'next/font/local'
import Script from 'next/script'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import '../index.css'
import '../App.css'

export const metadata = {
  metadataBase: new URL('https://anti-profi.ru'),
  title: 'Antiprofi — Агентство нестандартных услуг в Москве (актеры напрокат, кейтеринг)',
  description: 'Услуги актеров напрокат для встреч в Москве (фейковый парень, неудобная подруга) и домашний кейтеринг корейской кухни (пигоди, пьянсе на заказ, манты).',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
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
        {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}', 'ym');

                ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
              `
            }} />
            <noscript>
              <div>
                <img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
              </div>
            </noscript>
          </>
        )}
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `
            }} />
          </>
        )}
      </body>
    </html>
  )
}
