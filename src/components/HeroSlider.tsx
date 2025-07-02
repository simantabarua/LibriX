"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router";

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const slides: SlideData[] = [
  {
    id: "1",
    title: "Professional Library Management",
    subtitle: "Enterprise-Grade Book Management System",
    description:
      "Streamline your library operations with our comprehensive digital solution. Track inventory, manage borrowing, and analyze usage patterns with powerful analytics.",
    image: "/placeholder.svg?height=500&width=700",
    cta: "Explore Collection",
    ctaLink: "/books",
  },
  {
    id: "2",
    title: "Smart Inventory Control",
    subtitle: "Real-Time Book Tracking & Analytics",
    description:
      "Monitor your collection in real-time with advanced tracking capabilities. Get insights into popular titles, borrowing patterns, and inventory optimization.",
    image: "/placeholder.svg?height=500&width=700",
    cta: "View Analytics",
    ctaLink: "/borrow-summary",
  },
  {
    id: "3",
    title: "Seamless User Experience",
    subtitle: "Intuitive Design Meets Powerful Features",
    description:
      "Experience the perfect balance of simplicity and functionality. Our user-centric design ensures efficient workflows for both librarians and patrons.",
    image: "/placeholder.svg?height=500&width=700",
    cta: "Get Started",
    ctaLink: "/create-book",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div className="flex h-full items-center justify-between px-12 lg:px-20">
            <div className="flex-1 text-white space-y-8 max-w-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium text-blue-200">
                    {slide.subtitle}
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
              </div>

              <p className="text-xl text-blue-100 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-6">
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

            <div className="hidden lg:block flex-1 relative">
              <div className="relative ml-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl border border-white/10"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all border border-white/20 hover:border-white/30"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all border border-white/20 hover:border-white/30"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
