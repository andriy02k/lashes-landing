import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { WayForPayCallbackBody } from "@/types";
import { createTelegramInviteLink } from "@/utils/telegram";

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

    if (
      body.transactionStatus !== "Approved" ||
      Number(body.reasonCode) !== 1100
    ) {
      return NextResponse.json(
        { orderReference: body.orderReference, status: "not approved" },
        { status: 200 }
      );
    }

    let inviteLink: string | null = null;
    console.log(
      "Telegram API URL:",
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createChatInviteLink`
    );

    try {
      inviteLink = await createTelegramInviteLink();
      console.log("Invite created:", inviteLink);
    } catch (e) {
      console.error("Failed to create invite link:", e);
    }

    const customerEmail = body.email;
    if (customerEmail) {
      const subject = `Доступ до курсу: ${body.orderReference}`;
      const content = `Дякуємо за оплату! Ось ваші матеріали курсу.\n\n <a href="${inviteLink}">${inviteLink}</a>`;
      await sendEmail(customerEmail, subject, content);
      console.log("Email sent to", customerEmail);
    } else {
      console.warn("No email provided for this payment");
    }

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
