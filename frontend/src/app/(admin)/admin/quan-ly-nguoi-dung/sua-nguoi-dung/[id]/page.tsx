import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import UserInfoForm from "@/components/admin/users/EditUserInfo";

async function getUserData(userId: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {cache: 'no-store'})
    if (!response.ok) {
        throw new Error('Lỗi khi lấy thông tin người dùng')
    }
    return response.json()
}

export default async function EditUserPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const userId = (await params).id
    const userData = await getUserData(userId)

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-2xl font-semibold text-gray-700">Sửa thông tin ngừoi dùng</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <UserInfoForm initialData={userData} userId={userId}/>
            </CardContent>
        </Card>
    )
}