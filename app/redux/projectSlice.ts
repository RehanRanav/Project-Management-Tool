import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectData } from "@/definition";
import { addProjectToFirebase } from "@/app/lib/actions";

const initialState: ProjectData = {
  id: "",
  title: "",
  description: "",
  date: "",
  createdBy: "",
  team: [],
};

const projectSlice: any = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectData | undefined>) => {
      if (action.payload) {
        addProjectToFirebase(action.payload);
        return action.payload;
      }
      return state;
    },
    setProject: (state, action: PayloadAction<ProjectData | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
    updateTitle:(state, action: PayloadAction<string | undefined>) => {
      if(action.payload){
        state.title = action.payload;
      }
      return state;
    }
  },
});

export const { addProject, setProject, updateTitle } = projectSlice.actions;
export const selectProject = (state: { project: ProjectData }) => state.project;
export default projectSlice.reducer;
