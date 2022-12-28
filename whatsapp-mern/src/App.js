import React, { useEffect,useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App(props) {

  const [messages,setMessages] = useState([]);

    useEffect(() => {

        axios.get('/messages/sync').then(response=>{
          setMessages(response.data);
        })

    }, []);

    useEffect(() => {

      const pusher = new Pusher('APP_KEY', {
        cluster: 'eu'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
        // Alert Incoming messages
        alert(JSON.stringify(newMessage));
        // Update messages with the existing one
        setMessages([...messages,newMessage]);
      });


      return()=>{
        channel.unbind_all();
        channel.unsubscribe();
      };

    }, [messages]);


    console.log(messages);

  return (
    <div className="app">

     <div className='app__body'>

      {/* Sidebar */}

      <Sidebar/>

      {/* Chat component */}

      <Chat messages={messages}/>


     </div>
     
    </div>
  );
}

export default App;
