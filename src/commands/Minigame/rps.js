const { MessageFlags, SlashCommandBuilder } = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Fais une partie de pierre-feuille-ciseaux.')
        .addUserOption(option =>
            option.setName('adversaire')
                .setDescription('L\'utilisateur indiqué sera votre adversaire.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const enemy = interaction.options.getUser('adversaire');
        if (!enemy) return await interaction.reply({ content: 'Veuillez sélectionner un adversaire valide.', flags: MessageFlags.Ephemeral });
        if (interaction.user.id === enemy.id) return await interaction.reply({ content: 'Tu ne peux pas jouer tout seul, petit coquin...', flags: MessageFlags.Ephemeral });
        if (enemy.bot) return await interaction.reply({ content: 'Tu ne peux **pas** jouer avec un bot, petit rigolo...', flags: MessageFlags.Ephemeral });
        const game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: enemy,
            embed: {
                title: 'Pierre-feuille-ciseaux',
                rejectTitle: 'Demande annulée',
                statusTitle: '• Status',
                overTitle: '• Jeu terminé',
                color: 'Random',
                rejectColor: 'Random'
            },
            buttons: {
                rock: 'Pierre',
                paper: 'Papier',
                scissors: 'Ciseaux'
            },
            emojis: {
                rock: '🌑',
                paper: '📰',
                scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 120000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'Vous avez choisi {emoji}.',
            winMessage: '> 🎉 | **{player}** a gagné la partie de Pierre-Papier-Ciseaux !',
            tieMessage: '> Le match s\'est soldé par un match nul !',
            timeoutMessage: 'La partie est restée inachevée.',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons !',
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
