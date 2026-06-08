class ShoppingChatbot {
  constructor() {
    this.name = "Aura";
    this.messages = [];
    this.initGreeting();
  }

  initGreeting() {
    this.messages.push({
      sender: "bot",
      text: "Hi Kiran, how are you? I am Aura, your smart AI Shopping Assistant! 🌟 I can guide you through our product catalog, analyze customer sentiment, recommend personalized offers, track price histories, or walk you through our secure checkout. What are you looking for today?",
      timestamp: new Date()
    });
  }

  // Processes user queries and generates rich responses
  respond(userInput) {
    const input = userInput.toLowerCase().trim();
    let reply = "";
    let data = null;

    // Helper functions for matching
    const contains = (words) => words.some(w => input.includes(w));

    if (contains(["hi", "hello", "hey", "greetings"])) {
      reply = "Hello Kiran! I hope you're having a wonderful day. How can I assist you with your shopping today?";
    } else if (contains(["how are you", "how's it going"])) {
      reply = "I'm running optimally and thrilled to help you shop! How are you doing today, Kiran?";
    } else if (contains(["recommend", "suggest", "popular", "best"])) {
      const items = window.productsData.slice(0, 3);
      const format = (p) => window.formatPrice ? window.formatPrice(p) : `$${p.toFixed(2)}`;
      reply = "Based on trending purchases, here are my top recommendations for you:<br><br>" + 
              items.map(p => `• <strong>${p.name}</strong> (${p.category}) - ${format(p.price)}`).join("<br>") + 
              "<br><br>Would you like me to add any of these to your cart?";
      data = { action: "recommend", products: items };
    } else if (contains(["chair", "ergonomic", "aeroglow"])) {
      const p = window.productsData.find(x => x.id === "p1");
      const format = window.formatPrice ? window.formatPrice(p.price) : `$${p.price.toFixed(2)}`;
      reply = `The <strong>${p.name}</strong> is currently priced at ${format}. It features smart posture tracking and dynamic lumbar support. We only have ${p.stock} left in stock! You can also view it in your room using our **AR Preview** button.`;
      data = { action: "show_product", id: "p1" };
    } else if (contains(["headphone", "audio", "sonicpro", "sound"])) {
      const p = window.productsData.find(x => x.id === "p2");
      const format = window.formatPrice ? window.formatPrice(p.price) : `$${p.price.toFixed(2)}`;
      reply = `The <strong>${p.name}</strong> costs ${format}. It has 40dB Hybrid Active Noise Cancellation and 40 hours of battery life. Reviewers rate it a stellar ${p.rating}/5.`;
      data = { action: "show_product", id: "p2" };
    } else if (contains(["shoes", "run", "velostride"])) {
      const p = window.productsData.find(x => x.id === "p3");
      const format = window.formatPrice ? window.formatPrice(p.price) : `$${p.price.toFixed(2)}`;
      reply = `The <strong>${p.name}</strong> is on sale for ${format}. Built with a carbon-fiber plate and nitrogen-infused energy foam for runners.`;
      data = { action: "show_product", id: "p3" };
    } else if (contains(["jumka", "jhumka", "earring", "jewelry", "jewellery"])) {
      const items = window.productsData.filter(x => x.name.toLowerCase().includes("jhumka"));
      const format = (p) => window.formatPrice ? window.formatPrice(p) : `$${p.toFixed(2)}`;
      reply = `We feature three exquisite handcrafted Jhumka designs:<br><br>` +
              items.map(p => `• <strong>${p.name}</strong> - ${format(p.price)} (${p.stock} in stock)`).join("<br>") +
              `<br><br>Would you like me to filter the store catalog for these?`;
      data = { action: "search_filter", query: "jhumkas" };


    } else if (contains(["discount", "offer", "coupon", "promo", "cheap"])) {
      reply = "Aha! For being a valued customer, I have generated a personalized code just for you: **KIRAN20** for **20% off** your entire order. Apply it at checkout! 🎟️";
      data = { action: "apply_coupon", coupon: "KIRAN20" };
    } else if (contains(["price tracker", "price history", "predict"])) {
      reply = "Our Smart Price Tracker simulates future prices using linear regression. Select any product and view the 'Price History & Smart Prediction' section to see when it will reach its lowest cost!";
    } else if (contains(["ar", "augmented reality", "preview"])) {
      reply = "To see products in your home, click the **AR Product Preview** button on any furniture or electronic item. It will open your camera to overlay the 3D product model!";
    } else if (contains(["fraud", "security", "secure"])) {
      reply = "We secure all transactions with our AI-powered Fraud Detection System. It checks billing matches and velocity limits to protect your payments in real-time.";
    } else if (contains(["search", "find"])) {
      // Basic search keyword extraction
      const keywords = input.replace("search", "").replace("find", "").trim();
      const results = window.productsData.filter(p => p.name.toLowerCase().includes(keywords) || p.description.toLowerCase().includes(keywords));
      if (results.length > 0) {
        reply = `I found ${results.length} matches for "${keywords}":<br><br>` +
                results.map(p => `• <strong>${p.name}</strong> - $${p.price}`).join("<br>");
        data = { action: "search_filter", query: keywords };
      } else {
        reply = `I couldn't find any products matching "${keywords}". Try searching for 'chair', 'headphones', or 'shoes'!`;
      }
    } else if (contains(["cart", "checkout", "buy"])) {
      reply = "You can click on the shopping cart icon at the top right to view your cart items, select shipping options, and verify the checkout security score!";
      data = { action: "open_cart" };
    } else {
      reply = "I'm not sure I fully understood. I can help you find products, check stock, apply discounts (try asking for a discount!), compare specs, or simulate AR previews. What would you like to do?";
    }

    const botMessage = {
      sender: "bot",
      text: reply,
      timestamp: new Date(),
      data: data
    };
    
    this.messages.push({ sender: "user", text: userInput, timestamp: new Date() });
    this.messages.push(botMessage);
    
    return botMessage;
  }
}

window.ShoppingChatbot = ShoppingChatbot;
