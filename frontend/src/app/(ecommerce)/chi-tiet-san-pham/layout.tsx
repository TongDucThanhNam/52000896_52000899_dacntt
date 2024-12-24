import type {Metadata} from "next";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {Fragment} from "react";

export const metadata: Metadata = {
    title: "fasionAI",
    description: "Trang web bán hàng thời trang",
};

export default function EcommerceLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Fragment>
            <Navbar/>
            {children}
            <Footer/>
        </Fragment>
    );
}
