import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import AddUserInfo from "@/components/admin/users/AddUserInfo";

export default function AddUserPage() {
    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-2xl font-semibold text-gray-700">Thêm người dùng</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <AddUserInfo/>
            </CardContent>
        </Card>
    )
}