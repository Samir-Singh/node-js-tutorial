"use client";

import axios from "axios";
import { useEffect, useState } from "react";
const URL = "http://localhost:8000";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<{ id: number; name: string }[]>([]);

  const getTodos = async () => {
    try {
      const res = await axios.get(`${URL}/todo`);

      if (res.status === 200) {
        setTodos(res.data);
        setTodo("");
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
            createTodo();
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
            Submit
          </button>
        </form>

        <div className="w-full mt-5">
          {todos?.map((item) => (
            <p
              className="text-start w-full flex justify-between items-center"
              key={item?.id}
            >
              <span>{item?.name}</span>

              <span className="inline-flex gap-2">
                <button className="bg-gray-400 p-1 flex items-center justify-center rounded cursor-pointer">
                  ✏️
                </button>
                <button
                  onClick={() => deleteTodo(item?.id)}
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
