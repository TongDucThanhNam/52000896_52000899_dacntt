import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "fashionAI",
  description: "Trang web bán hàng thời trang",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
