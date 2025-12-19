import React, { useState } from "react";
import { Input, ButtonCommon } from "@tnbt/react-favorit-style";
import { icons } from "@/components/ui/icons/Icons";
import { MdEmail, MdLock } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  onSocialLogin?: (provider: "github" | "google" | "facebook") => void;
  onSwitchToSignUp?: () => void;
  onForgotPassword?: () => void;
}

export default function Login({ onLogin, onSocialLogin, onSwitchToSignUp, onForgotPassword }: LoginProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.validation.emailInvalid");
    }

    if (!password) {
      newErrors.password = t("auth.validation.passwordRequired");
    } else if (password.length < 8) {
      newErrors.password = t("auth.validation.passwordMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onLogin?.(email, password);
    }
  };

  const handleSocialLogin = (provider: "github" | "google" | "facebook") => {
    onSocialLogin?.(provider);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t("auth.login.title")}</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">{t("auth.login.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Email Input */}
        <div>
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder={t("auth.email")}
            label={t("auth.email")}
            leftIcon={MdEmail}
            error={errors.email}
            fullWidth
            required
            size="sm"
            className="flex flex-col items-start w-full [&>div]:w-full"
          />
        </div>

        {/* Password Input */}
        <div>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={t("auth.password")}
            label={t("auth.password")}
            leftIcon={MdLock}
            error={errors.password}
            fullWidth
            required
            size="sm"
            className="flex flex-col items-start w-full [&>div]:w-full"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-1.5 w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">{t("auth.login.rememberMe")}</span>
          </label>
          {onForgotPassword && (
            <button 
              type="button" 
              onClick={onForgotPassword} 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("auth.login.forgotPassword")}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <ButtonCommon type="submit" variant="submit" fullWidth size="sm" className="mt-4">
          {t("auth.login.signIn")}
        </ButtonCommon>
      </form>

      {/* Divider */}
      <div className="relative my-3 flex justify-between">
        <div className="inset-0 flex items-center w-[25%]">
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 text-gray-500 dark:text-gray-400">{t("auth.login.orConnectWith")}</span>
        </div>
        <div className="inset-0 flex items-center w-[25%]">
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
        </div>
      </div>

      {/* Social Login Buttons - Stacked vertically for mobile */}
      <div className="space-y-2">
        <ButtonCommon
          onClick={() => handleSocialLogin("github")}
          variant="default"
          fullWidth
          size="sm"
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm"
          icon={icons.github}
          iconClass="w-4 h-4"
        >
          Github
        </ButtonCommon>

        <ButtonCommon
          onClick={() => handleSocialLogin("google")}
          variant="default"
          fullWidth
          size="sm"
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm"
          icon={icons.google}
          iconClass="w-4 h-4"
        >
          Google
        </ButtonCommon>

        <ButtonCommon
          onClick={() => handleSocialLogin("facebook")}
          variant="default"
          fullWidth
          size="sm"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
          icon={icons.facebook}
          iconClass="w-4 h-4 text-white"
        >
          Facebook
        </ButtonCommon>
      </div>

      {/* Switch to Sign Up */}
      {onSwitchToSignUp && (
        <div className="mt-3 text-center text-[14px]">
          <span className="text-gray-600 dark:text-gray-400">{t("auth.login.noAccount")} </span>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-medium  text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("auth.signup.title")}
          </button>
        </div>
      )}
    </div>
  );
}
