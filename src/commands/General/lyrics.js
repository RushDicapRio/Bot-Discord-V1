const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Obtenez les paroles de n\'importe quelle chanson.')
        .addStringOption(option => option.setName('titre').setDescription('Indiquez le titre de la chanson').setRequired(true)),
    async execute(interaction) {
        const title = interaction.options.getString('titre');
        const embed = new EmbedBuilder()
        await interaction.deferReply();
        await axios.get(`https://some-random-api.ml/lyrics?title=${title}`).then(async (data) => {
            embed
                .setColor('Random')
                .setTitle(`${data.data.title}`)
                .setThumbnail(data.data.thumbnail.genius)
                .setFooter({ tex: `Codé avec ❤️ par Saez | Chanson par ${data.data.author}` })
                .setDescription(`${data.data.lyrics.slice(0, 4096)}`)
            await interaction.editReply({ embeds: [embed] });
        }).catch(() => {
            embed
                .setColor('Random')
                .setDescription('Impossible de trouver une chanson portant ce titre.')
                .setFooter({ text: 'Codé avec ❤️ par Saez' });
            return interaction.editReply({ embeds: [embed], ephemeral: true });
        });
    }
};
