import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Target, AlertCircle, PieChart } from 'lucide-react';
import { stockApi, StockComparisonData } from '../services/stockApi';

const StockComparison: React.FC = () => {
  const [stocks, setStocks] = useState<StockComparisonData[]>([]);
  const [newStock, setNewStock] = useState('');
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
      case 'low': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      case 'medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      case 'sell': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'hold': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600';
    }
  };

  const getBestInvestment = () => {
    if (stocks.length === 0) return null;
    return stocks.reduce((best, current) => 
      current.predictedReturn > best.predictedReturn ? current : best
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Portfolio Analysis & Comparison
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
          Comprehensive portfolio analysis and side-by-side comparison of multiple securities. 
          Evaluate risk profiles, performance metrics, and investment opportunities across your portfolio.
        </p>
      </motion.div>

      {/* Add Stock Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto"
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
              placeholder="Enter ticker symbol (e.g., AAPL, MSFT, TSLA)"
              className="w-full px-4 py-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              list="comparison-stocks"
            />
            <datalist id="comparison-stocks">
              {popularStocks.map(stock => (
                <option key={stock} value={stock} />
              ))}
            </datalist>
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                {searchResults.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => {
                      setNewStock(symbol);
                      setSearchResults([]);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 last:border-b-0"
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg flex items-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Security
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
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-4xl mx-auto"
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
          className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-7 h-7 text-emerald-600" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Top Investment Opportunity
            </h3>
          </div>
          {getBestInvestment() && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {getBestInvestment()!.symbol}
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-1">
                  Expected Return: {getBestInvestment()!.predictedReturn > 0 ? '+' : ''}
                  {getBestInvestment()!.predictedReturn.toFixed(2)}%
                </p>
                <p className="text-sm text-slate-500">
                  Current: ${getBestInvestment()!.quote.currentPrice.toFixed(2)} 
                  ({getBestInvestment()!.quote.change >= 0 ? '+' : ''}{getBestInvestment()!.quote.changePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${getBestInvestment()!.currentPrice.toFixed(2)}
                </p>
                <p className="text-sm text-slate-500">
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
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 overflow-x-auto"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Portfolio Analysis
          </h3>
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Security</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Current Price</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Change</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Target Price</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Expected Return</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Risk Profile</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Confidence</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Action</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Remove</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                  <motion.tr
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {stock.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {stock.symbol}
                          </span>
                          <p className="text-xs text-slate-500">
                            Market Cap: ${(stock.quote.marketCap / 1000000000).toFixed(1)}B
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          ${stock.currentPrice.toFixed(2)}
                        </span>
                        <p className="text-xs text-slate-500">
                          P/E: {stock.quote.peRatio.toFixed(1)}
                        </p>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className={`font-semibold ${
                        stock.quote.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.quote.change >= 0 ? '+' : ''}{stock.quote.change.toFixed(2)} ({stock.quote.changePercent.toFixed(2)}%)
                      </span>
                    </td>
                    <td className="py-6 px-4 text-slate-900 dark:text-white">
                      ${stock.predictedPrice.toFixed(2)}
                    </td>
                    <td className="py-6 px-4">
                      <span className={`font-semibold ${
                        stock.predictedReturn > 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.predictedReturn > 0 ? '+' : ''}{stock.predictedReturn.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(stock.risk)}`}>
                        {stock.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${stock.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[3rem]">
                          {stock.confidence.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(stock.recommendation)}`}>
                        {stock.recommendation.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <motion.button
                        onClick={() => removeStock(stock.symbol)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
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
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-16 text-center"
        >
          <PieChart className="w-20 h-20 text-slate-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No Securities Added
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Add securities above to begin portfolio analysis and comparison. 
            Evaluate performance metrics, risk profiles, and investment opportunities.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StockComparison;
