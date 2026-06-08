/* ==========================================================================
   Aura Storefront Application Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Global price formatting helper (USD and Rs. dual display)
  window.formatPrice = function(usdPrice) {
    const inrPrice = Math.round(usdPrice * 83);
    return `$${usdPrice.toFixed(2)} (₹${inrPrice.toLocaleString("en-IN")})`;
  };

  // State variables
  let cart = JSON.parse(localStorage.getItem("aura_cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("aura_wishlist")) || [];
  let currentProduct = null;
  let activeCategory = "all";
  let searchPhrase = "";
  let couponCode = localStorage.getItem("aura_coupon") || "";
  let comparisonList = [];
  let rewardsPoints = parseInt(localStorage.getItem("aura_rewards_points")) || 12450;
  let isSpinning = false;
  let currentSpinAngle = 0;

  // Instantiate Modules
  const chatbot = new ShoppingChatbot();
  const recommender = new RecommendationEngine();
  const arViewer = new ARViewer("ar-viewport-container");
  const fraudDetector = new FraudDetector();
  const visualSearchEngine = new VisualSearch();

  // Core UI Elements
  const productGrid = document.getElementById("main-product-grid");
  const searchInput = document.getElementById("store-search");
  const voiceSearchTrigger = document.getElementById("voice-search-trigger");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const wishlistBadge = document.getElementById("wishlist-badge-count");
  const cartBadge = document.getElementById("cart-badge-count");

  // Cart Drawer Elements
  const cartDrawer = document.getElementById("cart-drawer-panel");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartDiscountEl = document.getElementById("cart-discount");
  const cartTotalEl = document.getElementById("cart-total");
  const couponInput = document.getElementById("coupon-code-input");
  const applyCouponBtn = document.getElementById("apply-coupon-btn");

  // Details Modal Elements
  const detailsModalOverlay = document.getElementById("details-modal-overlay");
  const closeDetailsBtn = document.getElementById("close-details-btn");
  const detailMainImg = document.getElementById("detail-main-img");
  const detailThumbGrid = document.getElementById("detail-thumbnails-grid");
  const detailTitle = document.getElementById("detail-title");
  const detailCategory = document.getElementById("detail-category");
  const detailStarsRow = document.getElementById("detail-stars-row");
  const detailStockPill = document.getElementById("detail-stock-pill");
  const detailPrice = document.getElementById("detail-price");
  const detailDesc = document.getElementById("detail-desc");
  const qtyMinusBtn = document.getElementById("qty-minus");
  const qtyPlusBtn = document.getElementById("qty-plus");
  const qtyDisplay = document.getElementById("qty-display");
  const detailAddCartBtn = document.getElementById("detail-add-cart-btn");
  const detailCompareBtn = document.getElementById("detail-compare-btn");
  const detailArBtn = document.getElementById("detail-ar-btn");
  const specsTable = document.getElementById("detail-specs-table");
  const featuresList = document.getElementById("detail-features-list");
  const detailSimilarDeck = document.getElementById("detail-similar-deck");

  // AR & Visual Search Overlay Modals
  const arModalOverlay = document.getElementById("ar-modal-overlay");
  const closeArBtn = document.getElementById("close-ar-btn");
  const vsModalOverlay = document.getElementById("vs-modal-overlay");
  const vsBtn = document.getElementById("visual-search-btn");
  const closeVsBtn = document.getElementById("close-vs-btn");
  const vsDropZone = document.getElementById("vs-drop-zone");
  const vsFileInput = document.getElementById("vs-file-input");
  const vsPreviewBox = document.getElementById("vs-preview-box");
  const vsImgEl = document.getElementById("vs-img-el");
  const vsScannerLine = document.getElementById("vs-scanner-line");
  const vsResultsBox = document.getElementById("vs-results-box");
  const vsMatchesTag = document.getElementById("vs-matches-tag");
  const vsMatchesGrid = document.getElementById("vs-matches-grid");

  // Checkout Elements
  const checkEmail = document.getElementById("checkout-email");
  const checkCard = document.getElementById("checkout-card");
  const checkCardName = document.getElementById("checkout-card-name");
  const checkShipping = document.getElementById("checkout-shipping");
  const checkBilling = document.getElementById("checkout-billing");
  const checkVpn = document.getElementById("checkout-vpn");
  const fraudScorePercent = document.getElementById("fraud-score-percent");
  const fraudScoreFill = document.getElementById("fraud-score-fill");
  const fraudAdvisorMsg = document.getElementById("fraud-advisor-msg");
  const placeOrderBtn = document.getElementById("place-order-btn");

  // Comparison Drawer
  const compareDrawer = document.getElementById("compare-drawer-panel");
  const compareGridSlots = document.getElementById("compare-grid-slots");
  const closeCompareBtn = document.getElementById("close-compare-btn");

  // Chatbot Elements
  const chatBubble = document.getElementById("chat-bubble");
  const chatWindow = document.getElementById("chat-window-panel");
  const closeChatBtn = document.getElementById("close-chat-window-btn");
  const chatMessagesContainer = document.getElementById("chat-messages-container");
  const chatInputForm = document.getElementById("chat-input-form");
  const chatUserInput = document.getElementById("chat-user-input");
  const chatVoiceTrigger = document.getElementById("chat-voice-trigger");

  /* ==========================================================================
     Initialize Storefront & Themes
     ========================================================================== */
  function init() {
    // Check theme preference
    const savedTheme = localStorage.getItem("aura_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Update badge values
    updateBadges();
    
    // Render product listing
    renderStoreGrid();

    // Set loyalty rewards balance display
    document.getElementById("rewards-points-display").textContent = rewardsPoints.toLocaleString();

    // Setup Category Tabs
    document.querySelectorAll(".cat-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.category;
        renderStoreGrid();
      });
    });

    // Setup Text Search
    searchInput.addEventListener("input", (e) => {
      searchPhrase = e.target.value.toLowerCase().trim();
      renderStoreGrid();
    });

    // Personalized Offers Banner Action
    document.getElementById("hero-offer-btn").addEventListener("click", () => {
      openChatWindow();
      // Directly invoke respond and show message
      const reply = chatbot.respond("Are there any active discounts?");
      renderChatMessages();
    });

    // Accordions Toggle listeners
    setupAccordion("blockchain-acc-btn", "blockchain-acc-content");
    setupAccordion("specs-acc-btn", "specs-acc-content");
    setupAccordion("features-acc-btn", "features-acc-content");

    // Blockchain Audit listener
    const auditBtn = document.getElementById("run-blockchain-audit-btn");
    auditBtn.addEventListener("click", () => {
      auditBtn.disabled = true;
      auditBtn.style.opacity = "0.7";
      auditBtn.textContent = "Initiating Ledger audit... ⌛";
      setTimeout(() => {
        auditBtn.textContent = "Querying distributed nodes (12/12)... ⌛";
        setTimeout(() => {
          auditBtn.textContent = "Verifying cryptographic consensus signature... ⌛";
          setTimeout(() => {
            auditBtn.textContent = "✅ Chain Audit Success: Verified Authentic";
          }, 1000);
        }, 1000);
      }, 1000);
    });

    // Spin Promo Wheel Listeners
    const spinModal = document.getElementById("spin-modal-overlay");
    document.getElementById("spin-wheel-trigger-btn").addEventListener("click", () => {
      spinModal.classList.add("active");
      drawPromoWheel();
      document.getElementById("spin-result-msg").textContent = "";
    });
    document.getElementById("close-spin-btn").addEventListener("click", () => {
      spinModal.classList.remove("active");
    });
    document.getElementById("spin-wheel-action-btn").addEventListener("click", () => {
      triggerSpinPromoWheel();
    });
  }

  function setupAccordion(btnId, contentId) {
    const btn = document.getElementById(btnId);
    const content = document.getElementById(contentId);
    btn.addEventListener("click", () => {
      const active = content.classList.toggle("active");
      btn.querySelector(".acc-chevron").textContent = active ? "➖" : "➕";
    });
  }

  /* ==========================================================================
     Theme Switching
     ========================================================================== */
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("aura_theme", nextTheme);
  });

  /* ==========================================================================
     Voice Search Integration (Speech Recognition)
     ========================================================================== */
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    voiceSearchTrigger.addEventListener("click", () => {
      if (voiceSearchTrigger.classList.contains("listening")) {
        recognition.stop();
      } else {
        voiceSearchTrigger.classList.add("listening");
        recognition.start();
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const lower = transcript.toLowerCase();
      
      // Voice Shopping trigger: "add [item] to cart"
      if (lower.includes("add") && (lower.includes("cart") || lower.includes("buy"))) {
        handleVoiceShoppingAction(lower);
      } else {
        searchInput.value = transcript;
        searchPhrase = lower.trim();
        renderStoreGrid();
      }
    };

    recognition.onend = () => {
      voiceSearchTrigger.classList.remove("listening");
    };

    recognition.onerror = (e) => {
      console.error("Voice recognition error", e);
      voiceSearchTrigger.classList.remove("listening");
    };
  } else {
    // Mock simulation if voice API not supported
    voiceSearchTrigger.addEventListener("click", () => {
      voiceSearchTrigger.classList.add("listening");
      setTimeout(() => {
        voiceSearchTrigger.classList.remove("listening");
        const terms = ["chair", "headphones", "running shoes"];
        const randTerm = terms[Math.floor(Math.random() * terms.length)];
        searchInput.value = randTerm;
        searchPhrase = randTerm;
        renderStoreGrid();
      }, 1500);
    });
  }

  /* ==========================================================================
     Render Storefront Catalog
     ========================================================================== */
  function renderStoreGrid() {
    productGrid.innerHTML = "";
    
    const filtered = window.productsData.filter(p => {
      const catMatch = activeCategory === "all" || p.category === activeCategory;
      const textMatch = p.name.toLowerCase().includes(searchPhrase) || 
                          p.description.toLowerCase().includes(searchPhrase);
      return catMatch && textMatch;
    });

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 50px 0; color: var(--text-secondary);">
          <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
          <h3>No products match your filters</h3>
          <p>Try clearing your search term or selecting another category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const isWish = wishlist.includes(p.id);
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="card-img-wrapper" onclick="openDetails('${p.id}')">
          <span class="card-badge">${p.stock <= 5 ? 'Low Stock' : 'In Stock'}</span>
          <button class="card-wishlist ${isWish ? 'active' : ''}" data-id="${p.id}">❤️</button>
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="card-body" onclick="openDetails('${p.id}')">
          <span class="card-category">${p.category}</span>
          <h3 class="card-title">${p.name}</h3>
          <div class="card-rating">
            <span class="star-rating">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5 - Math.round(p.rating))}</span>
            <span>(${p.rating})</span>
          </div>
          <div class="card-footer">
            <span class="card-price">${window.formatPrice(p.price)}</span>
            <button class="card-add-btn" data-id="${p.id}">+</button>
          </div>
        </div>
      `;

      // Event listener for wishlist
      card.querySelector(".card-wishlist").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(p.id, e.target);
      });

      // Event listener for Add to Cart
      card.querySelector(".card-add-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(p.id, 1);
        e.target.innerHTML = "✓";
        e.target.style.background = "var(--success)";
        e.target.style.color = "white";
        setTimeout(() => {
          e.target.innerHTML = "+";
          e.target.style.background = "var(--primary-glow)";
          e.target.style.color = "var(--primary-color)";
        }, 1500);
      });

      productGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     Wishlist & Cart State Handlers
     ========================================================================== */
  function toggleWishlist(id, btnEl) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      btnEl.classList.remove("active");
    } else {
      wishlist.push(id);
      btnEl.classList.add("active");
      // Pulse animation trigger
      btnEl.style.animation = 'none';
      btnEl.offsetHeight; // Trigger reflow
      btnEl.style.animation = 'pop-bounce 0.3s ease';
    }
    localStorage.setItem("aura_wishlist", JSON.stringify(wishlist));
    updateBadges();
  }

  function addToCart(id, qty) {
    const existing = cart.find(item => item.id === id);
    const prod = window.productsData.find(x => x.id === id);
    
    if (existing) {
      existing.quantity = Math.min(prod.stock, existing.quantity + qty);
    } else {
      cart.push({ id, quantity: qty });
    }
    
    localStorage.setItem("aura_cart", JSON.stringify(cart));
    updateBadges();
    renderCart();
  }

  function updateBadges() {
    wishlistBadge.textContent = wishlist.length;
    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  /* ==========================================================================
     Product Detail Page Display Setup
     ========================================================================== */
  window.openDetails = function(id) {
    const p = window.productsData.find(x => x.id === id);
    if (!p) return;
    currentProduct = p;
    recommender.trackView(p.id);

    // Dynamic Pricing Engine view counter
    let viewCounts = JSON.parse(localStorage.getItem("aura_view_counts")) || {};
    viewCounts[id] = (viewCounts[id] || 0) + 1;
    localStorage.setItem("aura_view_counts", JSON.stringify(viewCounts));

    const isDynamicPrice = viewCounts[id] >= 3;
    const currentPrice = isDynamicPrice ? p.price * 1.02 : p.price;
    p.currentDynamicPrice = currentPrice;

    // Reset Quantity count
    qtyDisplay.textContent = "1";

    // Set Text Values
    detailTitle.textContent = p.name;
    detailCategory.textContent = p.category.toUpperCase();
    detailDesc.textContent = p.description;

    const dynamicTag = document.getElementById("detail-dynamic-price-tag");
    if (isDynamicPrice) {
      dynamicTag.classList.remove("hidden");
      detailPrice.textContent = window.formatPrice(currentPrice);
    } else {
      dynamicTag.classList.add("hidden");
      detailPrice.textContent = window.formatPrice(p.price);
    }

    // Set Stock Badge status
    detailStockPill.className = "inventory-pill";
    if (p.stock === 0) {
      detailStockPill.textContent = "Out of Stock";
      detailStockPill.classList.add("stock-out");
    } else if (p.stock <= 5) {
      detailStockPill.textContent = `Low Stock! Only ${p.stock} units left`;
      detailStockPill.classList.add("stock-low");
    } else {
      detailStockPill.textContent = `In Stock (${p.stock} units)`;
      detailStockPill.classList.add("stock-in");
    }

    // Set Stars Row
    detailStarsRow.innerHTML = `
      <span class="star-rating">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5 - Math.round(p.rating))}</span>
      <span>${p.rating} / 5</span>
    `;

    // Render Gallery Images
    detailMainImg.src = p.images[0];
    detailThumbGrid.innerHTML = "";
    p.images.forEach((img, idx) => {
      const thumb = document.createElement("div");
      thumb.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${img}" alt="Thumbnail">`;
      thumb.addEventListener("click", () => {
        document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        detailMainImg.src = img;
      });
      detailThumbGrid.appendChild(thumb);
    });

    // Image Zoom interaction on hover
    const zoomContainer = document.getElementById("gallery-zoom-container");
    zoomContainer.addEventListener("mousemove", (e) => {
      const rect = zoomContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      detailMainImg.style.transformOrigin = `${x}% ${y}%`;
      detailMainImg.style.transform = "scale(1.5)";
    });

    zoomContainer.addEventListener("mouseleave", () => {
      detailMainImg.style.transform = "scale(1)";
      detailMainImg.style.transformOrigin = "center center";
    });

    // Fill specifications accordion table
    specsTable.innerHTML = "";
    for (const [key, value] of Object.entries(p.specifications)) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${key}</td><td>${value}</td>`;
      specsTable.appendChild(tr);
    }

    // Fill features bullet list
    featuresList.innerHTML = "";
    p.features.forEach(feat => {
      const li = document.createElement("li");
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Set Blockchain ledger fields
    document.getElementById("ledger-block-height").textContent = p.blockchainDetails.blockHeight;
    document.getElementById("ledger-block-hash").textContent = p.blockchainDetails.hash;
    document.getElementById("ledger-origin").textContent = p.blockchainDetails.origin;
    const auditBtn = document.getElementById("run-blockchain-audit-btn");
    auditBtn.disabled = false;
    auditBtn.style.opacity = "1";
    auditBtn.textContent = "Run Cryptographic Audit";

    // Set AI Summarized Pros & Cons lists
    const prosList = document.getElementById("ai-pros-list");
    const consList = document.getElementById("ai-cons-list");
    prosList.innerHTML = "";
    consList.innerHTML = "";
    p.aiReviewSummary.pros.forEach(pro => {
      const li = document.createElement("li");
      li.textContent = pro;
      prosList.appendChild(li);
    });
    p.aiReviewSummary.cons.forEach(con => {
      const li = document.createElement("li");
      li.textContent = con;
      consList.appendChild(li);
    });

    // Render Price Prediction Chart
    const priceTracker = new PriceTracker("detail-price-tracker-container");
    priceTracker.render(p.priceHistory, currentPrice);

    // Render Similar Products deck
    renderSimilarProducts(p);

    // AI Review Analysis & Verification scores list
    renderReviewsSection(p);

    // Open Modal window
    detailsModalOverlay.classList.add("active");
  };

  closeDetailsBtn.addEventListener("click", () => {
    detailsModalOverlay.classList.remove("active");
  });

  // Quantity Add/Sub controls in details modal
  qtyMinusBtn.addEventListener("click", () => {
    let q = parseInt(qtyDisplay.textContent);
    if (q > 1) qtyDisplay.textContent = q - 1;
  });

  qtyPlusBtn.addEventListener("click", () => {
    let q = parseInt(qtyDisplay.textContent);
    if (currentProduct && q < currentProduct.stock) {
      qtyDisplay.textContent = q + 1;
    }
  });

  // Action Buttons inside detail modal
  detailAddCartBtn.addEventListener("click", () => {
    if (currentProduct) {
      const q = parseInt(qtyDisplay.textContent);
      addToCart(currentProduct.id, q);
      detailAddCartBtn.textContent = "✓ Added to Cart";
      detailAddCartBtn.style.background = "var(--success)";
      setTimeout(() => {
        detailAddCartBtn.textContent = "🛒 Add to Cart";
        detailAddCartBtn.style.background = "var(--primary-color)";
      }, 1500);
    }
  });

  detailCompareBtn.addEventListener("click", () => {
    if (currentProduct) {
      addToCompareShelf(currentProduct);
    }
  });

  detailArBtn.addEventListener("click", () => {
    if (currentProduct) {
      arModalOverlay.classList.add("active");
      arViewer.start(currentProduct.images[0]);
    }
  });

  closeArBtn.addEventListener("click", () => {
    arModalOverlay.classList.remove("active");
    arViewer.stop();
  });

  /* ==========================================================================
     Similar Recommendations Shelf
     ========================================================================== */
  function renderSimilarProducts(product) {
    detailSimilarDeck.innerHTML = "";
    const similar = recommender.getSimilarProducts(product, 3);
    
    similar.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <div class="card-img-wrapper" onclick="openDetails('${p.id}')">
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="card-body" onclick="openDetails('${p.id}')">
          <span class="card-category">${p.category}</span>
          <h3 class="card-title">${p.name}</h3>
          <div class="card-footer" style="padding-top:8px;">
            <span class="card-price">${window.formatPrice(p.price)}</span>
          </div>
        </div>
      `;
      detailSimilarDeck.appendChild(div);
    });
  }

  /* ==========================================================================
     Reviews Verification Display
     ========================================================================== */
  function renderReviewsSection(product) {
    const listContainer = document.getElementById("reviews-list-container");
    listContainer.innerHTML = "";
    
    const verifiedReviews = product.reviews.filter(r => r.verified);
    const scoreVal = verifiedReviews.length / product.reviews.length;
    
    // Set Header status
    document.getElementById("review-summary-ver").textContent = 
      `${(scoreVal * 100).toFixed(0)}% AI Verified Reviews`;

    // Compute sentiment averages
    let posCount = 0;
    product.reviews.forEach(r => {
      if (r.sentiment === "Positive") posCount++;
    });
    const posPercent = (posCount / product.reviews.length) * 100;
    
    document.getElementById("sent-bar-pos").style.width = `${posPercent}%`;
    document.getElementById("sent-bar-neg").style.width = `${100 - posPercent}%`;

    // Render review cards
    product.reviews.forEach(rev => {
      const card = document.createElement("div");
      card.className = "rev-card";
      
      const verifiedTag = rev.verified 
        ? `<span class="rev-badge rev-badge-verified">🛡️ AI Verified (${rev.aiVerifiedScore}%)</span>` 
        : `<span class="rev-badge rev-badge-unverified">⚠️ Spam Mismatch (${rev.aiVerifiedScore}%)</span>`;

      const sentimentTag = `<span class="rev-sentiment-tag ${rev.sentiment === 'Positive' ? 'sent-pos' : (rev.sentiment === 'Negative' ? 'sent-neg' : 'sent-neu')}">${rev.sentiment}</span>`;

      card.innerHTML = `
        <div class="rev-card-header">
          <span class="rev-author">${rev.author}</span>
          <div class="rev-meta">
            ${verifiedTag}
            ${sentimentTag}
            <span class="star-rating" style="font-size:12px;">${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}</span>
          </div>
        </div>
        <div class="rev-body">${rev.comment}</div>
      `;
      listContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     Cart & Checkout Processing
     ========================================================================== */
  cartToggleBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    renderCart();
  });

  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("active");
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 0; color: var(--text-muted);">
          <div style="font-size:36px; margin-bottom:10px;">🛒</div>
          <p>Your cart is empty</p>
        </div>
      `;
      updateCartTotals(0);
      return;
    }

    let subtotal = 0;
    const viewCounts = JSON.parse(localStorage.getItem("aura_view_counts")) || {};
    cart.forEach(item => {
      const p = window.productsData.find(x => x.id === item.id);
      if (!p) return;
      
      const isDynamic = (viewCounts[p.id] || 0) >= 3;
      const finalPrice = isDynamic ? p.price * 1.02 : p.price;
      subtotal += finalPrice * item.quantity;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <div class="cart-item-img"><img src="${p.images[0]}" alt="product"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${window.formatPrice(finalPrice)} &times; ${item.quantity}</div>
          <div class="cart-item-actions">
            <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
            <div style="font-size: 11px; color:var(--text-muted);">Stock limit: ${p.stock}</div>
          </div>
        </div>
      `;
      
      itemDiv.querySelector(".cart-remove-btn").addEventListener("click", () => {
        removeFromCart(item.id);
      });

      cartItemsContainer.appendChild(itemDiv);
    });

    updateCartTotals(subtotal);
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("aura_cart", JSON.stringify(cart));
    updateBadges();
    renderCart();
  }

  function updateCartTotals(subtotal) {
    let discount = 0;
    if (couponCode === "KIRAN20" && subtotal > 0) {
      discount = subtotal * 0.20;
    }
    
    const total = subtotal - discount;
    cartSubtotalEl.textContent = window.formatPrice(subtotal);
    cartDiscountEl.textContent = `-${window.formatPrice(discount)}`;
    cartTotalEl.textContent = window.formatPrice(total);

    // Update Fraud risk check
    evaluateCheckoutRisk();
  }

  // Apply Coupon code logic
  applyCouponBtn.addEventListener("click", () => {
    const val = couponInput.value.toUpperCase().trim();
    if (val === "KIRAN20") {
      couponCode = "KIRAN20";
      localStorage.setItem("aura_coupon", "KIRAN20");
      alert("Coupon 'KIRAN20' applied! Enjoy 20% off.");
    } else {
      alert("Invalid coupon code.");
    }
    renderCart();
  });

  /* ==========================================================================
     Real-Time Fraud Checker
     ========================================================================== */
  function evaluateCheckoutRisk() {
    const checkoutData = {
      email: checkEmail.value,
      billingCountry: checkBilling.value,
      shippingCountry: checkShipping.value,
      cardName: checkCardName.value,
      isUsingVpn: checkVpn.checked,
      cartItems: cart
    };

    const audit = fraudDetector.analyzeOrder(checkoutData);
    
    // Set UI displays
    fraudScorePercent.textContent = `${audit.score}%`;
    fraudScoreFill.style.width = `${audit.score}%`;
    
    if (audit.score >= 60) {
      fraudScorePercent.style.color = "var(--error)";
      fraudScoreFill.style.backgroundColor = "var(--error)";
      fraudAdvisorMsg.innerHTML = `<span style="color:var(--error); font-weight:700;">⚠️ Blocked:</span> ${audit.flags.join(", ")}`;
    } else if (audit.score >= 30) {
      fraudScorePercent.style.color = "var(--accent-color)";
      fraudScoreFill.style.backgroundColor = "var(--accent-color)";
      fraudAdvisorMsg.innerHTML = `<span style="color:var(--accent-color); font-weight:700;">⚠️ Flagged:</span> ${audit.flags.join(", ")}`;
    } else {
      fraudScorePercent.style.color = "var(--success)";
      fraudScoreFill.style.backgroundColor = "var(--success)";
      fraudAdvisorMsg.innerHTML = `🛡️ Safe order structure verified.`;
    }
  }

  // Hook inputs for real-time validation triggers
  [checkEmail, checkCardName, checkBilling, checkShipping, checkVpn].forEach(el => {
    el.addEventListener("input", evaluateCheckoutRisk);
    el.addEventListener("change", evaluateCheckoutRisk);
  });

  placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add products before checking out!");
      return;
    }

    const audit = fraudDetector.analyzeOrder({
      email: checkEmail.value,
      billingCountry: checkBilling.value,
      shippingCountry: checkShipping.value,
      cardName: checkCardName.value,
      isUsingVpn: checkVpn.checked,
      cartItems: cart
    });

    if (audit.status === "high") {
      alert(`Checkout Terminated: Fraud security threshold exceeded. Reason: ${audit.message}`);
    } else {
      const totalAmountVal = parseFloat(cartTotalEl.textContent.replace("$", ""));
      const pointsEarned = Math.round(totalAmountVal * 10);
      rewardsPoints += pointsEarned;
      localStorage.setItem("aura_rewards_points", rewardsPoints);
      document.getElementById("rewards-points-display").textContent = rewardsPoints.toLocaleString();
      
      alert(`Order Confirmed! Total paid: ${cartTotalEl.textContent}. You earned ${pointsEarned} Aura loyalty points. New Balance: ${rewardsPoints.toLocaleString()} pts. Thank you for shopping with us, Kiran!`);
      
      // Clear Cart
      cart = [];
      localStorage.removeItem("aura_cart");
      updateBadges();
      cartDrawer.classList.remove("active");
    }
  });

  /* ==========================================================================
     Visual Search Simulator Handlers
     ========================================================================== */
  vsBtn.addEventListener("click", () => {
    vsModalOverlay.classList.add("active");
    resetVisualSearchForm();
  });

  closeVsBtn.addEventListener("click", () => {
    vsModalOverlay.classList.remove("active");
  });

  function resetVisualSearchForm() {
    vsPreviewBox.classList.add("hidden");
    vsResultsBox.classList.add("hidden");
    vsScannerLine.classList.add("hidden");
    vsImgEl.src = "";
    vsFileInput.value = "";
  }

  vsDropZone.addEventListener("click", () => {
    vsFileInput.click();
  });

  vsDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    vsDropZone.classList.add("drag-over");
  });

  vsDropZone.addEventListener("dragleave", () => {
    vsDropZone.classList.remove("drag-over");
  });

  vsDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    vsDropZone.classList.remove("drag-over");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processVisualSearchFile(e.dataTransfer.files[0]);
    }
  });

  vsFileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processVisualSearchFile(e.target.files[0]);
    }
  });

  function processVisualSearchFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      vsImgEl.src = e.target.result;
      vsPreviewBox.classList.remove("hidden");
      vsScannerLine.classList.remove("hidden");
      
      // Perform AI scan simulation
      visualSearchEngine.scanImage(file).then(res => {
        vsScannerLine.classList.add("hidden");
        vsMatchesTag.textContent = `${res.category.toUpperCase()} (${res.color.toUpperCase()} tones)`;
        
        // Render search results inside visual search panel
        renderVisualSearchResults(res.matches);
        vsResultsBox.classList.remove("hidden");
      });
    };
    reader.readAsDataURL(file);
  }

  function renderVisualSearchResults(matches) {
    vsMatchesGrid.innerHTML = "";
    if (matches.length === 0) {
      vsMatchesGrid.innerHTML = "<p style='font-size:12px; grid-column:1/-1;'>No close visual matches in current catalog.</p>";
      return;
    }

    matches.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="card-img-wrapper" onclick="openDetails('${p.id}')">
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="card-body" onclick="openDetails('${p.id}')">
          <h3 class="card-title" style="font-size: 13px;">${p.name}</h3>
          <div class="card-footer" style="padding-top:6px;">
            <span class="card-price" style="font-size:14px;">${window.formatPrice(p.price)}</span>
          </div>
        </div>
      `;
      vsMatchesGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     Product Comparison Drawer Shelf
     ========================================================================== */
  function addToCompareShelf(product) {
    if (comparisonList.find(x => x.id === product.id)) {
      alert("Product already added to comparison shelf.");
      return;
    }
    if (comparisonList.length >= 3) {
      alert("Comparison shelf is full! Remove an item first. (Max 3 items)");
      return;
    }

    comparisonList.push(product);
    compareDrawer.classList.add("active");
    renderComparisonShelf();
  }

  function renderComparisonShelf() {
    compareGridSlots.innerHTML = "";
    
    comparisonList.forEach(p => {
      const col = document.createElement("div");
      col.className = "compare-col";
      col.innerHTML = `
        <div class="compare-img-box"><img src="${p.images[0]}" alt="compare"></div>
        <div class="compare-item-name" title="${p.name}">${p.name}</div>
        
        <div class="compare-spec-row">
          <span class="compare-spec-lbl">Price</span>
          <span class="compare-spec-val">${window.formatPrice(p.price)}</span>
        </div>
        <div class="compare-spec-row">
          <span class="compare-spec-lbl">Rating</span>
          <span class="compare-spec-val">⭐ ${p.rating}</span>
        </div>
        <div class="compare-spec-row">
          <span class="compare-spec-lbl">Material</span>
          <span class="compare-spec-val" style="text-align:right;">${p.specifications["Material"] || p.specifications["Dimensions"] || "N/A"}</span>
        </div>
        <button class="compare-remove-btn" data-id="${p.id}">Remove</button>
      `;

      col.querySelector(".compare-remove-btn").addEventListener("click", () => {
        removeFromCompare(p.id);
      });
      compareGridSlots.appendChild(col);
    });

    // Pad with empty display cards if needed
    for (let i = comparisonList.length; i < 3; i++) {
      const empty = document.createElement("div");
      empty.className = "compare-add-btn";
      empty.textContent = "➕ Add item to compare";
      empty.addEventListener("click", () => {
        detailsModalOverlay.classList.remove("active");
        compareDrawer.classList.remove("active");
        alert("Click on any product, then click 'Compare' inside the product details panel.");
      });
      compareGridSlots.appendChild(empty);
    }
  }

  function removeFromCompare(id) {
    comparisonList = comparisonList.filter(item => item.id !== id);
    if (comparisonList.length === 0) {
      compareDrawer.classList.remove("active");
    } else {
      renderComparisonShelf();
    }
  }

  closeCompareBtn.addEventListener("click", () => {
    comparisonList = [];
    compareDrawer.classList.remove("active");
  });

  /* ==========================================================================
     AI Chatbot Interface & Logic binding
     ========================================================================== */
  chatBubble.addEventListener("click", openChatWindow);
  closeChatBtn.addEventListener("click", () => {
    chatWindow.classList.remove("active");
  });

  function openChatWindow() {
    chatWindow.classList.add("active");
    renderChatMessages();
  }

  function renderChatMessages() {
    chatMessagesContainer.innerHTML = "";
    chatbot.messages.forEach(msg => {
      const div = document.createElement("div");
      div.className = `chat-msg ${msg.sender}`;
      div.innerHTML = msg.text;
      chatMessagesContainer.appendChild(div);
    });
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  // Bind query sender globally
  window.sendChatQuery = function(text) {
    // Show user message
    const botMsg = chatbot.respond(text);
    renderChatMessages();

    // Trigger typing delay animation
    appendTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      renderChatMessages();
      
      // Execute trigger actions returned in response object
      if (botMsg.data) {
        handleChatbotTriggers(botMsg.data);
      }
    }, 1200);
  };

  chatInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const txt = chatUserInput.value.trim();
    if (!txt) return;
    chatUserInput.value = "";
    sendChatQuery(txt);
  });

  function appendTypingIndicator() {
    removeTypingIndicator();
    const div = document.createElement("div");
    div.className = "chat-msg bot";
    div.id = "chat-typing-indicator";
    div.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessagesContainer.appendChild(div);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("chat-typing-indicator");
    if (el) el.remove();
  }

  // Handle side-effects of chatbot actions
  function handleChatbotTriggers(data) {
    switch(data.action) {
      case "show_product":
        chatWindow.classList.remove("active");
        openDetails(data.id);
        break;
      case "open_cart":
        chatWindow.classList.remove("active");
        cartDrawer.classList.add("active");
        renderCart();
        break;
      case "apply_coupon":
        couponCode = data.coupon;
        localStorage.setItem("aura_coupon", data.coupon);
        couponInput.value = data.coupon;
        renderCart();
        break;
      case "search_filter":
        chatWindow.classList.remove("active");
        searchInput.value = data.query;
        searchPhrase = data.query.toLowerCase().trim();
        renderStoreGrid();
        break;
      case "recommend":
        // Highlight recommendations
        break;
    }
  }

  // Voice recognition inside Chatbot input field
  if (SpeechRecognition) {
    const chatSpeech = new SpeechRecognition();
    chatSpeech.continuous = false;
    chatSpeech.lang = "en-US";
    chatSpeech.interimResults = false;

    chatVoiceTrigger.addEventListener("click", () => {
      if (chatVoiceTrigger.classList.contains("listening")) {
        chatSpeech.stop();
      } else {
        chatVoiceTrigger.classList.add("listening");
        chatSpeech.start();
      }
    });

    chatSpeech.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const lower = transcript.toLowerCase();
      
      if (lower.includes("add") && (lower.includes("cart") || lower.includes("buy"))) {
        handleVoiceShoppingAction(lower);
      } else {
        chatUserInput.value = transcript;
      }
    };

    chatSpeech.onend = () => {
      chatVoiceTrigger.classList.remove("listening");
    };

    chatSpeech.onerror = (e) => {
      console.error(e);
      chatVoiceTrigger.classList.remove("listening");
    };
  } else {
    chatVoiceTrigger.addEventListener("click", () => {
      chatVoiceTrigger.classList.add("listening");
      setTimeout(() => {
        chatVoiceTrigger.classList.remove("listening");
        chatUserInput.value = "Are there any offers?";
      }, 1000);
    });
  }

  // Run initial calculations
  init();
  /* ==========================================================================
     Voice Shopping Assistant Parsing Engine
     ========================================================================== */
  function handleVoiceShoppingAction(transcript) {
    let matchedProduct = null;
    const lower = transcript.toLowerCase();

    // Map transcript keywords to product entries
    if (lower.includes("jhumka") || lower.includes("earring") || lower.includes("jewelry")) {
      if (lower.includes("oxidized") || lower.includes("silver")) {
        matchedProduct = window.productsData.find(x => x.id === "p10");
      } else if (lower.includes("luxury") || lower.includes("diamond")) {
        matchedProduct = window.productsData.find(x => x.id === "p11");
      } else {
        matchedProduct = window.productsData.find(x => x.id === "p9"); // Default gold
      }
    } else if (lower.includes("chair") || lower.includes("ergonomic")) {
      matchedProduct = window.productsData.find(x => x.id === "p1");
    } else if (lower.includes("headphone") || lower.includes("audio")) {
      matchedProduct = window.productsData.find(x => x.id === "p2");
    } else if (lower.includes("shoes") || lower.includes("sneaker") || lower.includes("stride")) {
      matchedProduct = window.productsData.find(x => x.id === "p3");
    } else if (lower.includes("light") || lower.includes("bar") || lower.includes("ambient")) {
      matchedProduct = window.productsData.find(x => x.id === "p4");
    } else if (lower.includes("projector") || lower.includes("vision")) {
      matchedProduct = window.productsData.find(x => x.id === "p5");
    } else if (lower.includes("bottle") || lower.includes("flask") || lower.includes("thermos")) {
      matchedProduct = window.productsData.find(x => x.id === "p6");
    } else if (lower.includes("desk") || lower.includes("oak")) {
      matchedProduct = window.productsData.find(x => x.id === "p7");
    } else if (lower.includes("band") || lower.includes("fit") || lower.includes("tracker")) {
      matchedProduct = window.productsData.find(x => x.id === "p8");
    }

    if (matchedProduct) {
      addToCart(matchedProduct.id, 1);
      alert(`🎤 Voice Command: Added 1x "${matchedProduct.name}" to your shopping cart!`);
    } else {
      alert(`🎤 Voice Command: I heard "${transcript}", but couldn't verify which product to add. Try: "Add Jhumkas to cart" or "Add ergonomic chair to cart".`);
    }
  }

  /* ==========================================================================
     Gamification: Spin-to-Win Canvas Wheel Engine
     ========================================================================== */
  const wheelCanvas = document.getElementById("wheel-canvas");
  const wheelCtx = wheelCanvas ? wheelCanvas.getContext("2d") : null;
  const wheelOptions = ["KIRAN20", "TRY AGAIN", "150 PTS", "KIRAN20", "50 PTS", "TRY AGAIN"];
  const wheelColors = ["#6366f1", "#1e293b", "#ec4899", "#6366f1", "#f59e0b", "#1e293b"];
  let startAngle = 0;
  const arcSize = Math.PI / (wheelOptions.length / 2);
  let spinAngleStart = 0;
  let spinTime = 0;
  let spinTimeTotal = 0;

  function drawPromoWheel() {
    if (!wheelCtx) return;
    const size = 260;
    const outsideRadius = 120;
    const textRadius = 85;
    const insideRadius = 25;

    wheelCtx.clearRect(0, 0, size, size);
    wheelCtx.strokeStyle = "rgba(255,255,255,0.15)";
    wheelCtx.lineWidth = 2;

    for (let i = 0; i < wheelOptions.length; i++) {
      const angle = startAngle + i * arcSize;
      wheelCtx.fillStyle = wheelColors[i];

      wheelCtx.beginPath();
      wheelCtx.arc(size/2, size/2, outsideRadius, angle, angle + arcSize, false);
      wheelCtx.arc(size/2, size/2, insideRadius, angle + arcSize, angle, true);
      wheelCtx.stroke();
      wheelCtx.fill();

      // Write Text Segment labels
      wheelCtx.save();
      wheelCtx.fillStyle = "white";
      wheelCtx.font = "800 11px Outfit, sans-serif";
      
      const centerVal = size / 2;
      wheelCtx.translate(centerVal + Math.cos(angle + arcSize / 2) * textRadius,
                          centerVal + Math.sin(angle + arcSize / 2) * textRadius);
      wheelCtx.rotate(angle + arcSize / 2 + Math.PI / 2);
      const text = wheelOptions[i];
      wheelCtx.fillText(text, -wheelCtx.measureText(text).width / 2, 0);
      wheelCtx.restore();
    }

    // Outer gold border ring
    wheelCtx.strokeStyle = "#fbbf24";
    wheelCtx.lineWidth = 4;
    wheelCtx.beginPath();
    wheelCtx.arc(size/2, size/2, outsideRadius, 0, Math.PI * 2, false);
    wheelCtx.stroke();
  }

  function triggerSpinPromoWheel() {
    if (isSpinning) return;
    isSpinning = true;
    document.getElementById("spin-result-msg").textContent = "Spinning wheel...";
    spinAngleStart = Math.random() * 10 + 15;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotatePromoWheel();
  }

  function rotatePromoWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopPromoWheel();
      return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawPromoWheel();
    requestAnimationFrame(rotatePromoWheel);
  }

  function stopPromoWheel() {
    isSpinning = false;
    const size = 260;
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arcSize * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const resultText = wheelOptions[index];
    const msgEl = document.getElementById("spin-result-msg");

    if (resultText === "TRY AGAIN") {
      msgEl.style.color = "var(--text-muted)";
      msgEl.textContent = "Aww, close spin! Try again on your next order.";
    } else if (resultText === "KIRAN20") {
      msgEl.style.color = "var(--success)";
      msgEl.innerHTML = "🎉 WON KIRAN20! 20% discount coupon applied automatically!";
      couponCode = "KIRAN20";
      localStorage.setItem("aura_coupon", "KIRAN20");
      couponInput.value = "KIRAN20";
      renderCart();
    } else if (resultText.includes("PTS")) {
      const pts = parseInt(resultText.split(" ")[0]);
      msgEl.style.color = "var(--primary-color)";
      msgEl.textContent = `🎉 WON ${pts} POINTS! Points added to balance.`;
      rewardsPoints += pts;
      localStorage.setItem("aura_rewards_points", rewardsPoints);
      document.getElementById("rewards-points-display").textContent = rewardsPoints.toLocaleString();
    }
  }

  function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
});
