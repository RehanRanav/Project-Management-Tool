import { UniqueIdentifier } from "@dnd-kit/core";

export interface TaskObject{
    id: UniqueIdentifier;
    task: string;
    issueType: string;
    initialStatus?: UniqueIdentifier;
}
export interface Tasklist{
    id: UniqueIdentifier;
    title: string;
    cards: TaskObject[];
}
export interface ProjectData{
    id: UniqueIdentifier;
    title: string;
    description: string;
    date: string;
    createdBy?: string;
}
export interface ProjectModalProps{
    email: string;
}