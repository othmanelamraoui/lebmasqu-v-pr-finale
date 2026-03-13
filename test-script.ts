import fetch from 'node-fetch';

async function test() {
  const url = "https://script.google.com/macros/s/AKfycbz8Nb6HqVEoR39IdIwJMC8hQ4GOdkYwlJoo41d_ewwQ_tt8B48ryXwh-wopDQcRJbuX/exec";
  
  try {
    console.log('Sending GET request...');
    const res = await fetch(url);
    console.log('Status:', res.status);
    console.log('Response:', await res.text());
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
