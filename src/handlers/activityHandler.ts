import { ActivityType, Client } from "discord.js";

export const useActivity = (client: Client) => {
  const users = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );

  client.user?.setPresence({
    activities: [
      {
        name: `over ${users} users`,
        type: ActivityType.Watching,
      },
    ],
    status: "online",
  });
};
