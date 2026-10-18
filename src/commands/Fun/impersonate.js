const { SlashCommandBuilder, ChannelType, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('impersonate')
        .setDescription('Usurper l’identité d’un utilisateur à l’aide d’un webhook.')
        .addUserOption(option => option
            .setName('user')
            .setDescription('L’utilisateur dont vous souhaitez usurper l’identité.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('message')
            .setDescription('Le message que vous souhaitez que l’utilisateur prononce.')
            .setRequired(true)
        )
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Envoie ce message vers un salon spécifié.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const member = interaction.options.getUser('user');
        const message = interaction.options.getString('message');
        const channelx = interaction.options.getChannel('channel');
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageWebhooks)) return await interaction.reply({ content: 'Vous ne pouvez pas utiliser cette commande !' });
        if (message.includes('@everyone') || message.includes('@here')) return await interaction.reply({ content: 'Vous ne pouvez pas @everyone/@here avec cette commande.', ephemeral: true });
        await channelx.createWebhook({
            name: member.username,
            avatar: member.displayAvatarURL({ dynamic: true })
        }).then((webhook) => {
            webhook.send({ content: message });
            setTimeout(() => {
                webhook.delete();
            }, 3000)
        });
        await interaction.reply({ content: `L'identité de <@${member.id}> a été usurpée dans <#${channelx.id}>`, ephemeral: true });
    }
};
