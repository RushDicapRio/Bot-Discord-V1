const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports= {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Débannir un utilisateur sur le serveur.')
        .addUserOption(option => option.setName('utilisateur').setDescription('Indiquez l\'utilisateur que vous souhaitez bannir.').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('Raison pour laquelle vous souhaitez lever le bannissement de l\'utilisateur concerné.').setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucun motif fourni';
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: 'Vous n’avez pas la permission de faire cela.', ephemeral: true });
        if (interaction.member.id === target.id) return interaction.reply({ content: 'Vous ne pouvez pas lever votre propre bannissement.' });
        if (!reason) reason = 'Aucune raison fournie';
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`**${target.tag}** a été débanni. \nMotif : **${reason}**`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Utilisateur débanni' })
            .setTimestamp()
        await interaction.guild.bans.fetch().then(async bans => {
            if (bans.size == 0) return await interaction.reply({ content: 'Il n’y a **personne** à débannir.', ephemeral: true });
            let bannedID = bans.find(ban => ban.user.id == target.id);
            if (!bannedID) return await interaction.reply({ content: 'Cet utilisateur **n’est pas** banni.', ephemeral: true });
            await interaction.guild.bans.remove(target.id, reason).catch(err => {
                return interaction.reply({ content: 'Impossible de lever le bannissement de l\'utilisateur indiqué !', ephemeral: true });
            })
        });
        await interaction.reply({ embeds: [embed] });
    }
};
