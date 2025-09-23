import { NextRequest, NextResponse } from "next/server";
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
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    text: content,
    html: `<p>${content}</p>`,
  });
}

export async function POST(req: NextRequest) {
  const body: WayForPayCallbackBody = await req.json();

  if (!verifyWayForPaySignature(body)) {
    console.warn("Invalid WFP signature", body);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const status = body.transactionStatus || body.status;
  if (!status || !String(status).toLowerCase().includes("approved")) {
    return NextResponse.json(
      { orderReference: body.orderReference, status: "not approved" },
      { status: 200 }
    );
  }

  const customerEmail = body.clientEmail || body.email;
  if (!customerEmail) {
    console.warn("No customer email provided");
    return NextResponse.json({ error: "No email provided" }, { status: 400 });
  }

  try {
    const subject = `Доступ до курсу: ${body.productName || "Курс"}`;
    const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n[тут можна додати посилання]`;

    await sendEmail(customerEmail, subject, content);
    console.log("Email sent to", customerEmail);

    return NextResponse.json(
      { orderReference: body.orderReference, status: "ok" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error sending email", err);
    return NextResponse.json(
      { orderReference: body.orderReference, status: "error" },
      { status: 500 }
    );
  }
}
