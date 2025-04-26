"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Form} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation"
import {toast} from "@/hooks/use-toast"
import UserInfo from "@/components/admin/users/UserInfo"
import {createUser} from "@/app/actions";

const formSchema = z.object({
    userName: z.string().min(1, {message: "Phải nhập tên người dùng"}),
    userEmail: z.string().email({message: "Email không hợp lệ"}),
    userPasswordHash: z.string().min(6, {message: "Mật khẩu phải có ít nhất 6 ký tự"}),
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

export default function AddUserInfo() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            userEmail: "",
            userPasswordHash: "",
            userPhone: "",
            userHeight: 150,
            userWeight: 50,
            userDateOfBirth: new Date("1/1/2000"),
            userGender: "Male",
            userJob: "",
            userCity: "Hồ Chí Minh",
            userRole: "User",
            userImageUrl: "",
            userAddress: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // Update existing user
            const result = await createUser(data)
            if (result.error) {
                toast({
                    title: "Lỗi khi thêm người dùng",
                    description: `Đã xảy ra lỗi khi thêm người dùng: ${result.error}`,
                    variant: "destructive",
                })
                return
            }
            toast({
                title: "Thêm người dùng thành công",
                description: "Người dùng đã được thêm vào hệ thống",
                variant: "default",
            })
            router.push("/admin/quan-ly-nguoi-dung")
        } catch (error) {
            toast({
                title: "Lỗi khi thêm người dùng",
                description: `Đã xảy ra lỗi khi thêm người dùng: ${error}`,
                variant: "destructive",
            })
            // console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <UserInfo form={form}/>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                    Thêm người dùng
                </Button>
            </form>
        </Form>
    )
}