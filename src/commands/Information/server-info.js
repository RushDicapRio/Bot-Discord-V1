const { EmbedBuilder, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Recevez des informations concernant le serveur.'),
    async execute(interaction) {
        const { guild } = interaction;
        const { members, channels, emojis, roles, stickers } = guild;
        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const botCount = members.cache.filter(member => member.user.bot).size;
        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];
            for (const role of roles) {
                const roleString = `<@&${role.id}>`;
                if (roleString.length + totalLength > maxFieldLength)
                break;
                totalLength += roleString.length + 1;
                result.push(roleString);
            }
            return result.length;
        }
        const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (chr) => chr.toUpperCase());
            return separator ? splitPascal(pascal, separator) : pascal;
        };
        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
        const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildNews,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildNewsThread,
            ChannelType.GuildCategory
        ]);
        await interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor('Random')
                .setTitle(`**${guild.name}**`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .setTimestamp()
                .setFooter({ text: `Codé avec ❤️ par Saez | Demandé par ${interaction.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .addFields(
                    {
                        name: '__Général__',
                        value: [
                            `> 📜 **Créé** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                            `> 💳 **ID** ${guild.id}`,
                            `> 👑 **Créateur** <@${guild.ownerId}>`,
                            `> 🌍 **Langue** ${new Intl.DisplayNames(["en"], { type: "language" }).of(guild.preferredLocale)}`,
                            `> 💻 **URL personnalisée** ${guild.vanityURLCode || "Aucune"}`
                        ].join('\n')
                    },
                    {
                        name: '__Sécurité__',
                        value: [
                            `> 👀 **Filtre pour contenus explicites** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], " ")}`,
                            `> 🔞 **Niveau NSFW** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                            `> 🔒 **Niveau de vérification** ${splitPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`
                        ].join('\n')
                    },
                    {
                        name: `__Utilisateurs__ (${guild.memberCount})`,
                        value: [
                            `> 👥 **Membres** ${guild.memberCount - botCount}`,
                            `> 🤖 **Bots** ${botCount}`
                        ].join('\n')
                    },
                    {
                        name: `__Salons, Fils & Catégories__ (${totalChannels})`,
                        value: [
                            `> 💬 **Textuels** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
                            `> 🔊 **Voicaux** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
                            `> 🧵 **Fils** ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
                            `> 📑 **Catégories** ${getChannelTypeSize([ChannelType.GuildCategory])}`
                        ].join('\n')
                    },
                    {
                        name: `__Emojis & Stickers__ (${emojis.cache.size + stickers.cache.size})`,
                        value: [
                            `> 📺 **Animatés** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                            `> 🗿 **Statiques** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                            `> 🏷 **Autocollants** ${stickers.cache.size}`
                        ].join('\n')
                    },
                    {
                        name: '__Stats Nitro__',
                        value: [
                            `> 📈 **Tier** ${guild.premiumTier || "Aucun"}`,
                            `> 💪🏻 **Boosts** ${guild.premiumSubscriptionCount}`,
                            `> 💎 **Boosters** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                            `> 🏋🏻‍♀️ **Total Boosters** ${guild.members.cache.filter(member => member.premiumSince).size}`
                        ].join('\n')
                    },
                    { name: '__Caractéristiques__', value: guild.features?.map(feature => `> ${toPascalCase(feature, '')}`)?.join('\n') || '> Aucun' },
                    { name: `__Rôles Utilisateur__ (${maxDisplayRoles(userRoles)} de ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(' ') || '> Aucun' }` },
                    { name: `__Rôles gérés__ (${maxDisplayRoles(managedRoles)} de ${managedRoles.length})`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(' ') || '> Aucun'}` },
                    { name: '__Description__', value: `> 📝 ${guild.description || 'Aucune'}` },
                    { name: '__Bannière__', value: guild.bannerURL() ? '** **': 'Aucune' }
                )
        ] });
    }
};
