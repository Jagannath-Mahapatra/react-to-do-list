import { useState, useEffect } from 'react';
import Input from './components/Input';
import List from './components/List';
import { FcTodoList } from 'react-icons/fc';

function App() {
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    //Handle browser refresh by using localStorage for data storage:
    const toDoListData = JSON.parse(localStorage.getItem('toDoListData'));
    if (toDoListData) {
      setToDo(toDoListData);
    }
  }, []);

  return (
    <div className='App flex flex-col items-center'>
      <div className='flex justify-center items-center h-20 w-full text-gray-200 text-3xl bg-cyan-950'>
        <FcTodoList className='flex w-10 h-10 mx-5' /> <span>To-Do List</span>
      </div>
      <div className='flex w-full bg-gray-300 mb-10'>
        <Input toDo={toDo} setToDo={setToDo} />
      </div>
      <List toDo={toDo} setToDo={setToDo} />
    </div>
  );
}

export default App;
