import { sendOrderEmails } from "./src/utils/email/sendOrderEmails.js";

const testOrder = {
  orderNumber: "TEST-001",
  customer: {
    name: "Test Customer",
    email: "test@example.com",
    phone: "1234567890",
    address: "Test Address",
  },
  items: [{ title: "Test Item", quantity: 1, price: 100 }],
  totalPrice: 100,
  createdAt: new Date(),
  status: "pending",
};

async function test() {
  try {
    await sendOrderEmails(testOrder);
    console.log("✅ Order emails sent successfully (with or without PDF)");
  } catch (error) {
    console.error("❌ Order emails failed:", error.message);
  }
}

test().catch(console.error);
