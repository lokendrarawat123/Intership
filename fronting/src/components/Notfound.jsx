import React from "react";
import { Link } from "react-router-dom";

export const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Page not found
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-block px-5 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
          >
            Go back home
          </Link>
          <Link
            to="/not-found"
            className="inline-block px-5 py-3 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
};
