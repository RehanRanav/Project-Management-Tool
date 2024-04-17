import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectTask, TaskObject, Tasklist } from "@/definition";
import { addTasktoFirbase, setTaskToFirebase } from "@/app/lib/actions";
import { UniqueIdentifier } from "@dnd-kit/core";

const initialState: ProjectTask = {
  projectId: "",
  tasklist: [
    {
      id: "todo",
      title: "To do",
      cards: [],
    },
    {
      id: "inprogress",
      title: "In Progress",
      cards: [],
    },
    {
      id: "review",
      title: "Review",
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ],
};

const taskSlice: any = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasktoFirebase: (
      state,
      action: PayloadAction<UniqueIdentifier | undefined>
    ) => {
      if (action.payload) {
        state.projectId = action.payload;
        state.tasklist = initialState.tasklist;
        setTaskToFirebase(state);
      }
    },

    setTask: (state, action: PayloadAction<ProjectTask | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },

    addTask: (state, action: PayloadAction<TaskObject | undefined>) => {
      if (action.payload) {
        state.tasklist = state.tasklist.map((task) => {
          if (task.id == action.payload?.initialStatus) {
            return {
              ...task,
              cards: [...task.cards, action.payload],
            };
          }
          return task;
        });
        addTasktoFirbase({
          projectId: state.projectId,
          tasklist: state.tasklist,
        });
      }
    },
    updateTask: (state, action: PayloadAction<Tasklist[] | undefined>) => {
      if (action.payload) {
        state.tasklist = action.payload;
      }
      addTasktoFirbase({
        projectId: state.projectId,
        tasklist: state.tasklist,
      });
    },
    updateCard: (state, action: PayloadAction<Tasklist[] | undefined>) => {
      if (action.payload) {        
        state.tasklist = action.payload;
      }
    },
  },
});

export const { addTask, setTask, setTasktoFirebase, updateTask, updateCard } =
  taskSlice.actions;
export const selectTask = (state: { task: ProjectTask }) => state.task.tasklist;
export default taskSlice.reducer;
