const { SlashCommandBuilder } = require('discord.js');
const { TwoZeroFourEight } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('2048')
        .setDescription('Faites une partie de 2048.'),
    async execute(interaction) {
        const game = new TwoZeroFourEight({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '2048',
                color: 'Random'
            },
            emojis: {
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            timeoutMessage: '> La partie est restée inachevée.',
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
