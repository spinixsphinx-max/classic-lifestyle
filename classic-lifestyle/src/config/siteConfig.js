/**
 * ============================================================
 *  CLASSIC LIFESTYLE CARWASH & SHISANYAMA — SITE CONFIGURATION
 * ============================================================
 *
 *  This file controls all business information on the website.
 *  Update any value here and the site will reflect the change
 *  automatically — no need to edit the HTML or CSS files.
 *
 *  HOW TO USE:
 *  - Replace null values with actual information when confirmed
 *  - Phone numbers should be digits only (no spaces or dashes)
 *  - WhatsApp number must include country code (e.g. "27659665903")
 *  - Set social media URLs to null to hide those icons
 *  - Prices: use a string like "R 80" or null to hide pricing
 * ============================================================
 */

const siteConfig = {

  // ──────────────────────────────────────────────
  //  BUSINESS IDENTITY
  // ──────────────────────────────────────────────
  business: {
    name: "Classic Lifestyle",
    subtitle: "Carwash & Shisanyama",
    tagline: "Fresh Cars. Good Food. Great Vibes.",
    description:
      "Classic Lifestyle brings together professional car washing services and an authentic shisanyama experience in Blackhurst, Durban. Drop off your vehicle for a wash, relax, and enjoy freshly grilled food in a warm, welcoming environment.",
  },

  // ──────────────────────────────────────────────
  //  CONTACT INFORMATION
  // ──────────────────────────────────────────────
  contact: {
    phone: "0659665903",           // digits only — used in tel: links
    phoneDisplay: "065 966 5903",  // formatted — shown to visitors
    whatsapp: null,                // set to "27XXXXXXXXX" when confirmed by owner
    email: null,                   // set to email address when confirmed
  },

  // ──────────────────────────────────────────────
  //  ADDRESS & MAP
  // ──────────────────────────────────────────────
  address: {
    street: "15 121005 St",
    suburb: "Blackhurst",
    city: "Durban",
    postalCode: "4091",
    province: "KwaZulu-Natal",
    country: "South Africa",
    // Google Maps embed URL
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.5!2d30.8958!3d-29.8587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDUxJzMxLjMiUyAzMMKwNTMnNDUuMCJF!5e0!3m2!1sen!2sza!4v1700000000000",
    // Google Maps directions URL
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=15+121005+St+Blackhurst+Durban+4091+South+Africa",
  },

  // ──────────────────────────────────────────────
  //  OPENING HOURS
  // ──────────────────────────────────────────────
  hours: [
    { day: "Monday",    open: "07:30", close: "17:30", isOpen: true },
    { day: "Tuesday",   open: "07:30", close: "17:30", isOpen: true },
    { day: "Wednesday", open: "07:30", close: "17:30", isOpen: true },
    { day: "Thursday",  open: "07:30", close: "17:30", isOpen: true },
    { day: "Friday",    open: "07:30", close: "17:30", isOpen: true },
    { day: "Saturday",  open: "07:30", close: "17:30", isOpen: true },
    { day: "Sunday",    open: null,    close: null,    isOpen: false },
  ],

  // ──────────────────────────────────────────────
  //  CARWASH SERVICES
  //  Set price to null to display "Contact us for pricing"
  // ──────────────────────────────────────────────
  carwashServices: [
    {
      id: "exterior",
      category: "Exterior Wash",
      name: "Exterior Wash",
      description: "Thorough exterior foam wash, high-pressure rinse, and window streak-free clean.",
      price: null,
      icon: "droplets",
      featured: false,
    },
    {
      id: "interior",
      category: "Interior Cleaning",
      name: "Interior Clean",
      description: "Complete interior vacuuming, dashboard dust down, and console trim detailing.",
      price: null,
      icon: "armchair",
      featured: false,
    },
    {
      id: "valet",
      category: "Full Valet",
      name: "Full Wash & Valet",
      description: "Comprehensive wash package including exterior shine, deep interior clean, and tire dressing.",
      price: null,
      icon: "sparkles",
      featured: true,
    },
    {
      id: "custom",
      category: "Other Services",
      name: "Specialized Detailing",
      description: "Engine bay cleaning, exterior hand wax polish, and customized vehicle care options.",
      price: null,
      icon: "crown",
      featured: false,
    },
  ],

  // ──────────────────────────────────────────────
  //  FOOD MENU / SHISANYAMA
  // ──────────────────────────────────────────────
  foodMenu: {
    categories: [
      { id: "meat",   label: "Meat & Poultry", icon: "🔥" },
      { id: "grills", label: "Traditional Grills", icon: "🥩" },
      { id: "sides",  label: "Sides & Extras", icon: "🌽" },
      { id: "drinks", label: "Beverages", icon: "🥤" },
    ],
    items: [
      // MEAT
      { category: "meat",   name: "Flame-Grilled Chicken", description: "Marinated chicken braaied slowly over hot charcoal coals.", price: null, available: true },
      { category: "meat",   name: "Pork Chops",            description: "Tender chops seasoned with classic spice mix.", price: null, available: true },
      { category: "meat",   name: "Beef Ribs",             description: "Succulent ribs charred to perfection on the braai.", price: null, available: true },
      { category: "meat",   name: "Lamb Chops",            description: "Flavorful lamb cuts grilled over open coals.", price: null, available: true },
      // GRILLS
      { category: "grills", name: "Traditional Boerewors", description: "Authentic spiced South African sausage grilled fresh.", price: null, available: true },
      { category: "grills", name: "T-Bone Steak",          description: "Generous cut steak flame-cooked to your preference.", price: null, available: true },
      { category: "grills", name: "Beef & Pork Sosaties",  description: "Traditional marinated meat skewers braaied over coals.", price: null, available: true },
      { category: "grills", name: "Mixed Shisanyama Platter", description: "A combination selection of fresh braai meats.", price: null, available: true },
      // SIDES
      { category: "sides",  name: "Pap & Chakalaka",       description: "Freshly cooked maize meal with spicy vegetable relish.", price: null, available: true },
      { category: "sides",  name: "Charred Corn (Mielies)", description: "Sweet corn on the cob braaied over charcoal.", price: null, available: true },
      { category: "sides",  name: "Fresh Coleslaw",        description: "Crisp cabbage and carrot salad with light dressing.", price: null, available: true },
      { category: "sides",  name: "Toasted Garlic Bread",  description: "Warm, buttery loaf grilled over the braai.", price: null, available: true },
      // DRINKS
      { category: "drinks", name: "Cold Soft Drinks",      description: "Assorted chilled sodas and sparkling drinks.", price: null, available: true },
      { category: "drinks", name: "Fruit Juices",          description: "Refreshing cold fruit juice options.", price: null, available: true },
      { category: "drinks", name: "Mineral Water",         description: "Still and sparkling bottled water.", price: null, available: true },
      { category: "drinks", name: "Hot Beverages",         description: "Freshly brewed coffee and tea selections.", price: null, available: true },
    ],
  },

  // ──────────────────────────────────────────────
  //  GALLERY IMAGES
  // ──────────────────────────────────────────────
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
      alt: "Professional vehicle soap wash and detail",
      category: "carwash",
    },
    {
      src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=85&fit=crop",
      alt: "Authentic shisanyama grilled meat over charcoal coals",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85&fit=crop",
      alt: "Clean glossy car finish after washing",
      category: "carwash",
    },
    {
      src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=85&fit=crop",
      alt: "Sizzling braai meat cooking over open fire",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=85&fit=crop",
      alt: "Detailed car wash rim and wheel cleaning",
      category: "carwash",
    },
    {
      src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=85&fit=crop",
      alt: "Freshly prepared South African barbecue meal",
      category: "food",
    },
    {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&fit=crop",
      alt: "Spotless vehicle exterior shine",
      category: "carwash",
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&fit=crop",
      alt: "Welcoming outdoor dining and social seating atmosphere",
      category: "atmosphere",
    },
  ],

  // ──────────────────────────────────────────────
  //  SOCIAL MEDIA
  // ──────────────────────────────────────────────
  social: {
    facebook:  null,
    instagram: null,
    tiktok:    null,
    twitter:   null,
  },

  // ──────────────────────────────────────────────
  //  HERO IMAGES
  // ──────────────────────────────────────────────
  heroImages: [
    "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1600&q=90&fit=crop",
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1600&q=90&fit=crop",
  ],
};

if (typeof window !== 'undefined') {
  window.siteConfig = siteConfig;
}


