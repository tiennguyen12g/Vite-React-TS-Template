import React, { useState } from "react";
import { Input, ButtonCommon, SelectGray, ConfirmDelete } from "@tnbt/react-favorit-style";
import { useI18n } from "../../i18n"; // Customer's i18n
import { MdPerson, MdEmail, MdPhone, MdLock, MdDelete, MdDownload } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import ModalExample from "@/playground/examples/ModalExample";
import { PiMapPinAreaFill } from "react-icons/pi";

interface ProfileProps {
  onSave?: (data: ProfileData) => void;
  onPasswordChange?: (currentPassword: string, newPassword: string) => void;
  onDeleteAccount?: () => void;
  onExportData?: () => void;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  language: string;
  theme: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  twoFactorAuth: boolean;
}

export default function Profile({ onSave, onPasswordChange, onDeleteAccount, onExportData }: ProfileProps) {
  const { t, locale } = useI18n(); // Customer's i18n - include locale to trigger re-renders
  const [activeTab, setActiveTab] = useState<"personal" | "account" | "preferences" | "privacy">("personal");

  // Debug: log when locale changes
  React.useEffect(() => {
    console.log("Profile: locale changed to", locale);
  }, [locale]);

  // Form state
  const [formData, setFormData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "homeless",
    bio: "",
    language: "en",
    theme: "system",

    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
  });

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    address?: string
  }>({});

  const validatePersonalInfo = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t("profile.validation.nameRequired");
    }

    if (!formData.email) {
      newErrors.email = t("profile.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("profile.validation.emailInvalid");
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = t("profile.validation.phoneInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordChange = () => {
    const newErrors: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t("profile.validation.passwordRequired");
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = t("profile.validation.passwordRequired");
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = t("profile.validation.passwordMinLength");
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = t("profile.validation.passwordRequired");
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t("profile.validation.passwordsNotMatch");
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validatePersonalInfo()) {
      onSave?.(formData);
      // Show success message (you can use Notification component from package)
      console.log(t("profile.success.profileUpdated"));
    }
  };

  const handlePasswordChange = () => {
    if (validatePasswordChange()) {
      onPasswordChange?.(passwordData.currentPassword, passwordData.newPassword);
      setShowPasswordChange(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      console.log(t("profile.success.passwordChanged"));
    }
  };

  const handleDeleteAccount = () => {
    onDeleteAccount?.();
    setShowDeleteConfirm(false);
  };

  const tabs = [
    { id: "personal" as const, label: t("profile.personalInfo.title") },
    { id: "account" as const, label: t("profile.account.title") },
    { id: "preferences" as const, label: t("profile.preferences.title") },
    { id: "privacy" as const, label: t("profile.privacy.title") },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("profile.title")}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t("profile.subtitle")}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Personal Information Tab */}
      {activeTab === "personal" && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("profile.personalInfo.title")}</h2>

          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <FaUserCircle className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex gap-3 items-center">
              <ButtonCommon variant="default" size="sm">
                {t("profile.personalInfo.changeAvatar")}
              </ButtonCommon>
              <ButtonCommon variant="cancel" size="sm" className="ml-2" onClick={() => console.log("Remove avatar")}>
                {t("profile.personalInfo.removeAvatar")}
              </ButtonCommon>
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            {/* Name */}
            <Input
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              label={t("profile.personalInfo.name")}
              leftIcon={MdPerson}
              error={errors.name}
              fullWidth
              required
              size="md"
            />

            {/* Email */}
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              label={t("profile.personalInfo.email")}
              leftIcon={MdEmail}
              error={errors.email}
              fullWidth
              required
              size="md"
            />
          </div>

          <div className="flex gap-3 justify-between">
            {/* Phone */}
            <Input
              type="tel"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              label={t("profile.personalInfo.phone")}
              leftIcon={MdPhone}
              error={errors.phone}
              fullWidth
              size="md"
            />
            {/* Address */}
            <Input
              type="url"
              value={formData.address}
              onChange={(value) => setFormData({ ...formData, address: value })}
              label={t("profile.personalInfo.address")}
              leftIcon={PiMapPinAreaFill}
              error={errors.address}
              fullWidth
              size="md"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.bio")}</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder={t("profile.personalInfo.bioPlaceholder")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <ButtonCommon variant="cancel" onClick={() => setFormData({ ...formData })}>
              {t("profile.buttons.cancel")}
            </ButtonCommon>
            <ButtonCommon variant="submit" onClick={handleSave}>
              {t("profile.buttons.save")}
            </ButtonCommon>
          </div>
        </div>
      )}

      {/* Account Settings Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("profile.account.title")}</h2>

          {/* Change Password */}
          {!showPasswordChange ? (
            <div>
              <ButtonCommon variant="default" onClick={() => setShowPasswordChange(true)} icon={MdLock} iconPosition="left">
                {t("profile.account.changePassword")}
              </ButtonCommon>
            </div>
          ) : (
            <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white">{t("profile.account.changePassword")}</h3>

              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(value) => setPasswordData({ ...passwordData, currentPassword: value })}
                label={t("profile.account.currentPassword")}
                leftIcon={MdLock}
                error={passwordErrors.currentPassword}
                fullWidth
                required
                size="md"
              />

              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(value) => setPasswordData({ ...passwordData, newPassword: value })}
                label={t("profile.account.newPassword")}
                leftIcon={MdLock}
                error={passwordErrors.newPassword}
                fullWidth
                required
                size="md"
              />

              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(value) => setPasswordData({ ...passwordData, confirmPassword: value })}
                label={t("profile.account.confirmPassword")}
                leftIcon={MdLock}
                error={passwordErrors.confirmPassword}
                fullWidth
                required
                size="md"
              />

              <div className="flex justify-end space-x-3">
                <ButtonCommon
                  variant="cancel"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordErrors({});
                  }}
                >
                  {t("profile.buttons.cancel")}
                </ButtonCommon>
                <ButtonCommon variant="submit" onClick={handlePasswordChange}>
                  {t("profile.buttons.update")}
                </ButtonCommon>
              </div>
            </div>
          )}

          {/* Delete Account */}
          <div className="mt-8 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
            <h3 className="font-medium text-red-900 dark:text-red-200 mb-2">{t("profile.account.deleteAccount")}</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">{t("profile.account.deleteAccountWarning")}</p>
            <ButtonCommon variant="delete" onClick={() => setShowDeleteConfirm(true)} icon={MdDelete} iconPosition="left">
              {t("profile.buttons.delete")}
            </ButtonCommon>
          </div>

          {/* Delete Confirmation Modal */}
          <ConfirmDelete
            isModalOpen={showDeleteConfirm}
            setIsModalOpen={setShowDeleteConfirm}
            onExcute={handleDeleteAccount}
            content={t("profile.account.deleteAccountWarning")}
          />
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("profile.preferences.title")}</h2>

