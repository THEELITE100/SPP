import axios from 'axios';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'EAKM3KJQNDGBFJZS';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockQuote {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  open: number;
  previousClose: number;
}

export interface StockData {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  historicalData: Array<{ date: string; price: number }>;
  quote: StockQuote;
}

export interface StockComparisonData {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  predictedReturn: number;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  recommendation: 'buy' | 'sell' | 'hold';
  quote: StockQuote;
}

class StockApiService {
  private async makeApiCall(params: any) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          ...params,
          apikey: API_KEY
        }
      });
      
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      
      if (response.data['Note']) {
        throw new Error('API rate limit exceeded. Please try again in a minute.');
      }
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    const data = await this.makeApiCall({
      function: 'GLOBAL_QUOTE',
      symbol: symbol.toUpperCase()
    });

    const quote = data['Global Quote'];
    if (!quote || !quote['05. price']) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }

    return {
      symbol: quote['01. symbol'],
      currentPrice: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close'])
    };
  }

  async getHistoricalData(symbol: string, days: number = 30): Promise<Array<{ date: string; price: number }>> {
    const data = await this.makeApiCall({
      function: 'TIME_SERIES_DAILY',
      symbol: symbol.toUpperCase(),
      outputsize: 'compact'
    });

    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) {
      throw new Error(`No historical data found for symbol: ${symbol}`);
    }

    const dates = Object.keys(timeSeries).sort().reverse().slice(0, days);
    return dates.map(date => ({
      date,
      price: parseFloat(timeSeries[date]['4. close'])
    }));
  }

  async getStockData(symbol: string, predictionDays: number = 30): Promise<StockData> {
    const [quote, historicalData] = await Promise.all([
      this.getStockQuote(symbol),
      this.getHistoricalData(symbol, 30)
    ]);

    // Calculate prediction based on historical data and technical analysis
    const currentPrice = quote.currentPrice;
    const recentPrices = historicalData.slice(0, 7).map(d => d.price);
    const avgPrice = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length;
    
    // Simple prediction algorithm (you can enhance this)
    const volatility = Math.std(recentPrices);
    const trend = currentPrice > avgPrice ? 'up' : currentPrice < avgPrice ? 'down' : 'stable';
    
    // Calculate predicted price with some randomness based on volatility
    const changePercent = (Math.random() - 0.5) * (volatility / currentPrice) * 100;
    const predictedPrice = currentPrice * (1 + changePercent / 100);
    
    // Calculate confidence based on volatility (lower volatility = higher confidence)
    const confidence = Math.max(70, 100 - (volatility / currentPrice) * 1000);

    return {
      symbol: quote.symbol,
      currentPrice,
      predictedPrice,
      confidence,
      trend,
      historicalData,
      quote
    };
  }

  async getStockComparisonData(symbol: string): Promise<StockComparisonData> {
    const stockData = await this.getStockData(symbol);
    const quote = stockData.quote;
    
    // Calculate risk based on volatility
    const recentPrices = stockData.historicalData.slice(0, 7).map(d => d.price);
    const volatility = Math.std(recentPrices);
    const riskLevel = volatility > quote.currentPrice * 0.05 ? 'high' : 
                     volatility > quote.currentPrice * 0.02 ? 'medium' : 'low';
    
    // Calculate recommendation based on trend and change percent
    let recommendation: 'buy' | 'sell' | 'hold';
    if (quote.changePercent > 2 && stockData.trend === 'up') {
      recommendation = 'buy';
    } else if (quote.changePercent < -2 && stockData.trend === 'down') {
      recommendation = 'sell';
    } else {
      recommendation = 'hold';
    }

    return {
      symbol: stockData.symbol,
      currentPrice: stockData.currentPrice,
      predictedPrice: stockData.predictedPrice,
      predictedReturn: ((stockData.predictedPrice - stockData.currentPrice) / stockData.currentPrice) * 100,
      risk: riskLevel,
      confidence: stockData.confidence,
      recommendation,
      quote
    };
  }

  async searchStocks(query: string): Promise<string[]> {
    try {
      const data = await this.makeApiCall({
        function: 'SYMBOL_SEARCH',
        keywords: query
      });

      const matches = data.bestMatches || [];
      return matches.slice(0, 10).map((match: any) => match['1. symbol']);
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
}

// Add Math.std polyfill
declare global {
  interface Math {
    std: (arr: number[]) => number;
  }
}

Math.std = function(arr: number[]): number {
  const n = arr.length;
  const mean = arr.reduce((sum, val) => sum + val, 0) / n;
  const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  return Math.sqrt(variance);
};

export const stockApi = new StockApiService();
