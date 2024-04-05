import { addDoc, collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { ProjectData, ProjectTask } from "@/definition";
import { SetStateAction } from "react";

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

export const getAllProjectsData = (
  setProjects: React.Dispatch<React.SetStateAction<any[]>>,
  email: string
) => {
  try {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: any[] = [];

      querySnapshot.forEach((doc) => {
        if (
          doc.data().projectdata.createdBy == email ||
          doc.data().projectdata.team.indexOf(email) > -1
        )
          items.push({ ...doc.data() });
      });
      setProjects(items);
    });
  } catch (error) {
    console.error("Error while getting project All data: ", error);
  }
};
