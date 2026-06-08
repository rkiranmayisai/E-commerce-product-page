const productsData = [
  {
    id: "p1",
    name: "AeroGlow Ergonomic Smart Chair",
    category: "furniture",
    price: 349.99,
    description: "The next generation of ergonomic seating. Featuring dynamic lumbar tracking, smart posture sensors, and adaptive breathable mesh to keep you aligned and energized through long hours of work.",
    stock: 12,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1688547389874-9844c8b827e8?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "AI Posture Tracking & Vibration Alerts",
      "Dynamic Synchro-Tilt Mechanics",
      "4D Adjustable Gel-Padded Armrests",
      "Premium Recycled Polymer Construction",
      "Integrates with mobile app for health insights"
    ],
    specifications: {
      "Weight Capacity": "300 lbs (136 kg)",
      "Recline Range": "90° - 135°",
      "Material": "Carbon fiber reinforced polymer, elastomer mesh",
      "Cushioning": "High-density shape-conforming memory foam",
      "Connectivity": "Bluetooth 5.0 (for smart posture app)"
    },
    priceHistory: [
      { date: "Jan 2026", price: 399.99 },
      { date: "Feb 2026", price: 389.99 },
      { date: "Mar 2026", price: 379.99 },
      { date: "Apr 2026", price: 369.99 },
      { date: "May 2026", price: 359.99 },
      { date: "Jun 2026", price: 349.99 }
    ],
    reviews: [
      {
        id: "r1_1",
        author: "Alex Mercer",
        rating: 5,
        date: "2026-05-12",
        comment: "This chair has completely solved my lower back pain. The posture alerts are gentle but highly effective. Highly recommend for any software engineer!",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 98
      },
      {
        id: "r1_2",
        author: "Sophia Chen",
        rating: 4,
        date: "2026-05-28",
        comment: "Excellent ergonomics. The mesh is super breathable. The smart app setup took a few tries, but once connected, it works nicely.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 92
      },
      {
        id: "r1_3",
        author: "John Doe (Bot Check)",
        rating: 1,
        date: "2026-06-01",
        comment: "CHAIR BAD DO NOT BUY BUY CHEAP FROM SPAM.COM INSTEAD!!!",
        verified: false,
        sentiment: "Negative",
        aiVerifiedScore: 12
      }
    ]
  },
  {
    id: "p2",
    name: "SonicPro Noise Cancelling Headphones",
    category: "electronics",
    price: 249.99,
    description: "Immerse yourself in pure acoustic bliss. Equipped with industry-leading Active Noise Cancellation (ANC), custom-engineered 40mm dynamic drivers, and a spectacular 40-hour battery life.",
    stock: 25,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Hybrid Active Noise Cancellation (up to 45dB reduction)",
      "Audiophile-Grade LDAC Audio Codec Support",
      "Smart Wear Detection (Auto-play/pause)",
      "Multipoint Connection (Switch between phone and laptop)",
      "Rapid Charge: 5 mins gives 5 hours of playback"
    ],
    specifications: {
      "Driver Size": "40 mm Dynamic",
      "Frequency Response": "4Hz - 40kHz",
      "Battery Life": "Up to 40 hours (ANC On)",
      "Weight": "250g (8.8 oz)",
      "Water Resistance": "IPX4 sweatproof"
    },
    priceHistory: [
      { date: "Jan 2026", price: 299.99 },
      { date: "Feb 2026", price: 279.99 },
      { date: "Mar 2026", price: 289.99 },
      { date: "Apr 2026", price: 269.99 },
      { date: "May 2026", price: 259.99 },
      { date: "Jun 2026", price: 249.99 }
    ],
    reviews: [
      {
        id: "r2_1",
        author: "Kiran R.",
        rating: 5,
        date: "2026-04-15",
        comment: "Absolutely outstanding soundstage. The noise cancellation makes my daily subway commute completely silent. Well worth the premium.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      },
      {
        id: "r2_2",
        author: "Marcus Aurelius",
        rating: 4,
        date: "2026-05-02",
        comment: "Great comfort, fits snug without squeezing. ANC is great, although touch controls can sometimes be overly sensitive.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 94
      }
    ]
  },
  {
    id: "p3",
    name: "VeloStride Active Running Shoes",
    category: "fashion",
    price: 129.99,
    description: "Engineered for maximum velocity and speed. Utilizing an ultra-lightweight carbon fiber plate and nitrogen-infused foam midsole for extreme energy return and propulsion.",
    stock: 40,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Nitrogen-Infused Energy Foam Midsole",
      "3D Engineered Monofilament Mesh Upper",
      "Embedded Curved Carbon Fiber Plate",
      "High-Traction Carbon Rubber Outsole",
      "Glow-in-the-dark safety reflective detailing"
    ],
    specifications: {
      "Weight": "198g (7.0 oz) in Size 9",
      "Heel-to-Toe Drop": "8 mm",
      "Arch Support": "Neutral / Medium stability",
      "Ideal For": "Marathons, speed training, road running",
      "Lacing": "Anti-slip lock laces"
    },
    priceHistory: [
      { date: "Jan 2026", price: 149.99 },
      { date: "Feb 2026", price: 139.99 },
      { date: "Mar 2026", price: 139.99 },
      { date: "Apr 2026", price: 129.99 },
      { date: "May 2026", price: 129.99 },
      { date: "Jun 2026", price: 129.99 }
    ],
    reviews: [
      {
        id: "r3_1",
        author: "Runner4Life",
        rating: 5,
        date: "2026-05-18",
        comment: "Shaved 2 minutes off my 5k personal best! The bounce you get from the plate is unreal. Feels like running on clouds.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 97
      },
      {
        id: "r3_2",
        author: "Emily Watson",
        rating: 4,
        date: "2026-06-03",
        comment: "Super lightweight and breathable. They fit a bit narrow, so I suggest going half a size up if you have wider feet.",
        verified: true,
        sentiment: "Neutral",
        aiVerifiedScore: 90
      }
    ]
  },
  {
    id: "p4",
    name: "LuminaSmart Ambient Light Bar",
    category: "smarthome",
    price: 79.99,
    description: "Transform your setup with vibrant ambient illumination. Projects over 16 million colors and syncs dynamically with movies, games, and music for an immersive room atmosphere.",
    stock: 5,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Dynamic Music Syncing via integrated high-sensitivity mic",
      "App Control, Voice Support (Alexa, Google Assistant)",
      "Multi-Zone Color Blending (ARGB)",
      "Flexible Mounting (Horizontal, vertical, monitor back)",
      "Eye-comfort certified zero-flicker technology"
    ],
    specifications: {
      "Luminous Flux": "800 Lumens",
      "Color Temperature": "2200K - 6500K + RGB",
      "Lifespan": "25,000 hours",
      "Connection": "Wi-Fi 2.4GHz + Bluetooth",
      "Power Source": "USB-C DC 5V/2A"
    },
    priceHistory: [
      { date: "Jan 2026", price: 99.99 },
      { date: "Feb 2026", price: 89.99 },
      { date: "Mar 2026", price: 89.99 },
      { date: "Apr 2026", price: 79.99 },
      { date: "May 2026", price: 79.99 },
      { date: "Jun 2026", price: 79.99 }
    ],
    reviews: [
      {
        id: "r4_1",
        author: "GamerPro99",
        rating: 5,
        date: "2026-05-20",
        comment: "This ambient lighting has completed my gaming battle station. The screen sync is perfect. No latency whatsoever.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 98
      },
      {
        id: "r4_2",
        author: "BotAccountSpam",
        rating: 5,
        date: "2026-05-22",
        comment: "Excellent product! Visit http://fake-lottery.xyz to win millions today! Wow!",
        verified: false,
        sentiment: "Neutral",
        aiVerifiedScore: 5
      }
    ]
  },
  {
    id: "p5",
    name: "VisionPro 4K Portable Projector",
    category: "electronics",
    price: 599.99,
    description: "Bring the theater anywhere. An ultra-compact 4K UHD smart projector featuring autofocus, auto-keystone correction, Android TV built-in, and premium Harman Kardon acoustic speakers.",
    stock: 8,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Native 4K UHD Resolution with HDR10 Support",
      "1200 ANSI Lumens for daylight visibility",
      "Instant Auto-Focus & Horizontal/Vertical Keystone Correction",
      "Built-in Android TV 11.0 with Netflix, Prime, YouTube",
      "Dual 8W Harman Kardon Dolby Audio Speakers"
    ],
    specifications: {
      "Display Technology": "DLP (Digital Light Processing)",
      "Projection Size": "30 inches - 200 inches",
      "Contrast Ratio": "10000:1",
      "RAM/Storage": "2GB DDR4 / 16GB eMMC",
      "Inputs": "HDMI 2.1, USB-A, USB-C, 3.5mm Jack"
    },
    priceHistory: [
      { date: "Jan 2026", price: 699.99 },
      { date: "Feb 2026", price: 649.99 },
      { date: "Mar 2026", price: 649.99 },
      { date: "Apr 2026", price: 629.99 },
      { date: "May 2026", price: 599.99 },
      { date: "Jun 2026", price: 599.99 }
    ],
    reviews: [
      {
        id: "r5_1",
        author: "Clara Oswald",
        rating: 5,
        date: "2026-04-10",
        comment: "This has completely replaced our living room TV. Movie nights are epic on a 150-inch wall. The speakers sound rich and clear.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      },
      {
        id: "r5_2",
        author: "TechReviewer",
        rating: 4.5,
        date: "2026-05-15",
        comment: "Incredible picture quality. Autofocus takes 2 seconds. In high daylight, you need shades down, but in dark it is absolutely mind-blowing.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 96
      }
    ]
  },
  {
    id: "p6",
    name: "EcoThermos Smart Flask",
    category: "smarthome",
    price: 45.00,
    description: "The ultimate hydration tracker. A double-wall vacuum insulated stainless steel bottle with an LCD touch display cap showing real-time water temperature and hydration goals.",
    stock: 65,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627914663953-e5ad081d0be6?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "LCD Touchscreen Cap showing liquid temperature",
      "UVC-LED Self-Cleaning Ring kills 99.9% of bacteria",
      "Hydration Alarm (reminder flashes every 2 hours)",
      "Double-walled insulation: keeps cold for 24h, hot for 12h",
      "Rechargeable battery (magnetic charger included)"
    ],
    specifications: {
      "Capacity": "600 ml (20 oz)",
      "Material": "Medical-grade 316 Stainless Steel, BPA-free",
      "Battery Life": "Up to 30 days on a single charge",
      "Insulation Type": "Vacuum Insulated",
      "IP Rating": "IPX7 waterproof"
    },
    priceHistory: [
      { date: "Jan 2026", price: 55.00 },
      { date: "Feb 2026", price: 49.99 },
      { date: "Mar 2026", price: 49.99 },
      { date: "Apr 2026", price: 45.00 },
      { date: "May 2026", price: 45.00 },
      { date: "Jun 2026", price: 45.00 }
    ],
    reviews: [
      {
        id: "r6_1",
        author: "Grace Hopper",
        rating: 5,
        date: "2026-05-05",
        comment: "I love the UVC self-cleaning! No more smelly water bottle. The temperature readout is really handy for hot tea.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 97
      },
      {
        id: "r6_2",
        author: "David L.",
        rating: 3,
        date: "2026-05-25",
        comment: "Great flask, but the magnetic charger cord is very short. Otherwise, it works as described.",
        verified: true,
        sentiment: "Neutral",
        aiVerifiedScore: 89
      }
    ]
  },
  {
    id: "p7",
    name: "Nordic Minimalist Oak Desk",
    category: "furniture",
    price: 499.99,
    description: "Sleek functionality meets Scandinavian elegance. Crafted from sustainably sourced solid white oak with hidden cable channels and a flush wireless charging station built directly into the wood.",
    stock: 4,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Solid Sustainable White Oak Construction",
      "Integrated 15W Qi wireless fast charger",
      "Felt-lined hidden cable organizer drawer",
      "Modular groove rails for accessories",
      "Finished with organic, zero-VOC oils"
    ],
    specifications: {
      "Dimensions": "48\" W x 24\" D x 30\" H",
      "Wireless Charger Output": "15 Watts (QI compatible)",
      "Desk Weight": "32 kg (70 lbs)",
      "Wood Finish": "Natural Matte Hardwax Oil",
      "Assembly Time": "10 minutes (tools included)"
    },
    priceHistory: [
      { date: "Jan 2026", price: 549.99 },
      { date: "Feb 2026", price: 529.99 },
      { date: "Mar 2026", price: 529.99 },
      { date: "Apr 2026", price: 499.99 },
      { date: "May 2026", price: 499.99 },
      { date: "Jun 2026", price: 499.99 }
    ],
    reviews: [
      {
        id: "r7_1",
        author: "Linus T.",
        rating: 5,
        date: "2026-05-19",
        comment: "Excellent craftsmanship. Heavy solid wood, extremely sturdy. The integrated wireless charger is seamless. Absolutely gorgeous desk.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      }
    ]
  },
  {
    id: "p8",
    name: "AuraFit Smart Fitness Band",
    category: "electronics",
    price: 99.99,
    description: "Track your body, sync your mind. A stylish, screenless health tracker monitoring HRV, skin temperature, sleep quality, and daily exertion with high-fidelity biometric sensors.",
    stock: 32,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510017808738-d78940550226?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "24/7 Heart Rate Variability (HRV) & Skin Temp tracking",
      "Advanced sleep coaching & recovery scoring",
      "Zero distraction: Screenless design to keep you present",
      "Interchangeable water-resistant knit fabric bands",
      "Subscription-free lifetime app access included"
    ],
    specifications: {
      "Sensors": "Photoplethysmography (PPG), Skin Temp, 3-Axis Accel",
      "Battery Life": "Up to 5 Days",
      "Water Resistance": "5 ATM (up to 50 meters)",
      "Band Material": "High-durability recycled polyester knit",
      "Charging": "Wireless USB-C charging cradle"
    },
    priceHistory: [
      { date: "Jan 2026", price: 119.99 },
      { date: "Feb 2026", price: 109.99 },
      { date: "Mar 2026", price: 99.99 },
      { date: "Apr 2026", price: 99.99 },
      { date: "May 2026", price: 99.99 },
      { date: "Jun 2026", price: 99.99 }
    ],
    reviews: [
      {
        id: "r8_1",
        author: "Kiran R.",
        rating: 5,
        date: "2026-05-14",
        comment: "I love that it has no screen. I get enough notifications already. The sleep data analysis is incredibly deep and accurate.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 98
      },
      {
        id: "r8_2",
        author: "Jane Doe (Spam)",
        rating: 1,
        date: "2026-05-30",
        comment: "This band is bad! Check my link for cheap weight loss pills: www.badpill-shop.biz!!!",
        verified: false,
        sentiment: "Negative",
        aiVerifiedScore: 8
      }
    ]
  },
  {
    id: "p9",
    name: "Royal Gold Filigree Jhumkas",
    category: "fashion",
    price: 189.99,
    description: "Exquisite handcrafted traditional Indian bell-shaped earrings. Crafted with detailed 22k gold-plated filigree works, dangling pearl clusters, and emerald-beaded highlights.",
    stock: 8,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Handcrafted 22k Gold Filigree Detailing",
      "Premium Cultured Freshwater Pearls",
      "Lightweight hollow-core dome design for all-day comfort",
      "Secure screw-back posts with safety bells",
      "Perfect for weddings, festivals, and traditional celebrations"
    ],
    specifications: {
      "Metal": "22k Yellow Gold plated sterling silver base",
      "Weight": "12 grams (6 grams per earring)",
      "Length": "2.4 inches (6.1 cm)",
      "Gemstone": "Freshwater Pearls & Emerald beads",
      "Craftsmanship": "Traditional Rajasthani filigree work"
    },
    priceHistory: [
      { date: "Jan 2026", price: 219.99 },
      { date: "Feb 2026", price: 209.99 },
      { date: "Mar 2026", price: 199.99 },
      { date: "Apr 2026", price: 199.99 },
      { date: "May 2026", price: 189.99 },
      { date: "Jun 2026", price: 189.99 }
    ],
    reviews: [
      {
        id: "r9_1",
        author: "Priya Sharma",
        rating: 5,
        date: "2026-05-20",
        comment: "Absolutely stunning! The detail on the gold plating is incredible, and they are surprisingly light. Wore them to a cousin's wedding and got so many compliments!",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 98
      },
      {
        id: "r9_2",
        author: "Kiran R.",
        rating: 5,
        date: "2026-06-02",
        comment: "Bought these as a gift. The packaging was beautiful and the filigree work is very intricate. High quality!",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      }
    ]
  },
  {
    id: "p10",
    name: "Oxidized Antique Silver Jhumkas",
    category: "fashion",
    price: 89.99,
    description: "Exquisite hand-carved oxidized sterling silver earrings. Embellished with vintage floral stud motifs, intricate tribal engravings, and a dark antique finish that coordinates beautifully with bohemian and ethnic outfits.",
    stock: 15,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Made of high-grade 925 sterling silver",
      "Artisanal oxidized dark polish for vintage appeal",
      "Floral stud setting with dangling bell dome",
      "Comfortable lightweight ear hook wear style",
      "Perfect match for cotton sarees, kurtas, and boho wear"
    ],
    specifications: {
      "Metal": "925 Sterling Silver",
      "Finish": "Oxidized Antique Black",
      "Weight": "14 grams per pair",
      "Length": "2.8 inches (7.1 cm)",
      "Style": "Ethnic Bohemian Tribal"
    },
    priceHistory: [
      { date: "Jan 2026", price: 109.99 },
      { date: "Feb 2026", price: 99.99 },
      { date: "Mar 2026", price: 99.99 },
      { date: "Apr 2026", price: 89.99 },
      { date: "May 2026", price: 89.99 },
      { date: "Jun 2026", price: 89.99 }
    ],
    reviews: [
      {
        id: "r10_1",
        author: "Ananya Sen",
        rating: 5,
        date: "2026-05-18",
        comment: "Perfect vintage finish! The details are so clear and they are not heavy at all. Wore them with a black handloom saree and it looked amazing.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 97
      }
    ]
  },
  {
    id: "p11",
    name: "Luxury Diamond & Pearl Jhumkas",
    category: "fashion",
    price: 299.99,
    description: "Unmatched grandeur. Masterfully designed 18k yellow gold-plated earrings featuring a floral stud sparkling with simulated VVS diamonds, centering a premium freshwater button pearl, with a diamond-paved bell housing delicate pearl drops.",
    stock: 5,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "18k Yellow Gold and Platinum dual-plating",
      "Paved with premium brilliant-cut simulated VVS diamonds",
      "Natural freshwater button pearl centers",
      "Exquisite micro-setting craftsmanship",
      "Packaged in a premium velvet LED collector box"
    ],
    specifications: {
      "Metal": "18k Gold Plated 925 Sterling Silver",
      "Stones": "VVS Simulated Diamonds & Freshwater Pearls",
      "Weight": "16 grams per pair",
      "Length": "2.6 inches (6.6 cm)",
      "Backing": "Comfort push-back with safety stabilizer"
    },
    priceHistory: [
      { date: "Jan 2026", price: 349.99 },
      { date: "Feb 2026", price: 329.99 },
      { date: "Mar 2026", price: 319.99 },
      { date: "Apr 2026", price: 299.99 },
      { date: "May 2026", price: 299.99 },
      { date: "Jun 2026", price: 299.99 }
    ],
    reviews: [
      {
        id: "r11_1",
        author: "Meera Nair",
        rating: 5,
        date: "2026-06-03",
        comment: "Breathtaking design. They sparkle like real diamonds under wedding lighting. The pearl drops add such a royal touch!",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      }
    ]
  },
  {
    id: "p12",
    name: "Silken Heritage Banarasi Saree",
    category: "fashion",
    price: 149.99,
    description: "A timeless masterpiece of handloom elegance. Woven from pure Katan silk with elaborate zari work in antique gold floral designs, perfect for wedding celebrations and heritage gatherings.",
    stock: 6,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Woven from 100% authentic Katan Silk",
      "Intricate hand-woven Zari borders and pallu",
      "Includes matching unstitched silk blouse fabric",
      "Delivered in protective silk wrapping wrap",
      "Supports traditional artisan handloom weavers"
    ],
    specifications: {
      "Fabric": "Pure Katan Silk with gold thread zari",
      "Length": "5.5 meters + 0.8 meters blouse piece",
      "Care": "Dry clean only to maintain silk luster",
      "Origin": "Varanasi, India",
      "Weave Style": "Kadwa handloom weave"
    },
    priceHistory: [
      { date: "Jan 2026", price: 169.99 },
      { date: "Feb 2026", price: 159.99 },
      { date: "Mar 2026", price: 149.99 },
      { date: "Apr 2026", price: 149.99 },
      { date: "May 2026", price: 149.99 },
      { date: "Jun 2026", price: 149.99 }
    ],
    reviews: [
      {
        id: "r12_1",
        author: "Devi P.",
        rating: 5,
        date: "2026-05-10",
        comment: "Absolutely gorgeous saree. The weight of the silk is solid and the zari shine is very elegant, not gaudy at all. Perfect!",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 98
      }
    ]
  },
  {
    id: "p13",
    name: "SmartGlow Vanity Makeup Mirror",
    category: "smarthome",
    price: 69.99,
    description: "Perfect lighting for flawless results. Featuring voice-controlled LED bars, app-customizable lighting temperatures, magnification zones, and an integrated wireless charger base for your smartphone.",
    stock: 18,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Infinite brightness adjustment with smart touch bar",
      "Voice compatibility with Alexa and Google Assistant",
      "Detachable 10x magnetic zoom mirror included",
      "10W Qi wireless charger built into base plate",
      "Custom presets for outdoor, office, and evening light"
    ],
    specifications: {
      "Mirror Glass": "Ultra-clear zero-distortion silver mirror",
      "Illumination": "High-index CRI 95 LEDs (500 Lumens)",
      "Colors": "Warm, Natural, Cool (2700K - 6500K)",
      "Wireless Output": "10 Watts",
      "Power Connection": "USB-C input"
    },
    priceHistory: [
      { date: "Jan 2026", price: 79.99 },
      { date: "Feb 2026", price: 79.99 },
      { date: "Mar 2026", price: 69.99 },
      { date: "Apr 2026", price: 69.99 },
      { date: "May 2026", price: 69.99 },
      { date: "Jun 2026", price: 69.99 }
    ],
    reviews: [
      {
        id: "r13_1",
        author: "Sarah J.",
        rating: 4,
        date: "2026-05-24",
        comment: "Excellent lights. The phone charger is super convenient. I wish the magnification mirror was slightly larger, but otherwise, it is great.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 95
      }
    ]
  },
  {
    id: "p14",
    name: "AuraHome RoboVac Cleaner",
    category: "electronics",
    price: 299.99,
    description: "Hands-free home maintenance. Equipped with LiDAR mapping, 4000Pa strong suction, automatic carpet boost, app scheduling, and a self-emptying base dock that holds up to 60 days of debris.",
    stock: 9,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518314916301-469f3a3c2602?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Precision LiDAR room mapping & obstacle bypass",
      "4000Pa Hyper-Suction picks up pet hair effortlessly",
      "Smart scheduling and custom room cleaning zones",
      "Auto-empties into dust containment bag in base",
      "Up to 150 minutes battery runtime per charge"
    ],
    specifications: {
      "Suction Power": "4000 Pascals",
      "LiDAR Range": "8 meters scanning radius",
      "Dustbin Capacity": "400 ml (Robot) / 2.5L (Base Dock)",
      "Battery Capacity": "5200 mAh Lithium-ion",
      "Noise Level": "65 dB"
    },
    priceHistory: [
      { date: "Jan 2026", price: 349.99 },
      { date: "Feb 2026", price: 329.99 },
      { date: "Mar 2026", price: 299.99 },
      { date: "Apr 2026", price: 299.99 },
      { date: "May 2026", price: 299.99 },
      { date: "Jun 2026", price: 299.99 }
    ],
    reviews: [
      {
        id: "r14_1",
        author: "Linus Tech",
        rating: 5,
        date: "2026-06-01",
        comment: "Mapping takes only one run. The suction easily handles carpet fibers. Self-emptying dock works flawlessly. Essential smart home upgrade.",
        verified: true,
        sentiment: "Positive",
        aiVerifiedScore: 99
      }
    ]
  }
];

