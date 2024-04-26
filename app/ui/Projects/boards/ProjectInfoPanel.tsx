"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { useParams, useRouter } from "next/navigation";
import { getProjectData, updateProjectdata } from "@/app/lib/actions";
import { useDispatch } from "react-redux";
import {
  selectProject,
  setProject,
  updateTitle,
} from "@/app/redux/projectSlice";
import { useAppSelector } from "@/app/redux/store";
import { UserData } from "@/definition";
import { setTask } from "@/app/redux/taskSlice";
import { Tooltip } from "flowbite-react";
import { ProjectInfoPanelSkeleton } from "@/app/ui/skeleton";
import toast from "react-hot-toast";

const ProjectInfoPanel = () => {
  const project = useAppSelector(selectProject);
  const [userdata, setUserdata] = useState<UserData[]>([]);
  const [expandToggle, setExpandToggle] = useState(false);
  const [disableTitleInput, setDisableTitleInput] = useState(true);
  const [title, setTitle] = useState(project.title);
  const [isDescriptionOverflowed, setIsDescriptionOverflowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const expandBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const res = await getProjectData(params.id as string);

          if (res) {
            setUserdata(res.userdata);
            await dispatch(setProject(res.projectdata));
            await dispatch(setTask(res.taskdata));
          } else {
            router.push(`/${project.id}`)
          }
        }
      } catch (error) {
        return;
      }
    };

    fetchData();
  }, [params.id, dispatch,router, project.id]);

  useEffect(() => {
    if (userdata.length > 0 && project) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [project, userdata]);

  useEffect(() => {
    setTitle(project.title);
    if (
      descriptionRef.current &&
      descriptionRef.current?.scrollHeight >
        descriptionRef.current?.clientHeight
    ) {
      setIsDescriptionOverflowed(true);
    }
  }, [project]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        titleInputRef.current &&
        !titleInputRef.current.contains(event.target as Node)
      ) {
        setTitle(title);
        setDisableTitleInput(true);
      }
    };

    if (!disableTitleInput) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [disableTitleInput, title]);

  const handleDescriptionHeight = () => {
    const Btnelement = expandBtnRef.current;
    const Descriptionelement = descriptionRef.current;
    if (Descriptionelement && Btnelement) {
      setExpandToggle(!expandToggle);
      const rotateDeg = expandToggle ? "0deg" : "180deg";
      Btnelement.style.transform = `rotate(${rotateDeg})`;
      Descriptionelement.scrollTop = 0;
    }
  };

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
      if (titleInputRef.current?.value.trim() == "") {
        setTitle(project.title);
      } else {
        const res = await updateProjectdata(
          project.id as string,
          "title",
          title
        );
        if (res) {
          await dispatch(updateTitle(title));
          toast.success("Project Name Edited Successfully");
          handleTitleCancel();
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 text-base h-fit">
      {isLoading ? (
        <ProjectInfoPanelSkeleton />
      ) : (
        <>
          <div className="flex gap-2 p-4 mt-4 justify-start items-center bg-gray-100">
            <Image
              src="/assets/project-icon.svg"
              alt="Project Icon"
              width={30}
              height={30}
              className="rounded w-7 h-7"
            />
            <input
              type="text"
              ref={titleInputRef}
              value={title}
              onChange={updateTitleValue}
              className="p-1 h-fit bg-inherit text-lg resize-none flex-1 border-none text-gray-900 font-semibold rounded block w-full"
              disabled={disableTitleInput}
              onKeyDown={(e) => handleTitleInputKeyDown(e)}
            />
            {disableTitleInput ? (
              <Tooltip
                content="Edit Project Name"
                className="p-0.5 text-[10px] rounded-sm"
                arrow={false}
              >
                <button
                  className="hover:bg-gray-200 border border-transparent hover:border-gray-500 p-1 rounded-sm"
                  onClick={handleTitleEdit}
                >
                  <BiEdit />
                </button>
              </Tooltip>
            ) : (
              <button
                className="hover:bg-gray-200 border border-transparent hover:border-gray-500 p-1 rounded-sm"
                onClick={handleTitleCancel}
              >
                <IoIosClose />
              </button>
            )}
          </div>
          <div className="p-2 flex flex-col gap-4 m-0.5 rounded text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Project Description:</span>
              <div
                className={`h-20 rounded p-1 line-clamp-4 leading-relaxed text-xs relative
                ${expandToggle ? "h-52 line-clamp-none overflow-y-scroll": "h-20"}`}
                ref={descriptionRef}
              >
                {project.description}
                {isDescriptionOverflowed && (
                  <button
                    className={`text-sm bg-transparent sticky left-40 bottom-0 transition-all ease-in-out duration-700`}
                    onClick={handleDescriptionHeight}
                    ref={expandBtnRef}
                    title="view more"
                  >
                    <IoIosArrowDown />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium p-0.5 rounded">Team:</span>
              {userdata.length > 0 &&
                userdata.map((team: UserData, index: number) => (
                  <div
                    className="rounded p-1 flex items-center gap-2 cursor-pointer"
                    key={index}
                  >
                    <Image
                      src={team.image || "/assets/default-profile.svg"}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full"
                    />
                    <span>{team.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectInfoPanel;
