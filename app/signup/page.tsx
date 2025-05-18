'use client'
import { useEffect, useRef, useState } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      // Scroll to bottom on mount
      formRef.current.scrollTo({
        top: formRef.current.scrollHeight,
        behavior: "smooth"
      });
      // After 1 second, scroll back to top
      setTimeout(() => {
        formRef.current?.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 1000);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === "radio" ? value : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add your signup logic here
    setLoading(false);
  };

  const handleReset = () => {
    setInputs({
      fullName: "",
      username: "",
      email: "",
      gender: "male",
      password: "",
      confirmPassword: ""
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-xl overflow-y-auto flex flex-col gap-6 h-3/4"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <UserPlus size={36} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Full Name</span>
          <input
            type="text"
            name="fullName"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputs.fullName}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Username</span>
          <input
            type="text"
            name="username"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputs.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputs.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </label>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Gender</span>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={inputs.gender === "male"}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={inputs.gender === "female"}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>Female</span>
            </label>
          </div>
        </div>
        <label className="flex flex-col gap-1 relative">
          <span className="text-sm font-medium">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            value={inputs.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>
        <label className="flex flex-col gap-1 relative">
          <span className="text-sm font-medium">Confirm Password</span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            value={inputs.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword((show) => !show)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="flex justify-between items-center text-sm mt-2">
          <span>
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline cursor-pointer">
              Sign In
            </a>
          </span>
          <span
            onClick={handleReset}
            className="text-blue-600 hover:underline bg-transparent p-0 ml-2 cursor-pointer"
            tabIndex={0}
            role="button"
          >
            Reset form
          </span>
        </div>
      </form>
    </div>
  );
}