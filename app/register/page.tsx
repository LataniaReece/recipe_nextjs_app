"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { popupCenter } from "@/utils/popupCenter";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register. Please try again.");
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
        isNewUser: data.user.isNewUser,
      });

      if (!signInRes?.ok) {
        throw new Error(
          "Failed to log in after registration. Please try signing in."
        );
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center lg:min-h-screen bg-backgroundColor px-4 sm:px-6 mt-10 lg:mt-0">
        <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primaryColor text-center mb-1">
            Register for Recipe Haven
          </h2>
          <p className="text-sm text-slate-400 text-center mb-6">
            Create an account to save your favorite recipes and access them
            anytime!
          </p>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor"
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className={`bg-primaryColor text-white py-2 px-4 rounded-lg transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primaryColorLight"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="flex justify-center items-center border border-googleColor text-textColor py-2 px-4 rounded-lg hover:bg-googleColor transition"
              onClick={() => popupCenter("/google-signin", "Google Sign In")}
              disabled={loading}
            >
              <FcGoogle className="mr-2" size={20} />
              Continue with Google
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?&nbsp;
              <Link
                href="/signin"
                className="text-secondaryColorDarker underline hover:no-underline"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default RegisterPage;
