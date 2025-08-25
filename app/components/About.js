import Image from "next/image";
export default function About() {
  return (
    <section id="about" className="bg-[--porcelain] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex justify-center">
          <div className="w-36 h-36 md:w-44 md:h-44 bg-gray-300 rounded-full overflow-hidden shadow-xl ring-1 ring-white/50">
            <Image
              src="png.jpeg"
              alt="Portrait of Pranay Netha Guda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-2 space-y-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            I specialize in building robust, scalable backend systems and
            integrating them with clean, performant frontends. My focus is on
            creating high-impact solutions that drive efficiency and solve
            complex technical challenges.
          </p>
          <div className="border-t border-[--soft-gold]/30 pt-10">
            <p className="text-sm font-medium text-gray-500 mb-6 tracking-wide">
              Certifications
            </p>
            <div className="bg-white/40 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/60 shadow-sm inline-block">
              <span className="text-gray-600">
                AWS Certified Developer – Associate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
