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

    // رد عام لأي رسالة نصية
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "تم استلام رسالتك 🔥",
      }),
    });

    return res.status(200).end();
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(200).end();
  }
}
