const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('how-gae')
        .setDescription('Les résultats sont exacts, sans la moindre réserve.')
        .addUserOption(option => option.setName('target').setDescription('Le pourcentage de réussite visé.')),
    async execute(interaction) {
        let target = interaction.options.getUser('target') || interaction.user;
        let randomizer = Math.floor(Math.random() * 101);
        const embed = new EmbedBuilder()
            .setTitle(`À quel point ${target.username} est-il/elle gay ?`)
            .setFooter({ text: "Codé avec ❤️ par Saez | Pourcentage de Gae "})
            .setColor('Random')
            .addFields(
                { name: "Pourcentage", value: `${target} est ${randomizer}% gay. 🍆` }
            )
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    }
};
