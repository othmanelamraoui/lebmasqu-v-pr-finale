import fetch from 'node-fetch';

async function test() {
  const payload = {
    "commande numéro": "TEST1234",
    "nom": "Test User",
    "telephone": "0600000000",
    "ville": "Casablanca",
    "état de commande": "en attente",
    "montant": "100 dhs",
    "item": "1x Test Item"
  };

  try {
    console.log('Sending to Google Apps Script...');
    const res = await fetch("https://script.google.com/macros/s/AKfycbz8Nb6HqVEoR39IdIwJMC8hQ4GOdkYwlJoo41d_ewwQ_tt8B48ryXwh-wopDQcRJbuX/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
