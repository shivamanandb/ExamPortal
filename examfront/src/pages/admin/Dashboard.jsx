import React from 'react'
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
export const Dashboard = () => {
  return (
    <div className='flex flex-row gap-5 m-5' >
      <div className='w-2/12'>
        <div className=''>   
        <Sidebar/>
        </div>
      </div>
      <div className='w-10/12'>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
