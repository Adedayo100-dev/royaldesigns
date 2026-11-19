# Royal Designs — royaldesigns.com.ng

Online shop for **Royal Designs**, handcrafted shoes made to order (est. 2017).
Plain HTML, CSS and JavaScript, so there's no build step. It's hosted on Netlify.

## What's in it

| Path | What it is |
|---|---|
| `index.html` | The whole page: hero, shop, size guide, bespoke, bag and checkout, footer |
| `css/styles.css` | All styles (white theme, Michroma + Inter) |
| `js/products.js` | **The catalogue.** Edit names, prices, categories, colours and photos here |
| `js/config.js` | WhatsApp number, email, Paystack public key |
| `js/app.js` | Shop filters, colour/size picker, bag (saved in the browser), checkout |
| `netlify/functions/verify-payment.js` | Confirms Paystack payments server-side |
| `netlify.toml` | Netlify settings and security headers |
| `assets/` | Logos, monogram, favicon |

## Editing products

Open `js/products.js`. Each shoe has a list of colours:

```js
colours: [['Black calf', '#151515'], ['Cognac calf', '#9C5A2B']]
```

To use a real photo for a colour, put the image in `assets/products/` and add its path as a third item:

```js
['Black calf', '#151515', '/assets/products/sovereign-black.jpg']
```

Use 4:5 portrait photos on a plain light background, around 1200×1500 px, saved as JPG or WebP under 300 KB.

## How orders work right now

Leave `paystackPublicKey` empty in `js/config.js`, and every order opens WhatsApp (+234 810 008 9904) with the items, sizes, colours and delivery details already filled in.

## Turning on online payments (Paystack)

1. Royal Designs creates a Paystack business account and gets it activated.
2. In `js/config.js`, set `paystackPublicKey` to the **public** key (`pk_live_…`).
3. In Netlify, go to **Site configuration → Environment variables** and add `PAYSTACK_SECRET_KEY` = the **secret** key (`sk_live_…`). Never commit the secret key.
4. Deploy. Card, bank transfer and USSD then open the Paystack window. The site confirms each payment through `/.netlify/functions/verify-payment` before showing "Payment confirmed".

Test first with the `pk_test_` / `sk_test_` keys.

## Deploying

The site is connected to Netlify from this GitHub repo. Every push to `main` deploys.
Each production deploy uses Netlify credits, so batch changes rather than pushing every small tweak.

---
Site by [Dee-Why](https://taiwoadedayo.net)
