# Stock Price Predictor

A modern, interactive web application for predicting stock prices and analyzing investment opportunities. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📈 Stock Price Predictor
- AI-powered stock price predictions
- Interactive charts with historical data
- Confidence level indicators
- Investment recommendations

### ⚖️ Stock Comparison
- Compare multiple stocks side by side
- Risk assessment and confidence scoring
- Best investment opportunity identification
- Comprehensive comparison table

### 💰 Profit/Loss Calculator
- Calculate potential profits and losses
- Multiple investment scenarios
- Fee impact analysis
- Best and worst performer tracking

### 🎨 User Experience
- Dark/Light mode toggle
- Responsive design for all devices
- Smooth animations and transitions
- Professional yet engaging interface

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Interactive charts
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-price-predictor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting provider.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── StockPredictor.tsx    # Main prediction component
│   ├── StockComparison.tsx   # Stock comparison tool
│   ├── ProfitLossCalculator.tsx # P&L calculator
│   └── StockChart.tsx  # Chart component
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light mode context
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── index.css          # Global styles
```

## Features in Detail

### Stock Prediction
- Enter any stock symbol to get predictions
- Adjustable prediction period (7 days to 1 year)
- Visual charts showing historical data and predictions
- Confidence scoring and trend analysis

### Stock Comparison
- Add multiple stocks for comparison
- Risk level assessment (Low, Medium, High)
- Investment recommendations (Buy, Sell, Hold)
- Best investment opportunity highlighting

### Profit/Loss Calculator
- Calculate returns for buy/sell scenarios
- Account for trading fees
- Track multiple investment scenarios
- Identify best and worst performers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational and demonstration purposes only. Stock predictions are simulated and should not be used as financial advice. Always consult with a qualified financial advisor before making investment decisions.
