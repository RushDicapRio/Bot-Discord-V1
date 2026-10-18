const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Jouez au jeu de la boule 8.')
        .addStringOption(option => option.setName('question').setDescription('Ce sera ta question pour la boule 8.').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const question = options.getString('question');
        const choice = ["🎱| C'est certain.", "🎱| C’est assurément le cas.", "🎱| Sans aucun doute.", "🎱| Oui, absolument.", "🎱| Mdr.", "🎱| Vous pouvez vous y fier.", "🎱| À mon avis, oui.", "🎱| Très probablement.", "🎱| Perspectives favorables.", "🎱| Oui.", "🎱| Tout le monde s’en fiche.", "🎱| Tout porte à croire que oui.", "Oui, absolument.", "🎱| Réponse incertaine, réessayez.", "🎱| Posez la question plus tard.", "🎱| Mieux vaut ne pas te le dire pour l'instant.", "🎱| Impossible de prédire pour le moment.", "🎱| Concentrez-vous et posez à nouveau votre question.", "🎱| N'y comptez pas.", "🎱| Mais qui a demandé ?", "🎱| Ma réponse est non.", "🎱| Mes sources disent que non.", "🎱| Les perspectives ne sont pas très bonnes.", "🎱| Mieux vaut ne pas demander.", "🎱| Très douteux."];
        const ball = Math.floor(Math.random() * choice.length);
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`🎱| Partie de « 8-ball » de ${interaction.user.username}`)
            .addFields(
                { name: "Question", value: `${question}`, inline: true }
            )
        const embed2 = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`🎱| Partie de 8-ball de ${interaction.user.username}`)
            .addFields(
                { name: "Question", value: `${question}`, inline: true },
                { name: "Réponse", value: `${choice[ball]}`, inline: true }
            )
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('button')
                .setLabel('🎱| Faites rouler la boule !')
                .setStyle(ButtonStyle.Primary)
        )
        const msg = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = msg.createMessageComponentCollector()
        collector.on('collect', async i => {
            if (i.customId == 'button') {
                i.update({ embeds: [embed2], components: [] });
            }
        });
    }
};
