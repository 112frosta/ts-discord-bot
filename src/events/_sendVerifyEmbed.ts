import { EventConfig } from "@/types/Event";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Message,
} from "discord.js";

export const config: EventConfig = {
  name: "messageCreate",
  once: true,
};

export const run = async (message: Message) => {
  if (message.author.bot) return;
  if (message.content !== "!verify") return;

  message.deletable && message.delete();

  const embed = new EmbedBuilder()
    .setTitle("Server Verification")
    .setDescription("Please click the button below to verify.")
    .setColor("Green");

  const verifyBtn = new ButtonBuilder()
    .setCustomId("btn:verify")
    .setLabel("Click to Verify")
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(verifyBtn);
  await message.channel.send({ embeds: [embed], components: [row] });
};
