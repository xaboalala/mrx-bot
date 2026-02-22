export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Bot is running");
  }

  const update = req.body;
  const message = update.message;

  if (message?.text === "/start") {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: "🔥 مرحباً بك في MrX-Stor",
      }),
    });
  }

  return res.status(200).end();
}
