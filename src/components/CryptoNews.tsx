import { useQuery } from '@tanstack/react-query';
import { getCryptoNews, type CryptoNews as NewsType } from '../apis/newsApi';
import { useI18n } from '../i18n';
import { FiExternalLink, FiClock } from 'react-icons/fi';

const CryptoNews = () => {
  const { t } = useI18n();
  
  const { data: news, isLoading, error, refetch } = useQuery<NewsType[]>({
    queryKey: ['cryptoNews'],
    queryFn: () => getCryptoNews(10),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !news || news.length === 0) {
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
        <h2 className="text-2xl font-bold text-white">{t('app.news')}</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gradient-to-tr from-orange-400 via-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition text-sm"
        >
          {t('app.refresh')}
        </button>
      </div>
      
      <div className="grid gap-6">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-400 transition shadow-lg"
          >
            <div className="flex flex-col md:flex-row">
              {article.imageurl && (
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src={article.imageurl}
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Crypto+News';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                      {article.body.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <FiClock />
                      <span>{formatDate(article.published_on)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{t('news.source')}:</span>
                      <span className="text-orange-400 font-medium">
                        {article.source_info?.name || article.source}
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-tr from-orange-400 via-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition text-sm"
                  >
                    <span>{t('news.readMore')}</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;

