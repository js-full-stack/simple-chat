import './JoinBlock.css';
import { useState } from 'react';
import socket from './JoinBlock.css';
import axios from 'axios';

const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const onChangeInputRoomId = e => {
    setRoomId(e.target.value);
  };
  const onChangeInputName = e => {
    setUserName(e.target.value);
  };

  const onClickButtonEnter = async () => {
    if (!roomId || !userName) {
      return alert('введите данные');
    }
    const obj = {
      roomId,
      userName,
    };
    setisLoading(true);
    await axios.post('http://localhost:8889/rooms', obj);
    onLogin(obj);
  };

  return (
    <>
      <input
        className="input__room"
        type="text"
        placeholder="ROOM ID"
        value={roomId}
        onChange={onChangeInputRoomId}
      />
      <input
        className="input__name"
        type="text"
        placeholder="Name"
        value={userName}
        onChange={onChangeInputName}
      />
      <button
        disabled={isLoading}
        onClick={onClickButtonEnter}
        className="button__enter"
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </>
  );
};

export default JoinBlock;
