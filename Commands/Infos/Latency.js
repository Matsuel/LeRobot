const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lantency')
        .setDescription('Replies with latency between you and me!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        execute(interaction){
            interaction.reply(`🏓Latency is ${CalculateLatency(interaction)}ms.`, {ephemeral: false});
    },

};

function CalculateLatency(interaction){
    let latency = Date.now() - interaction.createdTimestamp;
    if (latency<0){
        latency *= -1;
    }
    return latency;
}