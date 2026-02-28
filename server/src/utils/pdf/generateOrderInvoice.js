import PDFDocument from "pdfkit";
import path from "path";

export const generateOrderInvoice = (order) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    /* ================= THEME (like CSS variables) ================= */
    const COLORS = {
      primary: "#C00000", // red
      secondary: "#1a1a1a", // dark gray/almost black
      lightGray: "#F4F4F4",
      darkGray: "#4a4a4a",
      headerBg: "#1a1a1a", // dark header
    };

    const PAGE_WIDTH = doc.page.width;

    /* ================= HEADER ================= */
    const logoPath = path.join(process.cwd(), "assets/Dyno.lk-logo.png");

    // Dark header background
    doc.rect(0, 0, PAGE_WIDTH, 80).fill(COLORS.headerBg);

    // Red accent line
    doc.rect(0, 70, PAGE_WIDTH, 4).fill(COLORS.primary);

    // Logo
    doc.image(logoPath, 40, 15, { width: 100 });

    // Company Info
    doc
      .fillColor(COLORS.primary)
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Dyno Innovations (Private) Limited", 130, 18)
      .font("Helvetica")
      .fontSize(9)
      .fillColor("white")
      .text("No 376/C, Maya Avenue, Makumbura, Pannipitiya, Sri Lanka", 130, 35)
      .text("Email: info@dyno.lk | Phone: 011 289 1666", 130, 48);

    doc.moveDown(3);
    doc.fillColor(COLORS.secondary);

    /* ================= TITLE ================= */
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .fillColor(COLORS.secondary)
      .text("ORDER INVOICE", 40, doc.y, {
        width: PAGE_WIDTH - 80,
        align: "center",
        margintop: 20,
      });

    doc.font("Helvetica");
    doc.moveDown(2);

    /* ================= ORDER INFO CARD ================= */
    const cardTop = doc.y;
    doc.roundedRect(40, cardTop, PAGE_WIDTH - 80, 95, 6).fill(COLORS.lightGray);

    doc.fillColor(COLORS.secondary).fontSize(11).font("Helvetica-Bold");

    doc.text(`Order Number: ${order.orderNumber}`, 60, cardTop + 12);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleString()}`,
      60,
      cardTop + 32
    );
    doc.text(`Status: ${order.status.toUpperCase()}`, 60, cardTop + 52);

    doc.font("Helvetica");
    doc.moveDown(6);

    /* ================= CUSTOMER DETAILS ================= */
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .fillColor(COLORS.primary)
      .text("Customer Details");

    doc.moveDown(0.5);
    doc
      .moveTo(40, doc.y)
      .lineTo(PAGE_WIDTH - 40, doc.y)
      .strokeColor(COLORS.primary)
      .stroke();

    doc.moveDown(0.8);
    doc.fillColor(COLORS.secondary).fontSize(11).font("Helvetica");

    doc.text(`Name: ${order.customer.name}`);
    doc.moveDown(0.3);
    doc.text(`Email: ${order.customer.email}`);
    doc.moveDown(0.3);
    doc.text(`Phone: ${order.customer.phone}`);
    doc.moveDown(0.3);
    doc.text(`Address: ${order.customer.address}`);
    if (order.customer.notes) {
      doc.moveDown(0.3);
      doc.text(`Notes: ${order.customer.notes}`);
    }

    doc.moveDown(2);

    /* ================= ITEMS TABLE ================= */
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .fillColor(COLORS.secondary)
      .text("Order Items");

    doc.moveDown(0.6);

    const tableTop = doc.y;
    const col = {
      item: 50,
      qty: 310,
      price: 380,
      total: 450,
    };

    // Table Header Background
    doc.rect(40, tableTop, PAGE_WIDTH - 80, 28).fill(COLORS.headerBg);

    doc.fillColor("white").fontSize(11).font("Helvetica-Bold");
    doc.text("Item", col.item, tableTop + 8);
    doc.text("Qty", col.qty, tableTop + 8);
    doc.text("Unit Price", col.price, tableTop + 8);
    doc.text("Total", col.total, tableTop + 8);

    let y = tableTop + 33;
    doc.fillColor(COLORS.secondary).font("Helvetica");

    order.items.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.rect(40, y - 7, PAGE_WIDTH - 80, 25).fill(COLORS.lightGray);
        doc.fillColor(COLORS.secondary);
      }

      doc.text(item.title, col.item, y);
      doc.text(item.quantity.toString(), col.qty, y);
      doc.text(`Rs. ${item.price}`, col.price, y);
      doc.text(`Rs. ${item.price * item.quantity}`, col.total, y);

      y += 25;
    });

    doc.moveDown(2);

    /* ================= TOTAL ================= */
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(COLORS.primary)
      .text(`Total Amount: Rs. ${order.totalPrice}`, {
        align: "right",
        width: PAGE_WIDTH - 80,
      });

    /* ================= FOOTER ================= */
    // Red accent line at top of footer
    const footerY = doc.page.height - 60;

    doc.fillColor(COLORS.secondary).fontSize(9).font("Helvetica");
    doc.text(
      "This is a system-generated invoice. No signature is required.",
      40,
      footerY - 40,
      { width: PAGE_WIDTH - 80 }
    );

    doc.text(
      "For any queries or support, please contact us at support@dyno.lk",
      40,
      footerY - 28,
      { width: PAGE_WIDTH - 80 }
    );

    doc.rect(0, footerY - 4, PAGE_WIDTH, 4).fill(COLORS.primary);

    // Footer background
    doc.rect(0, footerY, PAGE_WIDTH, 60).fill(COLORS.headerBg);

    doc
      .fillColor(COLORS.primary)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(
        "© 2025 Dyno Innovations (Private) Limited. All Rights Reserved.",
        40,
        footerY + 20,
        {
          width: PAGE_WIDTH - 80,
          align: "center",
        }
      );

    doc.end();
  });
};
