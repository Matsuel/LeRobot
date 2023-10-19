const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Replies with your personal banner!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('user').setDescription('The user\'s banner you want to see')),
        execute(interaction){
            const user = interaction.options.getUser('user') || interaction.user;
            interaction.reply(user.displayAvatarURL(), {ephemeral: false});
    },

};