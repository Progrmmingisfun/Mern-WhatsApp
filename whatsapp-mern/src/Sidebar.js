import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar,IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src='https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg'/>
        <div className='siderbar__headerRight'>
          <IconButton>
          <DonutLargeIcon/>
          </IconButton>
          <IconButton>
          <ChatIcon/>
          </IconButton>
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined/>
          <input placeholder='Search or Start a new chat' type='text'/>
        </div>
      </div>

      <div className='sidebar__chats'>
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
      </div>

    </div>
  )
}

export default Sidebar
