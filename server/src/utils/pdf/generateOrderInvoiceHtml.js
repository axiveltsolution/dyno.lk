import path from "path";
import { pathToFileURL } from "url";
import puppeteer from "puppeteer";
import fs from "fs";

export const generateOrderInvoiceHtml = async (order) => {
  const logoPath = path.join(process.cwd(), "assets/Dyno.lk-logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString("base64");
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;

  const itemsRows = order.items
    .map(
      (item) => `
      <tr class="item-row">
        <td class="item-title">${escapeHtml(item.title)}</td>
        <td class="item-qty">${item.quantity}</td>
        <td class="item-price">Rs. ${item.price}</td>
        <td class="item-total">Rs. ${item.price * item.quantity}</td>
      </tr>`
    )
    .join("");

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      :root{
        --primary: #C00000;
        --secondary: #1a1a1a;
        --lightGray: #F4F4F4;
        --headerBg: #1a1a1a;
      }
      html,body{margin:0;padding:0;padding-bottom:110px;font-family: Helvetica, Arial, sans-serif;color:var(--secondary)}
      .header{background:var(--headerBg);color:white;padding:30px 40px;width:100%;box-sizing:border-box}
      .accent{height:7px;background:var(--primary)}
      .logo{height:40px}
      .company{position:absolute;left:230px;top:18px;color:white}
      .company h1{margin:0;font-size:20px;color:var(--primary)}
      .company p{margin:2px 0;font-size:13px;color:white}
      .title{font-size:24px;text-align:center;margin:20px 0 10px}
      .card{background:var(--lightGray);padding:15px;border-radius:6px;margin:20px 40px;line-height: 20px;}
      .customer{margin:10px 40px}
      .hr{height:1px;background:var(--primary);margin:6px 0}
      table{width:calc(100% - 100px);margin:0 50px;border-collapse:collapse}
      th,td{padding:8px 6px;text-align:left}
      thead{background:var(--headerBg);color:white}
      tbody tr:nth-child(even){background:var(--lightGray)}
      .right{text-align:right}
      .total{font-weight:700;color:var(--primary);margin:12px 40px;text-align:right}
      .footer-accent{height:7px;background:var(--primary);position:fixed;bottom:80px;left:0;right:0;width:100%;box-sizing:border-box;z-index: 100;}
      .footer{position:fixed;bottom:0;left:0;right:0;height:80px;background:var(--headerBg);color:white;padding-top:8px;width:100%;box-sizing:border-box}
      .footer p{margin:30px 40px;font-size:15px;text-align:center}
      .small{font-size:15px}
      .footer-info{text-align:center;margin:70px 40px 30px 40px;font-size:14px;color:var(--secondary);line-height:1.6}
    </style>
  </head>
  <body>
    <div class="header">
      <img class="logo" src="${logoDataUrl}" alt="logo" />
      <div class="company">
        <h1>Dyno Innovations (Private) Limited</h1>
        <p>No 376/C, Maya Avenue, Makumbura, Pannipitiya, Sri Lanka</p>
        <p>Email: info@dyno.lk | Phone: 011 289 1666</p>
      </div>
    </div>
    <div class="accent"></div>

    <div class="title"><b>ORDER INVOICE</b></div>

    <div class="card">
      <div class="small"><strong>Order Number:</strong> ${escapeHtml(
        order.orderNumber || "-"
      )}</div>
      <div class="small"><strong>Order Date:</strong> ${new Date(
        order.createdAt
      ).toLocaleString()}</div>
      <div class="small"><strong>Status:</strong> ${escapeHtml(
        (order.status || "").toUpperCase()
      )}</div>
    </div>

    <div class="customer">
      <h3 style="color:var(--primary);margin:0 0 6px 0">Customer Details</h3>
      <div class="hr"></div>
      <p class="small">Name: ${escapeHtml(order.customer?.name || "-")}</p>
      <p class="small">Email: ${escapeHtml(order.customer?.email || "-")}</p>
      <p class="small">Phone: ${escapeHtml(order.customer?.phone || "-")}</p>
      <p class="small">Address: ${escapeHtml(
        order.customer?.address || "-"
      )}</p>
      ${
        order.customer?.notes
          ? `<p class="small">Notes: ${escapeHtml(order.customer.notes)}</p>`
          : ""
      }
    </div>

    
    <div style="height:12px"></div>
    

    <div style="margin:0 0">
        <h3 style="color:var(--primary);margin-left: 40px;";margin>Order Items</h3>
      <table>
        <thead>
          <tr>
            <th style="width:50%">Item</th>
            <th style="width:10%">Qty</th>
            <th style="width:20%">Unit Price</th>
            <th style="width:20%">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
    </div>

    <div class="total">Total Amount: Rs. ${order.totalPrice}</div>

    <div class="footer-info">
      <p>This is a system-generated invoice. No signature is required.</p>
      <p>For any queries or support, please contact us at support@dyno.lk</p>
    </div>

    <div class="footer-accent"></div>
    <div class="footer">
      
      <p>© 2025 Dyno Innovations (Private) Limited. All Rights Reserved.</p>
    </div>
  </body>
  </html>
  `;

  // Render with puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
    });
    await page.close();
    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
