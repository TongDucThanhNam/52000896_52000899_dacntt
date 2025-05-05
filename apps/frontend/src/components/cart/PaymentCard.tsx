"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconCash } from "@tabler/icons-react"
import { CreditCard, QrCodeIcon } from "lucide-react"
import NextImage from "next/image";

interface PaymentCardProps {
    paymentMethod: string
    setPaymentMethod: (value: string) => void
}

export default function PaymentCard(
    {
        paymentMethod,
        setPaymentMethod
    }: PaymentCardProps
) {

    const handlePaymentMethodChange = (value: string) => {
        setPaymentMethod(value)
    }

    return (
        <Card
            className="pb-6"
        >
            <CardHeader
                className="py-3"
            >
                <CardTitle>Phương thức thanh toán</CardTitle>
                <CardDescription>Thêm phương thức thanh toán mới vào tài khoản của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup
                    defaultValue={paymentMethod} className="grid grid-cols-3 gap-4"
                    onValueChange={handlePaymentMethodChange}>
                    <div>
                        <RadioGroupItem
                            disabled={true}
                            value="card" id="card" className="peer sr-only" aria-label="Thẻ" />
                        <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="mb-3 h-6 w-6">
                                <CreditCard />
                            </div>
                            Thẻ Visa / Mastercard
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="qr" id="qr" className="peer sr-only" aria-label="QR"
                        />
                        <Label
                            htmlFor="qr"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="mb-3 h-6 w-6">
                                <QrCodeIcon />
                            </div>
                            QR code
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="cash" id="cash" className="peer sr-only" aria-label="Cash" />
                        <Label
                            htmlFor="cash"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <div className="mb-3 h-6 w-6">
                                <IconCash />
                            </div>
                            Thanh toán khi nhận hàng
                        </Label>
                    </div>


                </RadioGroup>

                {paymentMethod === "card" && (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Tên trên thẻ</Label>
                            <Input id="name" placeholder="NGUYEN VAN A" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="number">Số thẻ</Label>
                            <Input id="number" placeholder="4212222222" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="expiry">Hết hạn</Label>
                                <Input
                                    id="expiry"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value.length === 2 && !value.includes("/")) {
                                            e.target.value = value + "/"
                                        }
                                    }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="CVC" maxLength={4} />
                            </div>
                        </div>
                    </>
                )}

            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    {paymentMethod === "qr" ? "Bấm thanh toán sẽ có mã QR" : "Xác nhận thanh toán khi nhận hàng"}
                </Button>
            </CardFooter>
        </Card>
    )
}