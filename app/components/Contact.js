export default function Contact() {
  const links = [
    {
      label: "Phone",
      href: "tel:+12097078888",
      external: false,
    },
    {
      label: "Email",
      href: "mailto:gudapranaynetha@gmail.com",
      external: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/Pranay-ai",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/netha-pranay-10guda/",
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[--sage-pale]/50 via-[--cream] to-[--ivory] py-28 md:py-40 text-center relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[--sage]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[--sage-muted] rounded-full blur-3xl opacity-10" />

      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe] mb-4">
          Start a Conversation
        </p>

        <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[--charcoal] tracking-wide">
          {"Let's Connect"}
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="w-12 h-px bg-[--sage-muted]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
          <span className="w-12 h-px bg-[--sage-muted]" />
        </div>

        <p className="mt-8 text-xl md:text-2xl text-[--graphite] font-light max-w-lg mx-auto leading-relaxed">
          Open to opportunities in AI/ML engineering, backend architecture, and distributed systems. Let's build something remarkable.
        </p>

        {/* Contact links */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group relative font-sans-elegant text-base tracking-[0.15em] uppercase text-[--charcoal] hover:text-[--sage] transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {link.label}
                {link.external && (
                  <svg
                    className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                )}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[--sage] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Decorative bottom element */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-[--sage-muted]"
                style={{ opacity: 1 - i * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
