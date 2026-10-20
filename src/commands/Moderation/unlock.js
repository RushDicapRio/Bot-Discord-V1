const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Déverrouillez le salon spécifié.')
        .addChannelOption(option => option.setName('salon').setDescription('Le salon que vous souhaitez débloquer').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: 'Vous devez disposer de l\'autorisation « Gérer les salons » pour utiliser cette commande.', ephemeral: true });
        let channel = interaction.options.getChannel('salon');
        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true });
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`${channel} a été débloqué.`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Salon déverrouillée' })
        await interaction.reply({ embeds: [embed] });
    }
};
