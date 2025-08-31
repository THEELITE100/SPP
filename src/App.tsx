import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import StockPredictor from './components/StockPredictor';
import StockComparison from './components/StockComparison';
import ProfitLossCalculator from './components/ProfitLossCalculator';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('predictor');

  const tabs = [
    { id: 'predictor', name: 'Market Analysis', icon: '📊' },
    { id: 'comparison', name: 'Portfolio Analysis', icon: '⚖️' },
    { id: 'calculator', name: 'Risk Assessment', icon: '💰' },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 bg-pattern dark:bg-pattern-dark transition-all duration-500">
        <Header />
        
        <main className="container mx-auto px-6 py-8 relative">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12 relative z-10"
          >
            <div className="glass rounded-2xl p-2 shadow-2xl backdrop-blur-sm">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl scale-105'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-3 text-lg">{tab.icon}</span>
                  {tab.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative z-10"
            >
              {activeTab === 'predictor' && <StockPredictor />}
              {activeTab === 'comparison' && <StockComparison />}
              {activeTab === 'calculator' && <ProfitLossCalculator />}
            </motion.div>
          </AnimatePresence>

          {/* Professional footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center relative z-10"
          >
            <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Professional Investment Analysis Platform • Powered by Advanced Analytics
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
                For educational and demonstration purposes only
              </p>
            </div>
          </motion.footer>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
