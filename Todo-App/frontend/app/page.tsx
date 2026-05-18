"use client";

import axios from "axios";
import { useEffect, useState } from "react";
const URL = "http://localhost:8000";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todoId, setTodoId] = useState<number | null>(null);
  const [todos, setTodos] = useState<{ id: number; name: string }[]>([]);

  const getTodos = async () => {
    try {
      const res = await axios.get(`${URL}/todo`);

      if (res.status === 200) {
        setTodos(res.data);
        setTodo("");
        setTodoId(null);
      }
    } catch (error) {
      console.log(error);
      setTodos([]);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post(`${URL}/todo`, { name: todo });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async () => {
    try {
      await axios.patch(`${URL}/todo/${todoId}`, {
        name: todo,
      });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${URL}/todo/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="flex flex-col items-center max-w-3/5">
        <h1 className="text-4xl font-black">CRUD</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (todoId) {
              editTodo();
            } else {
              createTodo();
            }
          }}
          className="flex items-center gap-3 mt-5"
        >
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="border rounded outline-none px-1"
          />
          <button className="bg-gray-500 px-3 rounded text-white cursor-pointer">
            {todoId ? "Update" : "Submit"}
          </button>
        </form>

        <div className="w-full mt-5">
          {todos?.map((item, idx) => (
            <p
              className={`text-start w-full flex justify-between items-center ${idx > 0 ? "mt-2" : ""}`}
              key={item?.id}
            >
              <span>
                {idx + 1}: {item?.name}
              </span>

              <span className="inline-flex gap-2">
                <button
                  onClick={() => {
                    setTodo(item?.name);
                    setTodoId(item?.id);
                  }}
                  className="bg-gray-400 p-1 flex items-center justify-center rounded cursor-pointer"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    deleteTodo(item?.id);
                    setTodo("");
                  }}
                  className="bg-gray-400 p-1 flex items-center justify-center rounded cursor-pointer"
                >
                  ❌
                </button>
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
