"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/sign-in", { email, password });
      setMessage(res.data.message);
      router.push("/dashboard");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setMessage(axiosErr.response?.data?.message || "Error signing in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 p-3 rounded text-white font-semibold cursor-pointer"
        >
          Sign In
        </button>
        <div className="text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="text-purple-400 hover:cursor-pointer hover:text-purple-500"
          >
            Sign-up
          </a>
        </div>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
