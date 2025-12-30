import dotenv from "dotenv";
dotenv.config();

import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendAdminWhatsapp = async (order) => {
  const itemText = order.items
    .map(
      (i) =>
        `${i.title} x${i.quantity} (Rs.${i.price})`
    )
    .join("\n");

  const message = `
🛒 *NEW ORDER RECEIVED*

Order: ${order.orderNumber}
Date: ${new Date(order.createdAt).toLocaleString()}

Customer:
${order.customer.name}
${order.customer.phone}
${order.customer.email}

Address:
${order.customer.address}

Items:
${itemText}

Total: Rs. ${order.totalPrice}
Status: ${order.status.toUpperCase()}
`;

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.ADMIN_WHATSAPP,
    body: message,
  });
};
