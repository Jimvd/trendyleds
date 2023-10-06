import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
   return (
      <header className="z-10 relative flex items-center justify-between container mx-auto lg:max-w-4xl">
         <div className="logo-area">
            <Link href="/" className="flex justify-center">
               <Image src="/kkeijzer.png" alt="kkeijzer" width={180} height={120} />
            </Link>
         </div>
         <nav className="text-slate-100">
            <ul className=" flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 ">
               <li>
                  <Link href="/">home</Link>
               </li>
               <li>
                  <Link href="/blog">Blog</Link>
               </li>
               <li>
                  <Link href="/contact">Contact</Link>
               </li>
               <li>
                  <Link href="/about">About</Link>
               </li>
            </ul>
         </nav>
      </header>
   );
}
