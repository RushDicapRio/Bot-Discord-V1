const { SlashCommandBuilder } = require('discord.js');
const { MatchPairs } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('match-pairs')
        .setDescription('Jouez à un jeu d\'association de paires.'),
    async execute(interaction) {
        const game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Associer les paires',
                color: 'Random',
                description: '**Cliquez sur les boutons pour associer les émojis à leurs paires.**'
            },
            timeoutTime: 6000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
            winMessage: '> 🎉 | **Vous avez gagné la partie ! Vous avez retourné un total de `{tilesTurned}` tuiles.**',
            loseMessage: '> **Vous avez perdu la partie ! Vous avez retourné un total de `{tilesTurned}` tuiles.**',
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
