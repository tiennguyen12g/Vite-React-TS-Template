import { useI18n } from '../i18n';
import { Select } from '@tnbt/react-favorit-style';
import { useEffect } from 'react';
const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useI18n();

  const languageOptions = [
    { label: t('language.english'), key: 'en' },
    { label: t('language.vietnamese'), key: 'vi' },
  ];
  
  useEffect(() => {
    console.log('locale switch', locale);

  }, [locale]);
  return (
    <Select
      value={locale}
      onChange={(value) => setLocale(value as 'en' | 'vi')}
      options={languageOptions}
      className="min-w-[150px]"
    />
  );
};

export default LanguageSwitcher;

