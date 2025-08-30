import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/30 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-white font-bold text-xl tracking-wide">
          StudyPal
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-white transition"
          >
            Dashboard
          </Link>
          <Link
            href="/sign-in"
            className="text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
