"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[--porcelain]/80 backdrop-blur-lg border-b border-[--soft-gold]/50"
          : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between py-6">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-[--onyx]"
          >
            Pranay Guda
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/#experience"
              className="text-[--onyx] hover:text-[--soft-gold] transition-colors"
            >
              Experience
            </Link>
            <Link
              href="/#projects"
              className="text-[--onyx] hover:text-[--soft-gold] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#writings"
              className="text-[--onyx] hover:text-[--soft-gold] transition-colors"
            >
              Writing
            </Link>
            <Link
              href="/#about"
              className="text-[--onyx] hover:text-[--soft-gold] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-[--onyx] hover:text-[--soft-gold] transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
