/*
 * Royal Designs — product catalogue.
 *
 * SAMPLE DATA: names, prices and colour lists are placeholders until the
 * real ones come from Royal Designs.
 *
 * Each product:
 *   id       short unique id (letters/numbers, no spaces)
 *   name     product name
 *   cat      one of: Loafers, Oxfords, Boots, Mules, Sandals
 *   price    price in Naira (whole number, no commas)
 *   note     one short line about the shoe
 *   colours  list of [colour name, swatch hex, optional photo path]
 *            e.g. ['Black calf', '#151515', '/assets/products/sovereign-black.jpg']
 *            When a photo path is set it replaces the drawn shoe outline.
 */
window.RD_PRODUCTS = [
  { id: 'p1', name: 'The Sovereign Loafer', cat: 'Loafers', price: 85000, note: 'Penny loafer on a hand-stitched sole.',
    colours: [['Black calf', '#151515'], ['Dark brown calf', '#4A2E1E'], ['Cognac calf', '#9C5A2B'], ['Burgundy calf', '#5E1A22']] },
  { id: 'p2', name: 'Crown Oxford', cat: 'Oxfords', price: 95000, note: 'Cap-toe oxford, hand-burnished.',
    colours: [['Black calf', '#151515'], ['Oxblood calf', '#4F1515'], ['Tan calf', '#B07A47']] },
  { id: 'p3', name: 'Monarch Chelsea Boot', cat: 'Boots', price: 120000, note: 'Elastic-sided boot with a pull tab.',
    colours: [['Black suede', '#1E1E1E'], ['Brown suede', '#5B3A26'], ['Taupe suede', '#8E7F70'], ['Black calf', '#151515']] },
  { id: 'p4', name: 'Palace Mule', cat: 'Mules', price: 65000, note: 'Backless mule in soft suede.',
    colours: [['Black suede', '#1E1E1E'], ['Navy suede', '#1F2A44'], ['Olive suede', '#5A5A3A'], ['Wine suede', '#5A1E2C']] },
  { id: 'p5', name: 'Duke Monk Strap', cat: 'Oxfords', price: 98000, note: 'Double monk strap with brass buckles.',
    colours: [['Black calf', '#151515'], ['Dark brown calf', '#4A2E1E']] },
  { id: 'p6', name: 'Heir Tassel Loafer', cat: 'Loafers', price: 88000, note: 'Unlined tassel loafer, soft and light.',
    colours: [['Cognac calf', '#9C5A2B'], ['Black calf', '#151515'], ['Burgundy calf', '#5E1A22']] },
  { id: 'p7', name: 'Regal Palm Slipper', cat: 'Sandals', price: 35000, note: 'Hand-cut leather slide.',
    colours: [['Black', '#151515'], ['Brown', '#5B3A26'], ['White', '#F2F0EC'], ['Tan', '#B07A47']] },
  { id: 'p8', name: 'Throne Sandal', cat: 'Sandals', price: 45000, note: 'Cross-strap sandal on a leather sole.',
    colours: [['Black', '#151515'], ['Brown', '#5B3A26'], ['Tan', '#B07A47']] }
];

window.RD_CATEGORIES = ['All', 'Loafers', 'Oxfords', 'Boots', 'Mules', 'Sandals'];
window.RD_SIZES = ['39', '40', '41', '42', '43', '44', '45', '46', '47'];

/* EU, UK, US (men), foot length cm — approximate; confirm against the workshop's lasts. */
window.RD_SIZE_CHART = [
  ['39', '5.5', '6.5', '24.5'], ['40', '6.5', '7.5', '25.0'], ['41', '7', '8', '26.0'],
  ['42', '8', '9', '26.5'], ['43', '9', '10', '27.5'], ['44', '9.5', '10.5', '28.0'],
  ['45', '10.5', '11.5', '29.0'], ['46', '11', '12', '29.5'], ['47', '12', '13', '30.5']
];
