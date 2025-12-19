import React, { useState, useEffect } from "react";
import Login from "@/components/auth/Login.m";
import SignUp from "@/components/auth/SignUp.m";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AuthLayout from "@/layout/AuthLayout";

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
    <AuthLayout>
      {/* Mobile-optimized Content */}
      <div className="relative w-full h-full px-4 flex items-center justify-center">
        <div className="w-full max-w-sm">
          {isLogin ? (
            <Login onLogin={handleLogin} onSocialLogin={handleSocialAuth} onSwitchToSignUp={() => setIsLogin(false)} onForgotPassword={handleForgotPassword} />
          ) : (
            <SignUp onSignUp={handleSignUp} onSocialSignUp={handleSocialAuth} onSwitchToLogin={() => setIsLogin(true)} />
          )}

          {/* Language Switcher - Mobile optimized */}
          {/* <div className="mt-4 flex justify-center">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-1.5 border border-white/30">
              <LanguageSwitcher />
            </div>
          </div> */}
        </div>
      </div>
    </AuthLayout>
  );
}
