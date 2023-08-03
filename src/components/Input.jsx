import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdPostAdd } from 'react-icons/md';

const Input = ({ toDo, setToDo }) => {
  const [text, setText] = useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAdd = () => {
    if (!text || text.trim().length === 0) {
      alert('Please enter a valid to-do!');
      setText('');
      return;
    }
    const id = uuid();
    const newToDoList = [
      ...toDo,
      { id, text, completed: false, isEditable: false },
    ];
    setToDo(newToDoList);
    setText('');
    localStorage.setItem('toDoListData', JSON.stringify(newToDoList));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className='flex justify-center items-center m-6 w-full'>
      <input
        type='text'
        placeholder='Enter your task here...'
        className='flex shadow-lg drop-shadow-lg focus-visible:outline-none p-2 text-cyan-950 w-full mx-6 my-2 rounded'
        onChange={handleText}
        value={text}
        onKeyDown={handleKeyPress}
      />
      <button className='m-0 p-0 box-border' onClick={handleAdd}>
        <MdPostAdd className='text-cyan-900 w-10 h-10' />
      </button>
    </div>
  );
};

export default Input;
