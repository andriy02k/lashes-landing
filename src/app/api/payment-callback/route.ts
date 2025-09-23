import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { WayForPayCallbackBody } from "@/types";

const WFP_SECRET = process.env.WFP_SECRET!;
const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT!);
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
const FROM_EMAIL = process.env.FROM_EMAIL!;

function verifyWayForPaySignature(body: WayForPayCallbackBody) {
  const receivedSignature = body.merchantSignature;

  // Формуємо рядок для підпису (приклад)
  const signatureString = [
    body.merchantAccount,
    body.orderReference,
    body.amount,
    body.currency,
    body.authCode ?? "",
    body.merchantTransactionType ?? "",
  ].join(";");

  const expected = crypto
    .createHmac("md5", WFP_SECRET)
    .update(signatureString)
    .digest("base64");

  return expected === receivedSignature;
}

async function sendEmail(to: string, subject: string, content: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true для 465, false для 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    text: content,
    html: `<p>${content}</p>`,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body;

  // 1️⃣ Перевіряємо signature
  if (!verifyWayForPaySignature(body)) {
    console.warn("Invalid WFP signature", body);
    return res.status(400).json({ error: "Invalid signature" });
  }

  // 2️⃣ Перевірка статусу платежу
  const status = body.transactionStatus || body.status;
  if (!status || !String(status).toLowerCase().includes("approved")) {
    return res
      .status(200)
      .json({ orderReference: body.orderReference, status: "not approved" });
  }

  // 3️⃣ Відправляємо листа
  const customerEmail = body.clientEmail || body.email;
  if (!customerEmail) {
    console.warn("No customer email provided");
    return res.status(400).json({ error: "No email provided" });
  }

  try {
    const subject = `Доступ до курсу: ${body.productName || "Курс"}`;
    const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n[тут можна додати посилання на файл або Telegram-канал]`;

    await sendEmail(customerEmail, subject, content);
    console.log("Email sent to", customerEmail);

    return res
      .status(200)
      .json({ orderReference: body.orderReference, status: "ok" });
  } catch (err) {
    console.error("Error sending email", err);
    return res
      .status(500)
      .json({ orderReference: body.orderReference, status: "error" });
  }
}
