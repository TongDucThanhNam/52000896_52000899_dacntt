"use client"

import { useState, useEffect } from "react"

export function useAuth() {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    const logout = () => {
        // localStorage.removeItem("token")
        console.log("Logout")
        setToken(null)
    }

    return { token, logout }
}