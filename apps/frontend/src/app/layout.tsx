import "@/app/globals.css";
import {Toaster} from "@/components/ui/toaster"
import {darkerGrotesque} from "@/app/fonts/fonts";
import {AuthProvider} from "@/components/auth/AuthProvider";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
        <head>
            {/*<script src="https://unpkg.com/react-scan/dist/auto.global.js" async/>*/}
            {/* rest of your scripts go under */}
        </head>
        <body
            className={`${darkerGrotesque.className} antialiased`}
        >
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster/>
        </body>
        </html>
    );
}