import { filterCards } from "@/app/redux/searchSlice";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
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
    let input = searchRef.current?.value?.trim()?.toLowerCase() || "";
      dispatch(filterCards(input));
  };

  const searchTask = debounceFunc(filterdata, 800);

  return (
    <div className="w-fit">
      <input
        ref={searchRef}
        type="search"
        id="default-search"
        placeholder="search..."
        className="p-1.5 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={searchTask}
      />
    </div>
  );
};

export default SearchBar;
