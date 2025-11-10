import { useQuery } from '@tanstack/react-query';
import { getTopCryptocurrencies, type Coin } from '../apis/cryptoApi';
import { useI18n } from '../i18n';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const CryptoPrices = () => {
  const { t } = useI18n();
  
  const { data: coins, isLoading, error, refetch } = useQuery<Coin[]>({
    queryKey: ['cryptoPrices'],
    queryFn: () => getTopCryptocurrencies(10),
    refetchInterval: 60000, // Refetch every minute
  });

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{t('app.error')}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gradient-to-tr from-orange-400 via-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition"
        >
          {t('app.refresh')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('app.prices')}</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gradient-to-tr from-orange-400 via-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition text-sm"
        >
          {t('app.refresh')}
        </button>
      </div>
      
      <div className="grid gap-4">
        {coins?.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={coin.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-orange-400 transition shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400 font-bold text-sm">#{coin.market_cap_rank}</span>
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-bold text-white">{coin.name}</h3>
                      <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 text-right">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{t('coin.price')}</p>
                    <p className="text-white font-semibold">{formatPrice(coin.current_price)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{t('coin.change24h')}</p>
                    <div className={`flex items-center justify-end space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                      <p className="font-semibold">
                        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{t('coin.marketCap')}</p>
                    <p className="text-white font-semibold">{formatMarketCap(coin.market_cap)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{t('coin.volume')}</p>
                    <p className="text-white font-semibold">{formatVolume(coin.total_volume)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoPrices;

