/*
 * Royal Designs — site settings.
 *
 * paystackPublicKey: paste the PUBLIC key (pk_live_... or pk_test_...) from
 * the Paystack dashboard → Settings → API Keys & Webhooks.
 * Leave it empty and every order is sent to WhatsApp instead of online payment.
 * Never put the SECRET key (sk_...) here — that goes in Netlify's environment
 * variables as PAYSTACK_SECRET_KEY (see README).
 */
window.RD_CONFIG = {
  whatsapp: '2348100089904',
  email: 'harnimashaun04@gmail.com',
  paystackPublicKey: '',
  currency: 'NGN'
};
