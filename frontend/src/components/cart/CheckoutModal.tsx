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

interface CheckoutModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    items: any[]
    total: number
}

export function CheckoutModal({isOpen, onClose, onConfirm, items, total}: CheckoutModalProps) {
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