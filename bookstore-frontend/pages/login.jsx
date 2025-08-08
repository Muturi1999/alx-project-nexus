"use client";

import Head from "next/head";
import Layout from "../layouts/Layout";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${emailOrUsername}, ${password}, Remember me: ${rememberMe}`);
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign in to your account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            {/* Google SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.7 1.23 9.2 3.66l6.86-6.86C35.9 2.88 30.3 0 24 0 14.7 0 6.42 5.4 2.46 13.22l7.98 6.2C12.54 13.4 17.88 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.5c0-1.56-.14-3.06-.4-4.5H24v9.02h12.6c-.54 2.88-2.18 5.32-4.66 6.96l7.16 5.56C43.14 37.6 46.1 31.5 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.44 28.42c-.8-2.35-.8-4.87 0-7.22L2.46 13c-3.16 6.2-3.16 13.8 0 20l7.98-6.2z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.48 0 11.94-2.14 15.92-5.82l-7.16-5.56c-2.02 1.36-4.6 2.16-7.36 2.16-6.12 0-11.46-3.9-13.56-9.32l-7.98 6.2C6.42 42.6 14.7 48 24 48z"
              />
            </svg>
            <span className="font-medium text-gray-700">Sign in with Google</span>
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
