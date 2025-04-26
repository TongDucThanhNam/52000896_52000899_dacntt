import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserProfile } from '@/app/actions'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // if (path.startsWith('/admin')) {
    //     const token = request.cookies.get('token')?.value
    //
    //     if (!token) {
    //         return NextResponse.redirect(new URL('/dang-nhap', request.url))
    //     }
    //
    //     try {
    //         const user = await getUserProfile(token)
    //         if (!user || user.userRole !== 'ADMIN') {
    //             return NextResponse.redirect(new URL('/unauthorized', request.url))
    //         }
    //     } catch (error) {
    //         console.error('Error verifying user:', error)
    //         return NextResponse.redirect(new URL('/dang-nhap', request.url))
    //     }
    // }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}