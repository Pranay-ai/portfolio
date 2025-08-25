import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[--porcelain] px-6">
      <div className="text-center max-w-4xl">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl tracking-tight">
          A backend-focused full-stack developer crafting scalable,
          high-throughput distributed systems.
        </h1>
        <div className="mt-12">
          <Link
            href="/#experience"
            className="inline-block bg-[--onyx] text-black font-extrabold  py-3 px-8  text-base  transition-transform duration-200 ease-out hover:text-[--soft-gold] hover:scale-105"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
}
