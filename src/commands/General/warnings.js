const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const warnSchema = require('../../schemas/warn');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Affiche les avertissements d\'un utilisateur sur le serveur.')
        .addUserOption(option => option.setName('user').setDescription('Le membre dont vous souhaitez vérifier les avertissements').setRequired(true)),
    async execute(interaction) {
        const { options, guildId } = interaction;
        const target = options.getUser('user');
        try {
            const data = await warnSchema.findOne({
                GuildID: guildId,
                UserID: target.id,
                UserTag: target.tag
            }).exec();
            if (data && Array.isArray(data.Content) && data.Content.length > 0) {
                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setTitle(`Avertissements de ${target.tag}`)
                    .setFooter({ text: 'Codé avec ❤️ par Saez | Nombre d’avertissements' })
                    .setDescription(data.Content.map((w, i) =>
                        `\n**Avertissement** : ${i + 1}\n**Raison** : ${w.Reason}\n**Modérateur Responsable** : ${w.ExecuterTag}`
                    ).join('\n------------------------------------'))
                    .setTimestamp();
                await interaction.reply({ embeds: [embed] });
                return;
            }
            const noWarns = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`${target.tag} comporte **0** avertissement !`)
                .setFooter({ text: 'Codé avec ❤️ par Saez' })
                .setTimestamp();
            await interaction.reply({ embeds: [noWarns] });
        } catch (err) {
            console.error('Erreur dans /warnings :', err);
            await interaction.reply({
                content: 'Une erreur est survenue lors de la récupération des avertissements.',
                ephemeral: true
            }).catch(() => {});
        }
    }
};
