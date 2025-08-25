import Link from "next/link";

export default function Projects({ projects }) {
  return (
    <div id="projects" className="py-16 mx-16  md:py-24 bg-[--porcelain] ">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center mb-16">
        <h2 className="font-headline text-3xl md:text-4xl">Key Projects</h2>
      </div>
      <div className="space-y-8 md:space-y-16">
        {projects.map(({ id, title, description, color }) => (
          <section
            key={id}
            style={{ backgroundColor: `var(--${color})` }}
            className="py-16 md:py-24"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="font-headline text-2xl md:text-3xl">{title}</h3>
                <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                  {description}
                </p>
                <Link
                  href={`/projects/${id}`}
                  className="inline-block font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors group"
                >
                  View Case Study{" "}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    -&gt;
                  </span>
                </Link>
              </div>
              {/* You can add specific SVGs here based on the project id if you want */}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
