"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {format} from "date-fns"
import {Building, CalendarIcon} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Slider} from "@/components/ui/slider"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Calendar} from "@/components/ui/calendar"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import AvatarUpload from "@/components/auth/AvatarUpload";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cities} from "@/config/site";
import {authClient} from "@/lib/auth-client"

const FormSchema = z
    .object({
        userName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
        userEmail: z.string().email("Email không hợp lệ"),
        userPasswordHash: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
        userPhone: z.string().regex(/^\d{9,}$/, "Số điện thoại phải có ít nhất 9 chữ số"),
        userAddress: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
        userHeight: z.number().min(100).max(250),
        userWeight: z.number().min(30).max(200),
        userDateOfBirth: z
            .string()
            .optional(),
        userGender: z.enum(["Male", "Female"]).optional(),
        userJob: z.string().min(2, "Nghề nghiệp phải có ít nhất 2 ký tự"),
        userCity: z.string()
    })
    .refine((data) => data.userPasswordHash === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    })

export default function RegisterPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [avatarUrl, setAvatarUrl] = useState("")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userName: "",
            userEmail: "",
            userPasswordHash: "",
            confirmPassword: "",
            userPhone: "",
            userAddress: "",
            userHeight: 170,
            userWeight: 60,
            userDateOfBirth: "2000-01-01",
            userGender: "Male",
            userJob: "",
            userCity: "Hồ Chí Minh"
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        //on signup
        await authClient.signUp.email(
            {
                email: data.userEmail,
                password: data.confirmPassword,
                name: data.userName,
                image: avatarUrl,
                phone: data.userPhone,
                address: data.userAddress,
                height: data.userHeight,
                weight: data.userWeight,
                dateOfBirth: data.userDateOfBirth,
                gender: data.userGender,
                job: data.userJob,
                city: data.userCity,
            },
            {
                onSuccess: () => {
                    router.push("/dang-nhap");
                    toast({
                        title: "Đăng ký thành công",
                        description: "Tài khoản của bạn đã được tạo.",
                        variant: "default",
                    })
                },
                onError: (error) => {
                    toast({
                        title: "Đăng ký thất bại",
                        description: error.error.message,
                        variant: "destructive",
                    })
                },
            },
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <div className="p-6 sm:p-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">Đăng ký tài khoản</h1>
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            {avatarUrl ? (
                                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={avatarUrl} alt="Avatar"/>
                                    <AvatarFallback>Avatar</AvatarFallback>
                                </Avatar>
                            ) : (
                                <AvatarUpload setAvatarUrl={setAvatarUrl}/>
                            )}
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tên</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userEmail"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userPasswordHash"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userPhone"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="tel"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userAddress"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Địa chỉ</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userHeight"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Chiều cao: {field.value} cm</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    min={100}
                                                    max={250}
                                                    step={1}
                                                    value={[field.value]}
                                                    onValueChange={(value) => field.onChange(value[0])}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userWeight"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Cân nặng: {field.value} kg</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    min={30}
                                                    max={200}
                                                    step={1}
                                                    value={[field.value]}
                                                    onValueChange={(value) => field.onChange(value[0])}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userDateOfBirth"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Ngày sinh</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"noShadow"}
                                                            className={cn(
                                                                " pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value ? format(new Date(field.value), "dd/MM/yyyy") :
                                                                <span>Chọn ngày sinh</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => field.onChange(date ? date.toISOString().split('T')[0] : "")}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userGender"
                                    render={({field}) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Giới tính</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-row space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Male"/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Nam</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Female"/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Nữ</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userJob"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nghề nghiệp</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="userCity"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center space-x-2">
                                                <Building className="w-4 h-4"/>
                                                <span>Thành phố sinh sống</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}
                                                    defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500">
                                                        <SelectValue placeholder="Lựa chọn thành phố"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities.map((city) => (
                                                        <SelectItem key={city} value={city}>
                                                            {city}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                Đăng ký
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-8">
                        <Separator/>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Đã có tài khoản?{" "}
                            <Link href="/dang-nhap" className="text-primary hover:underline font-semibold">
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
