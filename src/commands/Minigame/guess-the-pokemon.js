const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const fetch = globalThis.fetch || require('node-fetch').default || require('node-fetch');
const normalizeName = (value) => value.toLowerCase().replace(/[^a-z]/g, '');
async function fetchRandomPokemon() {
    const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    if (!listResponse.ok) {
        throw new Error(`La requête de liste auprès de PokeAPI a échoué : ${listResponse.status}`);
    }
    const listData = await listResponse.json();
    const randomPokemon = listData.results[Math.floor(Math.random() * listData.results.length)];
    const detailsResponse = await fetch(randomPokemon.url);
    if (!detailsResponse.ok) {
        throw new Error(`La requête de détails auprès de PokeAPI a échoué : ${detailsResponse.status}`);
    }
    const details = await detailsResponse.json();
    const image = details.sprites?.other?.['official-artwork']?.front_default || details.sprites?.front_default;
    return {
        name: details.name,
        image,
        types: details.types.map((type) => type.type.name),
        abilities: details.abilities.map((ability) => ability.ability.name)
    };
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('guess-the-pokemon')
        .setDescription('Jouons à un jeu où il faut deviner le Pokémon.'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const pokemon = await fetchRandomPokemon();
            const embed = new EmbedBuilder()
                .setTitle('> Quel est ce Pokémon ?')
                .setColor('Random')
                .setDescription('Réponds avec le nom du Pokémon en moins de 60 secondes.')
                .setImage(pokemon.image)
                .addFields(
                    { name: 'Types', value: pokemon.types.join(', ') || 'Inconnu', inline: true },
                    { name: 'Capacités', value: pokemon.abilities.join(', ') || 'Inconnues', inline: true }
                );
            await interaction.editReply({ embeds: [embed] });
            const collector = interaction.channel.createMessageCollector({
                filter: (message) => message.author.id === interaction.user.id && !message.author.bot,
                time: 60000,
                max: 1
            });
            collector.on('collect', async (message) => {
                const answer = message.content.trim();
                const correct = normalizeName(answer) === normalizeName(pokemon.name);
                if (correct) {
                    await interaction.editReply({
                        content: `> 🎉 | **${interaction.user.tag}** a trouvé ! C’était **${pokemon.name}**.`,
                        embeds: []
                    });
                } else {
                    await interaction.editReply({
                        content: `> Plus de chance la prochaine fois ! C’était **${pokemon.name}**.`,
                        embeds: []
                    });
                }
                collector.stop();
            });
            collector.on('end', async (_, reason) => {
                if (reason === 'time') {
                    await interaction.editReply({
                        content: `> La partie est restée inachevée. Le Pokémon était **${pokemon.name}**.`,
                        embeds: []
                    });
                }
            });
        } catch (error) {
            console.error('Erreur guess-the-pokemon :', error);
            await interaction.editReply({
                content: 'Impossible de récupérer les données des Pokémon ! Veuillez réessayer.',
                flags: MessageFlags.Ephemeral
            }).catch(() => {});
        }
    }
};
