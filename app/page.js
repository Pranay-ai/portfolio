import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Writings from "./components/Writings";
import About from "./components/About";
import Contact from "./components/Contact";
import { writingDetails } from "./content/writings/writings";
import { projectDetails } from "./content/projects/projects";

export default function Home() {
  // const allProjects = getSortedContentData("projects");
  // const allWritings = getSortedContentData("writings");

  return (
    <>
      <Hero />
      <Experience />
      <Projects projects={projectDetails} />
      <Writings writings={writingDetails} />
      <About />
      <Contact />
    </>
  );
}
