const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hack')
        .setDescription('Piratez l\'utilisateur mentionné.')
        .addUserOption(option => option
            .setName('target')
            .setDescription('L\'utilisateur mentionné se fera pirater.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const target = await interaction.options.getUser('target');
        if (!target) return await interaction.reply({ content: 'Tu essaies de pirater qui, au juste ? Toi-même ? Indique un utilisateur valide à pirater, franchement...'});
        await interaction.reply({ content: `Exécution du processus visant à pirater ${target}...` });
        await wait(2500);
        await interaction.editReply({ content: `Installation de logiciels malveillants sur les appareils de ${target}...` });
        await wait(2550);
        await interaction.editReply({ content: `Récupération de l'adresse IP, des mots de passe et des informations personnelles de ${target}...` });
        await wait(2500);
        await interaction.editReply({ content: `Piratage des appareils et du Wi-Fi de ${target}...` });
        await wait(2500);
        await interaction.editReply({ content: `Voler la carte bancaire de la mère de ${target}...` });
        await wait(2500);
        await interaction.editReply({ content: `Exposition des informations personnelles de ${target}...` });
        await wait(2500);
        await interaction.editReply({ content: `Mission accomplie ! J'ai réussi à pirater les appareils de ${target} et à mettre au jour tout ce qu'ils contiennent ! \n\n Respect++` });
    }
};
