const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Obtenir des informations concernant un utilisateur sur le serveur.')
        .addUserOption(option => option.setName('utilisateur').setDescription('L\'utilisateur pour obtenir des informations sur').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: tag, iconURL: icon })
            .setThumbnail(icon)
            .addFields(
                { name: 'Membre', value: `${user}`, inline: false },
                { name: 'Rôles', value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false },
                { name: 'Serveur rejoint', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
                { name: 'Discord rejoint', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: `Codé avec ❤️ par Saez | ID de l'utilisateur : ${user.id}` })
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    }
};
