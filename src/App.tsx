import "./App.css";
import { I18nProvider, useI18n } from "./i18n";
import { QueryProvider } from "./tanstack_query/QueryProvider";
import CryptoPrices from "./components/CryptoPrices";
import CryptoNews from "./components/CryptoNews";
import LanguageSwitcher from "./components/LanguageSwitcher";

const AppContent = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* Crypto Prices Section */}
          <section>
            <CryptoPrices />
          </section>

          {/* Crypto News Section */}
          <section>
            <CryptoNews />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 {t('app.title')}. Data provided by CoinGecko & CryptoCompare</p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </QueryProvider>
  );
}

export default App;
