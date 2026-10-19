const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Affiche le nombre d\'invitations d\'un utilisateur sur le serveur.')
        .addUserOption(option => option.setName('utilisateur').setDescription('L’utilisateur dont vous souhaitez vérifier les invitations.').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);
        let i = 0;
        userInv.forEach(inv => i += inv.uses);
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Invitations de ${user.tag}`)
            .setDescription(`${user.tag} has **${i}** invites.`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Nombre d’invitations' });
        await interaction.reply({ embeds: [embed] });
    }
};
