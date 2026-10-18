const { EmbedBuilder } = require('discord.js');
function logging(client) {
    const logSchema = require('../schemas/log');
    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (data) => {
            if (!data || !data.Webhook) return;
            try {
                const webhook = new WebhookClient({ url: data.Webhook });
                if (!webhook) return;
                await webhook.send({ embeds: [embed] });
            } catch (err) {}
        });
    }
    client.on('messageDelete', function (message) {
        try {
            if (message.guild === null) return;
            if (message.author.bot) return;
            const embed = new EmbedBuilder()
                .setTitle('Message Supprimé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Auteur", value: `<@${message.author.id}> - *${message.author.tag}*`})
                .addFields({ name: 'Salon', value: `${message.channel}`})
                .addFields({ name: "Message Supprimé", value: `${message.content}`})
                .setFooter({ text: "Codé avec ❤️ par Saez | Système de Log" });
            return send_log(message.guild.id, embed);
        } catch (err) {
            console.log('Impossible d\'enregistrer le message supprimé');
        }
    });
    client.on('guildChannelTopicUpdate', (channel, oldTopic, newTopic) => {
        try {
            if (channel.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Sujet Changé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'Salon', value: `${channel}` })
                .addFields({ name: 'Ancien Sujet', value: `${oldTopic}` })
                .addFields({ name: "Nouveau Sujet", value: `${newTopic}` })
                .setFooter({ text: "Codé avec ❤️ par Saez | Système de Log" });
            return send_log(channel.guild.id, embed);
        } catch (err) {
            console.log('Mise à jour du sujet de journalisation des erreurs');
        }
    });
    client.on('guildChannelPermissionsUpdate', (channel) => {
        try {
            if (channel.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Salon mis à jour')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Salon", value: `${channel}` })
                .addFields({ name: "Changement", value: `Les autorisations ou le nom du salon ont été mis à jour.` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(channel.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la mise à jour du salon de journalisation');
        }
    });
    client.on('unhandleGuildChannelUpdate', (oldChannel) => {
        try {
            if (oldChannel.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Salon mis à jour')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'Salon', value: `${oldChannel}` })
                .addFields({ name: "Changement", value: `**Saez Bot** n'a trouvé aucun changement.` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(oldChannel.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation d\'une mise à jour du salon non gérée');
        }
    });
    client.on('guildMemberBoost', (member) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`${member.user.username} a commencé à booster`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: "Serveur", value: `${member.guild.name}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation du début du boost de membre');
        }
    });
    client.on('guildMemberUnboost', (member) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`${member.user.username} a arrêté de booster`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: "Serveur", value: `${member.guild.name}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de l\'arrêt du boost de membre');
        }
    });
    client.on('guildMemberRoleAdd', (member, role) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`${member.user.username} s'est vu confier un rôle`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: 'Role', value: `${role}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' })
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de l\'attribution du rôle');
        }
    });
    client.on('guildMemberRoleRemove', (member, role) => {
        try {
            if (member.guild === null) return;
            const embec = new EmbedBuilder()
                .setTitle(`${member.user.username} a perdu un rôle`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: 'Role', value: `${role}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de la suppression du rôle');
        }
    });
    client.on('guildMemberNicknameUpdate', (member, oldNickname, newNickname) => {
        try {
            const embed = new EmbedBuilder()
                .setTitle('Spezudo mis à jour')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", url: `${member.user}` })
                .addFields({ name: 'Ancien Speudo', value: `${oldNickname || '**Aucun**'}` })
                .addFields({ name: "Nouveau Speudo", value: `${newNickname || '**Aucun**'}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur de journalisation de la mise à jour du pseudo');
        }
    });
    client.on('guildMemberAdd', (member) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Nouveau Utilisateur')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: "ID du membre", value: `${member.user.id}` })
                .addFields({ name: "Tag du membre", value: `${member.user.tag}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur de journalisation, ajout d\'un membre');
        }
    });
    client.on('guildMemberRemove', (member) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Utilisateur Parti')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: "ID du membre", value: `${member.user.id}` })
                .addFields({ name: "Tag du membre", value: `${member.user.tag}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation du départ d\'un membre');
        }
    });
    client.on('guildBoostLevelUp', (guild, oldLevel, newLevel) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`${guild.name} a atteint un niveau de boost`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Info", value: `**${guild.name}** est passée du niveau **${oldLevel}** au niveau **${newLevel}** !` })
                .addFields({ name: "Serveur", value: `${member.guild.name}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de l\'augmentation du niveau de boost');
        }
    });
    client.on('guildBoostLevelDown', (guild, oldLevel, newLevel) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`${guild.name} a perdu un niveau de boost`)
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Info", url: `**${guild.name}** a perdu un niveau, passant de **${oldLevel}** à **${newLevel}** !` })
                .addFields({ name: "Serveur", value: `${member.guild.name}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
        } catch (err) {
            console.log('Erreur lors de la journalisation de la baisse du niveau de boost');
        }
    });
    client.on('guildBannerAdd', (guild, bannerURL) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle(`La bannière de ${guild.name} a été mise à jour.`)
                .setColor('Random')
                .addFields({ name: 'URL de la bannière', value: `${bannerURL}` })
                . setImage(bannerURL)
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' })
                .setTimestamp();
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation du changement de bannière');
        }
    });
    client.on('guildAfkChannelAdd', (guild, afkChannel) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Nouveau salon AFK')
                .setColor('Random')
                .addFields({ name: "Salon AFK", value: `${afkChannel}` })
                .setTimestamp()
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de l\'ajout du salon AFK');
        }
    });
    client.on('guildVanityURLAdd', (guild, vanityURL) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('URL personnalisée ajoutée')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'URL personnalisée', value: `${vanityURL}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Ajout de personnalisation de la journalisation des erreurs');
        }
    });
    client.on('guildVanityURLRemove', (guild, vanityURL) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('URL personnalisée supprimée')
                .setColor('Random')
                .addFields({ name: "Ancienne URL", value: `${vanityURL}` })
                .setTimestamp()
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Suppression de la journalisation des erreurs pour les noms personnalisés');
        }
    });
    client.on('guildVanityURLUpdate', (guild, oldVanityURL, newVanityURL) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('URL personnalisée mise à jour')
                .setColor('Random')
                .addFields({ name: "Ancienne URL", value: `${oldVanityURL}` })
                .addFields({ name: "Nouvelle URL", value: `${newVanityURL}` })
                .setTimestamp()
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Journalisation des erreurs, mise à jour de l\'interface utilisateur');
        }
    });
    client.on('messagePinned', (message) => {
        try {
            if (message.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Message épinglé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'Epingleur', value: `${message.author}` })
                .addFields({ name: "Messgae", value: `${message.content}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(message.guild.id, embed);
        } catch (err) {
            console.log('ajout d\'une broche de journalisation des erreurs');
        }
    });
    client.on('messageContentEdited', (message, oldContent, newContent) => {
        try {
            if (message.guild === null) return;
            if (message.author.bot) return;
            const embed = new EmbedBuilder()
                .setTitle('Message modifié')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'Membre', url: `${message.author}` })
                .addFields({ name: 'Ancien message', url: `${oldContent}` })
                .addFields({ name: "Nouveau message", url: `${newContent}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(message.guild.id, embed);
        } catch (err) {
            console.log('Modifier le message de journalisation des erreurs');
        }
    });
    client.on('rolePositionUpdate', (role, oldPosition, newPosition) => {
        try {
            if (role.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Position de rôle mis à jour')
                .setColor('Random')
                .addFields({ name: 'Rôle', value: `${role}` })
                .addFields({ name: "Ancienne position", value: `${oldPosition}` })
                .addFields({ name: "Nouvelle position", value: `${newPosition}` })
                .setTimestamp()
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(role.guild.id, embed);
        } catch (err) {
            console.log('Erreur de journalisation du rôle pos mise à jour');
        }
    });
    client.on('rolePermissionsUpdate', (role, oldPermissions, newPermissions) => {
        try {
            if (role.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Permissions de rôle mis à jour')
                .setColor('Random')
                .addFields({ name: "Rôle", value: `${role}` })
                .addFields({ name: "Anciennes permissions", value: `${oldPermissions}` })
                .addFields({ name: "Nouvelles permissions", value: `${newPermissions}` })
                .setTimestamp()
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(role.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de la mise à jour des permissions de rôle');
        }
    });
    client.on('voiceChannelSwitch', (member, oldChannel, newChannel) => {
        try {
            if (member.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Salon vocal déplacé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${member.user}` })
                .addFields({ name: "De", value: `${oldChannel}` })
                .addFields({ name: "Vers", value: `${newChannel}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(member.guild.id, embed);
        } catch (err) {
            console.log('Erreur de journalisation du commutateur VC');
        }
    });
    client.on('roleCreate', (role) => {
        try {
            if (role.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Rôle créé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Nom du rôle", value: `${role.name}` })
                .addFields({ name: "ID du rôle", value: `${role.id}` })
                .addFields({ name: "Couleur du rôle", value: `${role.hexColor}` })
                .addFields({ name: "Position du rôle", value: `${role.position}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(role.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de la création du rôle');
        }
    });
    client.on('roleDelete', (role) => {
        try {
            if (role.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Rôle supprimé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Nom du rôle", value: `${role.name}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(role.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de la suppression du rôle');
        }
    });
    client.on('guildBanAdd', ({guild, user}) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Utilisateur banni')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: 'Membre', value: `${user}` })
                .addFields({ name: "ID du membre", value: `${user.id}` })
                .addFields({ name: "Tag du membre", value: `${user.tag}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Erreur de journalisation bannir ajouter');
        }
    });
    client.on('guildBanRemove', ({guild, user}) => {
        try {
            if (guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Utilisateur débanni')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Membre", value: `${user}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(guild.id, embed);
        } catch (err) {
            console.log('Suppression de l\'interdiction de journalisation des erreurs');
        }
    });
    client.on('channelCreate', (channel) => {
        try {
            if (channel.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Salon créé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Salon", value: `${channel}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(channel.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la création du salon de journalisation');
        }
    });
    client.on('channelDelete', (channel) => {
        try {
            if (channel.guild === null) return;
            const embed = new EmbedBuilder()
                .setTitle('Salon supprimé')
                .setColor('Random')
                .setTimestamp()
                .addFields({ name: "Salon", value: `${channel}` })
                .setFooter({ text: 'Codé avec ❤️ par Saez | Système de Log' });
            return send_log(channel.guild.id, embed);
        } catch (err) {
            console.log('Erreur lors de la journalisation de la suppression du salon');
        }
    });
}
module.exports = { logging };
