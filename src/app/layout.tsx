import type { Metadata } from 'next'
import './globals.scss'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/constants/seo.constants'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'

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
			<body>
				<NextTopLoader
					color='#1D00C3'
					template='<div class="bar" role="bar"><div class="peg"></div></div>'
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
