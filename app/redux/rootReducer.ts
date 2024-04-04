import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from '@/app/redux/taskSlice'
import projectReducer from '@/app/redux/projectSlice'

const rootReducer = combineReducers({
    task: taskReducer,
    project: projectReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;