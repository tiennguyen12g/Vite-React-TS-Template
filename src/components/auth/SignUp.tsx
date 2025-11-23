import React, { useState } from "react";
import { Input, ButtonCommon } from "@tnbt/react-favorit-style";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { icons } from "@/components/ui/icons/Icons";
interface SignUpProps {
  onSignUp?: (name: string, email: string, password: string) => void;
  onSocialSignUp?: (provider: "github" | "google" | "facebook") => void;
  onSwitchToLogin?: () => void;
}

export default function SignUp({ onSignUp, onSocialSignUp, onSwitchToLogin }: SignUpProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = t("auth.validation.nameRequired");
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.confirmPasswordRequired");
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordsNotMatch");
    }

    if (!agreeToTerms) {
      newErrors.terms = t("auth.validation.termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSignUp?.(name, email, password);
    }
  };

  const handleSocialSignUp = (provider: "github" | "google" | "facebook") => {
    onSocialSignUp?.(provider);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("auth.signup.title")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t("auth.signup.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Input */}
        <div>
          <Input
            type="text"
            value={name}
            onChange={setName}
            placeholder={t("auth.signup.name")}
            label={t("auth.signup.name")}
            leftIcon={MdPerson}
            error={errors.name}
            fullWidth
            required
            size="md"
            className="flex flex-col items-start w-full [&>div]:w-full"
          />
        </div>

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
            size="md"
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
            size="md"
            className="flex flex-col items-start w-full [&>div]:w-full"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t("auth.signup.confirmPassword")}
            label={t("auth.signup.confirmPassword")}
            leftIcon={MdLock}
            error={errors.confirmPassword}
            fullWidth
            required
            size="md"
            className="flex flex-col items-start w-full [&>div]:w-full"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <label className="flex items-center ">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className=" mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t("auth.signup.agreeToTerms")}</span>
          </label>
          {errors.terms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>}
        </div>

        {/* Submit Button */}
        <ButtonCommon type="submit" variant="submit" fullWidth size="md" className="mt-6">
          {t("auth.signup.createAccount")}
        </ButtonCommon>
      </form>
      {/* Divider */}
      <div className="relative my-4 flex justify-between" >
        <div className=" inset-0 flex items-center w-[30%]">
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 dark:text-gray-400">{t("auth.login.orConnectWith")}</span>
        </div>
                <div className=" inset-0 flex items-center w-[30%]">
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
        </div>
      </div>
      {/* Social Sign Up Buttons */}
      <div className="space-y-2 flex gap-1">
        <ButtonCommon
          onClick={() => handleSocialSignUp("github")}
          variant="default"
          fullWidth
          size="md"
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white"
          icon={icons.github}
          iconClass="w-5 h-5"
        >
          Github
        </ButtonCommon>

        <ButtonCommon
          onClick={() => handleSocialSignUp("google")}
          variant="default"
          fullWidth
          size="md"
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
          icon={icons.google}
          iconClass="w-5 h-5"
        >
          Google
        </ButtonCommon>

        <ButtonCommon
          onClick={() => handleSocialSignUp("facebook")}
          variant="default"
          fullWidth
          size="md"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          icon={icons.facebook}
          iconClass="w-5 -h-5 text-white"
        >
          Facebook
        </ButtonCommon>
      </div>

      {/* Switch to Login */}
      {onSwitchToLogin && (
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t("auth.signup.haveAccount")} </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("auth.login.title")}
          </button>
        </div>
      )}
    </div>
  );
}
