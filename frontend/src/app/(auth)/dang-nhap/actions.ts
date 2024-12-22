'use server'

import { cookies } from 'next/headers'

type LoginResult = 
  | { success: true }
  | { success: false, error: string }

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (email && password) {
    const cookieStore = await cookies()
    cookieStore.set('user', email, { 
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return { success: true }
  }

  return { success: false, error: 'Email hoặc mật khẩu không đúng' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('user')
}

