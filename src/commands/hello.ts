import { CommandInteraction } from "@/types/Command";
import { SlashCommandBuilder } from "discord.js";

export const config = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Replies with hi!");

export const run = async (interaction: CommandInteraction) => {
  await interaction.reply("hi!");
};
