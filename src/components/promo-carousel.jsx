"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const promoSlides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=2187&auto=format&fit=crop",
        alt_bn: "সীমিত সময়ের অফার",
        alt_en: "Limited Time Offer",
        hint: "special sale discount"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2370&auto=format&fit=crop",
        alt_bn: "নতুন পণ্য এসেছে",
        alt_en: "New Arrivals",
        hint: "new product"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2371&auto=format&fit=crop",
        alt_bn: "ফ্যাশন সেল",
        alt_en: "Fashion Sale",
        hint: "clothing rack"
    }
]


export default function PromoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
            align: "start",
            loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-4">
            {promoSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4">
                <Link href="/products">
                     <Image
                        src={slide.image}
                        alt={slide.alt_en}
                        width={1200}
                        height={500}
                        className="rounded-lg shadow-lg w-full aspect-[12/5] object-cover"
                        data-ai-hint={slide.hint}
                     />
                </Link>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              current === index ? "w-4 bg-primary" : "bg-primary/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
