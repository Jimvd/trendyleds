import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
   return (
      <header className="z-10 relative max-w-full flex items-center border-b-2 border-gray justify-between container mx-auto ">
         <div className="flex-grow"></div>
         <div className="logo-area">
            <Link href="/" className="flex py-4 justify-center">
               <Image src="/kkeijzer-v2.png" alt="kkeijzer" width={180} height={120} />
            </Link>
         </div>
         <div className="flex-grow"></div>
      </header>
   );
}
