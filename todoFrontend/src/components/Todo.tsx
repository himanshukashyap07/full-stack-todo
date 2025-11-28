import { useEffect, useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoPage() {
  const { todos, fetchTodos, addTodo, toggleIsComplete, removeTodo, updateTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos,todos]);

  // Handle new todo creation
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addTodo(newTodo);
    setNewTodo("");
  };

  // Handle update
  const handleUpdateTodo = async (id: string) => {
    if (!editingText.trim()) return;
    await updateTodo(id, { content: editingText });
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 z-10">
      {/* Todo List */}
      <div className="p-6 space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between rounded bg-white p-3 shadow hover:shadow-md transition"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleIsComplete(todo._id)}
              className="mr-3 h-5 w-5 accent-blue-600"
            />

            {/* Todo Content or Edit Input */}
            {editingId === todo._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1 rounded border px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <span
                className={`flex-1 ${
                  todo.isCompleted ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.content}
              </span>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {editingId === todo._id ? (
                <button
                  onClick={() => handleUpdateTodo(todo._id)}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(todo._id);
                    setEditingText(todo.content);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => removeTodo(todo._id)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Input for New Todo */}
      <form
        onSubmit={handleAddTodo}
        className="fixed bottom-0 left-0 right-0 flex items-center bg-white p-4 shadow"
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
          className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="ml-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}