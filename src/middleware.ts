import { NextResponse, type NextRequest } from 'next/server'
import { EnumTokens } from './services/auth/auth-token.service'
import { DASHBOARD_URL, PUBLIC_URL } from './config/url.config'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(DASHBOARD_URL.home(), request.url))
		}

		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
}