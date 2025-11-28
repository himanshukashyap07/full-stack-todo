import { create } from "zustand";
import { api } from "../api/axiosInstance";

export type Todo = {
    _id: string;
    content: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
};

type TodoState = {
    todos: Todo[];
    fetchTodos: () => Promise<void>;
    addTodo: (content: string) => Promise<void>;
    updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
    toggleIsComplete: (id: string) => Promise<void>;
};


export const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    // Fetch all todos
    fetchTodos: async () => {
        try {
            const { data } = await api.get("/user/todos");
            if (data.success) {
                set({ todos: data.data });
            }
        } catch (err) {
            console.error("Failed to fetch todos:", err);
        }
    },

    // Add new todo
    addTodo: async (content: string) => {
        try {
            const { data } = await api.post("/todo/createTodo", { content });
            set((state) => ({
                todos: [...state.todos, data.data],
            }));
        } catch (err) {
            console.error("Failed to add todo:", err);
        }
    },

    // Update todo (e.g.edit content)
    updateTodo: async (id: string, { content }) => {
        try {
            const { data } = await api.patch(`/todo/updateTodo/${id}`, { content });
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? { ...todo, ...data.data } : todo
                ),
            }));
        } catch (err) {
            console.error("Failed to update todo:", err);
        }
    },

    // Remove todo
    removeTodo: async (id: string) => {
        try {
            await api.delete(`/todo/deleteTodo/${id}`);
            set((state) => ({
                todos: state.todos.filter((todo) => todo._id !== id),
            }));
        } catch (err) {
            console.error("Failed to remove todo:", err);
        }
    },

    //toggle isCompleted status  
    toggleIsComplete: async (id: string) => {
    try {
        const { data } = await api.patch(`/todo/toggleTodoComplete/${id}`);

        set((state) => ({
            todos: state.todos.map((todo) =>
                todo._id === id
                    ? data?.data || { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            ),
        }));
    } catch (err) {
        console.error("Failed to toggle todo:", err);
    }
},

}));