"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router";

const slides = [
  {
    id: "1",
    title: "Professional Library Management",
    subtitle: "Enterprise-Grade Book Management System",
    description:
      "Streamline your library operations with our comprehensive digital solution. Track inventory, manage borrowing, and analyze usage patterns with powerful analytics.",
    image: "https://placehold.co/600x400",
    cta: "Explore Collection",
    ctaLink: "/books",
  },
  {
    id: "2",
    title: "Smart Inventory Control",
    subtitle: "Real-Time Book Tracking & Analytics",
    description:
      "Monitor your collection in real-time with advanced tracking capabilities. Get insights into popular titles, borrowing patterns, and inventory optimization.",
    image: "https://placehold.co/600x400",
    cta: "View Analytics",
    ctaLink: "/borrow-summary",
  },
  {
    id: "3",
    title: "Seamless User Experience",
    subtitle: "Intuitive Design Meets Powerful Features",
    description:
      "Experience the perfect balance of simplicity and functionality. Our user-centric design ensures efficient workflows for both librarians and patrons.",
    image: "https://placehold.co/600x400",
    cta: "Get Started",
    ctaLink: "/create-book",
  },
];

export function HeroSlider() {
  return (
    <div className="container mx-auto my-10 px-4">
      <Carousel className="w-full rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-6 lg:px-16">
                {/* Text Content */}
                <div className="flex-1 text-white space-y-6 text-center lg:text-left">
                  <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-medium">
                    {slide.subtitle}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-md sm:text-lg text-blue-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>
                  <div>
                    <Link to={slide.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-white text-slate-900 hover:bg-blue-50 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex-1 max-w-md mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl -z-10" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full rounded-2xl border border-white/10 shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl hidden sm:block">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 lg:left-6" />
        <CarouselNext className="right-2 lg:right-6" />
      </Carousel>
    </div>
  );
}
