const { SlashCommandBuilder } = require('discord.js');
const { Flood } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('flood')
        .setDescription('Faites une partie de « flood ».'),
    async execute(interaction) {
        const game = new Flood({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Inondation',
                color: 'Random'
            },
            difficulty: 8,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
            winMessage: '> 🎉 | Vous avez gagné ! Il vous a fallu **{turns}** tours.',
            loseMessage: '> Vous avez perdu ! Vous avez effectué **{turns}** tours.',
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
