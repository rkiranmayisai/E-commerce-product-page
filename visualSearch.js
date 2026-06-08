class VisualSearch {
  constructor() {}

  // Simulates scanning an image file and returning matching categories/colors
  async scanImage(file) {
    return new Promise((resolve) => {
      // Delay to simulate neural network extraction (2.5 seconds)
      setTimeout(() => {
        const name = file.name.toLowerCase();
        
        let category = null;
        let color = null;
        let tags = [];

        // Check file name keywords to match categories
        if (name.includes("chair") || name.includes("desk") || name.includes("furniture") || name.includes("wood")) {
          category = "furniture";
          tags.push("wood", "ergonomic", "home-decor");
        } else if (name.includes("shoe") || name.includes("sneaker") || name.includes("run") || name.includes("wear")) {
          category = "fashion";
          tags.push("sports", "red", "apparel");
        } else if (name.includes("headphone") || name.includes("earphone") || name.includes("speaker") || name.includes("audio") || name.includes("projector")) {
          category = "electronics";
          tags.push("audio", "wireless", "gadget");
        } else if (name.includes("bottle") || name.includes("flask") || name.includes("light") || name.includes("lamp") || name.includes("smart")) {
          category = "smarthome";
          tags.push("led", "smart", "hydration");
        } else {
          // If no matches, randomise classification for simulation
          const categories = ["electronics", "furniture", "fashion", "smarthome"];
          category = categories[Math.floor(Math.random() * categories.length)];
          tags.push("similar-visuals", "shape-match");
        }

        // Detect color simulation
        if (name.includes("red") || name.includes("orange")) {
          color = "red";
        } else if (name.includes("blue") || name.includes("cyan")) {
          color = "blue";
        } else if (name.includes("black") || name.includes("dark")) {
          color = "black";
        } else {
          color = "neutral";
        }

        // Get matching products
        let matches = window.productsData.filter(p => {
          return p.category === category;
        });

        // If a specific color matches, sort them first
        if (color === "red") {
          matches.sort((a, b) => (a.name.toLowerCase().includes("shoes") ? -1 : 1));
        } else if (color === "black") {
          matches.sort((a, b) => (a.name.toLowerCase().includes("headphones") ? -1 : 1));
        }

        resolve({
          category,
          color,
          tags,
          matches
        });
      }, 2500);
    });
  }
}

window.VisualSearch = VisualSearch;
