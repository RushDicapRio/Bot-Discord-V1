const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Donner un coup sur la tête à un utilisateur.')
        .addUserOption(option => option
            .setName('target')
            .setDescription('L\'utilisateur mentionné va se faire avoir.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const target = await interaction.options.getUser('target');
        let image = 'https://media.tenor.com/Tg9jEwKCZVoAAAAd/bonk-mega-bonk.gif';
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${target.tag} a pris un coup !`)
            .setImage(`${image}`)
            .setFooter({ text: "Codé avec ❤️ par Saez | Oh là là, ça fait mal." })
        await interaction.reply({ embeds: [embed] });
    }
};
