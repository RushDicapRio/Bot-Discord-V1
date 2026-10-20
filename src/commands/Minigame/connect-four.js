const { SlashCommandBuilder } = require('discord.js');
const { Connect4 } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect-four')
        .setDescription('Faites une partie de Puissance 4.')
        .addUserOption(option =>
            option.setName('adversaire')
                .setDescription('L\'utilisateur indiqué sera votre adversaire.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const enemy = interaction.options.getUser('adversaire');
        if (interaction.user.id === enemy.id) return await interaction.reply({ content: 'Tu ne peux pas jouer avec toi-même, petite tête...', ephemeral: true });
        if (enemy.bot) return await interaction.reply({ content: 'Tu ne peux pas jouer avec un bot, espèce de petit rigolo...', ephemeral: true });
        const game = new Connect4({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('adversaire'),
            embed: {
                title: '> Jeu Puissance 4',
                rejectTitle: 'Demande annulée',
                statusTitle: '• Status',
                overTitle: '• Jeu terminé',
                color: 'Random',
                rejectColor: 'Random'
            },
            emojis: {
                board: '⚪',
                player1: '🔴',
                player2: '🔵'
            },
            mentionUser: true,
            timeoutTime: 120000,
            buttonStyle: 'PRIMARY',
            turnMessage: '> {emoji} | **{player}**, c\'est à ton tour !',
            winMessage: '> 🎉 | **{player}** a gagné la partie de Puissance 4 !',
            tieMessage: '> Le match s\'est soldé par un match nul !',
            timeoutMessage: '> La partie est restée inachevée ! Personne n’a gagné la partie !',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons.',
            rejectMessage: '{opponent} a refusé votre demande pour une partie de Puissance 4 !'
        });
        try {
            await game.startGame();
        } catch (err) {
            console.log(err);
            await interaction.reply('Une erreur est survenue lors du lancement du jeu !');
        }
    }
};
