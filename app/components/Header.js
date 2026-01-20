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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[--cream]/90 backdrop-blur-xl border-b border-[--sage]/20 shadow-sm"
          : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between py-6 lg:py-8">
          <Link
            href="/"
            className="font-headline text-xl tracking-wide text-[--charcoal] hover:text-[--sage] transition-colors duration-300"
          >
            Pranay Guda
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            {[
              { href: "/#experience", label: "Experience" },
              { href: "/#projects", label: "Projects" },
              { href: "/#writings", label: "Writing" },
              { href: "/#about", label: "About" },
              { href: "/#contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--graphite] hover:text-[--charcoal] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[--sage] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
