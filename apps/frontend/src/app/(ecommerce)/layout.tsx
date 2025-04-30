import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "fashionAI",
  description: "Trang web bán hàng thời trang",
};

export default function EcommerceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Navbar />
      <main className={"flex flex-col items-center justify-center"}>
        <div className={"w-3/4"}>
          {children}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}