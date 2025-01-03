import ProductGridComponent from "@/components/products/ProductGridComponent";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";

const filters = [
    {name: "Giá", options: ["Dưới 100k", "100 - 300k", "Trên 300k"]},
    {name: "Loại", options: ["Lưới chống muỗi", "Rèm", "Phụ kiện"]},
    {name: "Màu sắc", options: ["Đỏ", "Xanh", "Vàng", "Trắng"]},
    {name: "Còn hàng", options: ["Còn hàng", "Hết hàng"]}
]


const activeFilters = ["100 - 300k", "Lưới chống muỗi", "Đỏ", "Còn hàng"]


export default function DanhSachSanPham() {
    return (
        <main className={"flex flex-col items-center mt-20"}>
            {/* Product grid */}
            <div className={"w-3/4"}>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>
                </div>

                {/* Header and Filters */}
                <div className="mb-6">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">
                            Sản phẩm <span className="text-sm text-muted-foreground">100</span>
                        </h1>
                        <div className="flex grid-cols-4 gap-2">
                            {filters.map((filter) => (
                                <DropdownMenu
                                    key={filter.name}
                                >
                                    <DropdownMenuTrigger asChild={true}>
                                        <Button variant={"neutral"} className="bg-background">
                                            {filter.name}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {filter.options.map((option) => (
                                            <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters */}
                    <div className="flex gap-2 flex-wrap">
                        {activeFilters.map((filter: any, index: any) => (
                            <Badge
                                key={`${filter}-${index}`}
                                variant={"default"}
                                className="rounded-full px-3 py-1"
                            >
                                {filter}
                                <button className="ml-2 hover:text-primary">×</button>
                            </Badge>
                        ))}
                    </div>

                    <ProductGridComponent/>
                </div>
            </div>
        </main>
    )
}