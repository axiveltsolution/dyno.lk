import { sendOrderEmails } from "../utils/email/sendOrderEmails.js";
import { sendAdminWhatsapp } from "../utils/whatsapp/sendAdminWhatsapp.js";

export const handleNewOrderNotifications = async (order) => {

  // EMAIL
  try {
    await sendOrderEmails(order);
  } catch (err) {
    console.error("[EMAIL ERROR]", err.message);
  }

  // WHATSAPP
  try {
    await sendAdminWhatsapp(order);
  } catch (err) {
    console.error("[WHATSAPP ERROR]", err.message);
  }
};
