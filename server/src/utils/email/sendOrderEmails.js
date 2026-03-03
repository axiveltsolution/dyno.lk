import { mailer } from "./mailer.js";
import { customerEmailTemplate, adminEmailTemplate } from "./templates.js";
import { generateOrderInvoiceHtml } from "../pdf/generateOrderInvoiceHtml.js";

export const sendOrderEmails = async (order) => {
  const pdf = await generateOrderInvoiceHtml(order);

  // Customer email
  await mailer.sendMail({
    from: `"Dyno Innovations (Private) Limited" <${process.env.EMAIL_USER}>`,
    to: order.customer.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: customerEmailTemplate(order),
    attachments: [
      {
        filename: `Invoice-${order.orderNumber}.pdf`,
        content: pdf,
      },
    ],
  });

  // Admin email
  await mailer.sendMail({
    from: `"Order System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order - ${order.orderNumber}`,
    html: adminEmailTemplate(order),
  });
};
