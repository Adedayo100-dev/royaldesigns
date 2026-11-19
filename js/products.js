/*
 * Royal Designs — product catalogue.
 *
 * Photos are real Royal Designs work. PRODUCT NAMES AND PRICES ARE STILL
 * PLACEHOLDERS — replace them with the real ones from Royal Designs.
 *
 * Each product:
 *   id       short unique id (letters/numbers, no spaces)
 *   name     product name
 *   cat      one of the categories in RD_CATEGORIES below
 *   price    price in Naira (whole number, no commas)
 *   note     one short line about the shoe
 *   colours  list of [colour/material name, swatch hex, [photo paths]]
 *            The first photo is the main one; extra photos show as a gallery.
 *            Leave the photo list empty ([]) for a colour with no photo yet.
 *
 * Photos: put them in /assets/products/ as 800×1000 (4:5) .webp or .jpg.
 */
window.RD_PRODUCTS = [
  { id: 'penny', name: 'The Sovereign Penny Loafer', cat: 'Loafers', price: 85000,
    note: 'Classic penny loafer in smooth black calf, lined in leather.',
    colours: [['Black leather', '#151515', ['/assets/products/penny-loafer-black.webp']]] },

  { id: 'suede-loafer', name: 'Monarch Suede Loafer', cat: 'Loafers', price: 80000,
    note: 'Soft unstructured suede loafer on a light cream sole.',
    colours: [['Black suede', '#1A1C22', ['/assets/products/suede-loafer-black-1.webp', '/assets/products/suede-loafer-black-2.webp']]] },

  { id: 'woven-monk', name: 'Duke Woven Monk Loafer', cat: 'Loafers', price: 98000,
    note: 'Hand-woven black leather with a double monk strap.',
    colours: [['Black woven leather', '#151515', ['/assets/products/woven-monk-black.webp']]] },

  { id: 'derby', name: 'Crown Derby', cat: 'Lace-ups', price: 95000,
    note: 'Plain-toe derby in polished brown leather.',
    colours: [['Brown leather', '#4A2E1E', ['/assets/products/derby-brown.webp']]] },

  { id: 'chelsea', name: 'Monarch Chelsea Boot', cat: 'Boots', price: 120000,
    note: 'Chelsea boot with a raised Cuban heel and elastic sides.',
    colours: [
      ['Black suede', '#1A1C22', ['/assets/products/chelsea-suede-black-1.webp', '/assets/products/chelsea-suede-black-2.webp', '/assets/products/chelsea-suede-black-3.webp']],
      ['Black leather', '#0E0E0E', ['/assets/products/chelsea-leather-black.webp']]
    ] },

  { id: 'buckle-slipper', name: 'Regal Buckle Slipper', cat: 'Slippers', price: 45000,
    note: 'Toe-post slipper in black leather with a side buckle strap.',
    colours: [['Black leather', '#151515', ['/assets/products/buckle-slipper-black-1.webp', '/assets/products/buckle-slipper-black-2.webp']]] },

  { id: 'cross-slipper', name: 'Palace Cross Slipper', cat: 'Slippers', price: 40000,
    note: 'Crossover straps in textured black leather on a square sole.',
    colours: [['Black textured leather', '#151515', ['/assets/products/cross-slipper-black.webp']]] },

  { id: 'sandal', name: 'Throne Sandal', cat: 'Sandals', price: 55000,
    note: 'Closed-toe leather sandal with heel strap and metal ornament.',
    colours: [['Black leather', '#151515', ['/assets/products/sandal-black.webp']]] }
];

window.RD_CATEGORIES = ['All', 'Loafers', 'Lace-ups', 'Boots', 'Slippers', 'Sandals'];
window.RD_SIZES = ['39', '40', '41', '42', '43', '44', '45', '46', '47'];

/* EU, UK, US (men), foot length cm — approximate; confirm against the workshop's lasts. */
window.RD_SIZE_CHART = [
  ['39', '5.5', '6.5', '24.5'], ['40', '6.5', '7.5', '25.0'], ['41', '7', '8', '26.0'],
  ['42', '8', '9', '26.5'], ['43', '9', '10', '27.5'], ['44', '9.5', '10.5', '28.0'],
  ['45', '10.5', '11.5', '29.0'], ['46', '11', '12', '29.5'], ['47', '12', '13', '30.5']
];
