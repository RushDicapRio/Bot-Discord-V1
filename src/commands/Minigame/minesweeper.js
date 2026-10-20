const { SlashCommandBuilder } = require('discord.js');
const { Minesweeper } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('minesweeper')
        .setDescription('Faites une partie de démineur.'),
    async execute(interaction) {
        const game = new Minesweeper({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Démineur',
                color: 'Random',
                description: 'Cliquez sur les boutons pour révéler les blocs, à l\'exception des mines.'
            },
            emojis: { flag: '🚩', mine: '💣' },
            mines: 5,
            timeoutTime: 60000,
            winMessage: '> 🎉 | Vous avez gagné la partie ! Vous avez réussi à éviter toutes les mines.',
            losMessage: '> Tu as perdu la partie. La prochaine fois, fais attention aux mines.',
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
