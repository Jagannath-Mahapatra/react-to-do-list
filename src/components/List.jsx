import React, { useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { AiFillEdit, AiFillSave } from 'react-icons/ai';

const List = ({ toDo, setToDo }) => {
  const [tempText, setTempText] = useState('');
  const handleCompleted = (event) => {
    const newToDoList = toDo.map((toDoItem) => {
      if (toDoItem.id === event.target.id) {
        return { ...toDoItem, completed: !toDoItem.completed };
      }
      return toDoItem;
    });
    setToDo(newToDoList);
  };

  const handleDelete = (event) => {
    const newToDoList = toDo.filter(
      (toDoItem) => toDoItem.id !== event.target.id.slice(6)
    );
    setToDo(newToDoList);
    localStorage.setItem('toDoListData', JSON.stringify(newToDoList));
  };

  const handleEdit = (event) => {
    const newToDoList = toDo.map((toDoItem) => {
      if (toDoItem.id === event.target.id.slice(4)) {
        setTempText(toDoItem.text);
        return { ...toDoItem, isEditable: true };
      }
      return toDoItem;
    });
    setToDo(newToDoList);
    localStorage.setItem('toDoListData', JSON.stringify(newToDoList));
  };

  const handleSave = (event) => {
    const newToDoList = toDo.map((toDoItem) => {
      if (toDoItem.id === event.target.id.slice(4)) {
        return {
          ...toDoItem,
          text: tempText,
          isEditable: false,
        };
      }
      return toDoItem;
    });
    setToDo(newToDoList);
    localStorage.setItem('toDoListData', JSON.stringify(newToDoList));
  };

  return (
    <div className='flex flex-col w-full px-9 justify-center items-center'>
      {toDo.map((toDoItem) => (
        <div
          className='flex justify-center items-center w-full p-5 pr-1 m-1 rounded-md border border-gray-300 shadow-sm bg-gray-200'
          key={toDoItem.id}
        >
          <div className='flex justify-center items-center mr-2'>
            <input
              className='w-6 h-6 accent-cyan-700 cursor-pointer'
              type='checkbox'
              name={toDoItem.text}
              id={toDoItem.id}
              onChange={handleCompleted}
            />
          </div>
          <span
            className={`inline-block text-left w-full ${
              toDoItem.completed ? 'line-through decoration-cyan-700' : ''
            } text-cyan-950 overflow-auto grow focus-visible:outline-none`}
            htmlFor={toDoItem.id}
            contentEditable={toDoItem.isEditable}
            suppressContentEditableWarning={true}
            onInput={(event) => setTempText(event.target.innerText)}
          >
            {toDoItem.text}
          </span>
          {!toDoItem.completed && !toDoItem.isEditable && (
            <button id={'edit' + toDoItem.id} onClick={handleEdit}>
              <AiFillEdit className='text-cyan-900 w-8 h-8 mx-1 hover:scale-110 pointer-events-none' />
            </button>
          )}
          {!toDoItem.completed && toDoItem.isEditable && (
            <button id={'save' + toDoItem.id} onClick={handleSave}>
              <AiFillSave className='text-cyan-900 w-8 h-8 mx-1 hover:scale-110 pointer-events-none' />
            </button>
          )}
          <button id={'delete' + toDoItem.id} onClick={handleDelete}>
            <RiDeleteBin6Fill className='text-cyan-900 w-8 h-8 mx-1 hover:scale-110 pointer-events-none' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
