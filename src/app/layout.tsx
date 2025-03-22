import type { Metadata } from 'next'
import './globals.scss'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/constants/seo.constants'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'
import Script from 'next/script'

import { ReactLenis } from '@/lib/lenis'
import { GeoProvider } from '@/context/GeoContext'

export const metadata: Metadata = {
	title: { absolute: SITE_NAME, template: `%s | ${SITE_NAME}` },
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	authors: SITE_AUTHOR,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<meta name='p:domain_verify' content='65adbd7f4d33c93de5031501e501ff09' />
				<meta property='og:title' content={SITE_NAME} />
				<meta property='og:description' content={SITE_DESCRIPTION} />
				<meta property='og:image' content='/images/logo.svg' />
				<meta property='og:url' content='https:/msu-store.com' />
				<meta property='og:type' content='website' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={SITE_NAME} />
				<meta name='twitter:description' content={SITE_DESCRIPTION} />
				<meta name='twitter:image' content='/images/logo.svg' />

				{/* Google Analytics */}
				<Script async src='https://www.googletagmanager.com/gtag/js?id=G-FC0FZ413SE'></Script>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FC0FZ413SE');
            `,
					}}
				/>
				<Script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: SITE_NAME,
							url: 'https://msu-store.com',
							logo: 'https://msu-store.com/images/logo.svg',
						}),
					}}
				/>

				{/* Yandex.Metrika */}
				<Script
					id='yandex-metrika'
					type='text/javascript'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(98612225, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
					}}
				/>
				<noscript>
					<div>
						<img src='https://mc.yandex.ru/watch/98612225' style={{ position: 'absolute', left: '-9999px' }} alt='' />
					</div>
				</noscript>
			</head>
			<body>
				<NextTopLoader color='#1D00C3' template='<div class="bar" role="bar"><div class="peg"></div></div>' />
				<ReactLenis root>
					<GeoProvider>
						<Providers>{children}</Providers>
					</GeoProvider>
				</ReactLenis>
			</body>
		</html>
	)
}
