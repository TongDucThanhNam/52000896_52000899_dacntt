import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/admin/app-sidebar"

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className={"min-h-screen w-full"}>
                <div className={"absolute mt-3 ml-6"}>
                    <SidebarTrigger/>
                </div>

                <div className={"mt-10 grid h-full w-full"}>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}