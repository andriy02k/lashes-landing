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

export async function POST(req: NextRequest) {
  try {
    const body: WayForPayCallbackBody = await req.json();
    console.log("WFP callback:", body);

    // Перевірка статусу платежу
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
    if (customerEmail) {
      // Відправка листа клієнту
      const subject = `Доступ до курсу: ${body.orderReference}`;
      const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n[посилання на контент]`;
      await sendEmail(customerEmail, subject, content);
      console.log("Email sent to", customerEmail);
    } else {
      console.warn("No email provided for this payment");
    }

    // Генеруємо підпис для відповіді WayForPay
    const time = Date.now();
    const status = "accept";
    const signatureString = [body.orderReference, status, time].join(";");
    const signature = crypto
      .createHmac("md5", MERCHANT_SECRET_KEY)
      .update(signatureString)
      .digest("hex");

    return NextResponse.json({
      orderReference: body.orderReference,
      status,
      time,
      signature,
    });
  } catch (err) {
    console.error("Error in payment callback:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
