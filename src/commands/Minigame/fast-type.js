const { SlashCommandBuilder } = require('discord.js');
const { FastType } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fast-type')
        .setDescription('Jouez à un jeu de saisie rapide.'),
    async execute(interaction) {
        const game = new FastType({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Saisie rapide',
                color: 'Random',
                description: 'Vous avez {time} secondes pour saisir la phrase ci-dessous.'
            },
            timeoutTime: 60000,
            sentence: 'Une phrase vraiment sympa à taper rapidement.',
            winMessage: '> 🎉 | Vous avez gagné ! Vous avez terminé la course de saisie en {time} secondes avec une vitesse de {wpm} mots par minute.',
            loseMessage: '> Tu as perdu ; tu n\'as pas réussi à taper la bonne phrase à temps.',
            timeoutMessage: '> La partie est restée inachevée.'
        });
        try {
            await game.startGame();
        } catch (err) {
            console.log(err);
            await interaction.reply('Une erreur est survenue lors du lancement du jeu !');
        }
    }
};
