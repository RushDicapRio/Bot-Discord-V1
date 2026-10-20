const { SlashCommandBuilder } = require('discord.js');
const { FindEmoji } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('find-emoji')
        .setDescription('Jouez à un jeu consistant à trouver des émojis.'),
    async execute(interaction) {
        const game = new FindEmoji({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '> Trouver un émoji',
                color: 'Random',
                description: 'Mémorisez les émojis du tableau ci-dessous.',
                findDescription: 'Find the {emoji} emoji before the time runs out.'
            },
            timeoutTime: 60000,
            hideEmojiTime: 5000,
            buttonStyle: 'PRIMARY',
            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
            winMessage: '> 🎉 | Vous avez gagné ! Vous avez choisi le bon émoji. {emoji}',
            losMessage: '> Vous avez perdu ! Vous avez choisi le mauvais émoji. {emoji}',
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
