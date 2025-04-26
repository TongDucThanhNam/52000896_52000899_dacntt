import ManageUserTable from "@/components/admin/users/ManageUserTable";

export const dynamic = 'force-dynamic'

async function getUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`)
    if (!res.ok) {
        throw new Error('Failed to fetch products')
    }
    return res.json()
}

export default async function UserManagerPage() {
    const users = await getUsers()
    // console.log(products)

    if (!users) {
        return (
            <div>
                <h1>Lỗi khi tìm danh sách người dùng</h1>
            </div>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Quản lý người dùng</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm px-4"
            >
                <ManageUserTable users={users}/>
            </div>
        </main>
    )
}