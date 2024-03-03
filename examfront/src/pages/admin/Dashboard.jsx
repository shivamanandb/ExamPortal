import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { AvatarGroup, ListItemButton, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
export const Dashboard = () => {
  return (
    <div>
      <div className='grid grid-cols-2 m-5'>
        <div className='lg:w-5/12 md:w-6/12 sm:w-8/12'>   
        <Paper variant="elevation" elevation={2} className='p-1' sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper' }}>
          
            <div className='border rounded-md border-gray-950 border-dashed border-y-2 p-1 w-full mb-8'>
            <ListItemText>
              <div className=' flex items-center justify-between gap-7'>
                <div className='text-lg mx-auto flex items-center justify-center'>
                  Menu
                </div>
              </div>
              </ListItemText>
            </div>
          <ListItem disablePadding>
            <ListItemButton className='flex items-start justify-start gap-7'>
            <ListItemAvatar>
              <AvatarGroup>
                <AiOutlineHome size={25} />
              </AvatarGroup>
            </ListItemAvatar>
            <ListItemText><div className=' text-lg'>Home</div></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton className='flex items-start justify-start gap-7'>
            <ListItemAvatar>
              <AvatarGroup>
                <FaRegUser size={25}/>
              </AvatarGroup>
            </ListItemAvatar>
            <ListItemText><div className=' text-lg'>Profile</div></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton className='flex items-start justify-start gap-2'>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" />
            </ListItemButton>
            </ListItem>
        </Paper>
        </div>
      </div>
      <div className='grid grid-cols-10'>
        <Outlet/>
      </div>
    </div>
  );
}
