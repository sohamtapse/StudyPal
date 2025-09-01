"use client";

import { GraduationCap, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 bg-black/30 md:bg-black/30 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">StudyPal</h1>
                <p className="text-xs text-text-muted">AI-Powered Learning</p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-purple-500">
              Dashboard
            </Link>
            <Link href="/sign-in" className="hover:text-purple-500">
              Sign-in
            </Link>
            <Link
              href="/profile"
              className="p-2 rounded-lg hover:text-purple-500"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:text-purple-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden z-50 mt-4 px-6 pb-4 space-y-3 text-center bg-black/30 md:bg-black/20 backdrop-blur-md transition-all duration-300">
          <Link
            href="/"
            className="block hover:text-purple-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block hover:text-purple-500"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/sign-in"
            className="block hover:text-purple-500"
            onClick={() => setMenuOpen(false)}
          >
            Sign-in
          </Link>
          <Link
            href="/profile"
            className="block p-2 rounded-lg hover:text-purple-500"
            onClick={() => setMenuOpen(false)}
          >
            <User className="h-5 w-5 mx-auto" />
          </Link>
        </div>
      )}

      <hr className="mt-4 border-t border-gray-700" />
    </header>
  );
};

export default Navbar;
