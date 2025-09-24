import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { WayForPayCallbackBody } from "@/types";

const WFP_SECRET = process.env.WFP_SECRET!;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

function verifyWayForPaySignature(body: WayForPayCallbackBody) {
  const signatureString = [
    body.merchantAccount,
    body.merchantDomainName ?? "",
    body.orderReference,
    body.amount,
    body.currency,
  ].join(";");

  const expected = crypto
    .createHmac("md5", WFP_SECRET)
    .update(signatureString)
    .digest("base64");

  return expected === body.merchantSignature;
}

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

export async function POST(req: NextRequest) {
  const body: WayForPayCallbackBody = await req.json();
  console.log("WFP callback:", body);

  // Перевірка підпису
  if (!verifyWayForPaySignature(body)) {
    console.warn("Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Перевірка статусу платежу
  if (body.transactionStatus !== "Approved" || body.reasonCode !== "1100") {
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
    // Відправка листа клієнту
    const subject = `Доступ до курсу: ${body.orderReference}`;
    const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n[посилання на контент]`;
    await sendEmail(customerEmail, subject, content);
    console.log("Email sent to", customerEmail);

    // Формуємо підпис для відповіді WayForPay
    const time = Math.floor(Date.now() / 1000);
    const status = "accept";
    const responseSignature = crypto
      .createHmac("md5", WFP_SECRET)
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
