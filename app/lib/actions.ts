import {
  addDoc,
  collection,
  query,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { ProjectData, ProjectTask } from "@/definition";
import { Session } from "next-auth";

export const addUsertoDatabase = async (user: Session | null) => {
  try {
    const email = user?.user?.email;
    if (!email) {
      return;
    }
    const q = query(
      collection(db, "users"),
      where("Userdata.email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collection(db, "users"), {
        Userdata: user.user,
      });
    }
  } catch (error) {
    console.log("error while Add user", error);
  }
};

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

export const getProjectData = async (id: string) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("projectdata.id", "==", id)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    const createdByEmail = doc.data().projectdata.createdBy;
    const userRef = collection(db, "users");
    const userQuery = query(
      userRef,
      where("Userdata.email", "==", createdByEmail)
    );
    const userQuerySnapshot = await getDocs(userQuery);

    let userData = null;
    if (!userQuerySnapshot.empty) {
      userData = userQuerySnapshot.docs[0].data().Userdata;
    }

    const project = {
      projectdata: doc.data().projectdata,
      userdata: userData,
    };

    return project;
  } catch (error) {
    console.log(error);
    return null;
  }
};
