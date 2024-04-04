import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import { ProjectData, ProjectTask } from "@/definition";

export const addProjectToFirebase = async (projectdata: ProjectData) => {
  try {
    if (projectdata.title !== "" && projectdata.createdBy !== "") {
      await addDoc(collection(db, "projects"), {
        projectdata,
      });
    }
  } catch (error) {
    console.error("Error adding project to Firebase:", error);
  }
};

export const addTaskToFirebase = async (taskdata: ProjectTask) => {
  try {
    if (taskdata.projectId !== "") {
      await addDoc(collection(db, "tasks"), {
        taskdata,
      });
    }
  } catch (error) {
    console.error("Error adding tasks to Firebase:", error);
  }
};
