import { useI18n } from '../i18n';
import { Select } from '../style_components/StyleComponents';

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useI18n();

  const languageOptions = [
    { label: t('language.english'), value: 'en' },
    { label: t('language.vietnamese'), value: 'vi' },
  ];

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

