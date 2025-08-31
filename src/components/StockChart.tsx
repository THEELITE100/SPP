import React from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  price: number;
}

interface StockChartProps {
  data: ChartData[];
  predictedPrice: number;
}

const StockChart: React.FC<StockChartProps> = ({ data, predictedPrice }) => {
  // Add prediction point to the data
  const chartData = [...data];
  const lastDate = new Date(data[data.length - 1].date);
  const predictionDate = new Date(lastDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  chartData.push({
    date: predictionDate.toISOString().split('T')[0],
    price: predictedPrice
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = label === predictionDate.toISOString().split('T')[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isPrediction ? 'Predicted' : 'Historical'}
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            Date: {formatDate(label)}
          </p>
          <p className="font-bold text-primary-600">
            Price: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorPrice)"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
          {/* Prediction line */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#22c55e', strokeWidth: 3, r: 6 }}
            activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 3 }}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Historical Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Prediction</span>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
