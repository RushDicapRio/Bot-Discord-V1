const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Génère une image de waifu aléatoire.')
        .addStringOption(option => 
            option.setName('category')
            .setDescription('Choisissez votre catégorie')
            .setRequired(true)
            .addChoices(
                { name: 'Marin Kitagawa', value: 'marin-kitagawa' },
                { name: 'Mori Calliope', value: 'mori-calliope' },
                { name: 'Raiden Shogun', value: 'raiden-shogun' },
                { name: 'Waifu', value: 'waifu' },
                { name: 'Maid', value: 'maid' },
                { name: 'Oppai', value: 'oppai' },
                { name: 'Selfies', value: 'selfies' },
                { name: 'Uniform', value: 'uniform' }
            )
        ),
    async execute(interaction) {
        const type = interaction.options.getString('category');
        const fallbackImage = `https://picsum.photos/seed/${encodeURIComponent(type)}/1200/1500`;
        try {
            const response = await fetch(`https://api.waifu.im/search/?included_tags=${type}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DiscordBot/1.0'
                }
            });
            if (response.ok) {
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const body = await response.json();
                    const imageUrl = body?.images?.[0]?.url;
                    if (imageUrl) {
                        await interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setTitle(`La waifu de ${interaction.user.username} !`)
                                .setColor('Random')
                                .setFooter({ text: 'Codé avec ❤️ par Saez | Waifu générée' })
                                .setTimestamp()
                                .setImage(imageUrl)]
                        });
                        const message = await interaction.fetchReply();
                        await message.react('👍');
                        await message.react('👎');
                        return;
                    }
                }
            }
            const embed = new EmbedBuilder()
                .setTitle(`La waifu de ${interaction.user.username} !`)
                .setColor('Random')
                .setFooter({ text: 'Codé avec ❤️ par Saez | Waifu de secours' })
                .setTimestamp()
                .setImage(fallbackImage);
            await interaction.reply({ embeds: [embed] });
            const message = await interaction.fetchReply();
            await message.react('👍');
            await message.react('👎');
        } catch (error) {
            console.error('Erreur dans /waifu :', error);
            const embed = new EmbedBuilder()
                .setTitle(`La waifu de ${interaction.user.username} !`)
                .setColor('Random')
                .setFooter({ text: 'Codé avec ❤️ par Saez | Waifu de secours' })
                .setTimestamp()
                .setImage(fallbackImage);
            await interaction.reply({ embeds: [embed] }).catch(() => {});
        }
    }
};
