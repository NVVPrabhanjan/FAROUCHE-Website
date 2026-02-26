"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";

export default function AdminLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup && !email.endsWith("@bmsce.ac.in")) {
        setError("Only @bmsce.ac.in emails are allowed for signup.");
        return;
    }

    try {
      const { adminLogin, adminSignup } = await import("../services/adminService");
      
      let response;
      if (isSignup) {
        response = await adminSignup({ username, email, password, secretKey });
      } else {

        response = await adminLogin({ username, password });
      }

      if (response.success) {

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("adminRole", response.admin.role);
        localStorage.setItem("adminUsername", response.admin.username);
        if (response.token) localStorage.setItem("adminToken", response.token);
        router.push("/dashboard");
      } else {
        setError(response.message || "Authentication failed");
      }
    } catch (err: any) {
        setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-purple-900/50 to-black/50 p-8 rounded-2xl border border-purple-900/50 w-full max-w-md"
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {isSignup ? "Admin Signup" : "Admin Login"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-2">
              {isSignup ? "Username" : "Username or Email"}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email (@bmsce.ac.in)
                    </label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required={isSignup}
                    />
                </div>
                <div>
                     <label htmlFor="secretKey" className="block text-gray-300 mb-2 flex items-center gap-2">
                      Secret Key <span className="text-xs text-purple-400">(Required for Signup)</span>
                    </label>
                    <input
                    type="password"
                    id="secretKey"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter admin secret key"
                    required={isSignup}
                    />
                </div>
              </motion.div>
          )}

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
          >
            {isSignup ? <UserPlus size={20} /> : <LogIn size={20} />} 
            {isSignup ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
            <button 
                onClick={() => setIsSignup(!isSignup)}
                className="text-purple-400 hover:text-purple-300 text-sm underline"
            >
                {isSignup ? "Already have an account? Login" : "Need an account? Sign Up"}
            </button>
        </div>

      </motion.div>
    </div>
  );
}
