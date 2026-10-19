const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const reminderSchema = require('../../schemas/reminder');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Configurez vos rappels.')
        .addSubcommand(command => command
            .setName('set')
            .setDescription('Crée un rappel pour vous.')
            .addStringOption(option => option
                .setName('reminder')
                .setDescription('Le rappel indiqué constituera le motif de votre rappel.')
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName('minutes')
                .setDescription('Indiquez dans combien de minutes vous souhaitez recevoir votre rappel.')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(59)
            )
            .addIntegerOption(option => option
                .setName('heures')
                .setDescription('Indiquez dans combien d\'heures vous souhaitez recevoir votre rappel.')
                .setMinValue(0)
                .setMaxValue(23)
                .setRequired(false)
            )
            .addIntegerOption(option => option
                .setName('jours')
                .setDescription('Indiquez dans combien de jours vous souhaitez recevoir votre rappel.')
                .setMinValue(0)
                .setMaxValue(30)
                .setRequired(false)
            )
        )
        .addSubcommand(command => command.setName('annuler').setDescription('Le rappel indiqué sera annulé.').addStringOption(option => option.setName('id').setDescription('ID du rappel à annuler.').setMinLength(1).setMaxLength(30).setRequired(true)))
        .addSubcommand(command => command.setName('tout-annuler').setDescription('Annule tous les rappels actuellement actifs.')),
    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        switch (sub) {
            case 'set':
                const { options } = interaction;
                const reminder = options.getString('reminder');
                const minute = options.getInteger('minutes') || 0;
                const hour = options.getInteger('heures') || 0;
                const days = options.getInteger('jours') || 0;
                let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',];
                let result = Math.floor(Math.random() * letter.length);
                let result2 = Math.floor(Math.random() * letter.length);
                let result3 = Math.floor(Math.random() * letter.length);
                let result4 = Math.floor(Math.random() * letter.length);
                let result5 = Math.floor(Math.random() * letter.length);
                let result6 = Math.floor(Math.random() * letter.length);
                let result7 = Math.floor(Math.random() * letter.length);
                let result8 = Math.floor(Math.random() * letter.length);
                let result9 = Math.floor(Math.random() * letter.length);
                let result10 = Math.floor(Math.random() * letter.length);
                let result11 = Math.floor(Math.random() * letter.length);
                let result12 = Math.floor(Math.random() * letter.length);
                let result13 = Math.floor(Math.random() * letter.length);
                let result14 = Math.floor(Math.random() * letter.length);
                let result15 = Math.floor(Math.random() * letter.length);
                let result16 = Math.floor(Math.random() * letter.length);
                let time = Date.now() + (days * 1000 * 60 * 60 * 24) +(hour * 1000 * 60 * 60) + (minute * 1000 * 60);
                await reminderSchema.create({
                    User: interaction.user.id,
                    Time: time,
                    Remind: reminder,
                    ID: letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5] + letter[result6] + letter[result7] + letter[result8] + letter[result9] + letter[result10] + letter[result11] + letter[result12] + letter[result13] + letter[result14] + letter[result15] + letter[result16]
                })
                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({ name: 'Système de rappels' })
                    .setFooter({ text: 'Codé avec ❤️ par Saez | Rappel défini' })
                    .setTimestamp()
                    .setTitle('Rappel défini')
                    .addFields(
                        { name: 'Temps', value: `<t:${Math.floor(time / 1000)}:R>` },
                        { name: 'Rappels', value: `${reminder}` },
                        { name: 'ID de rappel', value: `${letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5] + letter[result6] + letter[result7] + letter[result8] + letter[result9] + letter[result10] + letter[result11] + letter[result12] + letter[result13] + letter[result14] + letter[result15] + letter[result16]}` }
                    )
                interaction.reply({ embeds: [embed] });
                break;
            case 'annuler':
                const id = await interaction.options.getString('id');
                const data = await reminderSchema.findOne({ User: interaction.user.id, ID: id });
                if (!data) return await interaction.reply({ content: `Aucun **rappel** trouvé avec l’**identifiant** **${id}** !`, ephemeral: true });
                else {
                    await interaction.reply({ content: `Votre **rappel** portant l'**identifiant** **${id}** a été **annulé** !`, ephemeral: true });
                    await reminderSchema.deleteMany({
                        User: interaction.user.id,
                        ID: id
                    });
                }
                break;
            case 'tout-annuler':
                const alldata = await reminderSchema.find({ User: interaction.user.id });
                if (!alldata || alldata.length === 0) return await interaction.reply({ content: `Vous n’avez pas encore configuré de rappels !`, ephemeral: true });
                else {
                    await interaction.reply({ content: `**Tous** vos **rappels** ont été **annulés** !`, ephemeral: true });
                    await reminderSchema.deleteMany({ User: interaction.user.id });
                }
        }
    }
};
