import { useTranslation } from 'react-i18next';
import { useI18n as useCustomerI18n } from '../i18n'; // Customer's custom i18n (for their own components)
import { SelectGray } from '@tnbt/react-favorit-style';

const LanguageSwitcher = () => {
  // Use react-i18next for package components
  const { i18n } = useTranslation();
  // Use customer's i18n for their own components
  const { setLocale: setCustomerLocale, t } = useCustomerI18n();

  const languageOptions = [
    { key: 'en', label: t('language.english') },
    { key: 'vi', label: t('language.vietnamese') },
  ];
  
  const handleChange = (newLocale: string) => {
    // Update react-i18next (for package components)
    i18n.changeLanguage(newLocale);
    // Update customer's i18n (for their own components)
    setCustomerLocale(newLocale as 'en' | 'vi');
  };
  
  return (
    <div className="flex items-center gap-2">
      <SelectGray
        value={i18n.language}
        onChange={handleChange}
        options={languageOptions}
        className="min-w-[150px]"
        size='md'
        isUsePlaceHolder={false}
      />
    </div>
  );
};

export default LanguageSwitcher;

