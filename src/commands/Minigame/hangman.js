const { SlashCommandBuilder } = require('discord.js');
const { Hangman } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('Faites une partie de pendu.'),
    async execute(interaction) {
        const game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Le jeu du pendu',
                color: 'Random'
            },
            hangman: { hat: '🎩', head: '👨‍🦰', shirt: '👕', pants: '🩳', boots: '🥾🥾' },
            timeoutTime: 60000,
            timeWords: 'all',
            winMessage: '> 🎉 | Vous avez gagné ! Le mot était **{word}**.',
            loseMessage: '> Vous avez perdu, le mot était **{word}**.',
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
