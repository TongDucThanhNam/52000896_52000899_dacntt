"use client"

import {useState, useMemo, useCallback} from "react"
import useSWR from "swr"
import {Button} from "@/components/ui/button"
import BreadcumbComponent from "@/components/products/BreadcumbComponent"
import {breadcrumbPages} from "@/config/site"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge"
import type {Product} from "@/types"
import ProductGridComponent from "@/components/products/ProductGridComponent"
import {Loader2} from "lucide-react"
import {fetchProducts} from "@/app/actions"

export const dynamic = 'force-dynamic'

// Define filter types for better type safety
interface FilterOption {
    name: string
    options: string[]
    categoryIds?: string[]
}

const filters: FilterOption[] = [
    {
        name: "Danh mục",
        options: ["Set đồ", "Quần", "Áo", "Giày", "Phụ kiện", "Đồ lót", "Váy"],
        categoryIds: [
            "67947c2be443c89e47753076",
            "676fc3f2aef26543aa192da3",
            "676fc404aef26543aa192da5",
            "676fc40baef26543aa192da7",
            "676fc413aef26543aa192da9",
            "676fc41aaef26543aa192dab",
            "676fc421aef26543aa192dad",
        ],
    },
    {name: "Còn hàng", options: ["Còn hàng", "Hết hàng"]},
]

export default function ProductListPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("newest")
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    // Use SWR with the server action
    const {data: products, error, isLoading} = useSWR<Product[]>("products", fetchProducts)

    // Memoized handlers to prevent unnecessary re-renders
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [])

    const handleSortChange = useCallback((sort: string) => {
        setSortBy(sort)
    }, [])

    const handleFilterChange = useCallback((filter: string) => {
        setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
        setCurrentPage(1)
    }, [])

    const removeFilter = useCallback((filter: string) => {
        setActiveFilters((prev) => prev.filter((f) => f !== filter))
    }, [])

    // Memoized filtered and sorted products
    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return []

        let result = [...products]

        // Apply filters
        if (activeFilters.length > 0) {
            result = result.filter((product: Product) => {
                return activeFilters.every((filter) => {
                    // Find matching category filter
                    const categoryFilter = filters[0].categoryIds?.find(
                        (categoryId, index) => filters[0].options[index] === filter && filters[0].options.includes(filter),
                    )

                    if (categoryFilter) {
                        return product.categoryId === categoryFilter
                    }

                    // Handle stock filter (to be implemented when variant data is available)
                    if (filter === "Còn hàng" || filter === "Hết hàng") {
                        return true // Placeholder for stock filtering
                    }

                    return true
                })
            })
        }

        // Apply sorting
        switch (sortBy) {
            case "rating":
                result.sort((a, b) => (b.productAvgRating ?? 0) - (a.productAvgRating ?? 0))
                break
            case "newest":
            default:
                // Products are already sorted by newest
                break
        }

        return result
    }, [products, activeFilters, sortBy])

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin"/>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-destructive">Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.</p>
                <Button onClick={() => window.location.reload()}>Thử lại</Button>
            </div>
        )
    }

    return (
        <main className="container mx-auto py-8 px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>
            </div>

            {/* Header and Filters */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <h1 className="text-xl font-semibold">
                        Sản phẩm <span
                        className="text-sm text-muted-foreground">({filteredAndSortedProducts.length})</span>
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <DropdownMenu key={filter.name}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="neutral" className="bg-background whitespace-nowrap">
                                        {filter.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {filter.options.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onSelect={() => handleFilterChange(option)}
                                            className="cursor-pointer"
                                        >
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div>
                </div>

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {activeFilters.map((filter: string, index: number) => (
                            <Badge key={`${filter}-${index}`} variant="default" className="rounded-full px-3 py-1">
                                {filter}
                                <button
                                    className="ml-2 hover:text-primary"
                                    onClick={() => removeFilter(filter)}
                                    aria-label={`Remove ${filter} filter`}
                                >
                                    ×
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <h1 className="text-4xl font-bold mb-8 text-center">Khám phá bộ sưu tập của chúng tôi</h1>

            <ProductGridComponent
                products={filteredAndSortedProducts}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                sortBy={sortBy}
            />
        </main>
    )
}