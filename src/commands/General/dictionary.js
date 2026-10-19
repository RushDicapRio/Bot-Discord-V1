const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('Recherchez n’importe quel mot dans le dictionnaire.')
        .addStringOption(option => option.setName('mot').setDescription('Le mot que vous souhaitez rechercher').setRequired(true)),
    async execute(interaction) {
        try {
            const word = interaction.options.getString('mot');
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DiscordBot/1.0'
                }
            });
            if (!response.ok) {
                return interaction.reply({
                    content: 'Ce mot n’existe pas ou l’API de dictionnaire est indisponible.',
                    ephemeral: true
                });
            }
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error(`Réponse invalide de l’API dictionnaire: ${contentType || 'type inconnu'}`);
            }
            const info = await response.json();
            const result = Array.isArray(info) && info.length > 0 ? info[0] : null;
            if (!result) {
                return interaction.reply({
                    content: 'Aucune définition n’a été trouvée pour ce mot.',
                    ephemeral: true
                });
            }
            const embedInfo = result.meanings.map((entry) => {
                const definition = entry.definitions?.[0]?.definition || 'Aucune définition trouvée';
                const example = entry.definitions?.[0]?.example || 'Aucun exemple trouvé';
                return {
                    name: entry.partOfSpeech?.toUpperCase() || 'Définition',
                    value: `Description : ${definition}\nExemple : ${example}`
                };
            });
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Définition de **${result.word}**`)
                .addFields(embedInfo)
                .setFooter({ text: 'Codé avec ❤️ par Saez | Définition du mot' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur dans /dictionary :', error);
            await interaction.reply({
                content: 'Je n’ai pas pu récupérer la définition pour le moment.',
                ephemeral: true
            }).catch(() => {});
        }
    }
};
