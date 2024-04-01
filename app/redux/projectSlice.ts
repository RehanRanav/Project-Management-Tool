import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectData, TaskObject, Tasklist } from "@/definition";

const initialState: ProjectData = {
  id: "",
  title: "",
  description: "",
  date: "",
  createdBy: "",
};

const projectSlice: any = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectData | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
  },
});

export const { addProject } = projectSlice.actions;
export const selectProject = (state: { project: ProjectData }) => state.project;
export default projectSlice.reducer;
