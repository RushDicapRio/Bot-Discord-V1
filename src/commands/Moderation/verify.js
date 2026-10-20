const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const verifySchema = require('../../schemas/verify');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDMPermission(false)
        .setDescription('Configurez le système de vérification.')
        .addSubcommand(command => command.setName('setup').setDescription('Configurer le système de vérification').addRoleOption(option => option.setName('role').setDescription('Un rôle spécifique sera attribué aux utilisateurs vérifiés.').setRequired(true)).addChannelOption(option => option.setName('salon').setDescription('Le salon indiqué sera votre salon de vérification.').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)).addStringOption(option => option.setName('contenu').setDescription('Le message indiqué sera inclus dans l\'embed de vérification.').setRequired(false).setMinLength(1).setMaxLength(100)))
        .addSubcommand(command => command.setName('désactiver').setDescription('Désactivez le système de vérification.')),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'Vous n’avez pas la permission de faire cela !', ephemeral: true });
        const data = await verifySchema.findOne({ Guild: interaction.guild.id });
        const sub = interaction.options.getSubcommand()
        switch (sub) {
            case 'setup':
                const role = await interaction.options.getRole('role');
                const channel = await interaction.options.getChannel('salon');
                const message = await interaction.options.getString('contenu') || 'Cliquez sur le bouton ci-dessous pour lancer votre procédure de vérification !';
                if (data) return await interaction.reply({ content: 'Vous avez **déjà** un système de vérification **en place** ! \n> Utilisez `/verify disable` pour annuler.', ephemeral: true });
                else {
                    await verifySchema.create({
                        Guild: interaction.guild.id,
                        Role: role.id,
                        Channel: channel.id,
                        Message: 'vide',
                        Verified: []
                    });
                    const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('verify')
                            .setLabel('✅ Vérifier')
                            .setStyle(ButtonStyle.Success)
                    )
                    const verify = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle('Processus de vérification')
                        .setAuthor({ name: 'Système de vérification' })
                        .setFooter({ text: 'Codé avec ❤️ par Saez | Demande de vérification' })
                        .setDescription(`> ${message}`)
                    interaction.reply({ content: 'Votre **système de vérification** a été mis en place !', ephemeral: true });
                    const msg = await channel.send({ embeds: [verify], components: [buttons] });
                    await verifySchema.updateOne({ Guild: interaction.guild.id }, { $set: { Message: msg.id }});
                }
                break;
            case 'désactiver':
                if (!data) return await interaction.reply({ content: 'Le **système de vérification** n’a pas encore été **mis en place** ; il est impossible de supprimer **quoi que ce soit**...', ephemeral: true });
                else {
                    await verifySchema.deleteMany({ Guild: interaction.guild.id });
                    const deletemsg = await client.channels.cache.get(data.Channel).messages.fetch(data.Message);
                    await deletemsg.delete();
                    await interaction.reply({ content: 'Votre **système de vérification** a bien été **désactivé** !', ephemeral: true });
                }
        }
    }
};
