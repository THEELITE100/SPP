# Stock Price Predictor

A modern, interactive web application for predicting stock prices and analyzing investment opportunities using real-time market data. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📈 Stock Price Predictor
- **Real-time stock data** from Alpha Vantage API
- AI-powered stock price predictions
- Interactive charts with historical data
- Confidence level indicators
- Investment recommendations
- Live market data (price, volume, high/low, etc.)

### ⚖️ Stock Comparison
- Compare multiple stocks side by side
- Real-time market data for each stock
- Risk assessment and confidence scoring
- Best investment opportunity identification
- Comprehensive comparison table with live updates

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
- Real-time stock search with autocomplete

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Interactive charts
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Alpha Vantage API** - Real-time stock market data

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Alpha Vantage API key (free tier available)

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

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## API Integration

This application uses the **Alpha Vantage API** to fetch real-time stock market data:

- **Real-time quotes** - Current stock prices, changes, volume
- **Historical data** - Daily stock prices for analysis
- **Stock search** - Find stocks by symbol or company name
- **Market data** - Open, high, low, volume, previous close

### API Features Used:
- `GLOBAL_QUOTE` - Real-time stock quotes
- `TIME_SERIES_DAILY` - Historical daily data
- `SYMBOL_SEARCH` - Stock symbol search

## Deployment

### Vercel Deployment (Recommended)

This project is configured for deployment on Vercel with real-time API integration.

#### **Step 1: Prepare Your Repository**
1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Your project is already well-configured with a `vercel.json` file

#### **Step 2: Deploy to Vercel**

**Option A: Deploy via Vercel Dashboard (Recommended)**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"New Project"**
3. Import your Git repository
4. Vercel will automatically detect your project settings

**Option B: Deploy via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

#### **Step 3: Vercel Configuration Settings**

When deploying, use these exact settings:

**Framework Preset:**
- **Framework Preset:** `Create React App`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `build` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

**Build & Output Settings:**
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

**Environment Variables:**
```
REACT_APP_ALPHA_VANTAGE_API_KEY=EAKM3KJQNDGBFJZS
```

**Advanced Settings:**
- **Node.js Version:** `18.x` (recommended)
- **Override:** None needed

#### **Step 4: Your `vercel.json` Configuration**

Your existing `vercel.json` is perfect and includes:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration:
- ✅ Sets the correct build command
- ✅ Specifies the output directory
- ✅ Configures client-side routing (SPA support)
- ✅ Handles all routes properly
- ✅ Supports real-time API calls

#### **Step 5: Environment Variables Setup**

**IMPORTANT:** You must add the environment variable in Vercel:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following environment variable:
   - **Name:** `REACT_APP_ALPHA_VANTAGE_API_KEY`
   - **Value:** `EAKM3KJQNDGBFJZS`
   - **Environment:** Production, Preview, Development (select all)

#### **Step 6: Deployment Process**

1. **Connect Repository:** Vercel will automatically detect your React app
2. **Build Process:** Vercel will run `npm install` then `npm run build`
3. **Deployment:** Your app will be deployed to a unique URL
4. **Custom Domain:** You can add a custom domain later

#### **Step 7: Post-Deployment**

After deployment:
1. **Test the Application:** Verify all features work:
   - Stock Predictor (real-time data)
   - Stock Comparison tool (live market data)
   - Profit/Loss Calculator
   - Dark/Light mode toggle
   - Stock search functionality
2. **Performance:** Vercel automatically optimizes your app
3. **Updates:** Future pushes to your main branch will auto-deploy

### Expected Deployment Time:
- **First deployment:** 2-3 minutes
- **Subsequent updates:** 30-60 seconds

### Troubleshooting Tips:

1. **If build fails:**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is compatible (18.x recommended)
   - Verify environment variables are set correctly

2. **If API calls fail:**
   - Check that `REACT_APP_ALPHA_VANTAGE_API_KEY` is set in Vercel
   - Verify the API key is valid and has sufficient quota
   - Check Alpha Vantage API status

3. **If routing doesn't work:**
   - Your `vercel.json` already handles this with the rewrites rule

4. **If styles don't load:**
   - Tailwind CSS is properly configured and should work out of the box

### Your App Features That Will Work Perfectly:
- ✅ Stock Price Predictor with real-time data
- ✅ Stock Comparison tool with live market data
- ✅ Profit/Loss Calculator
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Smooth animations (Framer Motion)
- ✅ Interactive charts (Recharts)
- ✅ Real-time stock search
- ✅ Live market data display

## API Rate Limits

The Alpha Vantage API has rate limits:
- **Free tier:** 5 API calls per minute, 500 per day
- **Premium tiers:** Higher limits available

The app includes error handling for rate limits and will display appropriate messages to users.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── StockPredictor.tsx    # Main prediction component
│   ├── StockComparison.tsx   # Stock comparison tool
│   ├── ProfitLossCalculator.tsx # P&L calculator
│   └── StockChart.tsx  # Chart component
├── services/           # API services
│   └── stockApi.ts     # Alpha Vantage API integration
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light mode context
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── index.css          # Global styles
```

## Features in Detail

### Stock Prediction
- Enter any stock symbol to get real-time predictions
- Adjustable prediction period (7 days to 1 year)
- Visual charts showing historical data and predictions
- Confidence scoring and trend analysis
- Live market data integration

### Stock Comparison
- Add multiple stocks for comparison
- Real-time data for each stock
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

This application is for educational and demonstration purposes only. Stock predictions are based on historical data analysis and should not be used as financial advice. Always consult with a qualified financial advisor before making investment decisions. Real-time data is provided by Alpha Vantage API.
