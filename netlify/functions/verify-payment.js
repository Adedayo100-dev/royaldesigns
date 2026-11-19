// Confirms a Paystack payment on the server before the site shows "payment confirmed".
// Needs the environment variable PAYSTACK_SECRET_KEY (set in Netlify, never in the code).

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  const reference = (event.queryStringParameters || {}).reference || '';

  if (!/^[A-Za-z0-9_-]{6,100}$/.test(reference)) {
    return { statusCode: 400, headers, body: JSON.stringify({ status: 'error', message: 'Invalid reference' }) };
  }
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return { statusCode: 500, headers, body: JSON.stringify({ status: 'error', message: 'Payments not configured' }) };
  }

  try {
    const res = await fetch('https://api.paystack.co/transaction/verify/' + encodeURIComponent(reference), {
      headers: { Authorization: 'Bearer ' + secret }
    });
    const json = await res.json();
    const data = json && json.data ? json.data : {};
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: data.status === 'success' && data.currency === 'NGN' ? 'success' : 'failed',
        amount: data.amount || 0,
        reference: data.reference || reference
      })
    };
  } catch (err) {
    return { statusCode: 502, headers, body: JSON.stringify({ status: 'error', message: 'Could not reach Paystack' }) };
  }
};
