# Todo App - Next.js

This is a basic Todo App project built using **Next.js**. The app demonstrates key features of Next.js including API routes, client-side rendering, and dynamic routing. The purpose of this project is to serve as a learning experience for working with Next.js and integrating backend API functionality.

## Features

- **Add Todos**: Users can add new todos.
- **Edit Todos**: Users can update the title and description of existing todos.
- **Delete Todos**: Users can delete todos.
- **View Todos**: All todos are fetched from an API and displayed on the page.

## Technologies Used

- **Next.js**: A React framework for server-side rendering, API routes, and file-based routing.
- **MongoDB**: Database for storing todos.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Icons**: For icons used in the app (Edit, Delete).

## Project Setup

To run this project locally, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following:

   ```bash
   MONGODB_URI=your-mongodb-uri
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
├── node_modules          # Dependencies
├── src                   # Source files
│   ├── app               # Application logic
│   │   └── add-todo      # Add Todo feature
│   │       ├── edit-todo # Page for editing todo items
│   │       ├── api       # API routes
│   │       │   └── [id]  # Dynamic route for specific todos
│   │       └── page.tsx  # Main page for adding todos
│   │       └── layout.tsx # Layout for the add-todo page
├── components            # Reusable UI components
├── libs                  # Library functions and helpers
├── models                # Database models
├── .env                  # Environment variables
└── README.md             # Project documentation

```
