const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const figlet = require('figlet');
const filter = require('../../../filter.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('Convertit le texte donné en ASCII.')
        .addStringOption(option => option.setName('text').setDescription('Le texte indiqué sera transformé en œuvre d’art.').setRequired(true).setMaxLength(15)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        figlet(`${text}`, function (err, data) {
            if (err) {
                return interaction.reply({ content: `**Oups !** Quelque chose a **très** mal tourné ; réessayez plus tard !`, ephemeral: true });
            }
            if (filter.words.includes(text)) return interaction.reply({ content: 'Tu ne peux pas dire ça !', ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setFooter({ text: `Codé avec ❤️ par Saez | Art ASCII généré` })
                .setDescription(`\`\`\`${data}\`\`\``)
                .setTimestamp()
            interaction.reply({ embeds: [embed] });
        });
    }
};
