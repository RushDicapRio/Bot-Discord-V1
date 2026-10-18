const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Obtenez des conseils au hasard.'),
    async execute(interaction) {
        const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Conseils pour vous')
                    .setDescription(`À prendre ou à laisser ! \n "**${data.slip.advice}**"`)
                    .setColor('Random')
                    .setFooter({ text: 'Codé avec ❤️ par Saez | Conseil généré de manière aléatoire' })
            ]
        });
    }
};
