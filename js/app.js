/* Royal Designs — shop, bag and checkout */
(function () {
  'use strict';

  var CFG = window.RD_CONFIG;
  var P = window.RD_PRODUCTS;
  var byId = {};
  P.forEach(function (p) { byId[p.id] = p; });

  var STORE_KEY = 'rd-bag-v2';
  var state = { cat: 'All', sel: P[0].id, col: {}, photo: 0, size: null, needSize: false, pay: 'card', bag: loadBag() };

  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return '₦' + Number(n).toLocaleString('en-NG'); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function loadBag() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      var clean = {};
      Object.keys(raw).forEach(function (k) {
        var p = byId[k.split('|')[0]];
        var ci = Number(k.split('|')[2]);
        if (p && p.colours[ci] && raw[k] > 0) clean[k] = Math.min(20, Math.floor(raw[k]));
      });
      return clean;
    } catch (e) { return {}; }
  }
  function saveBag() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state.bag)); } catch (e) { /* storage unavailable */ } }

  var SHOE = 'M14 74 C12 60 26 52 52 50 C74 48 92 40 108 34 C122 29 134 31 146 40 C160 50 186 54 210 60 C224 64 230 70 228 76 C227 80 222 82 214 82 L28 82 C18 82 14 79 14 74 Z';
  function photosOf(p, i) {
    var ph = p.colours[i][2];
    return Array.isArray(ph) ? ph : (ph ? [ph] : []);
  }
  function media(p, ci, n, eager) {
    var c = p.colours[ci];
    var ph = photosOf(p, ci);
    if (ph.length) {
      var k = Math.min(n || 0, ph.length - 1);
      return '<img src="' + esc(ph[k]) + '" alt="' + esc(p.name + ' in ' + c[0].toLowerCase() + (ph.length > 1 ? ', photo ' + (k + 1) + ' of ' + ph.length : '')) + '" width="800" height="1000"' + (eager ? '' : ' loading="lazy"') + ' decoding="async">';
    }
    return '<svg viewBox="0 0 240 100" aria-hidden="true"><path d="' + SHOE + '" fill="' + esc(c[1]) + '" stroke="#111" stroke-opacity=".35" stroke-width="1"/><path d="M28 82 L28 89 L64 89 L64 82 Z" fill="#2A2A2A"/></svg>';
  }
  var ci = function (id) { return state.col[id] || 0; };

  /* ---------- render ---------- */
  function renderCats() {
    $('cats').innerHTML = window.RD_CATEGORIES.map(function (c) {
      return '<button type="button" class="tab" data-cat="' + esc(c) + '" aria-pressed="' + (c === state.cat) + '">' + esc(c) + '</button>';
    }).join('');
  }

  function swatches(p, cls) {
    return p.colours.map(function (c, i) {
      var on = i === ci(p.id);
      if (cls === 'chip') {
        return '<button type="button" role="radio" class="chip" aria-checked="' + on + '" data-col="' + p.id + ':' + i + '"><span class="dot" style="background:' + esc(c[1]) + '"></span>' + esc(c[0]) + '</button>';
      }
      return '<button type="button" role="radio" class="swatch" aria-checked="' + on + '" aria-label="' + esc(c[0]) + '" title="' + esc(c[0]) + '" data-col="' + p.id + ':' + i + '"><span class="dot" style="background:' + esc(c[1]) + '"></span></button>';
    }).join('');
  }

  function renderGrid() {
    var list = P.filter(function (p) { return state.cat === 'All' || p.cat === state.cat; });
    $('grid').innerHTML = list.map(function (p) {
      var c = p.colours[ci(p.id)];
      return '<article class="card">' +
        '<button type="button" class="card-media' + (state.sel === p.id ? ' is-selected' : '') + '" data-open="' + p.id + '" aria-label="View ' + esc(p.name) + '">' + media(p, ci(p.id)) + '</button>' +
        '<div class="card-top"><h3>' + esc(p.name) + '</h3><span class="price">' + fmt(p.price) + '</span></div>' +
        '<span class="card-sub">' + esc(c[0]) + ' · ' + p.colours.length + (p.colours.length === 1 ? ' colour' : ' colours') + '</span>' +
        (p.colours.length > 1 ? '<div class="swatches" role="radiogroup" aria-label="' + esc(p.name) + ' colours">' + swatches(p) + '</div>' : '') +
        '<button type="button" class="btn btn-line" data-open="' + p.id + '">Choose size</button>' +
        '</article>';
    }).join('');
  }

  function keyFor(id) { return id + '|' + state.size + '|' + ci(id); }

  function renderDetail() {
    var p = byId[state.sel];
    var c = p.colours[ci(p.id)];
    var inBag = state.size ? (state.bag[keyFor(p.id)] || 0) : 0;
    var sizeText = state.size ? (state.size === 'Bespoke' ? 'Bespoke — we will contact you' : 'EU ' + state.size) : 'Select a size';
    var sizes = window.RD_SIZES.concat(['Bespoke']).map(function (z) {
      return '<button type="button" role="radio" class="size" aria-checked="' + (z === state.size) + '" data-size="' + z + '">' + z + '</button>';
    }).join('');
    var label = state.size ? (inBag ? 'Added (' + inBag + ') · Add another — ' : 'Add to bag — ') + fmt(p.price) : 'Select a size';
    var ph = photosOf(p, ci(p.id));
    var thumbs = ph.length > 1 ? '<div class="thumbs" role="group" aria-label="More photos">' + ph.map(function (src, n) {
      return '<button type="button" class="thumb" data-photo="' + n + '" aria-pressed="' + (n === state.photo) + '" aria-label="Photo ' + (n + 1) + ' of ' + ph.length + '"><img src="' + esc(src) + '" alt="" loading="lazy" width="800" height="1000"></button>';
    }).join('') + '</div>' : '';
    $('detail').innerHTML =
      '<div class="detail-media">' + media(p, ci(p.id), state.photo, true) + '<span class="tag">' + esc(p.cat) + '</span></div>' + thumbs +
      '<div class="detail-head"><h3>' + esc(p.name) + '</h3><span class="price">' + fmt(p.price) + '</span></div>' +
      '<p class="muted small">' + esc(p.note) + '</p>' +
      '<div><span class="opt-label">Material &amp; colour — <span>' + esc(c[0]) + '</span></span>' +
      '<div class="chips" role="radiogroup" aria-label="Material and colour">' + swatches(p, 'chip') + '</div></div>' +
      '<div><div class="size-head"><span class="opt-label">Size (EU) — <span>' + sizeText + '</span></span><a href="#sizes">Size guide</a></div>' +
      '<div class="sizes" role="radiogroup" aria-label="EU size">' + sizes + '</div>' +
      (state.needSize ? '<p class="size-alert" role="alert">Please choose your EU size first.</p>' : '') + '</div>' +
      '<button type="button" class="btn ' + (state.size ? 'btn-dark' : 'btn-muted') + ' btn-block" data-add="1">' + label + '</button>' +
      '<a class="ask" href="https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent('Hello Royal Designs, I have a question about the ' + p.name + ' (' + c[0] + ').') + '">Not sure of your size? Ask on WhatsApp</a>';
  }

  function renderChart() {
    $('chart').innerHTML = window.RD_SIZE_CHART.map(function (r) {
      return '<tr' + (r[0] === state.size ? ' class="is-active"' : '') + '><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>';
    }).join('');
  }

  function bagItems() {
    return Object.keys(state.bag).map(function (k) {
      var parts = k.split('|'); var p = byId[parts[0]]; var i = Number(parts[2]);
      return { key: k, p: p, ci: i, size: parts[1], colour: p.colours[i][0], qty: state.bag[k] };
    });
  }
  function totals() {
    var items = bagItems();
    return {
      items: items,
      count: items.reduce(function (a, b) { return a + b.qty; }, 0),
      total: items.reduce(function (a, b) { return a + b.qty * b.p.price; }, 0)
    };
  }
  function sizeName(s) { return s === 'Bespoke' ? 'Bespoke size' : 'EU ' + s; }

  function renderBag() {
    var t = totals();
    $('bag').innerHTML = t.items.length ? t.items.map(function (b) {
      return '<div class="bag-item">' +
        '<div class="bag-thumb">' + media(b.p, b.ci) + '</div>' +
        '<div class="bag-info"><strong>' + esc(b.p.name) + '</strong><span>' + sizeName(b.size) + ' · ' + esc(b.colour) + '</span><span>' + fmt(b.p.price) + ' each</span></div>' +
        '<div class="qty"><button type="button" data-dec="' + esc(b.key) + '" aria-label="Decrease quantity of ' + esc(b.p.name) + '">−</button><span>' + b.qty + '</span><button type="button" data-inc="' + esc(b.key) + '" aria-label="Increase quantity of ' + esc(b.p.name) + '">+</button></div>' +
        '<span class="line-total">' + fmt(b.p.price * b.qty) + '</span></div>';
    }).join('') : '<p class="bag-empty">Your bag is empty — <a href="#shop">choose a pair</a>.</p>';
    document.querySelectorAll('[data-bind="count"]').forEach(function (el) { el.textContent = t.count; });
    document.querySelectorAll('[data-bind="subtotal"]').forEach(function (el) { el.textContent = fmt(t.total); });
    renderPayBtn(t);
  }

  var online = !!CFG.paystackPublicKey;
  var METHODS = [
    { id: 'card', label: 'Debit / credit card', sub: 'Visa · Mastercard · Verve' },
    { id: 'transfer', label: 'Bank transfer', sub: 'Any Nigerian bank' },
    { id: 'ussd', label: 'USSD', sub: 'No internet banking needed' },
    { id: 'wa', label: 'Order on WhatsApp', sub: 'Confirm size and colour with us' }
  ];
  function renderPays() {
    $('pays').innerHTML = METHODS.map(function (m) {
      return '<button type="button" role="radio" class="pay" aria-checked="' + (m.id === state.pay) + '" data-pay="' + m.id + '"><span>' + m.label + '<small>' + m.sub + '</small></span><span class="radio"></span></button>';
    }).join('');
  }
  function renderPayBtn(t) {
    t = t || totals();
    var btn = $('pay-btn');
    btn.disabled = t.count === 0;
    var viaWa = state.pay === 'wa' || !online;
    btn.textContent = t.count === 0 ? 'Your bag is empty' : (viaWa ? 'Send order on WhatsApp' : 'Pay ' + fmt(t.total) + ' securely');
    $('pay-note').textContent = viaWa
      ? (state.pay === 'wa' ? 'We’ll confirm your order and payment details on WhatsApp.' : 'Online payment is coming soon — for now we’ll confirm payment with you on WhatsApp.')
      : 'Secure Naira payments by Paystack.';
  }

  function renderAll() { renderCats(); renderGrid(); renderDetail(); renderChart(); renderBag(); renderPays(); }

  /* ---------- actions ---------- */
  function setQty(key, d) {
    state.bag[key] = Math.max(0, Math.min(20, (state.bag[key] || 0) + d));
    if (!state.bag[key]) delete state.bag[key];
    saveBag(); renderBag(); renderDetail();
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('button, a');
    if (!el) return;
    var d = el.dataset;
    if (d.cat) { state.cat = d.cat; renderCats(); renderGrid(); }
    else if (d.col) {
      var parts = d.col.split(':'); state.col[parts[0]] = Number(parts[1]);
      if (parts[0] === state.sel) state.photo = 0;
      renderGrid(); renderDetail();
    }
    else if (d.open) {
      if (state.sel !== d.open) state.photo = 0;
      state.sel = d.open; state.needSize = false; renderGrid(); renderDetail();
      if (window.matchMedia('(max-width: 960px)').matches) $('detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
      else $('detail').focus({ preventScroll: true });
    }
    else if (d.photo) { state.photo = Number(d.photo); renderDetail(); }
    else if (d.size) { state.size = d.size; state.needSize = false; renderDetail(); renderChart(); }
    else if (d.add) {
      if (!state.size) { state.needSize = true; renderDetail(); return; }
      setQty(keyFor(state.sel), 1);
    }
    else if (d.inc) setQty(d.inc, 1);
    else if (d.dec) setQty(d.dec, -1);
    else if (d.pay) { state.pay = d.pay; renderPays(); renderPayBtn(); }
  });

  /* ---------- checkout ---------- */
  function readForm() {
    var f = $('delivery');
    var data = {}; var bad = [];
    ['name', 'phone', 'email', 'city', 'address', 'state', 'notes'].forEach(function (n) { data[n] = (f.elements[n].value || '').trim(); });
    ['name', 'phone', 'address', 'city', 'state'].forEach(function (n) { if (!data[n]) bad.push(n); });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) bad.push('email');
    f.querySelectorAll('.field').forEach(function (fld) {
      var inp = fld.querySelector('input, select');
      var isBad = bad.indexOf(inp.name) !== -1;
      fld.classList.toggle('invalid', isBad);
      inp.setAttribute('aria-invalid', isBad);
    });
    return { data: data, bad: bad };
  }

  function orderText(t, d, ref) {
    var lines = ['Hello Royal Designs, I would like to place an order:', ''];
    t.items.forEach(function (b) { lines.push('• ' + b.qty + ' × ' + b.p.name + ' — ' + sizeName(b.size) + ', ' + b.colour + ' (' + fmt(b.p.price * b.qty) + ')'); });
    lines.push('', 'Subtotal: ' + fmt(t.total));
    if (ref) lines.push('Paid online — Paystack ref: ' + ref);
    lines.push('', 'Name: ' + d.name, 'Phone: ' + d.phone);
    if (d.email) lines.push('Email: ' + d.email);
    lines.push('Address: ' + d.address + ', ' + d.city + ', ' + d.state);
    if (d.notes) lines.push('Notes: ' + d.notes);
    return lines.join('\n');
  }
  function waLink(text) { return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(text); }

  function showError(msg) { var el = $('form-error'); el.textContent = msg; el.hidden = !msg; }

  function showSuccess(text, link) {
    $('success-text').innerHTML = esc(text) + (link ? '<br><br><a class="btn btn-line" href="' + esc(link) + '" target="_blank" rel="noopener">Send order details on WhatsApp</a>' : '');
    $('success').hidden = false;
    $('success-close').focus();
  }
  $('success-close').addEventListener('click', function () { $('success').hidden = true; location.hash = '#shop'; });

  function loadPaystack(cb) {
    if (window.PaystackPop) return cb();
    var s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.onload = cb;
    s.onerror = function () { showError('Could not load the payment window. Please try again or order on WhatsApp.'); };
    document.head.appendChild(s);
  }

  $('pay-btn').addEventListener('click', function () {
    var t = totals();
    if (!t.count) return;
    var r = readForm();
    if (r.bad.length) { showError('Please fill in the highlighted delivery details.'); $('delivery').querySelector('.invalid input, .invalid select').focus(); return; }
    showError('');
    var d = r.data;

    if (state.pay === 'wa' || !online) {
      window.open(waLink(orderText(t, d)), '_blank', 'noopener');
      showSuccess('Your order has opened in WhatsApp — press send and we’ll confirm your size, colour, delivery and payment.');
      return;
    }

    if (!d.email) { showError('Please add your email — Paystack sends your receipt there.'); $('f-email').focus(); return; }
    var ref = 'RD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    var channels = { card: ['card'], transfer: ['bank_transfer'], ussd: ['ussd'] }[state.pay];
    loadPaystack(function () {
      var handler = window.PaystackPop.setup({
        key: CFG.paystackPublicKey,
        email: d.email,
        amount: t.total * 100,
        currency: CFG.currency,
        ref: ref,
        channels: channels,
        metadata: {
          custom_fields: [
            { display_name: 'Customer', variable_name: 'customer', value: d.name + ' · ' + d.phone },
            { display_name: 'Delivery', variable_name: 'delivery', value: d.address + ', ' + d.city + ', ' + d.state },
            { display_name: 'Items', variable_name: 'items', value: t.items.map(function (b) { return b.qty + ' x ' + b.p.name + ' (' + sizeName(b.size) + ', ' + b.colour + ')'; }).join('; ') }
          ]
        },
        callback: function (resp) {
          fetch('/.netlify/functions/verify-payment?reference=' + encodeURIComponent(resp.reference))
            .then(function (res) { return res.json(); })
            .then(function (v) {
              var ok = v && v.status === 'success' && Number(v.amount) === t.total * 100;
              var text = orderText(t, d, resp.reference);
              if (ok) {
                state.bag = {}; saveBag(); renderBag(); renderDetail();
                showSuccess('Payment confirmed (ref ' + resp.reference + '). We’ll be in touch on WhatsApp about delivery.', waLink(text));
              } else {
                showSuccess('We received your payment reference ' + resp.reference + ' but could not confirm it automatically. Please send us your order so we can check it.', waLink(text));
              }
            })
            .catch(function () {
              showSuccess('Payment reference ' + resp.reference + '. Please send us your order details so we can confirm it.', waLink(orderText(t, d, resp.reference)));
            });
        },
        onClose: function () { showError('Payment window closed — your bag is still saved.'); }
      });
      handler.openIframe();
    });
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('success').hidden) $('success-close').click(); });
  $('year').textContent = new Date().getFullYear();
  renderAll();
})();
