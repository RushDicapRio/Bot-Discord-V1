const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { Readable } = require('node:stream');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sound-board')
        .setDescription('Jouer le son indiqué dans le salon vocal.')
        .addStringOption(option =>
            option.setName('sound')
                .setDescription('Votre choix')
                .setRequired(true)
                .addChoices(
                    { name: 'bruh', value: 'bruh' },
                    { name: 'emotional damage', value: 'emotional_damage' },
                    { name: 'fbi open up', value: 'fbi_open_up' },
                    { name: 'galaxy brain', value: 'galaxy_brain' },
                    { name: 'giga chad theme', value: 'giga_chad_theme' },
                    { name: 'goofy ahh sounds', value: 'goofy_ahh_sounds' },
                    { name: 'happy happy', value: 'happy_happy' },
                    { name: 'mission passed', value: 'mission_passed' },
                    { name: 'run', value: 'run' },
                    { name: 'suiii', value: 'suiii' },
                    { name: 'top g theme', value: 'top_g_theme' },
                    { name: 'uwu', value: 'uwu' },
                    { name: 'yamete kudasai', value: 'yamete_kudasai' },
                )
        ),
    async execute(interaction) {
        const sound = interaction.options.getString('sound');
        const soundMap = {
            bruh: 'https://www.myinstants.com/media/sounds/movie_1_C2K5NH0.mp3',
            emotional_damage: 'https://www.myinstants.com/media/sounds/emotional-damage-meme.mp3',
            fbi_open_up: 'https://www.myinstants.com/media/sounds/fbi-open-up_dwLhIFf.mp3',
            galaxy_brain: 'https://www.myinstants.com/media/sounds/galaxy-brain-meme.mp3',
            giga_chad_theme: 'https://www.myinstants.com/media/sounds/giga-chad-theme.mp3',
            goofy_ahh_sounds: 'https://www.myinstants.com/media/sounds/goofy-ahh-sounds.mp3',
            happy_happy: 'https://www.myinstants.com/media/sounds/happy-happy-happy-song.mp3',
            mission_passed: 'https://www.myinstants.com/media/sounds/gta-san-andreas-mission-complete-sound-hq.mp3',
            run: 'https://www.myinstants.com/media/sounds/awolnation-run-audio-mp3cut_TdXTLux.mp3',
            suiii: 'https://www.myinstants.com/media/sounds/suiiiiiiiiiii.mp3',
            top_g_theme: 'https://www.myinstants.com/media/sounds/tourner-dans-le-vide.mp3',
            uwu: 'https://www.myinstants.com/media/sounds/sussy-uwu.mp3',
            yamete_kudasai: 'https://www.myinstants.com/media/sounds/yamate-kudasai-best-version.mp3'
        };
        const audioURL = soundMap[sound];
        if (!audioURL) {
            await interaction.reply({
                content: 'Ce son n’existe pas dans le soundboard.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }
        if (!interaction.member?.voice?.channel) {
            await interaction.reply({
                content: 'Vous devez être dans un salon vocal pour utiliser cette commande.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });
        const audioPlayer = createAudioPlayer();
        connection.subscribe(audioPlayer);
        try {
            const response = await fetch(audioURL);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const body = response.body;
            if (!body) {
                throw new Error('Aucune donnée audio reçue.');
            }
            const audioResource = createAudioResource(Readable.fromWeb(body));
            audioPlayer.play(audioResource);
        } catch (error) {
            console.error('Erreur lors du chargement audio :', error);
            connection.destroy();
            await interaction.editReply({
                content: 'Le son demandé est indisponible ou impossible à lire pour le moment.'
            }).catch(() => {});
            return;
        }
        const embedMessage = new EmbedBuilder()
            .setColor('Random')
            .setImage('https://cdn.dribbble.com/users/1614722/screenshots/4419914/soundboard_animatie__zwart_.gif')
            .setTitle('Lecture du son')
            .setDescription(`Lecture du son : ${sound}`)
            .setFooter({ text: 'Codé avec ❤️ par Saez | Son lu' })
            .setTimestamp();
        await interaction.editReply({ embeds: [embedMessage] });
        audioPlayer.on('stateChange', (_oldState, newState) => {
            if (newState.status === 'idle') {
                connection.destroy();
                embedMessage
                    .setImage('https://i.imgur.com/ETWgRqs.png')
                    .setDescription(`Lecture du son terminée : ${sound}`);
                interaction.editReply({ embeds: [embedMessage], flags: MessageFlags.Ephemeral }).catch(() => {});
            }
        });
        audioPlayer.on('error', error => {
            console.error(error);
            connection.destroy();
            embedMessage.setDescription(`Erreur lors de la lecture du son : ${sound}`);
            interaction.editReply({ embeds: [embedMessage], flags: MessageFlags.Ephemeral }).catch(() => {});
        });
    }
};
