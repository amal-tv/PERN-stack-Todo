import React from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

type TodosProps = {
  todos: Todo[];
};

export const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div className="space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white shadow-md rounded p-4 border-l-4"
            style={{ borderColor: todo.done ? "#38a169" : "#e53e3e" }}
          >
            <h3 className="text-lg font-bold text-gray-800">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No todos available.</p>
      )}
    </div>
  );
};
