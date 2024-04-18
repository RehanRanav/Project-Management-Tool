import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from '@/app/redux/taskSlice'
import projectReducer from '@/app/redux/projectSlice'
import searchReducer from '@/app/redux/searchSlice';

const rootReducer = combineReducers({
    task: taskReducer,
    project: projectReducer,
    search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;