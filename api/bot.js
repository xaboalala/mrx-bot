export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Bot is running");
  }

  try {
    const update = req.body;

    if (!update || !update.message) {
      return res.status(200).end();
    }

    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🔥 مرحباً بك في MrX-Stor",
        }),
      });
    }

    return res.status(200).end();
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(200).end();
  }
}
