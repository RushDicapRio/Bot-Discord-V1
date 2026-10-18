const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild-list')
        .setDescription('Dresse la liste de tous les serveurs sur lesquels le bot est présent.'),
    async execute(interaction, client) {
        try {
            if (interaction.user.id !== '') {
                return await interaction.reply({ content: 'Cette commande est verrouillée par le développeur.', ephemeral: true });
            }
            const guilds = client.guilds.cache;
            const pageSize = 5;
            const pages = Math.ceil(guilds.size / pageSize);
            let page = 1;
            const start = (page - 1) * pageSize;
            const end = page * pageSize;
            let guildList = '';
            let index = 1;
            for (const [guildId, guild] of guilds) {
                const owner = guild.members.cache.get(guild.ownerId);
                if (!owner) continue;
                if (index > end) break;
                if (index > start) {
                    guildList += `**__Serveur__** : ${guild.name} (${guildId})\n`;
                    guildList += `**__Créateur Du Serveur__** : ${owner.user.tag} (${owner.user.id})\n`;
                    guildList += `**__Membres__** : ${guild.memberCount}\n\n`;
                }
                index++;
            }
            const embed = new EmbedBuilder()
                .setTitle(`Saez Bot est actuellement présent sur **${client.guilds.cache.size}** serveurs`)
                .setDescription(guildList)
                .setColor('Random')
                .setFooter({ text: `Codé avec ❤️ par Saez | Page ${page}/${pages}` })
                .setTimestamp();
            const msg = await interaction.reply({ embeds: [embed], ephemeral: true });
            if (pages > 1) {
                await msg.react('⬅️');
                await msg.react('➡️');
                const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === interaction.user.id;
                const collector = msg.createReactionCollector({ filter, time: 60000 });
                collector.on('collect', async (reaction) => {
                    if (reaction.emoji.name == '⬅️' && page > 1) {
                        page--;
                    } else if (reaction.emoji.name === '➡️' && page < pages) {
                        page++;
                    } else if (reaction.emoji.name === '⬅️' && page === 1) {
                        page = pages;
                    } else if (reaction.emoji.name === '➡️' && page === pages) {
                        page = 1;
                    }
                    const newstart = (page - 1) * pageSize;
                    const newend = page * pageSize;
                    guildList = '';
                    index = 1;
                    for (const [guildId, guild] of guilds) {
                        const owner = guild.members.cache.get(guild.ownerId);
                        if (!owner) continue;
                        if (index > newend) break;
                        if (index > newstart) {
                            guildList += `**__Serveurs__** : ${guild.name} (${guildId})\n`;
                            guildList += `**__Créateur Du Serveur__** : ${owner.user.tag} (${owner.user.id})\n`;
                            guildList += `**__Membres__** : ${guild.memberCount}\n\n`;
                        }
                        index++;
                    }
                    embed
                        .setDescription(guildList)
                        .setFooter({ text: `Codé avec ❤️ par Saez | Page ${page}/${pages}` });
                    msg.edit({ embeds: [embed] });
                    await reaction.users.remove(interaction.user);
                    collector.resetTime();
                });
                collector.on('end', async () => {
                    msg.reactions.removeAll().catch(console.error);
                    embed.setFooter({ text: `Codé avec ❤️ par Saez | Page ${page}/${pages} (page inactive)` });
                    await msg.edit({ embeds: [embed] });
                });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Une **erreur** est survenue lors de l'exécution de cette commande !", ephemeral: true });
        }
    }
};
