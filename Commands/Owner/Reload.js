const {SlashCommandBuilder, Client, EmbedBuilder}= require('discord.js');
const {loadEvents}= require('../../Handlers/eventHandlers');
const {loadCommands}= require('../../Handlers/commandHandler');
const { client } = require('../..');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload all commands and events')
        .addSubcommand(subcommand =>
            subcommand.setName('commands')
                .setDescription('Reload all commands'),
        )
        .addSubcommand(subcommand =>
            subcommand.setName('events')
                .setDescription('Reload all events')
        ),

                async execute(interaction, client){
                    const {user }= interaction;

                    if(user.id !== '439076575678300163'){
                        const embed = new EmbedBuilder()
                            .setColor("Red").setDescription('You are not the owner of the bot');
                        await interaction.reply({embeds: [embed]});
                    }else{
                        const sub = interaction.options.getSubcommand();
                        const embed = new EmbedBuilder()
                            .setColor("Green").setDescription('Reloaded all ' + sub).setTitle('Reloaded');
                        
                        switch(sub){
                            case 'commands':
                                loadCommands(client)
                                interaction.reply({embeds: [embed]});
                                break;
                            case 'events':
                                loadEvents(client)
                                interaction.reply({embeds: [embed]});
                                break;

                        }

                    }

                }
}