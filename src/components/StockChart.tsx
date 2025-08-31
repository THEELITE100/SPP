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
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl backdrop-blur-sm">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {isPrediction ? 'Forecast' : 'Historical'}
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            {formatDate(label)}
          </p>
          <p className="font-bold text-blue-600 text-lg">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-80 sm:h-96 lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorPrice)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#ffffff' }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 3, fill: '#ffffff' }}
            />
            {/* Prediction line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={4}
              strokeDasharray="8 8"
              dot={{ fill: '#22c55e', strokeWidth: 3, r: 6, stroke: '#ffffff' }}
              activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 4, fill: '#ffffff' }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend - Fixed positioning within container */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Historical Data</span>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Forecast</span>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
