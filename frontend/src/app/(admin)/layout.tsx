import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/admin/app-sidebar"

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className={"min-h-screen w-full"}>
                <SidebarTrigger/>
                <div className={"grid h-full w-full"}>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}