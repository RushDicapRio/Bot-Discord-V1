const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
module.exports = {
    data: new SlashCommandBuilder()
        .setName('husbando')
        .setDescription('Génère une image aléatoire de « husbando ».'),
    async execute(interaction) {
        const res = await fetch('https://nekos.best/api/v2/husbando');
        const img = (await res.json()). results[0].url;
        const embed = new EmbedBuilder()
            .setTitle(`Le « husbando » de ${interaction.user.username} !`)
            .setImage(img)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Husbando généré' })
            .setTimestamp()
            .setColor('Random')
        await interaction.reply({ embeds: [embed] });
        const message = await interaction.fetchReply();
        await message.react('👍');
        await message.react('👎');
    }     
};
