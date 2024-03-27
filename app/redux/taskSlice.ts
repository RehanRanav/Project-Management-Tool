import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskObject, Tasklist } from "@/definition";

const initialState: Tasklist = {
  taskList: [],
};

const taskSlice: any = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskObject | undefined>) => {
      if (action.payload) {
        state.taskList.push(action.payload);
      }
    },
  },
});

export const {addTask} = taskSlice.actions;
export const selectTask = (state:{task: Tasklist})=> state.task.taskList;
export default taskSlice.reducer;
