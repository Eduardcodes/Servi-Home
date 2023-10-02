import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; 
import { useAuth } from "../lib/store";

function Login() {
  // const setAuth = useAuth.getState((state)=>state.setAuth)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const router = useRouter(); 

  const handleChange = (e :React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e  : React.FormEvent) => {
    e.preventDefault();

    try {
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      localStorage.setItem("auth", JSON.stringify(data.user));
      useAuth.getState().setAuth(data.user)
      // setAuth(data.user)

      if (response.status === 200) {
        
        router.push("/logedin");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-96">
            <h2 className="text-3xl font-bold mb-5 text-gray-800">Servi Home Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 mb-2">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                    />
                </div>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
            </form>
            <p className="mt-5 text-gray-600">
                Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
);
}
export default Login
