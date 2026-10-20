const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gunfight')
        .setDescription('Jouez aux cow-boys.')
        .addUserOption(option => option.setName('joueur').setDescription('Sélectionnez un joueur à défier').setRequired(true)),
    async execute(interaction) {
        const player = interaction.options.getUser('joueur');
        if (player.id === interaction.user.id) {
            return interaction.reply({ content: 'Tu ne peux pas te lancer de défi à toi-même !', ephemeral: true });
        }
        const acceptButton = new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success);
        const declineButton = new ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder().addComponents(acceptButton, declineButton);
        await interaction.reply({
        content: `${player}, ${interaction.user} vous a mis au défi dans un duel de cow-boys ! Souhaitez-vous accepter ce défi ?`,
        components: [row]
        });
        const filter = i => i.user.id === player.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000
        });
        collector.on('collect', async i => {
            if (i.customId === 'accept') {
                collector.stop('accept');
                const words = ['shoot', 'draw', 'aim', 'gun', 'reload', 'fire', 'bullets'];
                const word = words[Math.floor(Math.random() * words.length)];
                const delay = Math.floor(Math.random() * 5000) + 3000;
                const readyEmbed = new EmbedBuilder()
                    .setTitle('Se préparer !')
                    .setDescription('Le jeu va commencer d’un instant à l’autre.')
                    .setImage('https://giffiles.alphacoders.com/102/102565.gif')
                    .setColor('Random')
                    .setFooter({ text: 'Codé avec ❤️ par Saez' });
                await interaction.followUp({ embeds: [readyEmbed] });
                await new Promise(resolve => setTimeout(resolve, delay));
                await interaction.followUp(`Le mot est **${word}** ! ÉCRIVEZ MAINTENANT !`);
                const winnerFilter = m => m.content.toLowerCase() === word.toLowerCase();
                const winner = await interaction.channel.awaitMessages({ filter: winnerFilter, max: 1, time: 60000 });
                if (!winner.size) {
                    await interaction.followUp('Personne n\'a tapé le mot à temps. C\'est une égalité !');
                } else {
                    const winnerUser = winner.first().author;
                    const winnerEmbed = new EmbedBuilder()
                        .setTitle('Félicitations !')
                        .setImage('https://media.tenor.com/oDedOU2hfZcAAAAC/anime-cowboybebop.gif')
                        .setDescription(`${winnerUser} a remporté le duel de cow-boys face à ${interaction.user.id === winnerUser.id ? player : interaction.user} !`)
                        .setColor('Random')
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    await interaction.followUp({ embeds: [winnerEmbed] });
                }
            } else if (i.customId === 'decline') {
                collector.stop('decline');
                await interaction.followUp(`${player} a décliné le défi. Peut-être une prochaine fois !`);
            }
        });
        collector.on('end', async (reason) => {
            if (reason === 'time') {
                await interaction.followUp({
                    content: `${player} n’a pas répondu à temps. Peut-être la prochaine fois !`,
                    components: []
                });
            }
        });
    }
};
