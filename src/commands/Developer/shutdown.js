const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Arrête le bot.'),
    async execute(interaction, client) {
        if (interaction.user.id === '') {
            await interaction.reply({ content: '**Arrêt en cours...**', ephemeral: true });
            await client.user.setStatus('invisible');
            process.exit();
        } else {
            return interaction.reply({ content: 'Cette commande est réservée aux développeurs.', ephemeral: true });
        }
    }
};
