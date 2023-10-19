const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfos')
        .setDescription('Replies with your personal informations.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to get informations about.')),
        async execute(interaction){
            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);
            const icon = user.displayAvatarURL();
            const tag = user.tag;
            

            const embed = new EmbedBuilder()
                .setTitle(`Infos about ${tag}`)
                .setColor('Blue')
                .setAuthor({name: tag, iconURL: icon})
                .setThumbnail(icon)
                .addFields({name: 'Member', value: `${user}`, inline: false})
                .addFields({name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
                .addFields({name: 'Joined at', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: false})
                .addFields({name: 'Joined Discord', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: false})
                .addFields({name: 'User ID', value: `${user.id}`})
                .setTimestamp()

            await interaction.reply({embeds: [embed]});


    },

};