import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="w-full bg-[#EFEFEF] border-b border-gray-200/60 px-4 sm:px-8 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold tracking-tight shrink-0 shadow-sm">
            AX
          </div>
          <span className="font-semibold text-gray-900 text-base tracking-tight hidden sm:inline">
            Axion Studio
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {isSignedIn ? (
            <div className="flex gap-4 items-center">
              {!isDashboard && (
                <Link to="/dashboard">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-full px-4 py-2 transition-colors shadow-2xs">
                    Dashboard
                  </button>
                </Link>
              )}
              <UserButton />
            </div>
          ) : (
            <Link to="/auth/sign-in">
              <button className="bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-full px-4 py-2 transition-colors shadow-2xs">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
