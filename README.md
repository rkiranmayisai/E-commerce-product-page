# 🛍️ ShopSphere – Premium Interactive E-Commerce Product Page

Welcome to **ShopSphere**! A premium, interactive, and responsive single-product e-commerce page designed to deliver a modern, high-end shopping experience for customers.

This project features a fully integrated **AI Shopping Assistant** that welcomes users with a personalized voice greeting (tailored for Kiran), an **Interactive 360° Image Showcase**, a **Dynamic Cart & Checkout Panel**, a **Smart Rating & Review Dashboard** powered by Chart.js, and professional **PDF Invoice/Receipt Generation** for orders.

---

## ✨ Features

### 1. 🎙️ Voice Greeting & AI Shopping Assistant
* **Personalized Welcome**: Welcomes user "Kiran" on startup using the Web Speech API with a summary of the product's highlights, active deals, and interactive guides.
* **24/7 AI Chatbot (ShopBot)**: Interactive assistant trained in product specifications, stock status, delivery policies, and discount details.
* **Smart Suggestion Bubbles**: Floating prompts for instant answers regarding sizing, material, shipping, and warranty.

### 2. 👟 Interactive Product Gallery & Customizer
* **Multi-Angle Viewers**: Displays product variants across multiple high-quality angles and zoom settings.
* **Live Colorway & Size Selectors**: Modifies interface accents and updates product images dynamically depending on chosen options.
* **Magnifying Hover Effect**: Implements magnifying glass inspection overlay for checking material textures and details.

### 3. 🛒 Dynamic Shopping Cart & Checkout Suite
* **Slide-out Drawer Cart**: Clean drawer layout for managing items, updating quantities, and reviewing totals in real time.
* **Promo Code Engine**: Simulates discount codes (e.g., `KIRAN20`, `WELCOME10`) with live price calculation and success indicators.
* **Order History Tracker**: Saves order states and item lists client-side using browser local storage.

### 4. 📄 Professional PDF Receipt Exports
* **One-Click Invoice Compilation**: Automatically compiles details into a clean, dark-themed PDF summary upon order checkout.
* **Order Tracking Details**: Displays items, applied discount codes, shipping details, and estimated delivery dates.

### 5. 📊 Interactive Review & Analytics Panel
* **Customer Review Breakdown**: Visualizes overall customer satisfaction and rating distributions using a Chart.js horizontal bar chart.
* **User Review Logger**: Allows customers to write reviews, submit ratings, and tag feedback with a "Verified Buyer" badge.

### 6. 🌐 Localized Multi-lingual Support
* **Inclusive Experience**: Full structural translation toggles for English, Hindi (हिंदी), Kannada (ಕನ್ನಡ), and Telugu (తెలుగు).

---

## 🛠️ Technology Stack

* **Frontend**: Semantic HTML5, Custom Vanilla CSS3 (HSL variables, glassmorphic styling, responsive flex/grid layouts), Vanilla JavaScript (ES6+).
* **Libraries**:
  * [Chart.js](https://www.chartjs.org/) (Review distribution analytics)
  * [jsPDF](https://github.com/parallax/jsPDF) (Client-side invoice compiling)
  * [FontAwesome](https://fontawesome.com/) (Premium iconography)
* **APIs & Web Engines**:
  * [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (Speech Synthesis greeting engine)
  * [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (Persistent cart items & order logs)

---

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/e-commerce-product-page.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-product-page
   ```
3. Open `index.html` directly in your web browser, or serve it using a lightweight local server:
   * **Python**: `python -m http.server 8000`
   * **Node.js**: `npx serve`

---

## 📁 Project Structure

```
E commerce product page/
├── index.html                  # Main product detail page
├── style.css                   # Premium styles (glassmorphism, variables)
├── app.js                      # Core product interactions & cart logic
├── chatbot.js                  # ShopBot AI assistant engine
├── chart.js                    # Review distribution visualization
├── manifest.json               # Web App metadata
├── sw.js                       # Service worker for offline operations
└── assets/                     # Product images and icons
```

---

## 📱 Mobile Compatibility

The web application is fully mobile-responsive and designed for mobile-first views, ensuring a smooth checkout flow on tablets and smartphones alike.

---

## 🎓 Evaluation & Highlights

1. **Aesthetics**: Glassmorphism, smooth micro-animations, theme toggling, and clean visual structure.
2. **AI Integration**: ShopBot chatbot assistant and customized voice greetings.
3. **Analytics**: Graphical review breakdown using Chart.js.
4. **Convenience**: One-click PDF receipt downloader and persistent local storage.

---

## 🤝 Contributing

Feel free to open issues and pull requests to add features such as:
1. Multi-product catalogue pages.
2. Real-time payment gateway simulation.
3. Integration with database backends (Node.js/Flask).

---

## 📝 License

This project is licensed under the MIT License.
