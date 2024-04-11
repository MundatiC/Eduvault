import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <header className="flex flex-wrap justify-between h-20 w-full shrink-0 items-center px-4 md:px-6 shadow-md">
            <Link className="  lg:flex" to="/">
                <img
                    className="h-8 w-auto"
                    src="./images/logo2.png"
                    alt="Acme Inc" />
                <img
                    className="h-8 w-auto"
                    src="./images/logo.png"
                    alt="Acme Inc" />
            </Link>

            <div className="flex justify-center items-center flex-grow mb-4 lg:mb-0">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 w-full lg:w-96"
                />
            </div>

            <nav className="ml-auto flex flex-wrap items-center space-x-4">
                <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 px-4 text-sm font-medium text-gray-900 rounded-md transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 mb-2 lg:mb-0"
                    to="/"
                >
                    Home
                </Link>
                <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 px-4 text-sm font-medium text-gray-900 rounded-md transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 mb-2 lg:mb-0"
                    to="/import"
                >
                    Import
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
