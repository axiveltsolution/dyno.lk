const formatPriceText = (price) =>
  price > 0 ? `Rs. ${price}` : "Inquiry Requested";

const formatTotalText = (order) => {
  const hasKnownPrice = order.items.some((item) => item.price > 0);
  return hasKnownPrice ? `Rs. ${order.totalPrice}` : "Inquiry Requested";
};

export const customerEmailTemplate = (order) => `
<p>Dear ${order.customer.name},</p>

<p>Thank you for placing your inquiry with <b>Dyno Innovations (Private) Limited</b>.</p>

<p>
Your order <b>${order.orderNumber}</b> has been successfully received and is
currently <b>pending confirmation</b>.
</p>

<p><b>Order Summary</b></p>
<ul>
  <li>Total Amount: ${formatTotalText(order)}</li>
  <li>Status: Pending</li>
</ul>

<p>
Please find the attached invoice for complete order details.
Our team will contact you once the order is confirmed.
</p>

${order.customer.notes ? `<p><b>Additional Notes:</b> ${order.customer.notes}</p>` : ""}

<p>
Kind regards,<br/>
<b>Dyno Innovations (Private) Limited</b><br/>
Customer Support
</p>
`;

export const adminEmailTemplate = (order) => `
<h2>New Order Received</h2>

<p><b>Order Number:</b> ${order.orderNumber}</p>
<p><b>Date:</b> ${new Date(order.createdAt).toLocaleString("en-US", { timeZone: "Asia/Colombo" })}</p>

<h3>Customer Details</h3>
<ul>
  <li>Name: ${order.customer.name}</li>
  <li>Email: ${order.customer.email}</li>
  <li>Phone: ${order.customer.phone}</li>
  <li>Address: ${order.customer.address}</li>
  ${order.customer.notes ? `<li><b>Notes:</b> ${order.customer.notes}</li>` : ""}
</ul>

<h3>Items</h3>
<ul>
${order.items
  .map(
    (i) =>
      `<li>${i.title} | Qty: ${i.quantity} | ${formatPriceText(i.price)}</li>`,
  )
  .join("")}
</ul>

<p><b>Total:</b> ${formatTotalText(order)}</p>
<p><b>Status:</b> ${order.status}</p>
`;
