import NextBreadcrumb from "@/components/display/NextBreadcrumbs/NextBreadcrumbs";
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/navigation/Footer/Footer";

export const metadata: Metadata = {
  title: "MrsLovely",
  description: "De leukste online kledingwinkel!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="top-bar bg-primary text-white py-2 text-center">
          <span className="text-white font-bold">
            ★ Gratis verzending vanaf €75 in NL ★
          </span>
        </div>

        <CartProvider>
          <SiteHeader />
          <NextBreadcrumb
            homeElement={"Home"}
            separator={<span> | </span>}
            activeClasses="text-primary text-xs  font-bold"
            containerClasses="flex max-w-screen-xl items-center py-5 m-auto "
            listClasses="hover:underline mx-2 text-xs "
            capitalizeLinks
          />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
