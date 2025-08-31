# Market Analytics Pro

A professional investment analysis platform for portfolio management and market research. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📊 Market Analysis
- Advanced technical analysis and predictive modeling
- Interactive charts with historical data visualization
- Confidence level indicators and trend analysis
- Professional investment recommendations
- Comprehensive market data display

### ⚖️ Portfolio Analysis
- Compare multiple securities side by side
- Risk assessment and confidence scoring
- Best investment opportunity identification
- Comprehensive portfolio analysis table
- Professional risk profiling

### 💰 Risk Assessment
- Calculate potential profits and losses
- Multiple investment scenarios
- Fee impact analysis
- Best and worst performer tracking
- Professional risk management tools

### 🎨 Professional Interface
- Dark/Light mode toggle
- Responsive design for all devices
- Smooth animations and transitions
- Professional yet engaging interface
- Advanced security symbol search

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Interactive charts
- **Lucide React** - Professional icons

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd market-analytics-pro
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

## Professional Features

This application provides comprehensive investment analysis tools:

- **Technical Analysis** - Advanced algorithms for market trend analysis
- **Portfolio Management** - Professional portfolio comparison and analysis
- **Risk Assessment** - Sophisticated risk modeling and assessment
- **Market Data** - Comprehensive market metrics and indicators
- **Investment Recommendations** - Professional buy/sell/hold recommendations

## Deployment

### Vercel Deployment (Recommended)

This project is configured for deployment on Vercel with professional-grade features.

#### **Step 1: Prepare Your Repository**
1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Your project is already well-configured with a `vercel.json` file

#### **Step 2: Deploy to Vercel**

**Option A: Deploy via Vercel Dashboard (Recommended)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub/GitLab/Bitbucket account
3. Click **"New Project"**
4. Import your repository
5. Vercel will auto-detect settings

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
- ✅ Supports professional features

#### **Step 5: Deployment Process**

1. **Connect Repository:** Vercel will automatically detect your React app
2. **Build Process:** Vercel will run `npm install` then `npm run build`
3. **Deployment:** Your app will be deployed to a unique URL
4. **Custom Domain:** You can add a custom domain later

#### **Step 6: Post-Deployment**

After deployment:
1. **Test the Application:** Verify all features work:
   - Market Analysis (technical analysis)
   - Portfolio Analysis (comparison tools)
   - Risk Assessment (calculator)
   - Dark/Light mode toggle
   - Security search functionality
2. **Performance:** Vercel automatically optimizes your app
3. **Updates:** Future pushes to your main branch will auto-deploy

### Expected Deployment Time:
- **First deployment:** 2-3 minutes
- **Subsequent updates:** 30-60 seconds

### Troubleshooting Tips:

1. **If build fails:**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is compatible (18.x recommended)

2. **If routing doesn't work:**
   - Your `vercel.json` already handles this with the rewrites rule

3. **If styles don't load:**
   - Tailwind CSS is properly configured and should work out of the box

### Your App Features That Will Work Perfectly:
- ✅ Market Analysis with technical indicators
- ✅ Portfolio Analysis with comparison tools
- ✅ Risk Assessment calculator
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Smooth animations (Framer Motion)
- ✅ Interactive charts (Recharts)
- ✅ Professional security search
- ✅ Comprehensive market data display

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── StockPredictor.tsx    # Market analysis component
│   ├── StockComparison.tsx   # Portfolio analysis tool
│   ├── ProfitLossCalculator.tsx # Risk assessment calculator
│   └── StockChart.tsx  # Chart component
├── services/           # Data services
│   └── stockApi.ts     # Market data service
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light mode context
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── index.css          # Global styles
```

## Features in Detail

### Market Analysis
- Enter any security symbol to get comprehensive analysis
- Adjustable analysis period (7 days to 1 year)
- Visual charts showing historical data and forecasts
- Confidence scoring and trend analysis
- Professional technical indicators

### Portfolio Analysis
- Add multiple securities for comparison
- Professional risk level assessment (Low, Medium, High)
- Investment recommendations (Buy, Sell, Hold)
- Best investment opportunity highlighting
- Comprehensive market metrics

### Risk Assessment
- Calculate returns for buy/sell scenarios
- Account for trading fees and costs
- Track multiple investment scenarios
- Identify best and worst performers
- Professional risk modeling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational and demonstration purposes only. Market analysis and predictions are based on technical indicators and should not be used as financial advice. Always consult with a qualified financial advisor before making investment decisions.
