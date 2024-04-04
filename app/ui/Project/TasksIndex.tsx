"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { TaskIndexProps } from "@/definition";
import ProjectCard from "@/app/ui/Project/ProjectCard";

const TasksIndex: React.FC<TaskIndexProps> = ({ email }) => {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
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

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectCard project={project.projectdata} key={index} />
        ))}
    </div>
  );
};

export default TasksIndex;
