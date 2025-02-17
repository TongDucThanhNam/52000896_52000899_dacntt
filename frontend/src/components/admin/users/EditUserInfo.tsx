"use client"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Form} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {toast} from "@/hooks/use-toast"
import UserInfo from "@/components/admin/users/UserInfo"
import {updateUser} from "@/app/actions";

const formSchema = z.object({
    userName: z.string().min(1, {message: "Bạn chưa nhập tên"}),
    userEmail: z.string().email({message: "Email không hợp lệ"}),
    userPasswordHash: z.string().optional(),
    userPhone: z.string().optional(),
    userHeight: z.number().optional(),
    userWeight: z.number().optional(),
    userDateOfBirth: z.date().optional(),
    userGender: z.string().optional(),
    userJob: z.string().optional(),
    userCity: z.string().optional(),
    userRole: z.string().optional(),
    userImageUrl: z.string().optional(),
    userAddress: z.string().optional(),
})

export default function UserInfoForm({initialData, userId}: { initialData?: any; userId?: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: initialData?.userName || "",
            userEmail: initialData?.userEmail || "",
            userPasswordHash: initialData?.userPasswordHash || "",
            userPhone: initialData?.userPhone || "",
            userHeight: initialData?.userHeight || 160,
            userWeight: initialData?.userWeight || 50,
            userDateOfBirth: initialData?.userDateOfBirth ? new Date(initialData.userDateOfBirth.split('/').reverse().join('-')) : new Date(Date.now()),
            userGender: initialData?.userGender || "Male",
            userJob: initialData?.userJob || "",
            userCity: initialData?.userCity || "Hồ Chí Minh",
            userRole: initialData?.userRole || "User",
            userImageUrl: initialData?.userImageUrl || "https://placehold.co/50",
            userAddress: initialData?.userAddress || "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (userId) {
                // Update existing user
                await updateUser(userId, data)
                toast({
                    title: "Sửa thông tin người dùng thành công",
                    description: "Thông tin người dùng đã được cập nhật",
                    variant: "default",
                })
            } else {
                throw new Error("Không tìm thấy người dùng")
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Đã xảy ra lỗi khi sửa thông tin người dùng",
                variant: "destructive",
            })
            // console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <UserInfo form={form}/>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                    Sửa thông tin người dùng
                </Button>
            </form>
        </Form>
    )
}