<div className="flex gap-3">
            {/* Language */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.preferences.language")}</label>
              <SelectGray
                value={formData.language}
                onChange={(value) => {
                  setFormData({ ...formData, language: value as string });
                  console.log("value", value);
                }}
                options={[
                  { key: "en", label: t("language.english") },
                  { key: "vi", label: t("language.vietnamese") },
                ]}
                className="w-full"
              />
            </div>
  
            {/* Theme */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.preferences.theme")}</label>
              <SelectGray
                value={formData.theme}
                onChange={(value) => setFormData({ ...formData, theme: value as string })}
                options={[
                  { key: "light", label: t("profile.preferences.themeLight") },
                  { key: "dark", label: t("profile.preferences.themeDark") },
                  { key: "system", label: t("profile.preferences.themeSystem") },
                ]}
                className="w-full"
              />
            </div>
</div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{t("profile.preferences.notifications")}</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t("profile.preferences.emailNotifications")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.pushNotifications}
                  onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t("profile.preferences.pushNotifications")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.smsNotifications}
                  onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t("profile.preferences.smsNotifications")}</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <ButtonCommon variant="cancel">{t("profile.buttons.cancel")}</ButtonCommon>
            <ButtonCommon variant="submit" onClick={handleSave}>
              {t("profile.buttons.save")}
            </ButtonCommon>
          </div>
        </div>
      )}

      {/* Privacy & Security Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("profile.privacy.title")}</h2>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{t("profile.privacy.twoFactorAuth")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.twoFactorAuth ? "Enabled" : "Add an extra layer of security to your account"}
              </p>
            </div>
            <ButtonCommon
              variant={formData.twoFactorAuth ? "warning" : "default"}
              onClick={() => setFormData({ ...formData, twoFactorAuth: !formData.twoFactorAuth })}
            >
              {formData.twoFactorAuth ? t("profile.privacy.disable2FA") : t("profile.privacy.enable2FA")}
            </ButtonCommon>
          </div>

          {/* Login History */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t("profile.privacy.loginHistory")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">View your recent login activity</p>
            <ButtonCommon variant="default" size="sm">
              {t("profile.privacy.loginHistory")}
            </ButtonCommon>
          </div>

          {/* Active Sessions */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t("profile.privacy.activeSessions")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage devices where you're currently signed in</p>
            <ButtonCommon variant="default" size="sm">
              {t("profile.privacy.activeSessions")}
            </ButtonCommon>
          </div>

          {/* Export Data */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t("profile.privacy.dataExport")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t("profile.privacy.dataExportDesc")}</p>
            <ButtonCommon variant="default" size="sm" onClick={onExportData} icon={MdDownload} iconPosition="left">
              {t("profile.buttons.export")}
            </ButtonCommon>
          </div>
        </div>
      )}
    </div>
  );
}
