const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const datas = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Generate random gif')
        .addStringOption(option => 
            option.setName('what')
                .setDescription('The gif you want')
                .setRequired(true)
        ),
        async execute(interaction){
            console.log(interaction.options.getString('what'));
            const Link= `http://api.giphy.com/v1/gifs/search?q=${interaction.options.getString('what')}&api_key=${datas.GifApyKey}& limit=100`
            const result = await fetch(Link);
            const rep = await result.json();
            const index = Math.floor(Math.random() * rep.data.length);

            interaction.reply({content: rep.data[index].url});
    },

};