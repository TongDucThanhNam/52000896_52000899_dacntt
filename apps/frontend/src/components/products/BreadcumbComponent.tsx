"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {ChevronDown, Slash} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {usePathname, useRouter} from "next/navigation";

interface BreadcrumbPageProps {
    breadcrumbPages: { name: string, href: string }[]
}

export default function BreadcumbComponent(
    {breadcrumbPages}: BreadcrumbPageProps
) {
    //get current page
    const pathname = usePathname()
    const currentPage = breadcrumbPages.find(page => page.href === pathname) || {name: "Trang hiện tại", href: pathname}

    //NextJs router
    const router = useRouter()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash/>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                            {currentPage.name}
                            <ChevronDown className="h-4 w-4"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {breadcrumbPages.map((item, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    onSelect={() => {
                                        router.push(item.href)
                                    }}
                                >
                                    {item.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}