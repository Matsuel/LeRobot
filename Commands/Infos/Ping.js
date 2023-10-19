const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        execute(interaction){
            interaction.reply('Pong!', {ephemeral: false});
    },

};