"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const Todo = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/todos', { cache: 'no-store' });
        if (!res.ok) {
          console.error("Failed to fetch todos");
          return;
        }
        const data = await res.json();
        console.log(data.todos);
        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);



  const deleteTodo = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
      } else {
        console.error("Failed to delete todo");
        alert("Failed to delete todo. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the todo. Please try again.");
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-black">Loading...</p>
      </div>
    );
  }



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Next Todo</h1>
      {todos.length > 0 ? (
        <div>
          {todos.map((todo) => (
            <div key={todo._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{todo.title}</h2>
                  <p className="text-gray-600">{todo.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit todo"
                    href={`/edit-todo/${todo._id}`}
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete todo"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">No todos available.</h3>
          <Link href="/add-todo" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add your first todo
          </Link>
        </div>
      )}
    </div>
  );
};

export default Todo;
