"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
})

/**
 * Component form đăng nhập có thể tái sử dụng
 * @param {{ onSuccess?: () => void }} props - Callback khi đăng nhập thành công
 */
export function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
    const { toast } = useToast()
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    /**
     * Xử lý submit form đăng nhập
     * @param {z.infer<typeof loginSchema>} values - Giá trị form
     */
    async function handleSubmit(values: z.infer<typeof loginSchema>) {
        try {
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
                            description: "Chào mừng bạn đến với Shopee",
                        })
                        onSuccess?.()
                    },
                    onError: (error: any) => {
                        toast({
                            title: "Đăng nhập thất bại",
                            description: error.message,
                        })
                    },
                },
            )
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Đăng nhập thất bại"
            toast({
                title: "Đăng nhập thất bại",
                description: errorMessage,
            })
            setError(errorMessage)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Đăng nhập
                </Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </Form>
    )
}