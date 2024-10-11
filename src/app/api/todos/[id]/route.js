import todo from "../../../../../models/todos";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description } = await request.json();
    await connectMongoDB();
    const updatedTodo = await todo.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedTodo) {
        return NextResponse.json({ message: "Todo not found or update failed" }, { status: 404 });
    }
    return NextResponse.json({ message: "Todo updated successfully" }, { status: 200 });
}


export async function GET(request, { params }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const todoItem = await todo.findById(id);
        if (!todoItem) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json({ todo: todoItem }, { status: 200 });
    } catch (error) {
        console.error("Error fetching todo:", error);

        if (error.name === "CastError") {
            return NextResponse.json({ message: "Invalid Todo ID" }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to fetch todo", error: error.message }, { status: 500 });
    }
}
