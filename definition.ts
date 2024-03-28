import { UniqueIdentifier } from "@dnd-kit/core";

export interface TaskObject{
    id: UniqueIdentifier;
    task: string;
    issueType: string;
    status: string;
}
export interface Tasklist{
    taskList: TaskObject[];
}