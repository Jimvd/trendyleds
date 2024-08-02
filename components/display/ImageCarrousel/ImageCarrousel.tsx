"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ImageCarouselProps } from "./ImageCarrousel.types";

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
   const [selectedImage, setSelectedImage] = useState(0);
   const touchStartX = useRef<number>(0);

   const handleImageClick = (index: number) => {
      setSelectedImage(index);
   };

   const handleNextImage = () => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
   };

   const handlePrevImage = () => {
      setSelectedImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
   };

   const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
   };

   const handleTouchEnd = (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchDiff = touchEndX - touchStartX.current;

      if (touchDiff > 50) {
         // Swipe right
         handlePrevImage();
      } else if (touchDiff < -50) {
         // Swipe left
         handleNextImage();
      }
   };

   return (
      <div className="max-w-2xl relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
         <div className="flex">
            <div className="flex  mo:hidden flex-col mr-4">
               {images.map((image, index) => (
                  <div key={index} className="inline-block m-2">
                     <Image
                        src={image.src}
                        alt={image.alt}
                        width="72"
                        height="72"
                        onClick={() => handleImageClick(index)}
                        className="cursor-pointer"
                     />
                  </div>
               ))}
            </div>

            <div className="flex flex-col">
               {images.length > 0 ? (
                  <>
                     <Image src={images[selectedImage].src} alt={images[selectedImage].alt} width="500" height="500" />
                     <div className="flex justify-center mt-4">
                        {images.map((_, index) => (
                           <div
                              key={index}
                              onClick={() => handleImageClick(index)}
                              className={`w-4 h-4 mx-2 rounded-full cursor-pointer ${
                                 index === selectedImage ? "bg-primary" : "bg-gray-300"
                              }`}
                           />
                        ))}
                     </div>
                  </>
               ) : (
                  <div className="text-center text-gray-500">Geen afbeeldingen beschikbaar</div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ImageCarousel;
