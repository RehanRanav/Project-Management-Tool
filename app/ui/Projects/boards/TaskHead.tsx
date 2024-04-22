"use client";
import { getProjectData, updateProjectdata } from "@/app/lib/actions";
import {
  selectProject,
  setProject,
  updateTitle,
} from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { setTask } from "@/app/redux/taskSlice";
import { UserData } from "@/definition";
import { Avatar, Breadcrumb, Tooltip } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const TaskHead = () => {
  const project = useAppSelector(selectProject);
  const [title, setTitle] = useState(project.title);
  const [userdata, setUserdata] = useState<UserData[]>([]);
  const [disableTitleInput, setDisableTitleInput] = useState(true);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          if (res) {
            setUserdata(res.userdata);
            await dispatch(setProject(res.projectdata));
            await dispatch(setTask(res.taskdata));
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTitle(project.title);
  }, [project]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [disableTitleInput]);

  const updateTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleEdit = () => {
    setDisableTitleInput(false);
    titleInputRef.current?.setSelectionRange(
      titleInputRef.current.value.length,
      titleInputRef.current.value.length
    );
  };
  const handleTitleCancel = () => {
    setTitle(title);
    setDisableTitleInput(true);
  };

  const handleTitleInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const res = await updateProjectdata(project.id as string, "title", title);
      if (res) {
        await dispatch(updateTitle(title));
        handleTitleCancel();
      }
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/projects">Project</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>tasks</Breadcrumb.Item>
      </Breadcrumb>
      <div className="lg:hidden block">
        <div className="flex gap-8">
          <div className="flex gap-2 p-1 justify-start items-center w-fit">
            <input
              type="text"
              ref={titleInputRef}
              value={title}
              onChange={updateTitleValue}
              className="p-1 h-fit w-28 bg-inherit text-lg flex-1 border-none text-gray-900 font-semibold rounded block"
              disabled={disableTitleInput}
              onKeyDown={(e) => handleTitleInputKeyDown(e)}
            />
            {disableTitleInput ? (
              <button
                className="hover:bg-gray-200 border border-transparent hover:border-gray-500 p-1 rounded-sm"
                onClick={handleTitleEdit}
              >
                <BiEdit />
              </button>
            ) : (
              <button
                className="hover:bg-gray-200 border border-transparent hover:border-gray-500 p-1 rounded-sm"
                onClick={handleTitleCancel}
              >
                <IoIosClose />
              </button>
            )}
          </div>
          <div>
            <Avatar.Group>
              {userdata.length > 0 &&
                userdata.map((team: UserData, index: number) => (
                  <Tooltip content={`${team.name}`} arrow={false}>
                    <Avatar
                      img={team.image}
                      key={index}
                      size={"sm"}
                      rounded
                      stacked
                    ></Avatar>
                  </Tooltip>
                ))}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHead;
