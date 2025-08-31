import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, TrendingUp, TrendingDown, BarChart3, Target, AlertCircle } from 'lucide-react';
import { stockApi, StockComparisonData } from '../services/stockApi';

const StockComparison: React.FC = () => {
  const [stocks, setStocks] = useState<StockComparisonData[]>([]);
  const [newStock, setNewStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);

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

  const addStock = async () => {
    if (!newStock || stocks.find(s => s.symbol === newStock.toUpperCase())) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const stockData = await stockApi.getStockComparisonData(newStock);
      setStocks([...stocks, stockData]);
      setNewStock('');
    } catch (error: any) {
      setError(error.message || 'Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeStock = (symbol: string) => {
    setStocks(stocks.filter(s => s.symbol !== symbol));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success-600 bg-success-100 dark:bg-success-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-danger-600 bg-danger-100 dark:bg-danger-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy': return 'text-success-600 bg-success-100 dark:bg-success-900/20';
      case 'sell': return 'text-danger-600 bg-danger-100 dark:bg-danger-900/20';
      case 'hold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getBestInvestment = () => {
    if (stocks.length === 0) return null;
    return stocks.reduce((best, current) => 
      current.predictedReturn > best.predictedReturn ? current : best
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stock Comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Compare multiple stocks side by side using real-time market data to find the best investment opportunities. 
          Analyze predicted returns, risk levels, and get personalized recommendations.
        </p>
      </motion.div>

      {/* Add Stock Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 max-w-2xl mx-auto"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newStock}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setNewStock(value);
                handleSearch(value);
              }}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="input-field"
              list="comparison-stocks"
            />
            <datalist id="comparison-stocks">
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
                      setNewStock(symbol);
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
          <motion.button
            onClick={addStock}
            disabled={!newStock || loading}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Stock
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

      {/* Best Investment Recommendation */}
      {stocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Best Investment Opportunity
            </h3>
          </div>
          {getBestInvestment() && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {getBestInvestment()!.symbol}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Predicted Return: {getBestInvestment()!.predictedReturn > 0 ? '+' : ''}
                  {getBestInvestment()!.predictedReturn.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500">
                  Current: ${getBestInvestment()!.quote.currentPrice.toFixed(2)} 
                  ({getBestInvestment()!.quote.change >= 0 ? '+' : ''}{getBestInvestment()!.quote.changePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                <p className="text-lg font-bold text-primary-600">
                  ${getBestInvestment()!.currentPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Volume: {getBestInvestment()!.quote.volume.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Comparison Table */}
      {stocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 overflow-x-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Stock Comparison Table
          </h3>
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Current Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Change</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Predicted Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Return</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Risk</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Confidence</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Recommendation</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                  <motion.tr
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-600">
                            {stock.symbol.charAt(0)}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {stock.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${stock.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        stock.quote.change >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {stock.quote.change >= 0 ? '+' : ''}{stock.quote.change.toFixed(2)} ({stock.quote.changePercent.toFixed(2)}%)
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${stock.predictedPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        stock.predictedReturn > 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {stock.predictedReturn > 0 ? '+' : ''}{stock.predictedReturn.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(stock.risk)}`}>
                        {stock.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${stock.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {stock.confidence.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(stock.recommendation)}`}>
                        {stock.recommendation.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        onClick={() => removeStock(stock.symbol)}
                        className="text-gray-400 hover:text-danger-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {stocks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-12 text-center"
        >
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Stocks Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add stocks above to start comparing their performance and predictions using real-time market data.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StockComparison;
