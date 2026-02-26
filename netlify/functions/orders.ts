import { Handler } from '@netlify/functions';
import { google } from 'googleapis';

// Telegram Notification Function
async function sendTelegramNotification(orderData: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials missing. Skipping notification.');
    return;
  }

  const itemsList = orderData.cart.map((item: any) => 
    `- ${item.quantity}x ${item.name} (${item.size})`
  ).join('\n');

  const message = `
🔔 *NOUVELLE COMMANDE !*

👤 *Client:* ${orderData.name}
📞 *Tél:* ${orderData.phone}
📍 *Ville:* ${orderData.city}
💰 *Total:* ${orderData.total} DHS

🛒 *Articles:*
${itemsList}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API Error:', data);
    } else {
      console.log('Telegram notification sent successfully');
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { name, phone, city, cart, total } = JSON.parse(event.body || '{}');

    if (!cart || !Array.isArray(cart)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid cart data' }),
      };
    }

    // Validate credentials
    const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1rdrNoEyuq8hZXCXhhgOLT3y-_QV7mhiyaC4MjWUUA3o';
    
    if (!SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets credentials');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing credentials' }),
      };
    }

    // Handle private key with robust newline replacement
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get spreadsheet details
    let spreadsheet;
    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId: SHEET_ID,
      });
      spreadsheet = response.data;
    } catch (err: any) {
      console.error('Error accessing spreadsheet:', err.message);
      if (err.code === 403) {
         if (err.message.includes('Enable it by visiting') || err.message.includes('API has not been used')) {
          throw new Error(`L'API Google Sheets n'est pas activée. Activez-la sur Google Cloud Console.`);
        }
        throw new Error(`Permission refusée. Vérifiez le partage avec : ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
      } else if (err.code === 404) {
        throw new Error('Spreadsheet introuvable. Vérifiez l\'ID.');
      } else {
        throw err;
      }
    }

    const sheetName = spreadsheet.sheets?.[0]?.properties?.title || 'Sheet1';
    console.log(`Target Sheet Name: "${sheetName}"`);

    const orderId = '#' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const items = cart.map((item: any) => `${item.quantity}x ${item.name} (${item.size})`).join(', ');
    const status = 'En attente';

    const row = [orderId, name, phone, city, status, total, items];
    console.log('Appending row:', row);

    // Use single quotes around sheet name to handle spaces safely
    const range = `'${sheetName}'!A:G`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('Order saved successfully to Google Sheets');

    // Send Telegram Notification
    await sendTelegramNotification({ name, phone, city, cart, total });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, orderId }),
    };

  } catch (error: any) {
    console.error('Error processing order:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save order', details: error.message }),
    };
  }
};
