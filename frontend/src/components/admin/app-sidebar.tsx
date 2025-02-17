"use client"

import * as React from "react"
import {ChevronDown, ChevronRight} from "lucide-react"
import {useRouter} from "next/navigation"

import {items} from "@/config"
import {cn} from "@/lib/utils"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    const router = useRouter()
    const [openItems, setOpenItems] = React.useState<string[]>([])

    const toggleItem = (title: string) => {
        setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }

    return (
        <Sidebar>
            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                item.children ? (
                                    <Collapsible
                                        key={item.title}
                                        open={openItems.includes(item.title)}
                                        onOpenChange={() => toggleItem(item.title)}
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    className={cn(
                                                        "w-full justify-between",
                                                        openItems.includes(item.title) && "bg-accent text-accent-foreground",
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <item.icon className="h-4 w-4"/>
                                                        <span>{item.title}</span>
                                                    </div>
                                                    {item.children &&
                                                        (openItems.includes(item.title) ? (
                                                            <ChevronDown className="h-4 w-4"/>
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4"/>
                                                        ))}
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            {item.children && (
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map((child) => (
                                                            <SidebarMenuSubItem key={child.title}>
                                                                <SidebarMenuSubButton
                                                                    onClick={() => router.push(child.url)}
                                                                    className="hover:bg-accent hover:text-accent-foreground"
                                                                >
                                                                    {child.title}
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            )}
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() => router.push(item.url)}
                                            className="w-full"
                                        >
                                            <div className="flex items-center gap-2">
                                                <item.icon className="h-4 w-4"/>
                                                <span>{item.title}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}