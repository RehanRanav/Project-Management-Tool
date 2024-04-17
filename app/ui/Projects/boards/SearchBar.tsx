import { filterCards } from "@/app/redux/searchSlice";
import { useAppSelector } from "@/app/redux/store";
import { selectTask } from "@/app/redux/taskSlice";
import React, { useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const searchRef = useRef(null);
  const tasks = useAppSelector(selectTask);
  const dispatch = useDispatch();

  const debounceFunc = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  const filterdata = () => {
    dispatch(filterCards(tasks))
  };

  const searchTask = debounceFunc(filterdata, 800);

  return (
    <div className="w-fit relative">
      <input
        ref={searchRef}
        type="search"
        id="default-search"
        className="p-1.5 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={searchTask}
      />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <IoIosSearch size={18} />
        </div>
    </div>
  );
};

export default SearchBar;
