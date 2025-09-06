import { writingDetails } from "../content/writings/writings";
import { projectDetails } from "../content/projects/projects";

export async function getWritingData(id) {
  return writingDetails.find((writing) => writing.id === id);
}

export async function getProjectData(id) {
  return projectDetails.find((project) => project.id === id);
}
