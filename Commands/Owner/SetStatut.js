const {SlashCommandBuilder, GatewayIntentBits, PermissionFlagsBits, ActivityType}= require('discord.js');

const client = require('../../index');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatut')
        .setDescription('Set the bot statut')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

        async execute(interaction, client){

            if (interaction.user.id !== '439076575678300163') return interaction.reply({content: 'You are not the owner of the bot', ephemeral: true});

            setInterval(async () => {
                const user = interaction.user;
                const member = await interaction.guild.members.fetch(user);
                const activities = member.presence?.activities || {name: 'Nothing'};

                if (activities[0] === undefined) {
                    client.user.setActivity({
                        name: 'Nothing',
                        type: ActivityType.Playing,
                    });
                    return;
                }
                const name = activities[0].name;

                let typeactivity;

                if (name === 'Spotify') {
                    // console.log(activities[0])
                    typeactivity = ActivityType.Listening;
                    client.user.setActivity({
                        name: name,
                        type: activities[0].type,
                        details: activities[0].details,
                        state: activities[0].state,
                        assets:{
                            largeImage: activities[0].assets.largeImage,
                            largeText: activities[0].assets.largeText,
                            smallImage: activities[0].assets.smallImage,
                            smallText: activities[0].assets.smallText,
                        }
                    });
                } else {
                    typeactivity = ActivityType.Playing;
                    client.user.setActivity({
                        name: name,
                        type: typeactivity,
                    });
                }


               
            }, 5000);

            const owner = await interaction.client.application.fetch();
            const ownerstatut = owner.owner;

            // const user = interaction.user;
            // const member = await interaction.guild.members.fetch(user);
            // const activities = member.presence?.activities;

            // console.log(activities[0].name)
            // console.log(activities[0].details)
            // console.log(activities[0].state)

            // const name = activities[0].name;
            // const details = activities[0].details;
            // const state = activities[0].state;

            // client.user.setActivity({
            //     name: name,
            //     type: ActivityType.Playing,
            //     details: details,
            //     state: state,
            // });


            // client.user.setActivity(activities);
            await interaction.reply({content: 'Statut set to: ' + ownerstatut});
        }

}