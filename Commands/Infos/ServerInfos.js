const {SlashCommandBuilder,  EmbedBuilder, ChannelType, GuildExplicitContentFilter, GuildVerificationLevel} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfos')
        .setDescription('Replies with the infos of the server.'),
        async execute(interaction){
            const {guild} = interaction;
            const {members, channels, emojis, roles, stickers} = guild;
            // const icon = guild.iconURL();
            const id = guild.id;

            const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
            const userRoles= sortedRoles.filter(role => !role.managed);
            const managedRoles = sortedRoles.filter(role => role.managed);
            const botCount = members.cache.filter(member => member.user.bot).size;
            
            const maxDisplayRoles= (roles, maxFieldLength= 1024) => {
                let totalLength = 0;

                const result =[];

                for (const role of roles){
                    const roleString= `<@&${role.id}>`;

                    if (totalLength + roleString.length > maxFieldLength){
                        break;

                    totalLength += roleString.length+1;
                    result.push(roleString);
                    }
                }
                return result.length;
            };

            const splitPascal= (string, separator) => string.split(/(?=[A-U])/).join(separator);
            const toPascalCase= (string, separator= false)=>{
                const pascal= string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g , (m, chr) => chr.toUpperCase());
                return separator ? splitPascal(pascal, separator) : pascal;
            };

            const getChannelTypeSize = type => channels.cache.filter(channel => channel.type === type).size;

            const totalChannels= getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildForum, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread, ChannelType.GuildCategory]);



        const embed = new EmbedBuilder()
            .setTitle(`Infos about ${guild.name}`)
            .setColor('Blue')
            .setTitle(`Infos about ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .setImage(guild.bannerURL())
            .addFields(
                { name: "Description", value: `Infos about ${guild.name}`, inline: true},
                {
                    name: "General",
                    value:[
                        `**Created at:** <t:${parseInt(guild.createdTimestamp/1000)}:R>`,
                        `**ID** ${guild.id}`,
                        `**Owner** <@${guild.ownerId}>`,
                        `**Language** ${guild.preferredLocale}`,
                    ].join('\n')
                },
                {name: `Members (${guild.memberCount})`,
                value: [
                    `**Humans:** ${guild.memberCount - botCount}`,
                    `**Bots:** ${botCount}`,
                ].join("\n"),
                inline: true,
                },
                {name: `Channels, Threads and Categories (${totalChannels})`, value: [
                    `**Text:** ${getChannelTypeSize(ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews)}`,
                    `**Voice:** ${getChannelTypeSize(ChannelType.GuildVoice, ChannelType.GuildStageVoice)}`,
                    `**Threads:** ${getChannelTypeSize(ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread, ChannelType.GuildNewsThread)}`

                ].join("\n"), inline: true},

                {name: `Emojis & Stickers (${emojis.cache.size+ stickers.cache.size})`,
                 value: [
                    `**Animated:** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                    `**Static:** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                    `**Threads:** ${getChannelTypeSize(ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread, ChannelType.GuildNewsThread)}`

                ].join("\n"), inline: true},
            
            )
            interaction.reply({embeds: [embed]});
        }

}