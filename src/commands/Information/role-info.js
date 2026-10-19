const { EmbedBuilder, MessageFlags, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-info')
        .setDescription('Recevez des informations concernant un rôle sur le serveur.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Choisissez le rôle pour en obtenir les détails.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        if (!role || !role.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`\`⚠️\` **•** Le rôle spécifié n'existe pas.`)
                    .setFooter({ text: 'Codé avec ❤️ par Saez' })
            ],
            flags: MessageFlags.Ephemeral
        });
        if (role.name === '@everyone') return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`\`⚠️\` **•** Le rôle ${role.name} n'est pas disponible. Il ne peut pas s'agir du rôle \`@everyone\`.`)
                    .setFooter({ text: 'Codé avec ❤️ par Saez' })
            ],
            flags: MessageFlags.Ephemeral
        });
        const createdTime = parseInt(role.createdTimestamp / 1000);
        const mentionable = role.mentionable? 'true': 'false';
        const managed = role.managed ? 'true': 'false';
        const hoisted = role.hoisted ? 'true': 'false';
        const position = role.position;
        const botrole = role.botrole ? 'true': 'false';
        const permissions = role.permissions.toArray().map((P) => `${P}`).join(', ');
        const embed = new EmbedBuilder()
            .setAuthor({ name: `@${role.name} | Informations sur le rôle` })
            .setColor('Random')
            .addFields(
                { name: 'Nom', value: `${role.name}`, inline: true },
                { name: 'Coleur', value: `${role.hexColor}`, inline: true },
                { name: 'Mention', value: `\`<@&${role.id}>\``, inline: true },
                { name: 'Hoisted', value: `${hoisted}`, inline: true },
                { name: 'Position', value: `${position}`, inline: true },
                { name: 'Mentionable', value: `${mentionable}`, inline: true },
                { name: 'Géré', value: `${managed}`, inline: true },
                { name: 'Rôle du Bot', value: `${botrole}`, inline: true },
                { name: 'Créé', value: `<t:${createdTime}:R>`, inline: true },
                { name: 'Permissions', value: `${permissions}`, inline: true }
            )
            .setFooter({ text: `Codé avec ❤️ par Saez | ID du rôle : ${role.id}` })
            .setTimestamp();
        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
};
