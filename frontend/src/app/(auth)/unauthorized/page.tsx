import Link from "next/link"
import {Shield, Home} from 'lucide-react'

import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"

export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-muted/10">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Shield className="w-12 h-12 text-destructive"/>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl">Không được truy cập</CardTitle>
                    <CardDescription className="text-base">
                        Bạn không có quyền truy cập vào trang này.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    <p>Vui lòng liên hệ quản trị viên hoặc thử lại với tài khoản khác.</p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="default">
                        <Link href="/dang-nhap">
                            <Shield className="w-4 h-4 mr-2"/>
                            Đăng nhập
                        </Link>
                    </Button>
                    <Button asChild variant="neutral">
                        <Link href="/">
                            <Home className="w-4 h-4 mr-2"/>
                            Về trang chủ
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}