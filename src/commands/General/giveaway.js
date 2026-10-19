const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const ms = require('ms');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Configurez votre ou vos giveaway(s).')
        .addSubcommand(command => command.setName('lancer').setDescription('Lance un giveaway avec les champs spécifiés.').addStringOption(option => option.setName('durée').setDescription('La durée indiquée correspondra à la durée du giveaway (en millisecondes).').setRequired(true)).addIntegerOption(option => option.setName('gagnants').setDescription('Le nombre indiqué correspondra au nombre de gagnants sélectionnés.').setRequired(true)).addStringOption(option => option.setName('prix').setDescription('Le prix indiqué sera celui qui sera offert dans le cadre du giveaway.').setRequired(true)).addChannelOption(option => option.setName('salon').setDescription('Le salon indiqué recevra le giveaway.')).addStringOption(option => option.setName('contenu').setDescription('Le contenu indiqué sera utilisé pour l’élément intégré du giveaway.')))
        .addSubcommand(command => command.setName('modifié').setDescription('Modifie le giveaway indiqué.').addStringOption(option => option.setName('message-id').setDescription('ID du message du giveaway à modifier.').setRequired(true)).addStringOption(option => option.setName('temps').setDescription('Durée ajoutée au giveaway (en ms).').setRequired(true)).addIntegerOption(option => option.setName('gagnants').setDescription('Nouveau nombre de gagnants.').setRequired(true)).addStringOption(option => option.setName('prix').setDescription('Nouveau prix du giveaway.').setRequired(true)))
        .addSubcommand(command => command.setName('fin').setDescription('Met fin au giveaway indiqué.').addStringOption(option => option.setName('message-id').setDescription('ID du message du giveaway à terminer.').setRequired(true)))
        .addSubcommand(command => command.setName('relancer').setDescription('Relance le giveaway spécifié.').addStringOption(option => option.setName('message-id').setDescription('ID du message à relancer.').setRequired(true))),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: 'Vous n’avez pas la permission de faire cela !', ephemeral: true });
        const sub = interaction.options.getSubcommand();
        switch (sub) {
            case 'lancer':
                await interaction.reply({ content: '**Lancement** de votre giveaway...', ephemeral: true });
                const duration = ms(interaction.options.getString('durée') || '');
                const winnerCount = interaction.options.getInteger('gagnants');
                const prize = interaction.options.getString('prix');
                const contentmain = interaction.options.getString('contenu');
                const channel = interaction.options.getChannel('salon');
                const showchannel = interaction.options.getChannel('salon') || interaction.channel;
                if (!channel && !contentmain)
                client.giveawayManager.start(interaction.channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: false,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: 'Random'
                    }
                });
                else if (!channel)
                client.giveawayManager.start(interaction.channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: 'Random'
                    }
                });
                else if (!contentmain)
                client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: false,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: 'Random'
                    }
                });
                else
                client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: 'Random'
                    }
                });
                interaction.editReply({ content: `Votre **giveaway** a été lancé **avec succès** dans ${showchannel} !`, ephemeral: true });
                break;
            case 'modifié':
                await interaction.reply({ content: '**Modification** de votre giveaway...', ephemeral: true });
                const newprize = interaction.options.getString('prix');
                const newduration = interaction.options.getString('temps');
                const newwinners = interaction.options.getInteger('gagnants');
                const messageId = interaction.options.getString('message-id');
                client.giveawayManager.edit(messageId, {
                    addTime: ms(duration),
                    newWinnerCount: newwinners,
                    newPrize: newprize
                }).then(() => {
                    interaction.editReply({ content: 'Votre **giveaway** a été **modifié** avec succès !', ephemeral: true });
                }).catch((err) => {
                    interaction.editReply({ content: 'Une **erreur** s’est produite !', ephemeral: true });
                });
                break;
            case 'fin':
                await interaction.reply({ content: '**Clôture** de votre giveaway...', ephemeral: true });
                const messageId1 = interaction.options.getString('message-id');
                client.giveawayManager
                    .end(messageId1)
                    .then(() => {
                        interaction.editReply({ content: 'Votre **giveaway** a pris fin **avec succès !**', ephemeral: true });
                    })
                    .catch((err) => {
                        interaction.editReply({ content: 'Une **erreur** s’est produite !', ephemeral: true });
                    });
                break;
            case 'relancer':
                await interaction.reply({ content: '**Relancement** du giveaway...', ephemeral: true });
                const query = interaction.options.getString('message-id');
                const giveaway =
                client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === query) ||
                client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === query);
                if (!query) return interaction.editReply({ content: `Impossible de trouver un giveaway avec l'identifiant **${query}**.`, ephemeral: true });
                const messageId2 = interaction.options.getString('message-id');
                client.giveawayManager.reroll(messageId2).then(() => {
                    interaction.editReply({ content: 'Le giveaway a été relancé avec succès !' });
                })
                .catch((err) => {
                    interaction.editReply({ content: 'Une **erreur** s’est produite !', ephemeral: true });
                });
        }
    }
};
