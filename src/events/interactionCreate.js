const { MessageFlags } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error('Erreur d\'interaction :', error);
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({
                        content: 'Une **erreur** s\'est produite lors de l\'exécution de cette commande.',
                        flags: MessageFlags.Ephemeral
                    });
                } catch (replyError) {
                    console.error('Impossible de répondre à l\'interaction :', replyError);
                }
            }
        }
    }
};
