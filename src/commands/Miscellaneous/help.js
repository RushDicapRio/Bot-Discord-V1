const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Apprenez-en davantage sur le bot et ses fonctionnalités.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await client.user.fetch();
        await client.application.fetch();
        const helprow1 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setMinValues(1)
                .setMaxValues(1)
                .setCustomId('selecthelp')
                .setPlaceholder('Sélectionnez un menu')
                .addOptions(
                    {
                        label: 'Centre d’aide',
                        description: 'Accédez au centre d’aide.',
                        value: 'helpcentre'
                    },
                    {
                        label: 'Commandes',
                        description: 'Accédez à la page Commandes.',
                        value: 'commands'
                    }
                )
        );
        const centerembed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`**Saez Bot** propose une multitude de fonctionnalités variées pour améliorer votre expérience ainsi que celle de votre serveur. Vous trouverez ci-dessous la liste des fonctionnalités offertes par le bot. \n\n <:icon1:1160823145893208166> :busts_in_silhouette: **Général** \n <:icon2:1160823168945094716> :shield: **Modération** \n <:icon2:1160823168945094716> :star_struck: **Fun** \n <:icon2:1160823168945094716> :video_game: **Minigame** \n <:icon2:1160823168945094716> :tools: **Utility** \n <:icon2:1160823168945094716> :information_source: **Information** \n <:icon3:1160823210439348275> :gear: **Miscellaneous**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Codé avec ❤️ par Saez | Demandé par ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
        const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
        const topggUrl = `https://top.gg/bot/${client.user.id}`;
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Serveur d\'assistance')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/4djy4pesKd'),
            new ButtonBuilder()
                .setLabel('Invitation du bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteUrl),
            new ButtonBuilder()
                .setLabel('Votez sur Top.gg')
                .setStyle(ButtonStyle.Link)
                .setURL(topggUrl)
        )
        await interaction.reply({ embeds: [centerembed], components: [helprow1, button] });
    }
};
