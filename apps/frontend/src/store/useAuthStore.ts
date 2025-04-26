import { create } from "zustand"
import {getUserProfile, login, logout} from "@/app/actions"
import {UserProfile} from "@/types";

interface AuthState {
    isLoaded: boolean
    isSignedIn: boolean
    user: UserProfile | null
    error: Error | null
    setUser: (user: UserProfile | null) => void
    login: (email: string, password: string) => any
    signOut: () => Promise<void>
    refreshUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isLoaded: false,
    isSignedIn: false,
    user: null,
    error: null,
    setUser: (user) => set({ user, isSignedIn: !!user, isLoaded: true }),
    login: async (email, password) => {
        try {
            const formData = new FormData()
            formData.append("email", email)
            formData.append("password", password)

            const result = await login(formData)

            if (result.success && result.token) {
                localStorage.setItem("token", result.token)
                const user = await getUserProfile(result.token)
                set({ user, isSignedIn: true, isLoaded: true, error: null })
                return result
            } else {
                // throw new Error(result.error || "Login failed")
                return result
            }
        } catch (error) {
            set({ error: error as Error, isLoaded: true })
            return { success: false, error: (error as Error).message }
        }
    },
    signOut: async () => {
        try {
            localStorage.removeItem("token")
            await logout()
            set({ user: null, isSignedIn: false, error: null })
        } catch (error) {
            set({ error: error as Error })
        }
    },
    refreshUser: async () => {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const user = await getUserProfile(token)
                if (!user) {
                    localStorage.removeItem("token")
                    throw new Error("User not found")
                }
                set({ user, isSignedIn: true, isLoaded: true, error: null })
            } else {
                set({ user: null, isSignedIn: false, isLoaded: true, error: null })
            }
        } catch (error) {
            set({ error: error as Error, isLoaded: true })
        }
    },
}))