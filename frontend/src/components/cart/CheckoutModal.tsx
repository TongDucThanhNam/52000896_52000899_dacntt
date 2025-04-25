import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {priceVietNamDongformetter} from "@/lib/utils"
import NextImage from "next/image";
import {useAuthStore} from "@/store/useAuthStore"

interface CheckoutModalProps {
    paymentMethod: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    items: any[]
    total: number
}

export function CheckoutModal({isOpen, onClose, onConfirm, items, total, paymentMethod}: CheckoutModalProps) {
    // Get User Profile
    const {isLoaded, isSignedIn, user} = useAuthStore()

    const description = `FASHIONAI ${user?.id}`

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xác nhận đơn hàng</DialogTitle>
                    <DialogDescription>Vui lòng kiểm tra lại thông tin đơn hàng của bạn</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.variantId} className="flex justify-between">
                              <span>
                                {item.productName} (x{item.quantity})
                              </span>
                            <span>
                                {priceVietNamDongformetter((item.variantPromotionPrice * item.quantity).toString())}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold">
                        <span>Tổng cộng</span>
                        <span>{priceVietNamDongformetter(total.toString())}</span>
                    </div>
                </div>

                {paymentMethod === "qr" && (
                    <div className="flex flex-row items-center justify-center">
                        <NextImage
                            width={300}
                            height={300}
                            src={`https://qr.sepay.vn/img?acc=10001011812&bank=TPBank&amount=${total.toString()}&des=${description}`}
                            alt={"Purchase vie Sepay"}/>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={onConfirm}>Xác nhận thanh toán</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}