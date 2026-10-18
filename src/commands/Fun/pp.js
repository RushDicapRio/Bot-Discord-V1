const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('N\'en parlons pas.'),
    async execute(interaction) {
        const ppSize = Math.floor(Math.random() * 10) + 1;
        let ppMain = '8';
        for (let i = 0; i < ppSize; i++) {
            ppMain += '=';
        }
        const ppEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`La taille de la bite de ${interaction.user.username} ;-;`)
            .setDescription(`Votre taille pp est ${ppMain}D`)
            .setFooter({ text: 'Codé avec ❤️ par Saez' });
        await interaction.reply({ embeds: [ppEmbed] });
    }
};
