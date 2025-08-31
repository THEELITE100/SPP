import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BarChart3, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass sticky top-0 z-50 backdrop-blur-md border-b border-white/20 dark:border-slate-700/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Market Analytics Pro
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Advanced Investment Analysis Platform
              </p>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 dark:border-slate-700/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-amber-500" />
            ) : (
              <Moon className="w-6 h-6 text-slate-700" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
