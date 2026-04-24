import { mailer } from "./mailer.js";
import { customerEmailTemplate, adminEmailTemplate } from "./templates.js";
import { generateOrderInvoiceHtml } from "../pdf/generateOrderInvoiceHtml.js";

export const sendOrderEmails = async (order) => {
  try {
    console.log(`📧 Attempting to send order emails for ${order.orderNumber}`);

    // Try to generate PDF invoice (non-blocking)
    let pdf = null;
    let pdfError = null;

    try {
      pdf = await generateOrderInvoiceHtml(order);
      console.log(`✅ PDF generated successfully (${pdf.length} bytes)`);
    } catch (error) {
      pdfError = error;
      console.error(`❌ PDF generation failed: ${error.message}`);
      console.log(`📧 Sending emails without PDF attachment`);
    }

    // Customer email (critical - throw on failure)
    try {
      const customerMailOptions = {
        from: `"Dyno Innovations (Private) Limited" <${process.env.EMAIL_USER}>`,
        to: order.customer.email,
        subject: `Order Confirmation - ${order.orderNumber}`,
        html: customerEmailTemplate(order),
      };

      // Only add attachment if PDF was generated successfully
      if (pdf && !pdfError) {
        customerMailOptions.attachments = [
          {
            filename: `Invoice-${order.orderNumber}.pdf`,
            content: pdf,
          },
        ];
        console.log(`📎 PDF attachment included for customer email`);
      } else {
        console.log(
          `📧 Customer email sent without PDF (PDF generation failed)`,
        );
      }

      const customerResult = await mailer.sendMail(customerMailOptions);
      console.log(
        `✅ Customer email sent to ${order.customer.email}, messageId: ${customerResult.messageId}`,
      );
    } catch (customerError) {
      console.error(`❌ Customer email failed: ${customerError.message}`);
      throw customerError; // Customer email is critical
    }

    // Admin email (less critical - log but don't throw)
    try {
      const adminMailOptions = {
        from: `"Order System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Order - ${order.orderNumber}`,
        html: adminEmailTemplate(order),
      };

      // Add PDF to admin email if available
      if (pdf && !pdfError) {
        adminMailOptions.attachments = [
          {
            filename: `Invoice-${order.orderNumber}.pdf`,
            content: pdf,
          },
        ];
      }

      const adminResult = await mailer.sendMail(adminMailOptions);
      console.log(
        `✅ Admin email sent to ${process.env.ADMIN_EMAIL}, messageId: ${adminResult.messageId}`,
      );
    } catch (adminError) {
      console.error(`❌ Admin email failed: ${adminError.message}`);
      // Admin email failure is less critical, log but don't throw
    }
  } catch (error) {
    console.error("❌ Order email sending failed:", {
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack,
    });
    throw error; // Re-throw to allow proper error handling upstream
  }
};
