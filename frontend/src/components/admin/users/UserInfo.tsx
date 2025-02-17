import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {format} from "date-fns"
import {cn} from "@/lib/utils"
import {
    User,
    Mail,
    Lock,
    Phone,
    Ruler,
    Weight,
    CalendarIcon,
    Briefcase,
    Building,
    UserCog,
    Image,
    MapPin,
} from "lucide-react"

const cities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Huế",
    "Nha Trang",
    "Vinh",
    "Quy Nhơn",
]

interface UserInfoProps {
    form: any
}

export default function UserInfo({form}: UserInfoProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="userName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <User className="w-4 h-4"/>
                                <span>Nhập tên ngừoi dùng</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field}
                                       className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"/>
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
                            <FormLabel className="flex items-center space-x-2">
                                <Mail className="w-4 h-4"/>
                                <span>Nhập email</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                                />
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
                            <FormLabel className="flex items-center space-x-2">
                                <Lock className="w-4 h-4"/>
                                <span>Nhập mật khẩu</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                                />
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
                            <FormLabel className="flex items-center space-x-2">
                                <Phone className="w-4 h-4"/>
                                <span>Số điện thoại</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="tel"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                                />
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
                            <FormLabel className="flex items-center space-x-2">
                                <Ruler className="w-4 h-4"/>
                                <span>Chiều cao (cm)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
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
                            <FormLabel className="flex items-center space-x-2">
                                <Weight className="w-4 h-4"/>
                                <span>Cân nặng (kg)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
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
                            <FormLabel className="flex items-center space-x-2">
                                <CalendarIcon className="w-4 h-4"/>
                                <span>Ngày tháng năm sinh</span>
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                        >
                                            {field.value ? format(field.value, "dd/MM/yyyy") :
                                                <span>Lựa chọn ngày sinh</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <User className="w-4 h-4"/>
                                <span>Giới tính</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select gender"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Nam</SelectItem>
                                    <SelectItem value="Female">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userJob"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <Briefcase className="w-4 h-4"/>
                                <span>Nghề nghiệp</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field}
                                       className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"/>
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
                            <Select onValueChange={field.onChange} value={field.value}>
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
                <FormField
                    control={form.control}
                    name="userRole"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <UserCog className="w-4 h-4"/>
                                <span>Vai trò</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Nhập vai trò"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="User">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userImageUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <span>Nhập link ảnh Avatar</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="url"
                                    className="transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="userAddress"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4"/>
                            <span>Địa chỉ</span>
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                className="min-h-[100px] transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    )
}