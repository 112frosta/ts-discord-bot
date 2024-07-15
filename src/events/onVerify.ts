import { EventConfig } from "@/types/Event";
import { EmbedBuilder, Interaction } from "discord.js";

export const config: EventConfig = {
  name: "interactionCreate",
  description: "This event is triggered after verify button is clicked.",
};

export const run = async (interaction: Interaction) => {
  if (!interaction.isButton() || !interaction.inCachedGuild()) return;
  if (interaction.customId !== "btn:verify") return;

  const embed = new EmbedBuilder()
    .setTitle("You are now verified!")
    .setColor("Green")
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp();

  await interaction.deferReply({ ephemeral: true });
  await interaction.member.roles.add("1262529757837267054");
  await interaction.editReply({ embeds: [embed] });
};
