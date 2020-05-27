import {
  Client,
  Message,
  TextChannel,
} from "discord.js";
import {
  appConfig,
  Server,
  AppConfig,
} from "./appConfig";

export class WorldChatBot {
  private static bot: WorldChatBot;
  private bot: Client;

  public static getInstance(): WorldChatBot {
    if (!WorldChatBot.bot) {
      return new WorldChatBot();
    }

    return WorldChatBot.bot;
  }

  private constructor() {
    this.bot = new Client();

    this.bot.on("ready", async () => {
      const link = await this.bot.generateInvite([
        "ADMINISTRATOR",
      ]);
      console.log(link);
    });

    this.bot.on("message", async (message: Message) => {
      if (message.author.bot) {
        return;
      }

      const source = appConfig.servers.find((server) => server.id === message.guild.id)!;
      const { channel } = message;
      if (appConfig.servers.find((server) => server.channel === channel.id)) {
        if (channel.id !== "490603408429023284") { // Make sure it's not the test channel.
          this.dispatch(source, message, appConfig);
        }
      }
    });

    this.bot.login(process.env.TOKEN);
  }

  private async dispatch(source: Server, message: Message, appConfig: AppConfig) {
    const destinationServers = appConfig.servers.filter((server) => server.id !== source.id);
    const destinationChannels: TextChannel[] = [];
    destinationServers.forEach((server) => {
      const guild = this.bot.guilds.get(server.id)!;
      const channel = guild?.channels.get(server.channel);
      if (channel?.type === "text") {
        destinationChannels.push(channel as TextChannel);
      }
    });
    const author = message.member.nickname ?? message.author.username;
    const userTags = message.content.match(/(<$!?\d{19}>)/g);
    userTags?.forEach((tag) => {
      const personId = tag.includes("!") ? tag.substr(3, 18) : tag.substr(2, 18);
      if (!message.guild.members.find((person) => person.user.id === personId)) {
        const person = message.guild.members.find((member) => member.user.id === personId);
        message.content = message.content.replace(tag, `@${person?.user.username}`);
      }
    });
    const relay = `[${source.server} **${author}:** ${message.content}]`;
    await Promise.all(destinationChannels.map((channel) => channel.send(relay)));
  }
}

WorldChatBot.getInstance();