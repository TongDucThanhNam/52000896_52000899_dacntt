"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {useToast} from "@/hooks/use-toast"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {authClient} from "@/lib/auth-client"

const loginSchema = z.object({
    email: z.string().email({message: "Email không hợp lệ"}),
    password: z.string().min(6, {message: "Mật khẩu phải có ít nhất 6 ký tự"}),
})

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function handleSubmit(values: z.infer<typeof loginSchema>) {
        try {
            // const result = await login(values.email, values.password)
            await authClient.signIn.email(
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    onSuccess: () => {
                        router.push("/")
                        toast({
                            title: "Đăng nhập thành công",
                            description: "Chào mừng bạn trở lại",
                        })
                    },
                    onError: (error: any) => {
                        toast({
                            title: "Đăng nhập thất bại",
                            description: error.message,
                            variant: "destructive",
                        })
                    },
                },
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Đăng nhập thất bại"
            toast({
                title: "Đăng nhập",
                description: errorMessage,
                variant: "destructive",
            })
            setError(errorMessage)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-96">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Đăng nhập
                            </Button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </form>
                    </Form>
                    <div className="mt-6">
                        <Separator/>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Chưa có tài khoản?{" "}
                            <Link href="/dang-ky" className="text-primary hover:underline">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}