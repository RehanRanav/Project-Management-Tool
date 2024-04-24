export const TaskColumnSkeleton = () => {
  return (
    <div className="bg-gray-200 w-full">
      <div className="w-full text-center text-gray-500 p-2 sticky top-0 bg-gray-100 z-10">
        <div className="w-1/2 h-full p-1 rounded bg-gray-200"></div>
      </div>
      <div className="p-2 flex flex-col gap-1.5"></div>
    </div>
  );
};

export const ProjectInfoPanelSkeleton = () => {
  return (
    <>
      <div className="flex gap-2 p-4 mt-4 justify-start items-center bg-gray-100">
        <svg
          className="w-7 h-7 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
        <div className="w-full">
          <div className="flex-1 border-none text-gray-900 font-semibold block w-full h-2 p-2 bg-gray-200 rounded dark:bg-gray-700"></div>{" "}
        </div>
      </div>

      <div className="p-2 flex flex-col gap-4 m-0.5 rounded text-sm">
        <div className="flex flex-col gap-1">
          <span className="p-0.5 w-full h-4 bg-gray-200"></span>
          <div className="h-20 rounded p-1 line-clamp-4 leading-relaxed text-xs bg-gray-200 relative"></div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="p-0.5 w-full h-4 bg-gray-200"></span>
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
        </div>
      </div>
    </>
  );
};

export const TeamCardSkeleton = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <span className="w-full rounded h-3 bg-gray-200"></span>
    </div>
  );
};
