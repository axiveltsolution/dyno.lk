import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateOrderInvoiceHtml = async (order) => {
  const doc = new PDFDocument({ size: "A4", margin: 0 });
  const buffers = [];

  doc.on("data", (chunk) => buffers.push(chunk));
  const endPromise = new Promise((resolve) => doc.on("end", resolve));

  const PAGE_WIDTH = doc.page.width;
  const PAGE_HEIGHT = doc.page.height;
  const MARGIN = 40;
  const HEADER_HEIGHT = 95;

  const COLORS = {
    primary: "#C00000",
    secondary: "#1a1a1a",
    lightGray: "#F4F4F4",
    headerBg: "#1a1a1a",
    white: "#ffffff",
    muted: "#999999",
  };

  // Header background and accent
  doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT).fill(COLORS.headerBg);
  doc.rect(0, HEADER_HEIGHT - 10, PAGE_WIDTH, 10).fill(COLORS.primary);

  const logoPath = path.join(process.cwd(), "assets", "Dyno.lk-logo.png");
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, MARGIN, 20, { width: 100 });
    } catch (error) {
      console.error("⚠️ Failed to render logo in PDF:", error.message);
    }
  }

  doc
    .fillColor(COLORS.primary)
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("Dyno Innovations (Private) Limited", 160, 22, {
      width: PAGE_WIDTH - 220,
    });

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(COLORS.white)
    .text("No 376/C, High-Level Road, Makumbura, Pannipitiya, Sri Lanka 10230", 160, 40, {
      width: PAGE_WIDTH - 220,
    })
    .text("Email: info@dyno.lk | Phone: +94 11 2 891666   +94 77 033 5058", {
      width: PAGE_WIDTH - 220,
    });

  const titleTop = HEADER_HEIGHT + 20;
  doc
    .fillColor(COLORS.secondary)
    .font("Helvetica-Bold")
    .fontSize(24)
    .text("ORDER INVOICE", MARGIN, titleTop, {
      width: PAGE_WIDTH - MARGIN * 2,
      align: "center",
    });

  const hasKnownPrice = order.items.some((item) => item.price > 0);
  const totalAmountText = hasKnownPrice
    ? `Rs. ${Number(order.totalPrice).toLocaleString()}`
    : "Inquiry Requested";

  const cardTop = titleTop + 45;
  doc
    .roundedRect(MARGIN, cardTop, PAGE_WIDTH - MARGIN * 2, 90, 8)
    .fill(COLORS.lightGray);

  doc
    .fillColor(COLORS.secondary)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(
      `Order Number: ${escapeText(order.orderNumber || "-")}`,
      MARGIN + 15,
      cardTop + 15,
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      `Order Date: ${escapeText(
        new Date(order.createdAt).toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        }),
      )}`,
      MARGIN + 15,
      cardTop + 35,
    )
    .text(
      `Status: ${escapeText((order.status || "").toUpperCase())}`,
      MARGIN + 15,
      cardTop + 55,
    );

  const customerTop = cardTop + 120;
  doc
    .fillColor(COLORS.primary)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Customer Details", MARGIN, customerTop);

  doc
    .moveTo(MARGIN, customerTop + 18)
    .lineTo(PAGE_WIDTH - MARGIN, customerTop + 18)
    .strokeColor(COLORS.primary)
    .lineWidth(1)
    .stroke();

  const customerTextTop = customerTop + 28;
  doc
    .fillColor(COLORS.secondary)
    .font("Helvetica")
    .fontSize(10)
    .text(
      `Name: ${escapeText(order.customer?.name || "-")}`,
      MARGIN,
      customerTextTop,
    )
    .text(
      `Email: ${escapeText(order.customer?.email || "-")}`,
      MARGIN,
      doc.y + 4,
    )
    .text(
      `Phone: ${escapeText(order.customer?.phone || "-")}`,
      MARGIN,
      doc.y + 4,
    )
    .text(
      `Address: ${escapeText(order.customer?.address || "-")}`,
      MARGIN,
      doc.y + 4,
    );

  if (order.customer?.notes) {
    doc.text(`Notes: ${escapeText(order.customer.notes)}`, MARGIN, doc.y + 4);
  }

  const itemsTop = doc.y + 20;
  doc
    .fillColor(COLORS.secondary)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Order Items", MARGIN, itemsTop);

  const headerTop = itemsTop + 24;
  doc
    .rect(MARGIN, headerTop, PAGE_WIDTH - MARGIN * 2, 25)
    .fill(COLORS.headerBg);

  doc
    .fillColor(COLORS.white)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text("Item", MARGIN + 10, headerTop + 7)
    .text("Qty", MARGIN + 260, headerTop + 7)
    .text("Unit Price", MARGIN + 340, headerTop + 7)
    .text("Total", MARGIN + 430, headerTop + 7);

  let rowY = headerTop + 34;
  doc.font("Helvetica").fontSize(10).fillColor(COLORS.secondary);

  order.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc
        .rect(MARGIN, rowY - 6, PAGE_WIDTH - MARGIN * 2, 22)
        .fill(COLORS.lightGray);
      doc.fillColor(COLORS.secondary);
    }

    const unitPriceText =
      item.price > 0
        ? `Rs. ${Number(item.price).toLocaleString()}`
        : "Quotation";
    const lineTotalText =
      item.price > 0
        ? `Rs. ${Number(item.price * item.quantity).toLocaleString()}`
        : "Quotation";

    doc.text(escapeText(item.title), MARGIN + 10, rowY, { width: 240 });
    doc.text(String(item.quantity), MARGIN + 260, rowY);
    doc.text(unitPriceText, MARGIN + 340, rowY);
    doc.text(lineTotalText, MARGIN + 430, rowY);

    rowY += 22;
  });

  const totalTop = rowY + 20;
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.primary)
    .text(`Total Amount: ${totalAmountText}`, MARGIN, totalTop, {
      width: PAGE_WIDTH - MARGIN * 2,
      align: "right",
    });

  const footerTextTop = totalTop + 24;
  doc
    .fillColor(COLORS.secondary)
    .font("Helvetica")
    .fontSize(10)
    .text(
      "This is a system-generated invoice. No signature is required.",
      MARGIN,
      footerTextTop,
      {
        width: PAGE_WIDTH - MARGIN * 2,
      },
    )
    .text("For any queries or support, please contact us at info@dyno.lk", {
      width: PAGE_WIDTH - MARGIN * 2,
    });

  const footerAccentY = PAGE_HEIGHT - 80;
  doc.rect(0, footerAccentY, PAGE_WIDTH, 8).fill(COLORS.primary);
  doc.rect(0, footerAccentY + 8, PAGE_WIDTH, 72).fill(COLORS.headerBg);

  doc
    .font("Helvetica-Bold")
    .fillColor(COLORS.white)
    .text(
      "© 2026 Dyno Innovations (Private) Limited. All Rights Reserved.",
      MARGIN,
      footerAccentY + 45,
      {
        width: PAGE_WIDTH - MARGIN * 2,
        align: "center",
      },
    );

  doc.end();
  await endPromise;

  return Buffer.concat(buffers);
};

function escapeText(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
