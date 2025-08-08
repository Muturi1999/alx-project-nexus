"use client";

import Head from "next/head";
import Layout from "../layouts/Layout";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, UserPlus, Phone } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+254");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required";
    if (!email.trim()) e.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (!/^\+254\d{9}$/.test(phone)) e.phone = "Enter a valid Kenyan number (+2547XXXXXXXX)";
    if (pwd.length < 6) e.pwd = "Password must be at least 6 characters";
    if (pwd !== confirmPwd) e.confirmPwd = "Passwords do not match";
    if (!accept) e.accept = "Please accept the Terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: call your API here
    alert(`Registering: ${username} / ${email} / ${phone}`);
  };

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserPlus className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Join and start discovering great books.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.username ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="yourname"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.phone ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="+254712345678"
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.pwd ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              {errors.pwd && <p className="mt-1 text-xs text-red-600">{errors.pwd}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.confirmPwd ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPwd && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPwd}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                    Terms & Privacy
                  </a>
                </span>
              </label>
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Have an account? Sign in
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social */}
          <button
            onClick={() => alert("Google signup clicked")}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.23 9.2 3.66l6.86-6.86C35.9 2.88 30.3 0 24 0 14.7 0 6.42 5.4 2.46 13.22l7.98 6.2C12.54 13.4 17.88 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.1 24.5c0-1.56-.14-3.06-.4-4.5H24v9.02h12.6c-.54 2.88-2.18 5.32-4.66 6.96l7.16 5.56C43.14 37.6 46.1 31.5 46.1 24.5z"/>
              <path fill="#FBBC05" d="M10.44 28.42c-.8-2.35-.8-4.87 0-7.22L2.46 13c-3.16 6.2-3.16 13.8 0 20l7.98-6.2z"/>
              <path fill="#EA4335" d="M24 48c6.48 0 11.94-2.14 15.92-5.82l-7.16-5.56c-2.02 1.36-4.6 2.16-7.36 2.16-6.12 0-11.46-3.9-13.56-9.32l-7.98 6.2C6.42 42.6 14.7 48 24 48z"/>
            </svg>
            <span className="font-medium text-gray-700">Sign up with Google</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
