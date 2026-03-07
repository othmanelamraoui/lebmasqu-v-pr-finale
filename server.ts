import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Explicitly load .env from multiple potential locations
const envLocations = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(process.cwd(), '../public_html/.env')
];

envLocations.forEach(envPath => {
  if (fs.existsSync(envPath)) {
    console.log(`Loading .env from: ${envPath}`);
    dotenv.config({ path: envPath });
  }
});

// Fallback: Try loading from secrets.json
const secretsPath = path.resolve(__dirname, 'secrets.json');
if (fs.existsSync(secretsPath)) {
  try {
    const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf-8'));
    process.env.GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || secrets.GOOGLE_SHEET_ID;
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || secrets.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    process.env.GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || secrets.GOOGLE_PRIVATE_KEY;
    process.env.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || secrets.TELEGRAM_BOT_TOKEN;
    process.env.TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || secrets.TELEGRAM_CHAT_ID;
    console.log('Loaded credentials from secrets.json');
  } catch (e) {
    console.error('Failed to load secrets.json', e);
  }
}

const logFile = path.resolve(__dirname, 'server.log');

function log(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message} ${data ? JSON.stringify(data) : ''}\n`;
  console.log(message, data || '');
  try {
    fs.appendFileSync(logFile, logMessage);
  } catch (e) {
    console.error('Failed to write to log file', e);
  }
}

// Debug .env loading
log(`Current working directory: ${process.cwd()}`);
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  log(`.env file found at: ${envPath}`);
} else {
  log(`.env file NOT found at: ${envPath}`);
  // Try looking in __dirname as fallback
  const fallbackEnvPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(fallbackEnvPath)) {
    log(`.env file found at fallback: ${fallbackEnvPath}`);
    // dotenv/config automatically loads from cwd, so we might need to manually load if it's elsewhere
    // But usually on Hostinger cwd is the app root.
  }
}

// Telegram Notification Function
async function sendTelegramNotification(orderData: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials missing. Skipping notification.');
    return;
  }

  const itemsList = orderData.cart.map((item: any) => {
    if (item.type === 'product') {
      return `- ${item.quantity}x ${item.product?.name} (${item.size})`;
    } else if (item.type === 'pack') {
      const selections = item.packDetails?.selections?.map((p: any) => p.name).join(', ');
      return `- ${item.quantity}x ${item.packDetails?.name} (${selections})`;
    }
    return `- ${item.quantity}x Unknown Item`;
  }).join('\n');

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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Google Sheets API Endpoint
  app.post('/api/orders', async (req, res) => {
    log('POST /api/orders - Received request');
    log('Body:', req.body);

    try {
      const { name, phone, city, cart, total } = req.body;

      if (!cart || !Array.isArray(cart)) {
        throw new Error('Invalid cart data');
      }

      // Validate credentials
      let SHEET_ID = process.env.GOOGLE_SHEET_ID || '1rdrNoEyuq8hZXCXhhgOLT3y-_QV7mhiyaC4MjWUUA3o';
      
      // Extract ID if it's a full URL or contains extra parts
      const match = SHEET_ID.match(/[-\w]{25,}/);
      if (match) {
        SHEET_ID = match[0];
      }
      
      const authOptions: any = {
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      };

      const credsPath = path.resolve(process.cwd(), 'credentials.json');
      const credsPathAlt = path.resolve(__dirname, 'credentials.json');
      
      if (fs.existsSync(credsPath)) {
        log('Using credentials.json file from cwd');
        authOptions.keyFile = credsPath;
      } else if (fs.existsSync(credsPathAlt)) {
        log('Using credentials.json file from __dirname');
        authOptions.keyFile = credsPathAlt;
      } else {
        // Fallback to environment variables
        const missingVars = [];
        if (!SHEET_ID) missingVars.push('GOOGLE_SHEET_ID');
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) missingVars.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
        if (!process.env.GOOGLE_PRIVATE_KEY) missingVars.push('GOOGLE_PRIVATE_KEY');

        if (missingVars.length > 0) {
          const errorMsg = `Missing Google Sheets credentials: ${missingVars.join(', ')}. Please provide them in .env or upload a credentials.json file.`;
          log(errorMsg);
          return res.status(500).json({ error: 'Server configuration error', details: errorMsg });
        }

        log('Using credentials from environment variables:', {
          sheetId: SHEET_ID,
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          keyLength: process.env.GOOGLE_PRIVATE_KEY?.length
        });

        // Handle private key with robust newline replacement
        let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
        
        // Final fallback: if the key is base64 encoded by the user to bypass Hostinger limits
        if (privateKey && !privateKey.includes('PRIVATE KEY') && privateKey.length > 500) {
          try {
            const decoded = Buffer.from(privateKey, 'base64').toString('utf-8');
            if (decoded.includes('PRIVATE KEY')) {
              privateKey = decoded;
              log('Successfully decoded base64 private key');
            }
          } catch (e) {
            // Ignore if not valid base64
          }
        }
        
        // 1. Check if user accidentally pasted the entire JSON file content
        if (privateKey.trim().startsWith('{') && privateKey.trim().endsWith('}')) {
          try {
            const parsedJson = JSON.parse(privateKey);
            if (parsedJson.private_key) {
              privateKey = parsedJson.private_key;
            }
          } catch (e) {
            log('Warning: GOOGLE_PRIVATE_KEY looks like JSON but could not be parsed');
          }
        }
        
        // 2. Remove surrounding quotes if present
        privateKey = privateKey.replace(/^["']|["']$/g, '');
        
        // 3. Replace literal \n or \\n with actual newlines
        privateKey = privateKey.replace(/\\+n/g, '\n');
        
        // 4. Fix PEM formatting
        const beginTag = '-----BEGIN PRIVATE KEY-----';
        const endTag = '-----END PRIVATE KEY-----';
        
        if (privateKey.includes(beginTag) && privateKey.includes(endTag)) {
          // Extract the base64 body
          const keyBody = privateKey
            .substring(privateKey.indexOf(beginTag) + beginTag.length, privateKey.indexOf(endTag))
            .replace(/\s+/g, ''); // Remove all whitespace, newlines, etc.
            
          // Re-chunk into 64-character lines
          const chunks = keyBody.match(/.{1,64}/g) || [];
          privateKey = `${beginTag}\n${chunks.join('\n')}\n${endTag}\n`;
        } else {
          // If tags are missing, assume it's just the base64 string
          const keyBody = privateKey.replace(/\s+/g, '');
          const chunks = keyBody.match(/.{1,64}/g) || [];
          privateKey = `${beginTag}\n${chunks.join('\n')}\n${endTag}\n`;
        }

        authOptions.credentials = {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: privateKey,
        };
      }

      const auth = new google.auth.GoogleAuth(authOptions);

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

      const orderDate = new Date().toLocaleString('fr-FR');
      const orderId = '#' + Math.random().toString(36).substr(2, 6).toUpperCase();
      const items = cart.map((item: any) => {
        if (item.type === 'product') {
          return `${item.quantity}x ${item.product?.name} (${item.size})`;
        } else if (item.type === 'pack') {
          const selections = item.packDetails?.selections?.map((p: any) => p.name).join(', ');
          return `${item.quantity}x ${item.packDetails?.name} (${selections})`;
        }
        return `${item.quantity}x Unknown Item`;
      }).join('\n');
      const status = 'En attente';

      const row = [orderId, name, phone, city, status, total, items];
      console.log('Appending row:', row);

      // Use single quotes around sheet name to handle spaces safely
      const range = `'${sheetName}'!A:G`;

      log('Attempting to write to Google Sheets...');
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });

      log('Order saved successfully to Google Sheets');

      // Send Telegram Notification
      log('Sending Telegram notification...');
      await sendTelegramNotification({ name, phone, city, cart, total });
      log('Telegram notification sent');

      res.json({ success: true, orderId });
    } catch (error: any) {
      console.error('Error processing order:', error);
      log(`CRITICAL ERROR: ${error.message}`);
      if (error.response) {
        log(`API Response Error: ${JSON.stringify(error.response.data)}`);
      }
      res.status(500).json({ error: 'Failed to save order', details: error.message });
    }
  });

  // Diagnostic Endpoint (New)
  app.get('/api/debug-env', (req, res) => {
    const cwd = process.cwd();
    let filesInCwd: string[] = [];
    try {
      filesInCwd = fs.readdirSync(cwd);
    } catch (e) {
      filesInCwd = ['Error reading directory'];
    }
    
    const envLocations = [
      path.resolve(cwd, '.env'),
      path.resolve(__dirname, '.env'),
      path.resolve(cwd, '../.env'),
      path.resolve(cwd, '../public_html/.env')
    ];

    const foundEnv = envLocations.find(p => fs.existsSync(p));
    
    const credsPath = path.resolve(cwd, 'credentials.json');
    const credsPathAlt = path.resolve(__dirname, 'credentials.json');

    res.json({
      status: 'ok',
      cwd: cwd,
      dirname: __dirname,
      filesInCwd: filesInCwd,
      envFileFoundAt: foundEnv || 'None',
      credentialsJsonFound: {
        inCwd: fs.existsSync(credsPath),
        inDirname: fs.existsSync(credsPathAlt)
      },
      envVars: {
        GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID ? 'Set' : 'Missing',
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'Set' : 'Missing',
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? `Set (Length: ${process.env.GOOGLE_PRIVATE_KEY.length})` : 'Missing',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? 'Set' : 'Missing',
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
