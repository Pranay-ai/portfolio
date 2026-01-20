export default function Footer() {
  return (
    <footer className="bg-[--ivory] pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Elegant divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[--sage]/30 to-transparent mb-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <p className="font-headline text-lg tracking-wide text-[--charcoal]">
            Pranay Guda
          </p>

          {/* Copyright */}
          <p className="font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--taupe]">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>

          {/* Decorative element */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-[--sage-muted]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
            <span className="w-8 h-px bg-[--sage-muted]" />
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="group flex flex-col items-center gap-2 font-sans-elegant text-[10px] tracking-[0.2em] uppercase text-[--taupe] hover:text-[--charcoal] transition-colors duration-300"
          >
            <div className="w-px h-6 bg-gradient-to-t from-[--sage] to-transparent group-hover:h-10 transition-all duration-300" />
            <span>Back to Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
