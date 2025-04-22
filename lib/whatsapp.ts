import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let client: Client;

// Initialize WhatsApp client
export function getWhatsAppClient() {
   if (!client) {
    client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
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
