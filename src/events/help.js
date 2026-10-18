const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType, ActionRow } = require('discord.js');
module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await client.user.fetch();
        await client.application.fetch();
        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId === 'selecthelp') {
            let choices = "";
            const centerembed = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`**Saez Bot** propose une multitude de fonctionnalités variées pour enrichir votre expérience et celle de votre serveur. Voici les fonctionnalités offertes par le bot : \n\n <:icon1:1160823145893208166> :busts_in_silhouette: **Général** \n <:icon2:1160823168945094716> :shield: **Modération** \n <:icon2:1160823168945094716> :star_struck: **Divertissement** \n <:icon2:1160823168945094716> :video_game: **Mini-jeux** \n <:icon2:1160823168945094716> :tools: **Utilitaires** \n <:icon2:1160823168945094716> :information_source: **Informations** \n <:icon3:1160823210439348275> :gear: **Divers**`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `Codé avec ❤️ par Saez | Demandé par ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setTimestamp();
            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Serveur support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(),
                new ButtonBuilder()
                    .setLabel('Invite le bot')
                    .setStyle(ButtonStyle.Link)
                    .setURL(),
                new ButtonBuilder()
                    .setLabel('Top.gg')
                    .setStyle(ButtonStyle.Link)
                    .setURL()
            )  
            interaction.values.forEach(async (value) => {
                choices += `${value}`;
                if (value === 'helpcentre') {
                    await interaction.update({ embeds: [centerembed, button] });
                }
                if (value === 'commands') {
                    const commandpage1 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':busts_in_silhouette: **__Général__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /afk`, value: `<:icon3:1160823210439348275> Passez en mode AFK sur le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /calculator`, value: `<:icon3:1160823210439348275> Utilisez une calculatrice réaliste.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /dictionary`, value: `<:icon3:1160823210439348275> Cherchez n'importe quel mot dans le dictionnaire.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /giveaway`, value: `<:icon3:1160823210439348275> Configurez votre ou vos giveaways.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /invites`, value: `<:icon3:1160823210439348275> Affiche le nombre d'invitations d'un utilisateur sur le serveur..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /lyrics`, value: `<:icon3:1160823210439348275> Obtenez les paroles de n'importe quelle chanson.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /reminder`, value: `<:icon3:1160823210439348275> Configurez vos rappels.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /translate`, value: `<:icon3:1160823210439348275> Traduisez votre message dans une autre langue..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /warnings`, value: `<:icon3:1160823210439348275> Affiche les avertissements d'un utilisateur sur le serveur..` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage2 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':shield: **__Modération__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /automod`, value: `<:icon3:1160823210439348275> Configurez le système de modération automatique.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /ban`, value: `<:icon3:1160823210439348275> Bannir un utilisateur du serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /clear-warn`, value: `<:icon3:1160823210439348275> Effacer les avertissements d'un utilisateur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /kick`, value: `<:icon3:1160823210439348275> Expulser un utilisateur du serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /lock`, value: `<:icon3:1160823210439348275> Verrouiller le salon spécifié.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /logs`, value: `<:icon3:1160823210439348275> Configurer le système de journalisation.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /mod-name`, value: `<:icon3:1160823210439348275> Modérer le pseudonyme d'un utilisateur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /mute`, value: `<:icon3:1160823210439348275> Suspendre temporairement un utilisateur sur le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /purge`, value: `<:icon3:1160823210439348275> Messages clairs de la part d'un utilisateur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /role`, value: `<:icon3:1160823210439348275> Configurer les rôles sur le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /unban`, value: `<:icon3:1160823210439348275> Débannir un utilisateur du serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /unlock`, value: `<:icon3:1160823210439348275> Déverrouiller le salon spécifié.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /unmute`, value: `<:icon3:1160823210439348275> Annuler la mise en timeout d'un utilisateur sur le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /verify`, value: `<:icon3:1160823210439348275> Configurer le système de vérification.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /warn`, value: `<:icon3:1160823210439348275> Avertir un utilisateur sur le serveur.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage3 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':star_struck: **__Fun__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /8ball`, value: `<:icon3:1160823210439348275> Jouez au billard américain (8-ball).` })
                        .addFields({ name: `<:icon4:1160823233965207552> /advice`, value: `<:icon3:1160823210439348275> Obtenez quelques conseils au hasard.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /ascii`, value: `<:icon3:1160823210439348275> Convertit le texte donné en ASCII..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /bonk`, value: `<:icon3:1160823210439348275> Donner un coup sur la tête à un utilisateur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /coin-flip`, value: `<:icon3:1160823210439348275> Lancez une pièce.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /dice`, value: `<:icon3:1160823210439348275> Lancez un dé.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /find-game`, value: `<:icon3:1160823210439348275> Trouvez un jeu qui vous plaît..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /hack`, value: `<:icon3:1160823210439348275> Pirater l'utilisateur mentionné.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /how-gae`, value: `<:icon3:1160823210439348275> Les résultats sont précis, sans la moindre contestation..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /husbando`, value: `<:icon3:1160823210439348275> Générer une image aléatoire de « husbando ».` })
                        .addFields({ name: `<:icon4:1160823233965207552> /impersonate`, value: `<:icon3:1160823210439348275> Emprunter l'identité d'un utilisateur à l'aide d'un webhook.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /meme`, value: `<:icon3:1160823210439348275> Générer un mème aléatoire.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /nitro`, value: `<:icon3:1160823210439348275> Ça a l'air sérieux, non ?.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /pp`, value: `<:icon3:1160823210439348275> Let's not talk about it.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /radio`, value: `<:icon3:1160823210439348275> Rejoignez une station de radio pour vibrer au rythme de la musique..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /sound-board`, value: `<:icon3:1160823210439348275> Jouez le son spécifié dans le VC.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /waifu`, value: `<:icon3:1160823210439348275> Générer une image de waifu aléatoire.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage4 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':video_game: **__Mini-jeux__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /2048`, value: `<:icon3:1160823210439348275> Jouez à une partie de 2048.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /connect-four`, value: `<:icon3:1160823210439348275> Faites une partie de Puissance 4..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /fast-type`, value: `<:icon3:1160823210439348275> Faites une partie de dactylographie rapide..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /find-emoji`, value: `<:icon3:1160823210439348275> Jouez à un jeu où il faut trouver l'émoji..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /flood`, value: `<:icon3:1160823210439348275> Faites une partie de Flood..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /guess-the-pokemon`, value: `<:icon3:1160823210439348275> Jouez à un jeu pour deviner le Pokémon..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /gunfight`, value: `<:icon3:1160823210439348275> Jouer au cow-boy.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /hangman`, value: `<:icon3:1160823210439348275> Jouez au pendu.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /match-pairs`, value: `<:icon3:1160823210439348275> Jouez à un jeu d'association de paires.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /minesweeper`, value: `<:icon3:1160823210439348275> Jouez à une partie de Démineur..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /rps`, value: `<:icon3:1160823210439348275> Fais une partie de pierre-feuille-ciseaux..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /slots`, value: `<:icon3:1160823210439348275> Jouez à une machine à sous.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /snake`, value: `<:icon3:1160823210439348275> Jouez à une partie de Snake..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /ttt`, value: `<:icon3:1160823210439348275> Faites une partie de morpion..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /wordle`, value: `<:icon3:1160823210439348275> Jouez à une partie de Wordle.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true} ))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage5 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':tools: **__Utilitaires__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /add-emoji`, value: `<:icon3:1160823210439348275> L'emoji spécifié sera ajouté au serveur..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /add-sticker`, value: `<:icon3:1160823210439348275> Le fichier spécifié sera ajouté en tant qu'autocollant sur le serveur..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /echo`, value: `<:icon3:1160823210439348275> Envoyer quelque chose dans le salon spécifié.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /enlarge`, value: `<:icon3:1160823210439348275> Agrandir un emoji.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /poll`, value: `<:icon3:1160823210439348275> Organisez un sondage auquel tous les utilisateurs peuvent participer..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /react-role`, value: `<:icon3:1160823210439348275> Configurez un système de rôles par réaction dans le salon spécifié..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /steal`, value: `<:icon3:1160823210439348275> Ajoutez l'emoji spécifié au serveur.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage6 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':information_source: **__Information__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /bot-info`, value: `<:icon3:1160823210439348275> Recevoir des informations concernant le bot.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /role-info`, value: `<:icon3:1160823210439348275> Recevoir des informations concernant un rôle sur le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /server-info`, value: `<:icon3:1160823210439348275> Recevoir des informations concernant le serveur.` })
                        .addFields({ name: `<:icon4:1160823233965207552> /user-info`, value: `<:icon3:1160823210439348275> Recevoir des informations concernant un utilisateur sur le serveur.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandpage7 = new EmbedBuilder()
                        .setColor('Random')
                        .setTimestamp()
                        .setTitle(':gear: **__Divers__**')
                        .addFields({ name: `<:icon4:1160823233965207552> /help`, value: `<:icon3:1160823210439348275> Apprenez-en davantage sur le bot et ses fonctionnalités..` })
                        .addFields({ name: `<:icon4:1160823233965207552> /ping`, value: `<:icon3:1160823210439348275> Vérifiez la latence du bot.` })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'Codé avec ❤️ par Saez' });
                    const commandbuttons1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst1')
                            .setLabel('◀◀')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft1')
                            .setLabel('◀')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer1')
                            .setLabel('1/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pageright1')
                            .setLabel('▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast1')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pageFirst2')
                            .setLabel('◀◀')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft2')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer2')
                            .setLabel('2/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pagright2')
                            .setLabel('▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast2')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst3')
                            .setLabel('◀◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft3')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer3')
                            .setLabel('3/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pagright3')
                            .setLabel('▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast3')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst4')
                            .setLabel('◀◀')
                            .setDisabled(false)
                            . setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft4')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer4')
                            .setLabel('4/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pageright4')
                            .setLabel('▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast4')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            . setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst5')
                            .setLabel('◀◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft5')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer5')
                            .setLabel('5/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pageright5')
                            .setDisabled(false)
                            .setLabel('▶')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast5')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst6')
                            .setLabel('◀◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft6')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('space6')
                            .setLabel('6/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pageright6')
                            .setLabel('▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast6')
                            .setLabel('▶▶')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary)
                    )
                    const commandbuttons7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('pagefirst7')
                            .setLabel('◀◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pageleft7')
                            .setLabel('◀')
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('spacer7')
                            .setLabel('7/7')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('pageright7')
                            .setLabel('▶')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('pagelast7')
                            .setLabel('▶▶')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary)
                    )
                    interaction.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    const commandsmessage = interaction.message;
                    const collector = commandsmessage.createMessageComponentCollector({ componentType: ComponentType.Button });
                    collector.on('collect', async i => {
                        if (i.user.id !== interaction.user.id)
                        return i.reply({ content: `Ce bouton n’est pas pour vous !`, ephemeral: true });
                    if (i.customId === 'spacer7') {
                        return;
                    }
                    if (i.customId === 'pagefirst1') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft1') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageright1') {
                        await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
                    }
                    if (i.customId === 'pagelast1') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst2') {               
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });           
                    }
                    if (i.customId === 'pageleft2') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageright2') {
                        await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
                    }
                    if (i.customId === 'pagelast2') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst3') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft3') {
                        await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
                    }
                    if (i.customId === 'pageright3') {
                        await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
                    }
                    if (i.customId === 'pagelast3') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst4') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft4') {
                        await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
                    }
                    if (i.customId === 'pageright4') {
                        await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
                    }
                    if (i.customId === 'pagelast4') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst5') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft5') {
                        await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
                    }
                    if (i.customId === 'pageright5') {
                        await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
                    }
                    if (i.customId === 'pagelast5') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst6') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft6') {
                        await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
                    }
                    if (i.customId === 'pageright6') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagelast6') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagefirst7') {
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                    }
                    if (i.customId === 'pageleft7') {
                        await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
                    }
                    if (i.customId === 'pageright7') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    if (i.customId === 'pagelast7') {
                        await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
                    }
                    })
                }
            }) 
        }
    }
}
