import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendTest() {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,   // whatsapp:+14155238886
      to: process.env.ADMIN_WHATSAPP,           // whatsapp:+94xxxxxxxxxx
      body: "Hello from Twilio WhatsApp test!"
    });
    console.log("Message SID:", message.sid);
  } catch (err) {
    console.error(err);
  }
}

sendTest();
