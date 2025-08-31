import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import StockChart from './StockChart';
import { stockApi, StockData } from '../services/stockApi';

const StockPredictor: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictionDays, setPredictionDays] = useState(30);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Popular stock symbols for suggestions
  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'];

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
      case 'up': return 'text-success-600';
      case 'down': return 'text-danger-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5" />;
      case 'down': return <TrendingDown className="w-5 h-5" />;
      default: return <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stock Price Predictor
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get AI-powered predictions for stock prices using real-time market data. 
          Our advanced algorithms analyze market trends, historical data, and market sentiment.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 max-w-2xl mx-auto"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stock Symbol
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={stockSymbol}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  setStockSymbol(value);
                  handleSearch(value);
                }}
                placeholder="Enter stock symbol (e.g., AAPL)"
                className="input-field pl-10"
                list="stock-suggestions"
              />
              <datalist id="stock-suggestions">
                {popularStocks.map(stock => (
                  <option key={stock} value={stock} />
                ))}
              </datalist>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {searchResults.map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        setStockSymbol(symbol);
                        setSearchResults([]);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prediction Period (Days)
            </label>
            <input
              type="range"
              min="7"
              max="365"
              value={predictionDays}
              onChange={(e) => setPredictionDays(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>7 days</span>
              <span className="font-medium">{predictionDays} days</span>
              <span>1 year</span>
            </div>
          </div>

          <motion.button
            onClick={predictStock}
            disabled={!stockSymbol || loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Predict Price
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
          className="card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 max-w-2xl mx-auto"
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
          className="space-y-6"
        >
          {/* Real-time Quote Summary */}
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="card p-6 text-center"
            >
              <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Current Price
              </h3>
              <p className="text-2xl font-bold text-primary-600">
                ${stockData.quote.currentPrice.toFixed(2)}
              </p>
              <p className={`text-sm ${stockData.quote.change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {stockData.quote.change >= 0 ? '+' : ''}{stockData.quote.change.toFixed(2)} ({stockData.quote.changePercent.toFixed(2)}%)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card p-6 text-center"
            >
              <Calendar className="w-8 h-8 text-success-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Predicted Price
              </h3>
              <p className={`text-2xl font-bold ${getTrendColor(stockData.trend)}`}>
                ${stockData.predictedPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                in {predictionDays} days
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="card p-6 text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                {getTrendIcon(stockData.trend)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Prediction Trend
              </h3>
              <p className={`text-lg font-bold ${getTrendColor(stockData.trend)}`}>
                {stockData.trend.toUpperCase()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="card p-6 text-center"
            >
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-600">{stockData.confidence.toFixed(0)}%</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Confidence
              </h3>
              <p className="text-lg font-bold text-primary-600">
                {stockData.confidence.toFixed(1)}%
              </p>
            </motion.div>
          </div>

          {/* Market Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Market Data
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Open</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${stockData.quote.open.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High</p>
                <p className="text-lg font-semibold text-success-600">
                  ${stockData.quote.high.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low</p>
                <p className="text-lg font-semibold text-danger-600">
                  ${stockData.quote.low.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Volume</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stockData.quote.volume.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Previous Close</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${stockData.quote.previousClose.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Real-time data
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Price History & Prediction
            </h3>
            <StockChart data={stockData.historicalData} predictedPrice={stockData.predictedPrice} />
          </motion.div>

          {/* Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analysis & Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Confidence Level
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${stockData.confidence}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stockData.confidence.toFixed(1)}% confidence in this prediction
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Investment Recommendation
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {stockData.trend === 'up' 
                    ? 'Consider buying - positive growth expected based on current market trends'
                    : stockData.trend === 'down'
                    ? 'Consider selling or wait - decline expected based on market analysis'
                    : 'Hold position - stable performance expected in the near term'
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
