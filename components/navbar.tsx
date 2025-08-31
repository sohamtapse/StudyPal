import { GraduationCap, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 z-50  bg-black/30 md:bg-black/20 backdrop-blur-md md:backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-12 w-12 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">StudyPal</h1>
              <p className="text-xs text-text-muted">AI-Powered Learning</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-purple-500">
              Dashboard
            </Link>
            <Link href="/sign-in" className="hover:text-purple-500">
              Sign-in
            </Link>
            <Link href="" className="p-2 rounded-lg hover:text-purple-500">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-4 border-t border-gray-700" />
    </header>
  );
};

export default Navbar;
