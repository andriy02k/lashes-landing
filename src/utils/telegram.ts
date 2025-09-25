import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
// const INVITE_EXPIRE_SECONDS = Number(process.env.INVITE_EXPIRE_SECONDS || 3600);

export async function createTelegramInviteLink() {
  //   const expireDate = Math.floor(Date.now() / 1000) + INVITE_EXPIRE_SECONDS

  const res = await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      member_limit: 1,
    }
  );

  if (!res.data || !res.data.ok) {
    throw new Error("Telegram API error: " + JSON.stringify(res.data));
  }

  return res.data.result.invite_link;
}
