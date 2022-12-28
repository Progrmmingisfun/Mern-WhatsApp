import MoreVert from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {Avatar} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import React, { useState } from 'react';
import './Chat.css';
import axios from './axios';

function Chat({messages}) {

  const [input,setInput] = useState('');

  const sendMessage = async (e) => {
      e.preventDefault();

     await axios.post('/messages/new', {
         message: input,
         name:"DEMO APP",
         timestamp:"Just Now",
         received:"false",
      });

      setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
         <Avatar/>

         <div className='chat__headerInfo'>
            <h3>Room name</h3>
            <p>Last seen at ...</p>
          </div>  

          <div className='chat__headerRight'>
          <IconButton>
          <SearchOutlined/>
          </IconButton>
          <IconButton>
          <AttachFileIcon/>
          </IconButton>
          <IconButton>
          <MoreVert />
          </IconButton>
          </div>  
      </div>

      <div className='chat__body'>
        {messages.map(message => (
            <p className={`chat__message ${message.received && "chat__reciever"}`}> 
            <span className='chat__name'>{message.name}</span>
             {message.message}
            <span className='chat__timestamp'>
              {message.timestamp}
            </span>
            </p>
        ))}
            
          </div> 


          <div className='chat__footer'>
              <InsertEmoticonIcon/>
              <form>
                <input value={input} onChange={e => setInput(e.target.value) } placeholder='Type a message' type="text" name="name" />
                <button onClick={sendMessage} type="submit">
                  Send A Message
                </button>
              </form>
              <MicIcon/>
          </div>

    </div>
  )
}

export default Chat
