const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const afkSchema = require('../../schemas/afk');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Passez en mode AFK sur le serveur.')
        .addSubcommand(command => command.setName('set').setDescription('Permet de passer en mode AFK.').addStringOption(option => option.setName('raison').setDescription('La raison pour laquelle vous êtes passé en mode « absent » (AFK) sera affichée.')))
        .addSubcommand(command => command.setName('supprimer').setDescription('Supprime votre statut AFK.')),
    async execute(interaction) {
        const { options } = interaction;
        const sub = options.getSubcommand();
        try {
            const Data = await afkSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
            switch (sub) {
                case 'set': {
                    if (Data) {
                        return await interaction.reply({ content: 'Vous êtes **déjà** en mode AFK sur ce serveur !', ephemeral: true });
                    }
                    const reason = options.getString('raison') || 'Aucune raison n’est donnée !';
                    const nickname = interaction.member.nickname || interaction.user.username;
                    await afkSchema.create({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Message: reason,
                        Nickname: nickname
                    });
                    const name = `[AFK] ${nickname}`;
                    await interaction.member.setNickname(`${name}`).catch(() => {});
                    const embed = new EmbedBuilder()
                        .setColor('Random')
                        .setTitle(`${interaction.user.username} est passé en mode AFK`)
                        .setDescription(`**Raison** : ${reason}`)
                        .setFooter({ text: 'Codé avec ❤️ par Saez | Quelqu\'un est passé en mode AFK' })
                        .setTimestamp();
                    await interaction.reply({
                        content: 'Vous êtes désormais **AFK** ! \nUtilisez **/afk supprimer** ou écrivez quelque chose dans le chat pour annuler.',
                        ephemeral: true
                    });
                    await interaction.channel.send({ embeds: [embed] }).catch(() => {});
                    return;
                }
                case 'supprimer': {
                    if (!Data) {
                        return await interaction.reply({ content: 'Tu n\'es **pas** absent (AFK), tu ne peux **rien** retirer...', ephemeral: true });
                    }
                    const nick = Data.Nickname;
                    await afkSchema.deleteMany({ Guild: interaction.guild.id, User: interaction.user.id });
                    await interaction.member.setNickname(`${nick}`).catch(() => {});
                    const embed1 = new EmbedBuilder()
                        .setColor('Random')
                        .setTitle(`${interaction.user.username} n'est plus absent (AFK)`)
                        .setDescription(`${interaction.user.username} est de retour, dites-lui bonjour 👋`)
                        .setFooter({ text: 'Codé avec ❤️ par Saez | Quelqu’un est revenu' })
                        .setTimestamp();
                    await interaction.reply({ content: 'Tu n\'es **plus** absent(e) ! Bon retour :)', ephemeral: true });
                    await interaction.channel.send({ embeds: [embed1] }).catch(() => {});
                    return;
                }
                default:
                    return await interaction.reply({ content: 'Sous-commande introuvable.', ephemeral: true });
            }
        } catch (error) {
            console.error('Erreur dans /afk :', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'Une erreur est survenue lors du traitement de votre demande AFK.',
                    ephemeral: true
                }).catch(() => {});
            }
        }
    }
};
