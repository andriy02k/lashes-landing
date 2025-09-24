import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { WayForPayCallbackBody } from "@/types";

const MERCHANT_SECRET_KEY = process.env.MERCHANT_SECRET_KEY!;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

async function sendEmail(to: string, subject: string, content: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Lashes" <${SMTP_USER}>`,
    to,
    subject,
    text: content,
    html: `<p>${content}</p>`,
  });
}

// ------------------------------------------------------
// Функція для перевірки підпису від WayForPay
// ------------------------------------------------------
export function verifyWayForPaySignature(
  body: WayForPayCallbackBody,
  secret: string
) {
  // WayForPay для callback використовує ці поля для підпису
  const merchantDomainName = "lashes-landing.vercel.app"; // твій домен, жорстко підставляємо

  const signatureString = [
    body.merchantAccount,
    merchantDomainName,
    body.orderReference,
    body.amount,
    body.currency,
  ].join(";");

  const expectedSignature = crypto
    .createHmac("md5", secret)
    .update(signatureString, "utf8")
    .digest("base64");

  console.log("Expected signature:", expectedSignature);
  console.log("Received signature:", body.merchantSignature);

  return expectedSignature === body.merchantSignature;
}

export async function POST(req: NextRequest) {
  const body: WayForPayCallbackBody = await req.json();
  console.log("WFP callback:", body);

  // === Перевірка підпису ===
  if (!verifyWayForPaySignature(body, MERCHANT_SECRET_KEY)) {
    console.warn("Invalid signature");
    // WayForPay буде повторювати запит до 4 діб, тому повертаємо 400
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // === Перевірка статусу платежу ===
  if (
    body.transactionStatus !== "Approved" ||
    Number(body.reasonCode) !== 1100
  ) {
    return NextResponse.json(
      { orderReference: body.orderReference, status: "not approved" },
      { status: 200 }
    );
  }

  const customerEmail = body.email;
  if (!customerEmail) {
    return NextResponse.json({ error: "No email provided" }, { status: 400 });
  }

  try {
    // === Відправка листа клієнту ===
    const subject = `Доступ до курсу: ${body.orderReference}`;
    const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n[посилання на контент]`;
    await sendEmail(customerEmail, subject, content);
    console.log("Email sent to", customerEmail);

    // === Формуємо підпис для відповіді WayForPay ===
    const time = Math.floor(Date.now() / 1000);
    const status = "accept"; // завжди accept
    const responseSignature = crypto
      .createHmac("md5", MERCHANT_SECRET_KEY)
      .update([body.orderReference, status, time].join(";"))
      .digest("base64");

    return NextResponse.json({
      orderReference: body.orderReference,
      status,
      time,
      signature: responseSignature,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { orderReference: body.orderReference, status: "error" },
      { status: 500 }
    );
  }
}
