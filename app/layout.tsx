import NextBreadcrumb from "@/components/display/NextBreadcrumbs/NextBreadcrumbs";
import "./globals.css";
import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/navigation/Footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="nl">
         <head>
            <link rel="icon" href="/faveicontrendyleds.svg" />
         </head>
         <body>
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
