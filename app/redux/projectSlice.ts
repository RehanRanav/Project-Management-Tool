import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProjectData } from "@/definition";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase.config";

export const addprojectToDB = createAsyncThunk(
  "addProject",
  async (projectdata: ProjectData) => {
    try {
      if (projectdata.title !== "" && projectdata.createdBy !== "") {
        await addDoc(collection(db, "projects"), {
          projectdata,
        });
      }
    } catch (error) {
      return false;
    }
  }
);

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
    // addProject: (state, action: PayloadAction<ProjectData | undefined>) => {
    //   if (action.payload) {
    //     addProjectToFirebase(action.payload);
    //     return action.payload;
    //   }
    //   return state;
    // },
    setProject: (state, action: PayloadAction<ProjectData | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
    updateTitle: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.title = action.payload;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addprojectToDB.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    });
  },
});

export const { setProject, updateTitle } = projectSlice.actions;
export const selectProject = (state: { project: ProjectData }) => state.project;
export default projectSlice.reducer;
