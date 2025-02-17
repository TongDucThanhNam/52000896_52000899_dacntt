import {Home, Inbox, LayoutDashboardIcon} from "lucide-react"


export const items = [
    {
        title: "Quản lý người dùng",
        url: "#",
        icon: Home,
        children: [
            {
                title: "Thêm người dùng",
                url: "/admin/quan-ly-nguoi-dung/them-nguoi-dung",
            },
            {
                title: "Danh sách người dùng",
                url: "/admin/quan-ly-nguoi-dung",
            },
        ],
    },
    {
        title: "Quản lý sản phẩm",
        url: "#",
        icon: Inbox,
        children: [
            {
                title: "Thêm sản phẩm",
                url: "/admin/quan-ly-san-pham/them-san-pham",
            },
            {
                title: "Danh sách sản phẩm",
                url: "/admin/quan-ly-san-pham",
            }
        ],
    },
    {
        title: "Thống kê",
        url: "/admin",
        icon: LayoutDashboardIcon,
    },
]