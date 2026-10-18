const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave-guild')
        .setDescription('Faire quitter un serveur au bot.')
        .addStringOption(option =>
            option.setName('guildid')
                .setDescription('Indiquez l\'identifiant de la guilde.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        if (interaction.member.id !== '') return interaction.reply({ content: "Cette commande est réservée aux développeurs.", ephemeral: true });
        const guildid = interaction.options.getString('guildid');
        const guild = client.guilds.cache.get(guildid);
        interaction.reply({ content: `Saez Bot a quitté le serveur mentionné ci-dessous : \n\n **${guild.name}** (${guild.id})`, ephemeral: true });
        guild.leave().catch(() => {
            return false;
        });
    }
};
