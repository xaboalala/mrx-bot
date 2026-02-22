import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;
    await bot.processUpdate(update);
  }
  res.status(200).send("OK");
}

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 مرحباً بك في MrX-Stor");
});
