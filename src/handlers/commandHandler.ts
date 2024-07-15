import path from "path";
import fs from "fs";
import { Command } from "@/types/Command";
import { Client, Collection, REST, Routes } from "discord.js";
import { matchRegex } from "@/utils/matchRegex";

const getCommandFiles = () => {
  const commandFiles = fs
    .readdirSync(path.resolve(__dirname, "../commands"))
    .filter((file) => matchRegex(file));

  return commandFiles;
};

const rollUpCommands = async () => {
  const files = getCommandFiles();
  const commands = new Collection<string, Command>();

  for (const file of files) {
    const command: Command = await import(`../commands/${file}`);

    if (!command.config || !command.run) {
      console.warn(`(!) ${file} is missing a config or run function`);
      continue;
    }

    commands.set(command.config.name, command);
  }

  return commands;
};

const registerCommand = async (commands: Collection<string, Command>) => {
  const rest = new REST().setToken(process.env.BOT_TOKEN!);
  const route = Routes.applicationCommands(process.env.APP_ID!);

  const payload = commands.map((command) => command.config.toJSON());
  console.log(`(/) Refreshing app commands...`);

  await rest
    .put(route, { body: payload })
    .then(() => console.log(`(/) Registered ${payload.length} app commands.`))
    .catch((err) => console.error(err));
};

export const useCommands = async (client: Client) => {
  const commands = await rollUpCommands();
  await registerCommand(commands);

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.inCachedGuild()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    await command.run(interaction).catch((err) => {
      console.error(err);
    });
  });
};
