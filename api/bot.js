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
    const message = update?.message;

    if (!message) {
      return res.status(200).end();
    }

    const chatId = message.chat.id;
    const text = message.text ? message.text.trim() : "";

    // أمر /start
    if (text === "/start") {
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🔥 مرحباً بك في MrX-Stor\nاضغط الزر لفتح المتجر 👇",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🛒 فتح المتجر",
                  web_app: {
                    url: "https://mrx-card.vercel.app"
                  }
                }
              ]
            ]
          }
        }),
      });
    } 
    else {
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "استخدم /start لفتح المتجر 🛒",
        }),
      });
    }

    return res.status(200).end();
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(200).end();
  }
}
