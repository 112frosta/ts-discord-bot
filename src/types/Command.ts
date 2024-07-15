import {
  SlashCommandBuilder,
  CommandInteraction as DiscordCommandInteraction,
} from "discord.js";

export type CommandConfig = SlashCommandBuilder;
export type CommandInteraction = DiscordCommandInteraction<"cached">;

export interface Command {
  config: CommandConfig;
  run: (interaction: CommandInteraction) => Promise<void>;
}
