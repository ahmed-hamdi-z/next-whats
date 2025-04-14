// pages/api/send-group-message.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getWhatsAppClient } from "@/lib/whatsapp";

let initialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, branch, service, message } = req.body;
  const groupName = "test vps";

  try {
    const client = getWhatsAppClient();

    if (!initialized) {
      client.initialize();
      initialized = true;
    }

    const chats = await client.getChats();
    const group = chats.find((chat) => chat.isGroup && chat.name === groupName);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const composedMessage = `📝 *طلب جديد *:\n\n👤 الاسم: ${name}\n🏢 الفرع / المحطة: ${branch}\n🛠️ الخدمة: ${service}\n🗒️ الملاحظات: ${message}`;

    await group.sendMessage(composedMessage);
    res.status(200).json({ message: "Message sent to WhatsApp group successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message to WhatsApp group." });
  }
}
