import ProductCard from "@/components/products/ProductCard"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";


interface ProductGridComponentProps {
    isLoading: boolean
    products: Product[]
    currentPage: number
    onPageChange: (page: number) => void
    onSortChange: (sort: string) => void
    sortBy: string
}

export default function ProductGridComponent({
    isLoading,
    products,
    currentPage,
    onPageChange,
    onSortChange,
    sortBy,
}: ProductGridComponentProps) {
    const productsPerPage = 8
    let totalPages = 5
    let startIndex = 0
    let currentProducts = Array(productsPerPage).fill({
    })
    if (!isLoading) {
        totalPages = Math.ceil(products.length / productsPerPage)
        startIndex = (currentPage - 1) * productsPerPage
        currentProducts = products.slice(startIndex, startIndex + productsPerPage)
    }
    const endIndex = startIndex + productsPerPage

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
                <div className="flex gap-4">
                    <Select onValueChange={onSortChange} value={sortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sắp xếp theo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Mới nhất</SelectItem>
                            <SelectItem value="price-low-high">Giá: Thấp đến Cao</SelectItem>
                            <SelectItem value="price-high-low">Giá: Cao đến Thấp</SelectItem>
                            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                    <ProductCard
                        key={isLoading ? `product-skeleton-${index}` : product.id}
                        isLoading={isLoading}
                        product={product}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => onPageChange(index + 1)}
                                    isActive={currentPage === index + 1}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}