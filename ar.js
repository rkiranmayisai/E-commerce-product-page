class ARViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.stream = null;
    this.productImage = null;
    this.scale = 1.0;
    this.rotation = 0;
    this.posX = 0;
    this.posY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.activeRoomPreset = 'webcam';
  }

  async start(productImgSrc) {
    this.container.innerHTML = `
      <div class="ar-viewport-wrapper">
        <video id="ar-video" autoplay playsinline></video>
        <div id="ar-fallback-bg" class="ar-fallback-bg hidden"></div>
        <img id="ar-product-overlay" class="ar-overlay-img" src="${productImgSrc}" alt="AR Product">
        
        <div class="ar-hud">
          <div class="ar-hud-title">AR Product Placement View</div>
          <div class="ar-controls-bar">
            <button class="ar-btn" id="ar-btn-rotate-l" title="Rotate Left">🔄</button>
            <button class="ar-btn" id="ar-btn-zoom-in" title="Zoom In">➕</button>
            <button class="ar-btn" id="ar-btn-zoom-out" title="Zoom Out">➖</button>
            <button class="ar-btn" id="ar-btn-rotate-r" title="Rotate Right">🔃</button>
          </div>
          <div class="ar-presets">
            <span class="ar-hud-label">Select Environment:</span>
            <select id="ar-env-select" class="ar-select">
              <option value="webcam">Live Camera feed</option>
              <option value="living-room">Simulated Living Room</option>
              <option value="office">Simulated Home Office</option>
            </select>
          </div>
          <div class="ar-instructions">Drag item to reposition. Use pinch or buttons to resize.</div>
        </div>
      </div>
    `;

    this.videoEl = document.getElementById("ar-video");
    this.fallbackBgEl = document.getElementById("ar-fallback-bg");
    this.overlayImgEl = document.getElementById("ar-product-overlay");

    this.setupCamera();
    this.setupInteractions();
    this.resetOverlay();
  }

  async setupCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      this.videoEl.srcObject = this.stream;
      this.videoEl.classList.remove("hidden");
      this.fallbackBgEl.classList.add("hidden");
      this.activeRoomPreset = 'webcam';
      document.getElementById("ar-env-select").value = 'webcam';
    } catch (err) {
      console.warn("Camera access denied or unavailable. Loading room preset fallback.", err);
      this.loadRoomFallback("living-room");
    }
  }

  loadRoomFallback(preset) {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.videoEl.classList.add("hidden");
    this.fallbackBgEl.classList.remove("hidden");
    
    const backgrounds = {
      "living-room": "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
      "office": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    };

    this.fallbackBgEl.style.backgroundImage = `url('${backgrounds[preset] || backgrounds["living-room"]}')`;
    this.activeRoomPreset = preset;
    document.getElementById("ar-env-select").value = preset;
  }

  resetOverlay() {
    this.scale = 1.0;
    this.rotation = 0;
    this.posX = 0;
    this.posY = 0;
    this.updateTransform();
  }

  updateTransform() {
    if (this.overlayImgEl) {
      this.overlayImgEl.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
    }
  }

  setupInteractions() {
    const overlay = this.overlayImgEl;

    // Button interactions
    document.getElementById("ar-btn-rotate-l").addEventListener("click", () => {
      this.rotation -= 15;
      this.updateTransform();
    });
    document.getElementById("ar-btn-rotate-r").addEventListener("click", () => {
      this.rotation += 15;
      this.updateTransform();
    });
    document.getElementById("ar-btn-zoom-in").addEventListener("click", () => {
      this.scale = Math.min(this.scale + 0.1, 3.0);
      this.updateTransform();
    });
    document.getElementById("ar-btn-zoom-out").addEventListener("click", () => {
      this.scale = Math.max(this.scale - 0.1, 0.3);
      this.updateTransform();
    });

    // Preset dropdown listener
    document.getElementById("ar-env-select").addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === 'webcam') {
        this.setupCamera();
      } else {
        this.loadRoomFallback(val);
      }
    });

    // Touch and Mouse dragging logic
    const startDrag = (clientX, clientY) => {
      this.isDragging = true;
      this.startX = clientX - this.posX;
      this.startY = clientY - this.posY;
    };

    const doDrag = (clientX, clientY) => {
      if (!this.isDragging) return;
      this.posX = clientX - this.startX;
      this.posY = clientY - this.startY;
      this.updateTransform();
    };

    const stopDrag = () => {
      this.isDragging = false;
    };

    overlay.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
      doDrag(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", () => {
      stopDrag();
    });

    overlay.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        doDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    window.addEventListener("touchend", () => {
      stopDrag();
    });
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.container.innerHTML = "";
  }
}

window.ARViewer = ARViewer;
