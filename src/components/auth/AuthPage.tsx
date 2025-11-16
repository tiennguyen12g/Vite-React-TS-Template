import React, { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import LanguageSwitcher from "../LanguageSwitcher";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Disable scroll when component mounts
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password });
    // Add your login logic here
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    console.log("Sign Up:", { name, email, password });
    // Add your sign up logic here
  };

  const handleSocialAuth = (provider: "github" | "google" | "facebook") => {
    console.log(`Social ${isLogin ? "Login" : "Sign Up"}:`, provider);
    // Add your social auth logic here
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    // Add your forgot password logic here
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse"></div>
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login 
              onLogin={handleLogin} 
              onSocialLogin={handleSocialAuth} 
              onSwitchToSignUp={() => setIsLogin(false)} 
              onForgotPassword={handleForgotPassword} 
            />
          ) : (
            <SignUp 
              onSignUp={handleSignUp} 
              onSocialSignUp={handleSocialAuth} 
              onSwitchToLogin={() => setIsLogin(true)} 
            />
          )}
          
          {/* Language Switcher */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
