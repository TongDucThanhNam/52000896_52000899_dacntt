import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster"
import { darkerGrotesque } from "@/app/fonts/fonts";
// import Providers from "@/components/provider";

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
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
                {/*<Providers>*/}
                {/*<AuthProvider>*/}
                {children}
                {/*</AuthProvider>*/}
                {/*</Providers>*/}
                <Toaster />
                {modal}
            </body>
        </html>
    );
}