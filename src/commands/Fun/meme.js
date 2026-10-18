const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Génère un mème aléatoire.'),
    async execute(interaction) {
        try {
            const response = await fetch('https://meme-api.com/gimme', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DiscordBot/1.0'
                }
            });
            if (!response.ok) {
                throw new Error(`L’API de mèmes a refusé la requête (${response.status} ${response.statusText})`);
            }
            const meme = await response.json();
            if (!meme?.url) {
                throw new Error('Aucune image de mème trouvée dans la réponse de l’API.');
            }
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(meme.title || 'Mème aléatoire')
                .setImage(meme.url)
                .setURL(meme.postLink || meme.url)
                .setFooter({
                    text: `Codé avec ❤️ par Saez | ${meme.author || 'inconnu'}`
                });
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur dans /meme :', error);
            await interaction.reply({
                content: 'Je n’ai pas pu récupérer un mème pour le moment. Réessaie dans quelques instants.',
                flags: MessageFlags.Ephemeral
            }).catch(() => {});
        }
    }
};
