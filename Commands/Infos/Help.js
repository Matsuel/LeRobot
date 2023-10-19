const { ComponentType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, StringSelectMenuBuilder}= require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with the bot'),
    async execute(interaction) {
        const emojis = {
            'infos': 'ℹ️',
            'fun': '🎉',
            'moderation': '🔨',
            'music': '🎵',
            'utility': '🔧',
            'owner': '👑',
            'public': '🌍',
        }

        const directories =[
            ...new Set(interaction.client.commands.map(cmd => cmd.folder)),
        ];

        const formatString = (string) => 
            `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
        
        const categories= directories.map((dir) => {
            const getCommands = interaction.client.commands
                .filter((cmd) => cmd.folder === dir)
                .map((cmd)=> {
                    return {
                        name: cmd.data.name,
                        description: cmd.data.description || 'No description provided',
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });
        
        const embed = new EmbedBuilder().setDescription(
            'Select a category in the dropdown menu'
        );

        const components= (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('help-menu')
                .setPlaceholder('Select a category')
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands in the ${cmd.directory} category`,
                            emoji: emojis[cmd.directory.toLowerCase()|| null],
                        };
                    })
                )
            ),
        ];

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction)=> interaction.user.id=== interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.SelectMenu,
        });

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category= categories.find(
                (x)=> x.directory.toLowerCase() === directory
            );
            const categoryEmbed = new EmbedBuilder()
            .setTitle(`${formatString(directory)} Commands`)
            .setDescription(`A list of all commands in the ${directory}`)
            .addFields(
                category.commands.map((cmd) => {
                    return {
                        name: `\`${cmd.name}\``,
                        value: cmd.description,
                        inline: true,
                    };
                })
            );
            interaction.update({embeds: [categoryEmbed]});

        
        });

        collector.on('end', () => {
            initialMessage.edit({
                components: components(true),
            });
        });

        

    },
}