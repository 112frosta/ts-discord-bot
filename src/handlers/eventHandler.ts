import path from "path";
import fs from "fs";
import { Event } from "@/types/Event";
import { Client, Collection } from "discord.js";
import { matchRegex } from "@/utils/matchRegex";

const getEventFiles = () => {
  const eventFiles = fs
    .readdirSync(path.resolve(__dirname, "../events"))
    .filter((file) => matchRegex(file));

  return eventFiles;
};

const rollUpEvents = async () => {
  const files = getEventFiles();
  const events = new Collection<string, Event>();

  for (const file of files) {
    const event: Event = await import(`../events/${file}`);

    if (!event.config || !event.run) {
      console.warn(`(!) ${file} is missing a config or run function`);
      continue;
    }

    events.set(event.config.name, event);
  }

  return events;
};

export const useEvents = async (client: Client) => {
  const events = await rollUpEvents();

  for (const event of events.values()) {
    const handler = (...args: unknown[]) => event.run(...args);

    if (event.config.once) client.once(event.config.name, handler);
    else client.on(event.config.name, handler);
  }

  console.log(`(>) Registered ${events.size} events.`);
};
