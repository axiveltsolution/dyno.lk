import PDFDocument from "pdfkit";

export const generateOrderInvoice = (order) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    /* ---------- HEADER ---------- */
    doc
      .fontSize(20)
      .text("ORDER INVOICE", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(10)
      .text("Dyno Innovations (Private) Limited", { align: "center" })
      .text("No 376/C, Maya Avenue, Makumbura, Pannipitiya, Sri Lanka", { align: "center" })
      .text("Email: info@dyno.lk | Phone: 011 289 1666", {
        align: "center",
      });

    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

    /* ---------- ORDER INFO ---------- */
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Order Number: ${order.orderNumber}`);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString()}`);
    doc.text(`Status: ${order.status.toUpperCase()}`);

    doc.moveDown();
    doc.text("Customer Details", { underline: true });
    doc.text(`Name: ${order.customer.name}`);
    doc.text(`Email: ${order.customer.email}`);
    doc.text(`Phone: ${order.customer.phone}`);
    doc.text(`Address: ${order.customer.address}`);
    if (order.customer.notes)
      doc.text(`Notes: ${order.customer.notes}`);

    /* ---------- ITEMS TABLE ---------- */
    doc.moveDown();
    doc.text("Order Items", { underline: true });
    doc.moveDown(0.5);

    const tableTop = doc.y;
    const col = {
      title: 40,
      qty: 300,
      price: 360,
      total: 450,
    };

    doc.fontSize(11).text("Item", col.title, tableTop);
    doc.text("Qty", col.qty, tableTop);
    doc.text("Price", col.price, tableTop);
    doc.text("Total", col.total, tableTop);

    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

    let y = doc.y + 5;

    order.items.forEach((item) => {
      doc.text(item.title, col.title, y);
      doc.text(item.quantity.toString(), col.qty, y);
      doc.text(`Rs. ${item.price}`, col.price, y);
      doc.text(`Rs. ${item.price * item.quantity}`, col.total, y);
      y += 20;
    });

    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: Rs. ${order.totalPrice}`, {
      align: "right",
    });

    /* ---------- FOOTER ---------- */
    doc.moveDown(2);
    doc.fontSize(9).text(
      "This is a system generated invoice. Please contact support for any queries.",
      { align: "center" }
    );

    doc.end();
  });
};
