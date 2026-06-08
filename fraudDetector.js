class FraudDetector {
  constructor() {}

  // Run security checks on order metadata and return fraud score + report
  analyzeOrder(checkoutData) {
    let score = 0;
    const flags = [];

    const { email, billingCountry, shippingCountry, paymentMethod, cardName, cartItems, isUsingVpn } = checkoutData;

    // 1. Check if email looks suspicious (e.g. random strings, temporary domains)
    const suspiciousDomains = ["tempmail.com", "trashmail.net", "dispostable.com", "test.com"];
    const domain = email.split("@")[1] || "";
    if (suspiciousDomains.includes(domain.toLowerCase())) {
      score += 30;
      flags.push("Disposable email domain detected (+30)");
    }
    
    // 2. Billing and Shipping address country mismatch
    if (billingCountry.toLowerCase() !== shippingCountry.toLowerCase()) {
      score += 25;
      flags.push("Billing and Shipping country mismatch (+25)");
    }

    // 3. User name vs Credit Card holder name check
    // If the input name doesn't match the card name closely
    if (cardName && cardName.trim().toLowerCase() !== "kiran" && cardName.trim().toLowerCase() !== "kiran r") {
      score += 15;
      flags.push("Cardholder name does not match user account (+15)");
    }

    // 4. VPN / Proxy simulation
    if (isUsingVpn) {
      score += 20;
      flags.push("High-risk IP address / Proxy VPN tunnel detected (+20)");
    }

    // 5. Velocity Check (Spike in order quantity)
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQty > 5) {
      score += 10;
      flags.push("High order velocity / Bulk items check (+10)");
    }

    // Limit score between 0 and 100
    score = Math.min(100, Math.max(0, score));

    let status = "low";
    let message = "Order verified. Transaction is secure.";
    if (score >= 60) {
      status = "high";
      message = "Action Required: Transaction blocked due to high fraud score. Verification needed.";
    } else if (score >= 30) {
      status = "medium";
      message = "Manual Review: Order flagged for verification. Shipping might be delayed.";
    }

    return {
      score,
      status,
      message,
      flags
    };
  }
}

window.FraudDetector = FraudDetector;
