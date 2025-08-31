import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, TrendingDown, PieChart, Target } from 'lucide-react';

interface InvestmentScenario {
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  shares: number;
  investment: number;
  profitLoss: number;
  profitLossPercent: number;
  fees: number;
  netProfitLoss: number;
}

const ProfitLossCalculator: React.FC = () => {
  const [scenarios, setScenarios] = useState<InvestmentScenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Partial<InvestmentScenario>>({
    symbol: '',
    buyPrice: undefined,
    sellPrice: undefined,
    shares: undefined,
    fees: undefined
  });

  const calculateProfitLoss = () => {
    const { symbol, buyPrice, sellPrice, shares, fees } = currentScenario;
    
    if (!symbol || !buyPrice || !sellPrice || !shares || buyPrice <= 0 || sellPrice <= 0 || shares <= 0) return;
    
    const investment = buyPrice * shares;
    const profitLoss = (sellPrice - buyPrice) * shares;
    const profitLossPercent = ((sellPrice - buyPrice) / buyPrice) * 100;
    const netProfitLoss = profitLoss - (fees || 0);
    
    const newScenario: InvestmentScenario = {
      symbol: symbol.toUpperCase(),
      buyPrice,
      sellPrice,
      shares,
      investment,
      profitLoss,
      profitLossPercent,
      fees: fees || 0,
      netProfitLoss
    };
    
    setScenarios([...scenarios, newScenario]);
    setCurrentScenario({
      symbol: '',
      buyPrice: undefined,
      sellPrice: undefined,
      shares: undefined,
      fees: undefined
    });
  };

  const removeScenario = (index: number) => {
    setScenarios(scenarios.filter((_, i) => i !== index));
  };

  const getTotalInvestment = () => {
    return scenarios.reduce((total, scenario) => total + scenario.investment, 0);
  };

  const getTotalProfitLoss = () => {
    return scenarios.reduce((total, scenario) => total + scenario.netProfitLoss, 0);
  };

  const getBestPerformer = () => {
    if (scenarios.length === 0) return null;
    return scenarios.reduce((best, current) => 
      current.profitLossPercent > best.profitLossPercent ? current : best
    );
  };

  const getWorstPerformer = () => {
    if (scenarios.length === 0) return null;
    return scenarios.reduce((worst, current) => 
      current.profitLossPercent < worst.profitLossPercent ? current : worst
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
          Profit/Loss Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Calculate potential profits and losses for your stock investments. 
          Compare different scenarios and understand the impact of fees on your returns.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Add Investment Scenario
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stock Symbol
            </label>
            <input
              type="text"
              value={currentScenario.symbol}
              onChange={(e) => setCurrentScenario({...currentScenario, symbol: e.target.value.toUpperCase()})}
              placeholder="e.g., AAPL"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Shares
            </label>
                         <input
               type="number"
               value={currentScenario.shares || ''}
               onChange={(e) => setCurrentScenario({...currentScenario, shares: parseFloat(e.target.value) || undefined})}
               placeholder="100"
               className="input-field"
             />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buy Price ($)
            </label>
                         <input
               type="number"
               step="0.01"
               value={currentScenario.buyPrice || ''}
               onChange={(e) => setCurrentScenario({...currentScenario, buyPrice: parseFloat(e.target.value) || undefined})}
               placeholder="150.00"
               className="input-field"
             />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sell Price ($)
            </label>
                         <input
               type="number"
               step="0.01"
               value={currentScenario.sellPrice || ''}
               onChange={(e) => setCurrentScenario({...currentScenario, sellPrice: parseFloat(e.target.value) || undefined})}
               placeholder="175.00"
               className="input-field"
             />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trading Fees ($)
            </label>
                         <input
               type="number"
               step="0.01"
               value={currentScenario.fees || ''}
               onChange={(e) => setCurrentScenario({...currentScenario, fees: parseFloat(e.target.value) || undefined})}
               placeholder="9.99"
               className="input-field"
             />
          </div>
        </div>
        
        <motion.button
          onClick={calculateProfitLoss}
          disabled={!currentScenario.symbol || !currentScenario.buyPrice || !currentScenario.sellPrice || !currentScenario.shares || currentScenario.buyPrice <= 0 || currentScenario.sellPrice <= 0 || currentScenario.shares <= 0}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Calculator className="w-5 h-5" />
          Calculate Profit/Loss
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      {scenarios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card p-6 text-center"
          >
            <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Total Investment
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              ${getTotalInvestment().toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="card p-6 text-center"
          >
            <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Total P&L
            </h3>
            <p className={`text-2xl font-bold ${getTotalProfitLoss() >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {getTotalProfitLoss() >= 0 ? '+' : ''}${getTotalProfitLoss().toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="card p-6 text-center"
          >
            <PieChart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Total Return
            </h3>
            <p className={`text-2xl font-bold ${getTotalProfitLoss() >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {getTotalInvestment() > 0 ? ((getTotalProfitLoss() / getTotalInvestment()) * 100).toFixed(2) : '0.00'}%
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Best/Worst Performers */}
      {scenarios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {getBestPerformer() && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-success-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Best Performer
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {getBestPerformer()!.symbol}
                </p>
                <p className="text-success-600 font-semibold">
                  +{getBestPerformer()!.profitLossPercent.toFixed(2)}% return
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  ${getBestPerformer()!.netProfitLoss.toFixed(2)} profit
                </p>
              </div>
            </motion.div>
          )}

          {getWorstPerformer() && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6 bg-gradient-to-r from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20 border-danger-200 dark:border-danger-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-6 h-6 text-danger-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Worst Performer
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {getWorstPerformer()!.symbol}
                </p>
                <p className="text-danger-600 font-semibold">
                  {getWorstPerformer()!.profitLossPercent.toFixed(2)}% return
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  ${getWorstPerformer()!.netProfitLoss.toFixed(2)} loss
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Scenarios Table */}
      {scenarios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 overflow-x-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Investment Scenarios
          </h3>
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Shares</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Buy Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Sell Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Investment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Fees</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">P&L</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Return %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((scenario, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {scenario.symbol}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      {scenario.shares}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${scenario.buyPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${scenario.sellPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${scenario.investment.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      ${scenario.fees.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        scenario.netProfitLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {scenario.netProfitLoss >= 0 ? '+' : ''}${scenario.netProfitLoss.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        scenario.profitLossPercent >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {scenario.profitLossPercent >= 0 ? '+' : ''}{scenario.profitLossPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        onClick={() => removeScenario(index)}
                        className="text-gray-400 hover:text-danger-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <TrendingDown className="w-4 h-4" />
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
      {scenarios.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-12 text-center"
        >
          <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Scenarios Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add investment scenarios above to calculate potential profits and losses.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProfitLossCalculator;
