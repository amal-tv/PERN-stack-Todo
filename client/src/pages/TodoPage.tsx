import { useContext, useEffect, useState } from "react";
import { CreateTodo } from "../components/CreateTodo";
import { Todos } from "../components/Todos";
import { TodoContext } from "../context/todoContext";
import { authContext } from "../context/authContext";

type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
};

export const TodoPage = () => {
  const { getTodos } = useContext(TodoContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { userId } = useContext(authContext);

  const fetchTodos = async () => {
    if (userId !== null) {
      const res = await getTodos(userId);
      setTodos(res);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Todo App</h1>
      <div className="w-full max-w-md">
        <CreateTodo onTodoCreated={fetchTodos} />
      </div>
      <div className="w-full max-w-lg mt-8">
        <Todos todos={todos} />
      </div>
    </div>
  );
};
