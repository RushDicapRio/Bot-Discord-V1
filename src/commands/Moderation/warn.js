const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const warnSchema = require('../../schemas/warn');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Avertir un utilisateur au sein du serveur.')
        .addUserOption(option => option.setName('cible').setDescription('L\'utilisateur que vous souhaitez avertir').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('C’est la raison pour laquelle l’utilisateur est averti.').setRequired(false)),
    async execute(interaction) {
        const warnUser = interaction.options.getUser('cible');
        const warnMember = await interaction.guild.members.fetch(warnUser.id);
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: 'Vous n\'avez pas l\'autorisation d\'avertir les gens !', ephemeral: true });
        if (!warnMember) return await interaction.reply({ content: 'L’utilisateur mentionné ne se trouve plus sur le serveur.', ephemeral: true });
        if (!warnMember.kickable) return interaction.reply({ content: 'Je ne peux pas avertir cet utilisateur, car il occupe un rang supérieur au mien ou au vôtre.', ephemeral: true });
        if (interaction.member.id === warnMember.id) return interaction.reply({ content: 'Vous ne pouvez pas vous avertir vous-même !', ephemeral: true });
        if (warnMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'Vous ne pouvez pas adresser d’avertissement aux membres du personnel ni aux personnes disposant de l’autorisation « Administrateur ».', ephemeral: true });
        const { options, guildId, user } = interaction;
        const target = options.getUser('cible');
        const reason = options.getString('raison') || 'Aucun motif fourni';
        const userTag = `${target.username}#${target.discriminator}`;
        let guild = await interaction.guild.fetch();
        let warningData = await warnSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag });
        if (!warningData) {
            warningData = new warnSchema({
                GuildID: guildId,
                UserID: target.id,
                UserTag: userTag,
                Content: [
                    {
                        ExecuterId: user.id,
                        ExecuterTag: user.tag,
                        Reason: reason
                    }
                ]
            });
        } else {
            warningData.Content.push({
                ExecuterId: user.id,
                ExecuterTag: user.tag,
                Reason: reason
            });
        }
        await warningData.save();
        const dmEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Avis de modération')
            .setDescription(`\n ${warnUser.tag}, \n \`Vous avez reçu un avertissement sur ${guild.name}\` \n \n \n Raison : \n ${reason} \n \n Modérateur responsable : \n ${interaction.user.tag}`)
            .setFooter({ text: 'Codé avec ❤️ par Saez' });
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`**${target.tag}** a reçu un avertissement. \nMotif : **${reason}**`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Utilisateur averti' })
            .setTimestamp()
        target.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });
        interaction.reply({ embeds: [embed] });
    }
};
