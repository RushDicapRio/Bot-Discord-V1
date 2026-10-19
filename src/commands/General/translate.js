const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Traduisez votre message dans une autre langue.')
        .addStringOption(
            option => option
                .setName('text')
                .setDescription('saisie du message')
                .setRequired(true)
        )
        .addStringOption(
            option => option
                .setName('de')
                .setDescription('Choisissez une langue à partir de laquelle traduire.')
                .setRequired(true)
                .setChoices(
                    { name: 'Automatique', value: 'auto' },
                    { name: 'Arabe', value: 'ar' },
                    { name: 'Bengali', value: 'bn' },
                    { name: 'Chinois simplifié', value: 'zh-cn' },
                    { name: 'Danois', value: 'da' },
                    { name: 'Néerlandais', value: 'nl' },
                    { name: 'Anglais', value: 'en' },
                    { name: 'Philippin', value: 'tl' },
                    { name: 'Français', value: 'fr' },
                    { name: 'Allemand', value: 'de' },
                    { name: 'Grec', value: 'el' },
                    { name: 'Hindi', value: 'hi' },
                    { name: 'Italien', value: 'it' },
                    { name: 'Japonais', value: 'ja' },
                    { name: 'Polonais', value: 'pl' },
                    { name: 'Russe', value: 'ru' },
                    { name: 'Espagnol', value: 'es' },
                    { name: 'Suédois', value: 'sv' }
                ) 
        )
        .addStringOption(
            option => option
                .setName('vers')
                .setDescription('choisissez une langue vers laquelle traduire')
                .setRequired(true)
                .setChoices(
                    { name: 'Automatique', value: 'auto' },
                    { name: 'Arabe', value: 'ar' },
                    { name: 'Bengali', value: 'bn' },
                    { name: 'Chinois simplifié', value: 'zh-cn' },
                    { name: 'Danois', value: 'da' },
                    { name: 'Néerlandais', value: 'nl' },
                    { name: 'Anglais', value: 'en' },
                    { name: 'Philippin', value: 'tl' },
                    { name: 'Français', value: 'fr' },
                    { name: 'Allemand', value: 'de' },
                    { name: 'Grec', value: 'el' },
                    { name: 'Hindi', value: 'hi' },
                    { name: 'Italien', value: 'it' },
                    { name: 'Japonais', value: 'ja' },
                    { name: 'Polonais', value: 'pl' },
                    { name: 'Russe', value: 'ru' },
                    { name: 'Espagnol', value: 'es' },
                    { name: 'Suédois', value: 'sv' }
                )
        ),
        category: 'Text',
        cooldown: 5000,
    async execute(interaction) {
        const msg = interaction.options.getString('text');
        const from = interaction.options.getString('de');
        const to = interaction.options.getString('vers');
        const translated = await translate(msg, { from: from, to: to });
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setFields(
                { name: 'Texte saisi', value: msg },
                { name: 'Texte traduit', value: translated.text }
            )
            .setFooter({ text: 'Codé avec ❤️ par Saez | Google Traduction' })
            .setTimestamp()
        interaction.reply({ embeds: [embed] });
    }
};
