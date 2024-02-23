"use client"
import { ButtonAll } from "@/components/ButtonAll";
import { ButtonClearList } from "@/components/ButtonClearList";
import { ButtonCompleted } from "@/components/ButtonCompleted";
import { ButtonPending } from "@/components/ButtonPending";
import { TaskList } from "@/types/TaskList";
import { useEffect, useState } from "react";

const STORAGE_KEY = 'todoList';

const page = () => {
  const [list, setList] = useState<TaskList[]>([]);
  const [inputItem, setInputItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [deleteButtonStates, setDeleteButtonStates] = useState<boolean[]>([]);

  useEffect(() => {
    setDeleteButtonStates(Array(list.length).fill(false))
    setShowAll(true);
  }, [list]);

  const handleClearList = () => {
    setList([]);
  };

  const updateLocalStorage = (updatedList: TaskList[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  };
  
  useEffect(() => {
    const storedListString = localStorage.getItem(STORAGE_KEY);
    
    if (storedListString !== null) {
      try {
        const storedList = JSON.parse(storedListString) as TaskList[];
        setList(storedList);
      } catch (error) {
        console.error('Error in local list', error);
      }
    }
  }, []);
  
  const handleAllTask = () => {
    setShowAll(true);
  };
  
  const handlePendingTask = () => {
    setShowAll(false);
    setShowChecked(false);
  };
  
  const handleShowCompleted = () => {
    setShowAll(false);
    setShowChecked(true);
  };
  
  const handleAddTask = () => {
    if (inputItem.trim() === '') return;
    const updatedList = [...list, { id: list.length, label: inputItem, checked: false }];
    setList(updatedList);
    updateLocalStorage(updatedList);
    setInputItem('');
  };
  
  const handleButtonClick = (index: number) => {
    setDeleteButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  
  const handleDeleteClick = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
    updateLocalStorage(updatedList);
    setDeleteButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };
  
  const toggleItem = (index: number) => {
    const updatedItems = [...list];
    updatedItems[index].checked = !updatedItems[index].checked;
    setList(updatedItems);
    updateLocalStorage(updatedItems);
  };
  
  const handleOutsideClick = (e: any) => {
    if (isOpen && !e.target.closest('.options-menu')) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-500">
      <div className="w-full max-w-5xl rounded-md mt-16 bg-white text-black shadow shadow-white text-center p-8">

        <div className="flex gap-3 justify-center">
          <input
            type="text"
            placeholder="Add a new task"
            className="h-11 text-black border border-black rounded outline-none w-96 p-3"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
            autoFocus
          />
          <button
            className="bg-blue-600 rounded-md w-40 hover:opacity-90"
            onClick={handleAddTask}
          >
            Add task
          </button>
        </div>

        <div className="flex gap-6 my-8 justify-center items-start w-3xl">

          <ButtonAll 
          onClick={handleAllTask}
          />

          <ButtonPending 
          onClick={handlePendingTask}
          />

          <ButtonCompleted 
            onClick={handleShowCompleted}
          />

          <ButtonClearList 
            onCLick={handleClearList}
          />
        </div>

        <hr className="w-3xl"/>
        
        <div className="justify-start ml-8 mt-6 w-full">
          <ul>
            {list
              .filter((item) => (showChecked ? item.checked : !item.checked) || showAll)
              .map((item, index) => (
                <li key={index} className="justify-start mb-8 max-w-lg text-xl flex relative">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onClick={() => toggleItem(index)}
                      checked={item.checked}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="break-words max-w-3xl">{item.label}</p>
                  </div>

                  <button onClick={() => handleButtonClick(index)} className="absolute -right-80">
                    ...
                  </button>

                  {deleteButtonStates[index] && (
                    <div className="absolute top-0 -right-72 mt-2 p-1 bg-white border rounded shadow">
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="options-menu block text-red-600"
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                  <hr className="m-y border-b-2"/>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
