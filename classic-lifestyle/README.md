# Classic Lifestyle Carwash & Shisanyama — Website

**Blackhurst, Durban, KwaZulu-Natal**

---

## How to Open the Website

Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

No installation, no build step, no terminal required.

---

## How to Update Business Information

All business information is stored in one file:

**`src/config/siteConfig.js`**

Open this file in any text editor (Notepad, VS Code, etc.) and update the values.
The website will reflect your changes automatically when you refresh the browser.

---

## What You Can Update

### Business Name & Tagline
```js
business: {
  name: "Classic Lifestyle",
  subtitle: "Carwash & Shisanyama",
  tagline: "Fresh Cars. Good Food. Great Vibes.",
  // ...
}
```

### Phone Number
```js
contact: {
  phone: "0659665903",           // digits only
  phoneDisplay: "065 966 5903",  // formatted display
}
```

### WhatsApp Number
```js
contact: {
  whatsapp: null,  // Change null to "27XXXXXXXXX" (country code + number)
                   // e.g. "27659665903"
}
```
The WhatsApp button will automatically appear once this is set.

### Address & Google Maps
```js
address: {
  street: "15 121005 St",
  suburb: "Blackhurst",
  city: "Durban",
  postalCode: "4091",
  // ...
  mapEmbedUrl: "...",      // Replace with your exact Google Maps embed URL
  directionsUrl: "...",   // Replace with your exact Google Maps directions URL
}
```

**To get your Google Maps Embed URL:**
1. Go to Google Maps and search for your business
2. Click **Share** → **Embed a map**
3. Copy the `src="..."` URL from the iframe code

### Opening Hours
```js
hours: [
  { day: "Monday", open: "07:30", close: "17:30", isOpen: true },
  // ...
  { day: "Sunday", open: null, close: null, isOpen: false },  // closed
]
```

### Car Wash Services
```js
carwashServices: [
  {
    name: "Basic Wash",
    description: "Full exterior rinse and wash.",
    price: "R 80",       // or null to hide pricing
    featured: false,     // set true to highlight as "Popular"
  },
  // ...
]
```

### Food Menu
```js
foodMenu: {
  categories: [
    { id: "meat", label: "Meat", icon: "🔥" },
    // ...
  ],
  items: [
    { category: "meat", name: "Braai Chicken", description: "...", price: "R 65", available: true },
    // ...
  ],
}
```

### Gallery Photos
Replace the Unsplash URLs with your own photos:
```js
gallery: [
  {
    src: "your-photo-url-or-local-path.jpg",
    alt: "Description of the photo",
    category: "carwash",   // or "food" or "atmosphere"
  },
  // ...
]
```

**To use your own photos:**
1. Copy your photos into the `assets/images/` folder (create it if needed)
2. Update the `src` value to `"assets/images/your-photo.jpg"`

### Social Media
```js
social: {
  facebook:  "https://facebook.com/your-page",
  instagram: "https://instagram.com/your-account",
  tiktok:    null,   // null = hidden
  twitter:   null,
}
```
Social icons only appear if a URL is provided.

---

## Hosting the Website

This website is a standard static site and can be hosted anywhere:

| Service | How |
|---|---|
| **Netlify** | Drag and drop the `classic-lifestyle` folder at netlify.com |
| **Vercel** | Upload via vercel.com |
| **GitHub Pages** | Push to a GitHub repository and enable Pages |
| **Shared Hosting** | Upload files via FTP (cPanel, Plesk, etc.) |

---

## Replacing Gallery Photos

The gallery currently uses placeholder photos from Unsplash for demonstration.
When you have real photos of the business:

1. Create an `assets/images/` folder inside the project
2. Copy your photos there (JPG or WebP recommended)
3. Open `src/config/siteConfig.js`
4. Update each gallery item's `src` value:
   ```js
   { src: "assets/images/carwash-exterior.jpg", alt: "Our car wash", category: "carwash" }
   ```

---

## Technical Notes

- Built with HTML5, CSS3, and vanilla JavaScript (no framework required)
- ES Modules — works with any modern browser
- Mobile-first responsive design (tested at 375px, 390px, 414px, 768px, 1024px, 1440px)
- Zero npm dependencies — no build step ever needed
- All animations respect `prefers-reduced-motion`

---

*Site built for Classic Lifestyle Carwash & Shisanyama, Blackhurst, Durban.*
