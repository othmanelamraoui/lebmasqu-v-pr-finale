import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Explicitly load .env from multiple potential locations
const envLocations = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(process.cwd(), '../../.env'),
  path.resolve(process.cwd(), '../public_html/.env')
];

let envLoaded = false;
for (const envPath of envLocations) {
  if (fs.existsSync(envPath)) {
    console.log(`[ENV] Loading .env from: ${envPath}`);
    try {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      for (const k in envConfig) {
        // Do not override PORT or NODE_ENV if they are already set by Hostinger
        if (k !== 'PORT' && k !== 'NODE_ENV') {
          process.env[k] = envConfig[k];
        }
      }
      console.log(`[ENV] Successfully loaded variables from ${envPath}`);
      envLoaded = true;
      break;
    } catch (err) {
      console.error(`[ENV] Failed to load ${envPath}:`, err);
    }
  }
}

if (!envLoaded) {
  console.log('[ENV] No .env file found in standard locations. Relying on system environment variables.');
}

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
      const status = 'en attente';

      log('Attempting to write to Google Sheets via Apps Script...');
      
      const payload = {
        orderId: orderId,
        name: name,
        phone: phone,
        city: city,
        status: status,
        total: `${total} dhs`,
        items: items,
        date: new Date().toLocaleString('fr-FR')
      };

      try {
        const scriptResponse = await fetch("https://script.google.com/macros/s/AKfycbz8Nb6HqVEoR39IdIwJMC8hQ4GOdkYwlJoo41d_ewwQ_tt8B48ryXwh-wopDQcRJbuX/exec", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        
        const scriptResult = await scriptResponse.text();
        log('Google Apps Script response:', scriptResult);
      } catch (fetchErr) {
        log('Error calling Google Apps Script:', fetchErr);
        // We might not want to fail the whole order if just the script fails, 
        // but let's log it.
      }

      log('Order processed via Google Apps Script');

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

  // Endpoint to upload credentials.json directly
  app.post('/api/upload-credentials', upload.single('credentials'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Read the uploaded file
      const fileContent = fs.readFileSync(req.file.path, 'utf8');
      
      // Validate it's valid JSON and looks like Google credentials
      const parsed = JSON.parse(fileContent);
      if (!parsed.private_key || !parsed.client_email) {
        fs.unlinkSync(req.file.path); // Clean up
        return res.status(400).json({ error: 'Invalid credentials file format. Missing private_key or client_email.' });
      }

      // Move it to the correct location
      const targetPath = path.resolve(process.cwd(), 'credentials.json');
      fs.renameSync(req.file.path, targetPath);
      
      log('Successfully uploaded and saved credentials.json');
      
      res.json({ 
        status: 'success', 
        message: 'Credentials saved successfully. The server will now use this file.',
        path: targetPath
      });
    } catch (error) {
      log('Error processing uploaded credentials:', error);
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path); // Clean up on error
      }
      res.status(500).json({ error: 'Failed to process credentials file', details: String(error) });
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
