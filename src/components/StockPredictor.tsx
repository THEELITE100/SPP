import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, DollarSign, AlertCircle, BarChart3, Target, Activity, Zap } from 'lucide-react';
import StockChart from './StockChart';
import { stockApi, StockData } from '../services/stockApi';

const StockPredictor: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictionDays, setPredictionDays] = useState(30);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX', 'JPM', 'JNJ'];

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await stockApi.searchStocks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const predictStock = async () => {
    if (!stockSymbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await stockApi.getStockData(stockSymbol, predictionDays);
      setStockData(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch stock data. Please try again.');
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5" />;
      case 'down': return <TrendingDown className="w-5 h-5" />;
      default: return <div className="w-5 h-5 border-2 border-slate-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold gradient-text">
            Market Analysis & Predictions
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
          Advanced technical analysis and predictive modeling for informed investment decisions. 
          Leverage sophisticated algorithms to analyze market trends and forecast price movements.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl backdrop-blur-sm"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Ticker Symbol
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={stockSymbol}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  setStockSymbol(value);
                  handleSearch(value);
                }}
                placeholder="Enter ticker symbol (e.g., AAPL, MSFT, TSLA)"
                className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                list="stock-suggestions"
              />
              <datalist id="stock-suggestions">
                {popularStocks.map(stock => (
                  <option key={stock} value={stock} />
                ))}
              </datalist>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto backdrop-blur-sm">
                  {searchResults.map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        setStockSymbol(symbol);
                        setSearchResults([]);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 last:border-b-0 transition-colors duration-200"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Analysis Period: {predictionDays} Days
            </label>
            <input
              type="range"
              min="7"
              max="365"
              value={predictionDays}
              onChange={(e) => setPredictionDays(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>7 days</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{predictionDays} days</span>
              <span>1 year</span>
            </div>
          </div>

          <motion.button
            onClick={predictStock}
            disabled={!stockSymbol || loading}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-700 hover:via-blue-800 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Market Data...
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                Generate Analysis
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      {stockData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 text-center shadow-xl backdrop-blur-sm card-hover"
            >
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Current Price
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                ${stockData.quote.currentPrice.toFixed(2)}
              </p>
              <p className={`text-sm font-medium mt-1 ${
                stockData.quote.change >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stockData.quote.change >= 0 ? '+' : ''}{stockData.quote.change.toFixed(2)} ({stockData.quote.changePercent.toFixed(2)}%)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center shadow-xl backdrop-blur-sm card-hover"
            >
              <Target className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Target Price
              </h3>
              <p className={`text-3xl font-bold ${getTrendColor(stockData.trend)}`}>
                ${stockData.predictedPrice.toFixed(2)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {predictionDays}-day forecast
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 text-center shadow-xl backdrop-blur-sm card-hover"
            >
              <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                {getTrendIcon(stockData.trend)}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Market Sentiment
              </h3>
              <p className={`text-xl font-bold ${getTrendColor(stockData.trend)}`}>
                {stockData.trend.toUpperCase()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6 text-center shadow-xl backdrop-blur-sm card-hover"
            >
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Confidence
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {stockData.confidence.toFixed(1)}%
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stockData.confidence}%` }}
                ></div>
              </div>
            </motion.div>
          </div>

          {/* Market Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-8 shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Market Data
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Open</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${stockData.quote.open.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">High</span>
                  <span className="font-semibold text-emerald-600">
                    ${stockData.quote.high.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Low</span>
                  <span className="font-semibold text-red-600">
                    ${stockData.quote.low.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Volume</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {stockData.quote.volume.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Market Cap</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${(stockData.quote.marketCap / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">P/E Ratio</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {stockData.quote.peRatio.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Previous Close</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${stockData.quote.previousClose.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Dividend Yield</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {stockData.quote.dividendYield.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">52W Range</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${(stockData.quote.low * 0.85).toFixed(2)} - ${(stockData.quote.high * 1.15).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-2xl p-8 shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Price History & Forecast
            </h3>
            <StockChart data={stockData.historicalData} predictedPrice={stockData.predictedPrice} />
          </motion.div>

          {/* Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-2xl p-8 shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Technical Analysis & Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Model Confidence
                </h4>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-lg h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-lg transition-all duration-500"
                    style={{ width: `${stockData.confidence}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {stockData.confidence.toFixed(1)}% confidence in this analysis based on technical indicators and market patterns
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Investment Recommendation
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {stockData.trend === 'up' 
                    ? 'Strong technical indicators suggest upward momentum. Consider establishing long positions with appropriate risk management.'
                    : stockData.trend === 'down'
                    ? 'Technical analysis indicates bearish signals. Consider reducing exposure or implementing hedging strategies.'
                    : 'Market shows neutral technical signals. Maintain current positions with close monitoring of key support/resistance levels.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default StockPredictor;
