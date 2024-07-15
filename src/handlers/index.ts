import { Client } from "discord.js";
import { useEvents } from "./eventHandler";
import { useCommands } from "./commandHandler";

export const useHandlers = async (client: Client) => {
  await useEvents(client);
  // await useCommands(client);
};
