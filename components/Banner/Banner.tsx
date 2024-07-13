/* eslint-disable jsx-a11y/alt-text */
import { StaticImageData } from "next/image";
import Link from "next/link";

export type BannerProps = {
   mobileImg: string | StaticImageData;
   desktopImg: string | StaticImageData;
   href?: string;
   title?: string;
   priority: boolean;
   className?: string;
};

const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 473;
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 473;

export const Banner = ({
   mobileImg,
   desktopImg,
   href,
   title = "Trendy leds slimme led verlichting",
   priority,
   className,
}: BannerProps) => {
   // Check if banner has a href for Link component render
   const ElementType = href ? Link : "div";
   const additionalProps = href ? { href, title: title || "Trendy leds slimme led verlichting" } : null;

   const sharedImgProps = {
      alt: title,
      sizes: "100vw",
      priority: priority.toString(),
   };

   const mobileSrcSet = typeof mobileImg === "string" ? mobileImg : mobileImg.src;
   const desktopSrcSet = typeof desktopImg === "string" ? desktopImg : desktopImg.src;

   return (
      <ElementType {...(additionalProps as any)} className="relative block overflow-hidden">
         <picture>
            <source media="(max-width: 767px)" width={MOBILE_WIDTH} height={MOBILE_HEIGHT} srcSet={mobileSrcSet} />
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} width={DESKTOP_WIDTH} height={DESKTOP_HEIGHT} />
            <img {...sharedImgProps} className={`${className ? className : "lg:h-[600px] h-auto w-full"}`} />
         </picture>
      </ElementType>
   );
};
