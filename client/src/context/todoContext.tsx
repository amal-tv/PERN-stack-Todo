import { createContext, ReactNode, useState } from "react";
import axios from "axios";
import { Await } from "react-router-dom";

// Define the types for the context
type TodoContextType = {
  getTodos: (userId : number) => Promise<any[]>;
  createTodo: (
    title: string,
    description: string,
    userId: number,
  ) => Promise<void>;
};

// Create the context with initial values
const TodoContext = createContext<TodoContextType>({
  getTodos: async () => [],
  createTodo: async () => {},
});

const TodoProvider = ({ children }: { children: ReactNode }) => {
  
   const getTodos = async (userId : number) : Promise<any[]>=>{
             try {
               const response = await axios.get(`http://localhost:3000/api/todos?userId=${userId}`)
               return response.data;
             } catch(error) {
              console.log("error fetching data");
              throw error;
             }
   }  
  
 const createTodo = async(title: string,
  description: string,
  userId: number) : Promise<void> =>{
    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos",
        {
          title,
          description,
          userId,
        }
      );
      console.log("Todo created:", response.data);
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  return (
    <TodoContext.Provider value={{getTodos,createTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
