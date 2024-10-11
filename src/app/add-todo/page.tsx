"use client"; // Required for Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";


const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description.");
      return;
    }

    const newTodo = {
      title,
      description,
    };

    try {
      const res = await fetch('http://localhost:3000/api/todos', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      console.log(res);
      setTitle("");
      setDescription("");

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Failed to add todo'}`);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the todo. Please try again.");
    }
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40 my-5">
      <form
        onSubmit={handleAddTodo}
        className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg mb-6"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Add New Todo
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter todo title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter todo description"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add Todo
        </button>
      </form>
    </div>

  );
};

export default AddTodo;
