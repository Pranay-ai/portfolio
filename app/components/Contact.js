export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[--porcelain] py-24 md:py-32 text-center"
    >
      <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
        <h2 className="font-headline text-3xl md:text-4xl">Let's Connect</h2>
        <p className="mt-4 text-lg text-gray-600">
          Open to new opportunities and collaborations.
        </p>
        <div className="mt-10 flex items-center justify-center space-x-6">
          <a
            href="mailto:gudapranaynetha@gmail.com"
            className="font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/pranaynetha"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pranay-netha-guda/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
