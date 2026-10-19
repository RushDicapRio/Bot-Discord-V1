const { SlashCommandBuilder } = require('discord.js');
const { Snake } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('snake')
        .setDescription('Jouer à une partie de Snake'),
    async execute(interaction) {
        const game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Jeu du serpent',
                overTitle: '• Jeu terminé',
                color: 'Random'
            },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️'
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            food: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            timeoutMessage: 'La partie est restée inachevée.',
            playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
        });
        try {
            await game.startGame();
        } catch (err) {
            console.log(err);
            await interaction.reply('Une erreur est survenue lors du lancement du jeu !');
        }
    }
};
