import { useEffect, useReducer, useState } from 'react';
import reducer from './utils/reducer';
import JoinBlock from './components/JoinBlock/';
import Chat from './components/Chat';

import socket from './utils/sockets-client';
import './App.css';
function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = obj => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  const setUsers = users => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const sendMessage = message => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', sendMessage);
  }, []);

  return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
