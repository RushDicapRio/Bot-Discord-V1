const { SlashCommandBuilder } = require('discord.js');
const { Slots } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Jouez à une machine à sous.'),
    async execute(interaction) {
        const game = new Slots({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Machine à sous',
                color: 'Random'
            },
            slots: ['🍇', '🍊', '🍋', '🍌']
        });
        try {
            await game.startGame();
        } catch (err) {
            console.log(err);
            await interaction.reply('Une erreur est survenue lors du lancement du jeu !');
        }
    }
};
