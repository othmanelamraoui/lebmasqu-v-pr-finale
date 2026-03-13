import fetch from 'node-fetch';

async function test() {
  const url = "https://script.google.com/macros/s/AKfycbz8Nb6HqVEoR39IdIwJMC8hQ4GOdkYwlJoo41d_ewwQ_tt8B48ryXwh-wopDQcRJbuX/exec";
  
  const payload = {
    "commande numéro": "VAL_commande_numero",
    "commande_numero": "VAL_commande_numero2",
    "orderId": "VAL_orderId",
    "id": "VAL_id",
    
    "nom": "VAL_nom",
    "name": "VAL_name",
    "nom complet": "VAL_nom_complet",
    "nom_complet": "VAL_nom_complet2",
    
    "telephone": "VAL_telephone",
    "phone": "VAL_phone",
    
    "ville": "VAL_ville",
    "city": "VAL_city",
    
    "état de commande": "VAL_etat_de_commande",
    "etat": "VAL_etat",
    "status": "VAL_status",
    
    "montant": "VAL_montant",
    "total": "VAL_total",
    "prix": "VAL_prix",
    
    "item": "VAL_item",
    "items": "VAL_items",
    "cart": "VAL_cart",
    "produit": "VAL_produit",
    "produits": "VAL_produits"
  };

  try {
    console.log('Sending massive JSON...');
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log('Response:', await res.text());
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
