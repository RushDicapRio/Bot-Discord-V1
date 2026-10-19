const { MessageFlags, SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ttt')
        .setDescription('Faites une partie de morpion')
        .addUserOption(option =>
            option.setName('adversaire')
                .setDescription('L\'utilisateur indiqué sera votre adversaire.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const enemy = interaction.options.getUser('adversaire');
        if (!enemy) return await interaction.reply({ content: 'Veuillez sélectionner un adversaire valide.', flags: MessageFlags.Ephemeral });
        if (interaction.user.id === enemy.id) return await interaction.reply({ content: 'Tu ne peux pas jouer tout seul, petit coquin...', flags: MessageFlags.Ephemeral });
        if (enemy.bot) return await interaction.reply({ content: 'Tu ne peux pas jouer avec un bot, espèce de petit rigolo...', flags: MessageFlags.Ephemeral });
        const game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: enemy,
            embed: {
                title: '> Morpion',
                rejectTitle: 'Demande annulée',
                color: 'Random',
                statusTitle: '• Status',
                overTitle: '• Jeu terminé',
                rejectColor: 'Random'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true, 
            timeoutTime: 120000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '> {emoji} | **{player}**, c\'est à ton tour !',
            winMessage: '> 🎉 | **{player}** a gagné la partie de morpion !',
            tieMessage: 'Le match s\'est soldé par un match nul !',
            timeoutMessage: 'La partie est restée inachevée.',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons.',
            rejectMessage: '{opponent} a refusé votre demande pour une partie de morpion !'
        });
        try {
            await game.startGame();
        } catch (err) {
            console.log(err);
            await interaction.reply('Une erreur est survenue lors du lancement du jeu !');
        }
    }
};
