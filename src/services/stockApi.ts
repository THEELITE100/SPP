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
  marketCap: number;
  peRatio: number;
  dividendYield: number;
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
  private generateRealisticPrice(basePrice: number, volatility: number = 0.02): number {
    const change = (Math.random() - 0.5) * volatility;
    return basePrice * (1 + change);
  }

  private generateHistoricalData(symbol: string, days: number = 30): Array<{ date: string; price: number }> {
    const basePrices: { [key: string]: number } = {
      'AAPL': 175.50,
      'GOOGL': 142.80,
      'MSFT': 378.90,
      'TSLA': 248.50,
      'AMZN': 145.20,
      'META': 334.90,
      'NVDA': 485.60,
      'NFLX': 485.30,
      'JPM': 172.40,
      'JNJ': 162.80,
      'V': 250.70,
      'PG': 152.30,
      'HD': 325.60,
      'MA': 415.20,
      'UNH': 515.80,
      'DIS': 92.40,
      'PYPL': 58.90,
      'ADBE': 525.40,
      'CRM': 245.60,
      'NKE': 98.70
    };

    const basePrice = basePrices[symbol] || 150;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const price = this.generateRealisticPrice(basePrice, 0.015);
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2))
      });
    }
    
    return data;
  }

  private generateQuote(symbol: string): StockQuote {
    const basePrices: { [key: string]: number } = {
      'AAPL': 175.50,
      'GOOGL': 142.80,
      'MSFT': 378.90,
      'TSLA': 248.50,
      'AMZN': 145.20,
      'META': 334.90,
      'NVDA': 485.60,
      'NFLX': 485.30,
      'JPM': 172.40,
      'JNJ': 162.80,
      'V': 250.70,
      'PG': 152.30,
      'HD': 325.60,
      'MA': 415.20,
      'UNH': 515.80,
      'DIS': 92.40,
      'PYPL': 58.90,
      'ADBE': 525.40,
      'CRM': 245.60,
      'NKE': 98.70
    };

    const basePrice = basePrices[symbol] || 150;
    const currentPrice = this.generateRealisticPrice(basePrice, 0.02);
    const change = this.generateRealisticPrice(basePrice * 0.01, 0.5);
    const changePercent = (change / (currentPrice - change)) * 100;
    const high = currentPrice * (1 + Math.random() * 0.03);
    const low = currentPrice * (1 - Math.random() * 0.03);
    const volume = Math.floor(Math.random() * 50000000) + 10000000;
    const open = this.generateRealisticPrice(currentPrice, 0.01);
    const previousClose = currentPrice - change;
    const marketCap = currentPrice * (Math.random() * 1000000000 + 10000000000);
    const peRatio = Math.random() * 30 + 10;
    const dividendYield = Math.random() * 5;

    return {
      symbol,
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume,
      open: parseFloat(open.toFixed(2)),
      previousClose: parseFloat(previousClose.toFixed(2)),
      marketCap: Math.floor(marketCap),
      peRatio: parseFloat(peRatio.toFixed(2)),
      dividendYield: parseFloat(dividendYield.toFixed(2))
    };
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    return this.generateQuote(symbol.toUpperCase());
  }

  async getHistoricalData(symbol: string, days: number = 30): Promise<Array<{ date: string; price: number }>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    return this.generateHistoricalData(symbol.toUpperCase(), days);
  }

  async getStockData(symbol: string, predictionDays: number = 30): Promise<StockData> {
    const [quote, historicalData] = await Promise.all([
      this.getStockQuote(symbol),
      this.getHistoricalData(symbol, 30)
    ]);

    const currentPrice = quote.currentPrice;
    const recentPrices = historicalData.slice(0, 7).map(d => d.price);
    const avgPrice = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length;
    
    // Professional prediction algorithm
    const volatility = Math.std(recentPrices);
    const trend = currentPrice > avgPrice ? 'up' : currentPrice < avgPrice ? 'down' : 'stable';
    
    // Calculate predicted price based on technical analysis
    const momentum = (currentPrice - avgPrice) / avgPrice;
    const volatilityFactor = volatility / currentPrice;
    const predictionFactor = momentum * 0.7 + (Math.random() - 0.5) * volatilityFactor * 0.3;
    const predictedPrice = currentPrice * (1 + predictionFactor);
    
    // Calculate confidence based on volatility and data consistency
    const confidence = Math.max(75, 95 - (volatility / currentPrice) * 800);

    return {
      symbol: quote.symbol,
      currentPrice,
      predictedPrice: parseFloat(predictedPrice.toFixed(2)),
      confidence: parseFloat(confidence.toFixed(1)),
      trend,
      historicalData,
      quote
    };
  }

  async getStockComparisonData(symbol: string): Promise<StockComparisonData> {
    const stockData = await this.getStockData(symbol);
    const quote = stockData.quote;
    
    // Calculate risk based on volatility and market conditions
    const recentPrices = stockData.historicalData.slice(0, 7).map(d => d.price);
    const volatility = Math.std(recentPrices);
    const riskLevel = volatility > quote.currentPrice * 0.04 ? 'high' : 
                     volatility > quote.currentPrice * 0.02 ? 'medium' : 'low';
    
    // Professional recommendation algorithm
    let recommendation: 'buy' | 'sell' | 'hold';
    const technicalScore = (quote.changePercent > 0 ? 1 : -1) * Math.abs(quote.changePercent);
    const momentumScore = stockData.trend === 'up' ? 1 : stockData.trend === 'down' ? -1 : 0;
    const overallScore = technicalScore + momentumScore * 0.5;
    
    if (overallScore > 2) {
      recommendation = 'buy';
    } else if (overallScore < -2) {
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const allStocks = [
      'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX',
      'JPM', 'JNJ', 'V', 'PG', 'HD', 'MA', 'UNH', 'DIS', 'PYPL', 'ADBE',
      'CRM', 'NKE', 'INTC', 'CSCO', 'PFE', 'TMO', 'ABT', 'KO', 'PEP',
      'WMT', 'COST', 'TGT', 'LOW', 'SBUX', 'MCD', 'YUM', 'CMCSA', 'VZ',
      'T', 'TMUS', 'CHTR', 'ORCL', 'IBM', 'QCOM', 'AVGO', 'TXN', 'MU'
    ];
    
    const filtered = allStocks.filter(stock => 
      stock.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, 8);
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
