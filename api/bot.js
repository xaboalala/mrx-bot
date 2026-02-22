import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: false, // مهم جداً تعطيله
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    try {
      await bot.processUpdate(update);
    } catch (error) {
      console.error("Error processing update:", error);
    }

    return res.status(200).send("OK");
  }

  res.status(200).send("Bot is running");
}

bot.on("message", async (msg) => {
  await bot.sendMessage(msg.chat.id, "🔥 مرحباً بك في MrX-Stor");
});
