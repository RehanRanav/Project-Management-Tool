import React from 'react'

const TaskPage = () => {
  return (
    <div className='h-full w-full grid grid-cols-4 gap-2 p-1'>
        <div className='h-screen bg-gray-100 w-full'>
            <div className='w-full text-center text-gray-500 p-2'>To Do</div>
        </div>
        <div className='h-screen bg-gray-100 w-full'>
            <div className='w-full text-center text-gray-500'>In Progress</div>
        </div>
        <div className='h-screen bg-gray-100 w-full'>
            <div className='w-full text-center text-gray-500'>Review</div>
        </div>
        <div className='h-screen bg-gray-100 w-full'>
            <div className='w-full text-center text-gray-500'>Done</div>
        </div>
    </div>
  )
}

export default TaskPage