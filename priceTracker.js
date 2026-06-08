class PriceTracker {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
  }

  render(priceHistory, basePrice) {
    if (!priceHistory || priceHistory.length === 0) {
      this.container.innerHTML = "<p class='error-msg'>No price history available for this item.</p>";
      return;
    }

    // Extract values
    const prices = priceHistory.map(h => h.price);
    const labels = priceHistory.map(h => h.date);
    
    // Fit simple linear regression: y = m*x + c
    // x values are 0, 1, 2, ... N-1
    const n = prices.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += prices[i];
      sumXY += i * prices[i];
      sumXX += i * i;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Predict next month (x = n)
    const predictedPrice = Math.max(1.0, (slope * n + intercept)).toFixed(2);
    const isDropping = slope < 0;
    
    // Calculate SVG dimensions
    const width = 500;
    const height = 220;
    const padding = 40;
    
    const minP = Math.min(...prices, predictedPrice) * 0.95;
    const maxP = Math.max(...prices, predictedPrice) * 1.05;
    const priceRange = maxP - minP;

    const getX = (index) => padding + (index * (width - 2 * padding) / n);
    const getY = (price) => height - padding - ((price - minP) * (height - 2 * padding) / priceRange);

    // Build the SVG path
    let pathD = `M ${getX(0)} ${getY(prices[0])}`;
    for (let i = 1; i < n; i++) {
      pathD += ` L ${getX(i)} ${getY(prices[i])}`;
    }
    
    // Prediction extension (dashed path)
    const predX = getX(n);
    const predY = getY(predictedPrice);
    const predPathD = `M ${getX(n-1)} ${getY(prices[n-1])} L ${predX} ${predY}`;

    // SVG elements setup
    let svgContent = `
      <svg viewBox="0 0 ${width} ${height}" class="price-svg">
        <!-- Grids -->
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="chart-axis" />
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="chart-axis" />
        
        <!-- Y-Axis Ticks -->
        <text x="${padding - 8}" y="${getY(maxP)}" class="axis-text axis-y-text" text-anchor="end">$${maxP.toFixed(0)}</text>
        <text x="${padding - 8}" y="${getY((maxP + minP) / 2)}" class="axis-text axis-y-text" text-anchor="end">$${((maxP + minP) / 2).toFixed(0)}</text>
        <text x="${padding - 8}" y="${getY(minP)}" class="axis-text axis-y-text" text-anchor="end">$${minP.toFixed(0)}</text>
        
        <!-- X-Axis Labels -->
        ${labels.map((lbl, idx) => `
          <text x="${getX(idx)}" y="${height - padding + 18}" class="axis-text" text-anchor="middle">${lbl.split(' ')[0]}</text>
          <circle cx="${getX(idx)}" cy="${getY(prices[idx])}" r="4" class="chart-point" />
        `).join("")}
        
        <!-- Prediction X-Label -->
        <text x="${predX}" y="${height - padding + 18}" class="axis-text prediction-label" text-anchor="middle">Jul '26 (Est)</text>
        <circle cx="${predX}" cy="${predY}" r="5" class="chart-point prediction-point" />
        
        <!-- Line Paths -->
        <path d="${pathD}" fill="none" stroke="var(--primary-color)" stroke-width="3" class="chart-line" />
        <path d="${predPathD}" fill="none" stroke="var(--accent-color)" stroke-width="3" stroke-dasharray="4,4" class="chart-line-pred" />
      </svg>
    `;

    // Advice text
    let adviceClass = isDropping ? "advice-buy" : "advice-wait";
    let adviceHeader = isDropping ? "🔥 Price Drop Alert!" : "📈 Price Rising Soon!";
    let adviceDesc = isDropping 
      ? `AI Predicts price will drop to <strong>$${predictedPrice}</strong> next month. Great time to buy or wait another 2 weeks!`
      : `AI Predicts price will rise to <strong>$${predictedPrice}</strong> next month. We recommend buying now before the hike!`;

    this.container.innerHTML = `
      <div class="price-tracker-card">
        <div class="price-chart-header">
          <span class="price-badge">Real-Time Tracker</span>
          <span class="pred-price">Predicted: $${predictedPrice}</span>
        </div>
        <div class="price-chart-body">
          ${svgContent}
        </div>
        <div class="price-advice-box ${adviceClass}">
          <div class="advice-title">${adviceHeader}</div>
          <div class="advice-desc">${adviceDesc}</div>
        </div>
      </div>
    `;
  }
}

window.PriceTracker = PriceTracker;
