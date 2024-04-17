import {
  addDoc,
  collection,
  query,
  onSnapshot,
  getDocs,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import {
  EmailObj,
  ProjectData,
  ProjectTask,
  TaskObject,
  Tasklist,
} from "@/definition";
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

export const setTaskToFirebase = async (taskdata: ProjectTask) => {
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
          doc
            .data()
            .projectdata.team.some((team: EmailObj) => team.email == email)
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
    const projectdoc = querySnapshot.docs[0];

    const taskQuery = query(
      collection(db, "tasks"),
      where("taskdata.projectId", "==", id)
    );
    const taskQuerySnapshot = await getDocs(taskQuery);
    if (taskQuerySnapshot.empty) {
      return null;
    }
    const taskdoc = taskQuerySnapshot.docs[0];

    const createdByEmail = projectdoc.data().projectdata.createdBy;
    const userRef = collection(db, "users");
    const userQuery = query(
      userRef,
      where("Userdata.email", "==", createdByEmail)
    );
    const userQuerySnapshot = await getDocs(userQuery);

    let userData = [];
    if (!userQuerySnapshot.empty) {
      userData.push(userQuerySnapshot.docs[0].data().Userdata);
    }

    const teamArr = projectdoc.data().projectdata.team;
    if (teamArr.length > 0) {
      await Promise.all(
        teamArr.map(async (member: EmailObj) => {
          if (member.approval) {
            const teamMemberQuery = query(
              userRef,
              where("Userdata.email", "==", member.email)
            );

            const teamMemberQuerySnapshot = await getDocs(teamMemberQuery);

            userData.push(teamMemberQuerySnapshot.docs[0].data().Userdata);
          }
        })
      );
    }

    const project = {
      projectdata: projectdoc.data().projectdata,
      userdata: userData,
      taskdata: taskdoc.data().taskdata,
    };

    return project;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserData = async (email: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("Userdata.email", "==", email)
    );
    let userData = null;
    const userQuerySnapshot = await getDocs(q);
    if (!userQuerySnapshot.empty) {
      userData = userQuerySnapshot.docs[0].data().Userdata;
    }
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProjectdata = async (
  projectId: string,
  key: string,
  value: string
) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("projectdata.id", "==", projectId)
    );

    const projectQuerySnapshot = await getDocs(q);
    if (!projectQuerySnapshot.empty) {
      const getProject = projectQuerySnapshot.docs[0];
      await updateDoc(getProject.ref, {
        [`projectdata.${key}`]: value,
      });
    } else {
      return null;
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProjectApproval = async (
  projectId: string,
  email: string
) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("projectdata.id", "==", projectId)
    );

    const projectQuerySnapshot = await getDocs(q);
    if (!projectQuerySnapshot.empty) {
      const getProject = projectQuerySnapshot.docs[0];
      const projectTeamData = getProject.data().projectdata.team;
      const teamIndex = projectTeamData.findIndex(
        (member: EmailObj) => member.email === email
      );

      if (teamIndex !== -1) {
        const updatedTeam = [...projectTeamData];
        updatedTeam[teamIndex].approval = true;
        await updateDoc(getProject.ref, {
          "projectdata.team": updatedTeam,
        });
      } else {
        return null;
      }
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeFromTeam = async (projectId: string, email: string) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("projectdata.id", "==", projectId)
    );

    const projectQuerySnapshot = await getDocs(q);
    if (!projectQuerySnapshot.empty) {
      const getProject = projectQuerySnapshot.docs[0];
      const projectTeamData = getProject.data().projectdata.team;
      const teamIndex = projectTeamData.findIndex(
        (member: EmailObj) => member.email === email
      );

      if (teamIndex !== -1) {
        const updatedTeam = [...projectTeamData];
        updatedTeam.splice(teamIndex, 1);
        await updateDoc(getProject.ref, {
          "projectdata.team": updatedTeam,
        });
      } else {
        return null;
      }
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteProjectFromFirbase = async (projectId: string) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("projectdata.id", "==", projectId)
    );
    const projectQuerySnapshot = await getDocs(q);
    if (!projectQuerySnapshot.empty) {
      const docId = projectQuerySnapshot.docs[0].id;
      await deleteDoc(doc(db, "projects", docId));
    } else {
      return null;
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addTasktoFirebase = async (taskdata: ProjectTask) => {
  try {
    if (taskdata.projectId !== "") {
      const q = query(
        collection(db, "tasks"),
        where("taskdata.projectId", "==", taskdata.projectId)
      );
      console.log(taskdata.tickets);
      
      const taskQuerySnapshot = await getDocs(q);
      if (!taskQuerySnapshot.empty) {
        const getTask = taskQuerySnapshot.docs[0];
        await updateDoc(getTask.ref, {
          "taskdata.tasklist": taskdata.tasklist,
          "taskdata.tickets": taskdata.tickets
        });
      } else {
        return null;
      }
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTaskCard = async (task: TaskObject, projectId: string) => {
  try {
    const q = query(
      collection(db, "tasks"),
      where("taskdata.projectId", "==", projectId)
    );

    const taskQuerySnapshot = await getDocs(q);
    if (taskQuerySnapshot.empty) {
      return false;
    }

    const taskDoc = taskQuerySnapshot.docs[0];
    const taskId = task.id;

    const taskIndexArray = taskDoc
      .data()
      .taskdata.tasklist.map((item: Tasklist) => {
        return item.cards.findIndex((t: TaskObject) => t.id === taskId);
      });

    const taskListIndex = taskIndexArray.findIndex(
      (item: number) => item !== -1
    );

    if (taskListIndex !== -1) {
      const updatedTasklist = taskDoc.data().taskdata.tasklist;

      const updatedCards = [...updatedTasklist[taskListIndex].cards];

      updatedCards[taskIndexArray[taskListIndex]] = task;

      updatedTasklist[taskListIndex].cards = updatedCards;

      await updateDoc(taskDoc.ref, {
        "taskdata.tasklist": updatedTasklist,
      });

      const updatedtaskQuerySnapshot = await getDocs(q);
      const response = updatedtaskQuerySnapshot.docs[0].data();
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
