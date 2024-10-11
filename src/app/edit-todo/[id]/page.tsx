"use client"; // Required for Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EditTodoProps {
    params: {
        id: string;
    };
}

const EditTodo = ({ params }: EditTodoProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getTodo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/todos/${params.id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch todo");
                }

                const data = await res.json();
                setTitle(data.todo.title);
                setDescription(data.todo.description);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch todo details.");
            } finally {
                setLoading(false);
            }
        };

        getTodo();
    }, [params.id]);

    const handleEditTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title.trim() === "" || description.trim() === "") {
            alert("Please enter both title and description.");
            return;
        }

        const updatedTodo = {
            title,
            description,
        };

        console.log("Updating Todo:", updatedTodo);

        try {
            const res = await fetch(`http://localhost:3000/api/todos/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodo),
            });

            const data = await res.json();
            console.log("Response from server:", data);

            if (res.ok) {
                alert("Todo updated successfully!");
                router.push("/");
            } else {
                alert("Failed to update todo. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the todo. Please try again.");
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
        <div className="max-w-4xl mx-auto px-4 my-5">
            <form
                onSubmit={handleEditTodo}
                className="bg-gray-100 p-6 rounded shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Edit Todo</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter todo title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter todo description"
                        rows={4}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Update Todo
                </button>
            </form>
        </div>

    );
};

export default EditTodo;
