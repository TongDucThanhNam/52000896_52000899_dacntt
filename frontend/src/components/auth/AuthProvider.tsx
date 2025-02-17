"use client"

import type React from "react"
import {useEffect} from "react"
import {useAuthStore} from "@/store/useAuthStore"

export function AuthProvider({children}: { children: React.ReactNode }) {
    const refreshUser = useAuthStore((state) => state.refreshUser)

    useEffect(() => {
        refreshUser().then(r => console.log("Làm mới thông tin người dùng"));
    }, [refreshUser])

    return <>{children}</>
}