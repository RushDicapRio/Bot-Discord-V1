module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, err) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, client).catch(err);
        } catch (error) {
            console.log(error);
            try {
                await interaction.reply({
                    content: 'Une **erreur** s\'est produite lors de l\'exécution de cette commande.',
                    epehmeral: true
                });
            } catch (err) {}
        }
    }
};
