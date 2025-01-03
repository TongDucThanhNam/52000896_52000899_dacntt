import localFont from "next/font/local";
import "@/app/globals.css";
import {Toaster} from "@/components/ui/toaster"
import {darkerGrotesque} from "@/app/fonts/fonts";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const sjBrutalDude = localFont({
    src: "./fonts/SjBrutalDude.ttf",
    variable: "--font-sj-brutal-dude",
    weight: "400",
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
        <body
            className={`${darkerGrotesque.className} antialiased`}
        >
        {children}
        <Toaster/>
        </body>
        </html>
    );
}