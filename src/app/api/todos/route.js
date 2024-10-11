import { NextResponse } from "next/server";
import todo from "../../../../models/todos";
import connectMongoDB from "../../../../libs/mongodb";

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await todo.create({ title, description });
    return NextResponse.json({ message: "todo created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const todos = await todo.find();
    return NextResponse.json({ todos });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "todo deleted" }, { status: 200 });
}