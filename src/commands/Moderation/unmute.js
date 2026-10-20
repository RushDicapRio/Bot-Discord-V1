const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Supprimer la sanction temporaire (timeout) appliquée à un utilisateur sur le serveur.')
        .addUserOption(option => option.setName('cible').setDescription('L\'utilisateur dont vous souhaitez réactiver le délai d\'attente').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('La raison du déblocage du délai d\'attente de l\'utilisateur')),
    async execute(interaction) {
        const timeUser = interaction.options.getUser('cible');
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ content: 'Vous devez disposer de la permission « Modérer les membres » pour utiliser cette commande !', ephemeral: true });
        if (!timeMember.kickable) return interaction.reply({ content: 'Je ne peux pas appliquer de sanction temporaire à cet utilisateur ! C\'est soit parce qu\'il a un rang supérieur au mien ou au vôtre.', ephemeral: true });
        if (interaction.member.id === timeMember.id) return interaction.reply({ content: 'Vous ne pouvez pas vous infliger un temps mort vous-même !', ephemeral: true });
        if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'Vous ne pouvez pas lever la restriction temporaire (« timeout ») appliquée à des membres du personnel ou à des personnes disposant de l\'autorisation « Administrateur » !', ephemeral: true });
        let reason = interaction.options.getString('raison');
        if (!reason) reason = 'Aucun motif fourni';
        await timeMember.timeout(null, reason);
        const minEmbed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`La sanction (timeout) infligée à **${timeUser.tag}** a été **supprimée**. \nMotif : **${reason}**`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Utilisateur non soumis à une limite de temps' })
            .setTimestamp()
        const dmEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Avis de modération')
            .setDescription(`Votre mise en sourdine a été levée sur ${interaction.guild.name} \n\n Motif : \n ${reason}`)
            .setFooter({ text: 'Codé avec ❤️ par Saez' })
        await timeMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });
        await interaction.reply({ embeds: [minEmbed] });
    }
};
