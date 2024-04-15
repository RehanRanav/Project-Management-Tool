import { UniqueIdentifier } from "@dnd-kit/core";
import { MouseEventHandler } from "react";
import { IconType } from "react-icons";

export interface TaskObject{
    id: UniqueIdentifier;
    task: string;
    issueType: string;
    initialStatus?: UniqueIdentifier;
    assignTo: UserData;
}
export interface Tasklist{
    id: UniqueIdentifier;
    title: string;
    cards: TaskObject[];
}
export interface ProjectTask{
    tasklist: Tasklist[];
    projectId: UniqueIdentifier;
}
export interface ProjectData{
    id: UniqueIdentifier;
    title: string;
    description: string;
    date: string;
    createdBy?: string;
    team: EmailObj[];
}
export interface EmailObj{
    email: string;
    approval: boolean;
}
export interface ProjectPageProps{
    email: string;
}
export interface ProjectCardProps{
    project: ProjectData;
    email:string;
    ClickFunction?: MouseEventHandler<HTMLDivElement>;
}
export interface UserData{
    name?: string;
    email?: string;
    image?: string;
}

export interface issueType{
    icon: IconType;
    color: string;
    content: string;
}