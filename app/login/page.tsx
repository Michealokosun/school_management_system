// app/login/page.tsx
"use client"; // This page needs client-side interactivity

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // For App Router navigation

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from redirecting automatically
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      console.error("Login error:", result.error);
    } else {
      // Redirect to the desired page after successful login
      // You might want to redirect based on role or intended destination
      router.push("/"); // Example: Redirect to homepage or dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to SMS</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
              {/* Optional: Add a link for forgot password or signup */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
