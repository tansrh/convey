'use client'
import { useState, useRef } from "react";
import { MessageCircle, Lock, Users, LogIn, UserPlus, Menu } from "lucide-react";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <header className="w-full flex flex-row justify-between items-center px-4 py-6 max-w-5xl mx-auto relative">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <MessageCircle size={36} className="text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-bold tracking-tight">Converse</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-4 sm:gap-6 items-center">
          <a
            href="/signin"
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-950 transition"
          >
            <LogIn size={18} /> SignIn
          </a>
          <a
            href="/signup"
            className="flex items-center gap-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <UserPlus size={18} /> SignUp
          </a>
        </nav>
        {/* Hamburger for mobile */}
        <div className="sm:hidden relative">
          <button
            className="sm:hidden flex items-center p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-950 transition cursor-pointer"
            aria-label="Open navigation"
            onClick={() => {
              setMobileNavOpen((open) => !open);
              // Focus the dropdown when opening
              setTimeout(() => dropdownRef.current?.focus(), 0);
            }}
          >
            <Menu size={28} />
          </button>
          {/* Mobile Nav Dropdown */}
          {mobileNavOpen && (
            <div
              ref={dropdownRef}
              tabIndex={0}
              onBlur={() => setMobileNavOpen(false)}
              className="absolute top-full right-2 mt-1 w-40 bg-white dark:bg-gray-800 rounded shadow-lg flex flex-col z-50 sm:hidden outline-none"
            >
              <a
                href="/signin"
                className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                onClick={() => setMobileNavOpen(false)}
              >
                <LogIn size={18} /> SignIn
              </a>
              <a
                href="/signup"
                className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                onClick={() => setMobileNavOpen(false)}
              >
                <UserPlus size={18} /> SignUp
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-4">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Converse</span>
        </h1>
        <p className="text-base sm:text-lg text-center max-w-xl mb-8">
          Converse is a simple, modern, and secure messaging app. Connect with friends, share moments, and chat seamlessly—all in one place.
        </p>
        <a
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition mb-10"
        >
          Get Started
        </a>
        {/* Features Section */}
        <section
          id="features"
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mb-12"
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
            <Lock size={32} className="text-blue-600 dark:text-blue-400" />
            <h2 className="font-semibold text-lg mt-2 mb-1">Secure Messaging</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Your conversations are private and encrypted.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
            <MessageCircle size={32} className="text-blue-600 dark:text-blue-400" />
            <h2 className="font-semibold text-lg mt-2 mb-1">Instant & Reliable</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Messages are delivered instantly, every time.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
            <Users size={32} className="text-blue-600 dark:text-blue-400" />
            <h2 className="font-semibold text-lg mt-2 mb-1">Group Chats</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Create groups and chat with multiple friends at once.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center text-sm border-t border-gray-200 dark:border-gray-700 px-4">
        <span className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Converse. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="mailto:support@converse.app" className="hover:underline">support@converse.app</a>
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
}