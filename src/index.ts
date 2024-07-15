import "dotenv/config";
import { Client } from "discord.js";
import { useHandlers } from "@/handlers";

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

client.on("ready", async () => {
  await useHandlers(client);
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.BOT_TOKEN);
