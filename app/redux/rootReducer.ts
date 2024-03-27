import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from '@/app/redux/taskSlice'

const rootReducer = combineReducers({
    task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;