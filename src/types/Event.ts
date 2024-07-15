import { ClientEvents } from "discord.js";

export type EventConfig = {
  name: keyof ClientEvents;
  description?: string;
  once?: boolean;
};
export type EventRun = (...args: unknown[]) => Promise<void>;

export interface Event {
  config: EventConfig;
  run: EventRun;
}