// Post-process productsData to inject Blockchain credentials and AI Pros/Cons summaries
productsData.forEach(p => {
  p.blockchainDetails = {
    genesisBlock: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    blockHeight: 843900 + Math.floor(Math.random() * 5000),
    hash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(""),
    origin: p.category === "furniture" ? "Sustainably Sourced European Workshop" :
            p.category === "fashion" ? "Artisanal Heritage Workshop, Jaipur, India" :
            "ISO-Certified Smart Electronics Facility"
  };

  // Generate generic Pros and Cons if not defined
  if (!p.aiReviewSummary) {
    p.aiReviewSummary = {
      pros: [
        "Highly durable premium build materials",
        "Seamless integration with modern smart systems",
        "Outstanding value for its target category"
      ],
      cons: [
        "Slight learning curve for setting app configurations",
        "Higher cost tier than standard entry alternatives"
      ]
    };
  }
});

// Customizations for specific items
const chair = productsData.find(x => x.id === "p1");
if (chair) {
  chair.aiReviewSummary.pros = ["Incredible spinal comfort and lumbar support", "App posture tracking works-flawlessly", "Very breathable elastomer mesh"];
  chair.aiReviewSummary.cons = ["Quite heavy to move around", "Higher price point"];
}

const headphones = productsData.find(x => x.id === "p2");
if (headphones) {
  headphones.aiReviewSummary.pros = ["Stellar active noise cancelling (ANC)", "40 hours long battery life", "LDAC hi-res audio clarity"];
  headphones.aiReviewSummary.cons = ["Touch controls can be overly sensitive", "Carry case is slightly bulky"];
}

const jhumkas = productsData.find(x => x.id === "p9");
if (jhumkas) {
  jhumkas.aiReviewSummary.pros = ["Incredibly intricate handcrafted gold filigree", "Lightweight despite premium look", "Freshwater pearls add a rich shimmer"];
  jhumkas.aiReviewSummary.cons = ["Requires delicate storage care to avoid tarnishing"];
}

// Export so other modules can consume
window.productsData = productsData;
