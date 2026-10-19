const { Wordle } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle')
        .setDescription('Faites une partie de Wordle.'),
    async execute(interaction) {
        const game = new Wordle({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Wordle',
                color: 'Random'
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: '> 🎉 | Vous avez gagné ! Le mot était **{word}**.',
            loseMessage: 'Vous avez perdu ! Le mot était **{word}**.',
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
