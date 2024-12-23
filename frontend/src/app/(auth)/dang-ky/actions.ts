'use server'

import { cookies } from 'next/headers'

type RegisterResult = 
  | { success: true }
  | { success: false, error: string }

export async function register(formData: FormData): Promise<RegisterResult> {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!name || !email || !password || !confirmPassword) {
        return { success: false, error: 'Vui lòng điền đầy đủ thông tin' }
    }
    if (password !== confirmPassword) {
        return { success: false, error: 'Mật khẩu xác nhận không khớp' }
    }

    try {
        const cookieStore = await cookies()
        cookieStore.set('user', email, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return { success: true }
} catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.' }
}
}

