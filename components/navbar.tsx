"use client";

import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Home, LayoutDashboard, LogIn } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      // --- CHANGES ARE HERE ---
      // 1. Replaced invalid width classes with valid, responsive ones.
      // 2. Added classes to properly center the fixed element horizontally.
      className="w-[95%] md:max-w-4xl left-1/2 -translate-x-1/2 top-5 fixed rounded-3xl z-100 bg-gray-800/30 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold gradient-text">StudyPal</h1>
              </div>
            </div>
          </Link>

          {/* Desktop Menu (No Changes) */}
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
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/profile"
              className="p-2 rounded-lg hover:text-purple-500"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button (No Changes) */}
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

      {/* Mobile Dropdown (No Changes) */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-6 pb-4 space-y-3 text-center">
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
    </header>
  );
};

export default Navbar;
