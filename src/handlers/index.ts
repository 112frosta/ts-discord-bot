import { Client } from "discord.js";
import { useEvents } from "./eventHandler";
import { useCommands } from "./commandHandler";
import { useActivity } from "./activityHandler";

export const useHandlers = async (client: Client) => {
  await useEvents(client);
  await useCommands(client);
  useActivity(client);
};
