const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Lancez un dé'),
    async execute(interaction) {
        const Nums = ['1', '2', '3', '4', '5', '6'];
        const ball = Math.floor(Math.random() * Nums.length);
        const embed = new EmbedBuilder()
            .setTitle('Lancer de dés')
            .addFields(
                { name: "Nombre :", value: `${ball}`, inline: true },
                { name: "Demandé par :", value: `<@${interaction.user.id}>` }
            )
            .setColor('Random')
            .setFooter({ text: 'Codé avec ❤️ par Saez | Dés lancés' })
        return interaction.reply({ embeds: [embed] });
    }
};
