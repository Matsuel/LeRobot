const { SlashCommandBuilder, EmbedBuilder}= require('discord.js');
const cpustat = require('cpu-stat');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfos')
        .setDescription('Get informations about the bot'),

        async execute (interaction, client){
            const days = Math.floor(client.uptime / 86400000);
            const hours = Math.floor(client.uptime / 3600000) % 24;
            const minutes = Math.floor(client.uptime / 60000) % 60;
            const seconds = Math.floor(client.uptime / 1000) % 60;

            const owner = await interaction.client.application.fetch();
            const ownername= owner.owner;

            cpustat.usagePercent(function(err, percent) {
                if (err) return interaction.reply({content: 'Error getting CPU usage.'});

                const memoryusage = formatBytes(process.memoryUsage().heapUsed);
                const node = process.version;
                const cpu = percent.toFixed(2);

                const embed = new EmbedBuilder()
                    .setTitle(`__${client.user.username}'s infos__`)
                    .setColor('Blue')
                    .addFields(
                        {name: 'Developer', value: `${ownername}`},
                        { name: 'Username', value: `${client.user.username}`, inline: true },
                        {name: 'ID', value: `${client.user.id}`, inline: true},
                        {name: 'Creation date', value: `<t:${parseInt(client.user.createdAt / 1000)}:R>`, inline: true},
                        {name: 'Help command', value: 'Help'},
                        {name: 'Uptime', value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`},
                        {name: 'Node version', value: `${node}`},
                        {name: 'CPU usage', value: `${cpu}%`},
                        {name: 'Memory usage', value: `${memoryusage}`},
                        {name: 'Bot ping ' , value: `${client.ws.ping}ms`},
                    )
                    interaction.reply({embeds: [embed]});
            })
            function formatBytes(a,b){
                let c=1024;
                d=b||2;
                e=["B","KB","MB","GB","TB","PB","EB","ZB","YB"];
                f=Math.floor(Math.log(a)/Math.log(c));

                return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
            }
        }
}
