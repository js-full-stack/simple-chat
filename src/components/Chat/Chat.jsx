import { useState, useRef, useEffect } from 'react';
import socket from '../../utils/sockets-client';

import './Chat.css';
const Chat = ({ users, messages, userName, roomId }) => {
  const [message, setMessage] = useState('');
  const messagesRef = useRef(null);
  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      text: message,
      roomId,
    });

    setMessage('');
  };
  useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);
  return (
    <div className="chat">
      <div className="chat__users">
        Room number: {roomId}
        <hr />
        <b>Online now:</b> <span>{users.length}</span>
        <ul>
          {users.map((name, idx) => (
            <li key={name + idx}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat__messages">
        <div ref={messagesRef} className="messages">
          {messages.map(message => (
            <div className="message ">
              <p>{message.text}</p>
              <span>{message.userName}</span>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="form-control"
            rows="3"
          ></textarea>

          <button onClick={onSendMessage} type="button" className="btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
