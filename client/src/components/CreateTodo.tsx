import React, { useState, useContext } from "react";
import { TodoContext } from "../context/todoContext";
import { authContext } from "../context/authContext";

type CreateTodoProps = {
  onTodoCreated: () => void;
};

export const CreateTodo: React.FC<CreateTodoProps> = ({ onTodoCreated }) => {
  const { createTodo } = useContext(TodoContext);
  const { userId } = useContext(authContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is required to create a todo.");
      return;
    }

    try {
      await createTodo(title, description, userId);
      setTitle("");
      setDescription("");
      alert("Todo created successfully!");
      onTodoCreated();
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4">
      <div>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
      </div>
      <div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Description"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
      </div>
      <button
        className="w-full bg-green-300 text-black py-2 rounded hover:bg-green-600 transition"
        type="submit"
      >
        Create Todo
      </button>
    </form>
  );
};
