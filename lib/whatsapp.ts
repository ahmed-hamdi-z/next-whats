import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let client: Client;

// Initialize WhatsApp client
export function getWhatsAppClient() {
  if (!client) {
    client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        executablePath: "/usr/bin/chromium-browser",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-extensions",
          "--disable-infobars",
          "--window-size=1920,1080",
        ],
      },
    });

    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("✅ WhatsApp client is ready!");
    });
  }

  return client;
}
