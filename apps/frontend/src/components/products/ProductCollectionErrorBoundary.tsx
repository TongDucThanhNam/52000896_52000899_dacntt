"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ProductCollectionErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Add event listener for unhandled promise rejections
    const handleError = (event: PromiseRejectionEvent) => {
      console.error(
        "Unhandled promise rejection:",
        event.reason)

      // Check if it's a network error
      if (
        event.reason?.message === "Network connection lost" ||
        event.reason?.message === "Failed to fetch" ||
        event.reason?.message?.includes("network") ||
        event.reason?.message?.includes("Mất kết nối mạng") ||
        !navigator.onLine
      ) {
        setError(new Error("Mất kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn và thử lại."))
        setHasError(true)
        event.preventDefault() // Prevent the error from bubbling up
      }
    }

    window.addEventListener("unhandledrejection", handleError)

    return () => {
      window.removeEventListener("unhandledrejection", handleError)
    }
  }, [])

  const resetError = () => {
    setHasError(false)
    setError(null)
    window.location.reload()
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h2>
        <p className="text-gray-600 mb-4">{error?.message || "Có lỗi xảy ra khi tải danh sách sản phẩm."}</p>
        <Button onClick={resetError} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Thử lại
        </Button>
      </div>
    )
  }

  return <>{children}</>
}