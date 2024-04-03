"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import { TaskIndexProps } from "@/definition";

const TasksIndex: React.FC<TaskIndexProps> = ({ email }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "projects"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: any[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().projectdata.createdBy == email)
          items.push({ ...doc.data() });
      });
    });
  }, []);

  return <div className=""></div>;
};

export default TasksIndex;
