import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export default function PaymentCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
                <CardDescription>
                    Thêm phương thức thanh toán mới vào tài khoản của bạn.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem
                            value="card"
                            id="card"
                            className="peer sr-only"
                            aria-label="Thẻ"
                        />
                        <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2"/>
                                <path d="M2 10h20"/>
                            </svg>
                            Thẻ Visa / Mastercard
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="paypal"
                            id="paypal"
                            className="peer sr-only"
                            aria-label="Paypal"
                        />
                        <Label
                            htmlFor="paypal"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2"/>
                                <path d="M2 10h20"/>
                            </svg>
                            Paypal
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem
                            value="apple"
                            id="apple"
                            className="peer sr-only"
                            aria-label="Apple"
                        />
                        <Label
                            htmlFor="apple"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2"/>
                                <path d="M2 10h20"/>
                            </svg>
                            Apple
                        </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên</Label>
                    <Input id="name" placeholder="Tên Họ"/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input id="city" placeholder=""/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="number">Số thẻ</Label>
                    <Input id="number" placeholder=""/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="month">Hết hạn</Label>
                        <Select>
                            <SelectTrigger id="month" aria-label="Tháng">
                                <SelectValue placeholder="Tháng"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Tháng Một</SelectItem>
                                <SelectItem value="2">Tháng Hai</SelectItem>
                                <SelectItem value="3">Tháng Ba</SelectItem>
                                <SelectItem value="4">Tháng Tư</SelectItem>
                                <SelectItem value="5">Tháng Năm</SelectItem>
                                <SelectItem value="6">Tháng Sáu</SelectItem>
                                <SelectItem value="7">Tháng Bảy</SelectItem>
                                <SelectItem value="8">Tháng Tám</SelectItem>
                                <SelectItem value="9">Tháng Chín</SelectItem>
                                <SelectItem value="10">Tháng Mười</SelectItem>
                                <SelectItem value="11">Tháng Mười Một</SelectItem>
                                <SelectItem value="12">Tháng Mười Hai</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="year">Năm</Label>
                        <Select>
                            <SelectTrigger id="year" aria-label="Năm">
                                <SelectValue placeholder="Năm"/>
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({length: 10}, (_, i) => (
                                    <SelectItem key={i}
                                                value={`${new Date().getFullYear() + i}`}>
                                        {new Date().getFullYear() + i}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="CVC"/>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Tiếp tục</Button>
            </CardFooter>
        </Card>
    )
}