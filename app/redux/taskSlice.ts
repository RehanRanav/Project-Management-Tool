import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskObject, Tasklist } from "@/definition";

const initialState: Tasklist[] = [
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
];

const taskSlice: any = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Tasklist[] | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
    addTask: (state, action: PayloadAction<TaskObject | undefined>) => {
      if (action.payload) {
        return state.map((task) => {
          if (task.id == action.payload?.initialStatus) {
            return {
              ...task,
              cards: [...task.cards, action.payload],
            };
          }
          return task;
        });
      }
      return state;
    },
  },
});

export const { addTask, setTask } = taskSlice.actions;
export const selectTask = (state: { task: Tasklist[] }) => state.task;
export default taskSlice.reducer;
