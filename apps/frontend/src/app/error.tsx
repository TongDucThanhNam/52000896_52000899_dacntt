"use client"

import {useEffect} from "react"
import {Button} from "@/components/ui/button"

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <p className="text-muted-foreground">Error digest: {error.digest}</p>

            <Button onClick={() => reset()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Thử lại
            </Button>
        </div>
    )
}