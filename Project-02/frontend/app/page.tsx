"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const getUserList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setUserList(res?.data?.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
      });
    } catch (err) {
      console.log(err);
      setUserList([]);
    }
  };

  const createUser = async () => {
    try {
      await axios.post("http://localhost:8000/api/user", formData);
      getUserList();
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/user/${selectedUser}`,
        formData,
      );
      getUserList();
      setSelectedUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/${id}`);
      getUserList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="p-5">
      <div className="sticky top-0 left-0 right-0 bg-white pb-1">
        <h1 className="text-center text-4xl font-semibold">
          CRUD Application Using MongoDB
        </h1>

        <div className="my-5 flex items-center justify-center gap-2">
          <input
            type="text"
            className="border outline-none rounded p-1 flex-1"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <input
            type="text"
            className="border outline-none rounded p-1 flex-1"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />

          <input
            type="text"
            className="border outline-none rounded p-1 flex-1"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="text"
            className="border outline-none rounded p-1 flex-1"
            placeholder="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />

          <button
            onClick={() => {
              if (selectedUser) {
                editUser();
              } else {
                createUser();
              }
            }}
            className="bg-emerald-600 px-3 py-1 rounded cursor-pointer text-white"
          >
            {selectedUser ? "Update" : "Submit"}
          </button>
        </div>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-gray-400">
            <tr>
              <td className="p-2">S.No.</td>
              <td className="p-2">Name</td>
              <td className="p-2">Email</td>
              <td className="p-2">Gender</td>
              <td className="p-2">Actions</td>
            </tr>
          </thead>

          <tbody>
            {userList?.map((user: any, idx: number) => (
              <tr key={user?._id}>
                <td className="p-2">{idx + 1}.</td>
                <td className="p-2">
                  {user?.firstName} {user?.lastName}
                </td>
                <td className="p-2">{user?.email}</td>
                <td className="p-2">{user?.gender}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user._id);
                      setFormData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        gender: user.gender,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
