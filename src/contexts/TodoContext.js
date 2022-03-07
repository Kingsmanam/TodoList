import React, {createContext, useState} from 'react';

export const todoContext = createContext();

export const TodoProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  
  return (
    <todoContext.Provider value={[tasks, setTasks]}>
      {children}
    </todoContext.Provider>
  );
};
