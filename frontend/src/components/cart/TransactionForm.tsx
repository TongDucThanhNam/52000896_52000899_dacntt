import {Fragment} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export default function TransactionForm() {
    return (
        <Fragment>
            {/* Thông tin cá nhân */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm">
                        Tên <span className="text-destructive">*</span>
                    </Label>
                    <Input id="firstName" placeholder="Nhập tên của bạn"
                           className="bg-muted"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">
                        Họ <span className="text-destructive">*</span>
                    </Label>
                    <Input id="lastName" placeholder="Nhập họ của bạn"
                           className="bg-muted"/>
                </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
                <Label htmlFor="address" className="text-sm">
                    Địa chỉ <span className="text-destructive">*</span>
                </Label>
                <Input id="address" placeholder="Đường 1, Phố 1" className="bg-muted"/>
            </div>

            <div className="space-y-2">
                <Label htmlFor="apt" className="text-sm">
                    Căn hộ, phòng, v.v.
                </Label>
                <Input id="apt" placeholder="Căn hộ, studio, hoặc tầng" className="bg-muted"/>
            </div>

            {/* Thành phố và Quốc gia */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm">
                        Thành phố <span className="text-destructive">*</span>
                    </Label>
                    <Input id="city" placeholder="Nhập thành phố của bạn" className="bg-muted"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm">
                        Quốc gia <span className="text-destructive">*</span>
                    </Label>
                    <Select
                        defaultValue="vn"
                    >
                        <SelectTrigger className="bg-muted">
                            <SelectValue placeholder="Chọn quốc gia"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bn">Việt Nam</SelectItem>
                            <SelectItem value="us">Hoa Kỳ</SelectItem>
                            <SelectItem value="uk">Vương Quốc Anh</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Mã bưu điện và Số điện thoại */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="postal" className="text-sm">
                        Mã bưu điện <span className="text-destructive">*</span>
                    </Label>
                    <Input id="postal" placeholder="700000" className="bg-muted"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                        Số điện thoại <span className="text-destructive">*</span>
                    </Label>
                    <Input id="phone" placeholder="(+84) 658 665 845" className="bg-muted"/>
                </div>
            </div>

            {/* Loại địa chỉ */}
            <div className="space-y-4">
                <Label className="text-sm">Loại địa chỉ</Label>
                <RadioGroup defaultValue="home" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home" id="home"/>
                        <Label htmlFor="home" className="font-normal">
                            Nhà
                            <p className="text-sm text-muted-foreground">Giao hàng cả ngày</p>
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="office" id="office"/>
                        <Label htmlFor="office" className="font-normal">
                            Văn phòng
                            <p className="text-sm text-muted-foreground">Giao hàng từ 9AM - 6PM</p>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </Fragment>
    )
}