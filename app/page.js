import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Writings from "./components/Writings";
import About from "./components/About";
import Contact from "./components/Contact";
import { getSortedContentData } from "./lib/content";

export default function Home() {
  const allProjects = getSortedContentData("projects");
  const allWritings = getSortedContentData("writings");

  return (
    <>
      <Hero />
      <Experience />
      <Projects projects={allProjects} />
      <Writings writings={allWritings} />
      <About />
      <Contact />
    </>
  );
}
