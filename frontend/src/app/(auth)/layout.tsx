import type {Metadata} from "next";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import React, {Fragment} from "react";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";

export const metadata: Metadata = {
    title: "fasionAI",
    description: "Trang web bán hàng thời trang",
};

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Fragment>
            <Navbar/>
            <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {children}
            <Footer/>
        </Fragment>
    );
}