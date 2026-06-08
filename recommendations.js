class RecommendationEngine {
  constructor() {
    this.storageKeyViews = "aura_recent_views";
    this.storageKeyCart = "aura_cart";
  }

  // Record a product view to localStorage
  trackView(productId) {
    let views = this.getRecentViews();
    // Remove if exists, then prepend to have it first
    views = views.filter(id => id !== productId);
    views.unshift(productId);
    // Keep last 10 views
    if (views.length > 10) views.pop();
    localStorage.setItem(this.storageKeyViews, JSON.stringify(views));
  }

  getRecentViews() {
    try {
      const data = localStorage.getItem(this.storageKeyViews);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Get similar products based on category
  getSimilarProducts(product, limit = 3) {
    if (!product) return [];
    
    return window.productsData
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, limit);
  }

  // Compute personalized recommendations based on view frequencies and cart additions
  getPersonalizedRecommendations(limit = 4) {
    const views = this.getRecentViews();
    
    // Fallback if no views yet: return top-rated items
    if (views.length === 0) {
      return [...window.productsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    }

    // Count category weights from recently viewed products
    const categoryWeights = {};
    views.forEach(id => {
      const p = window.productsData.find(x => x.id === id);
      if (p) {
        categoryWeights[p.category] = (categoryWeights[p.category] || 0) + 1;
      }
    });

    // Score all products based on their category weights, excluding recently viewed items if possible
    const scoredProducts = window.productsData.map(p => {
      let score = categoryWeights[p.category] || 0;
      // Add small bonus for higher rating
      score += p.rating * 0.1;
      // Small penalty if already recently viewed (to encourage exploration)
      if (views.includes(p.id)) {
        score -= 0.5;
      }
      return { product: p, score: score };
    });

    // Sort by score and return products
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, limit);
  }
}

window.RecommendationEngine = RecommendationEngine;
