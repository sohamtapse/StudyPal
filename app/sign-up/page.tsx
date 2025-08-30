"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/sign-up", {
        email,
        username,
        password,
      });
      setMessage(res.data.message);
      router.push("/sign-in");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-lg w-100 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 p-3 rounded text-white font-semibold cursor-pointer"
        >
          Sign Up
        </button>
        <div className="text-center text-gray-400">
          Allready have account :- <a href="/sign-in">sign-in</a>
        </div>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
