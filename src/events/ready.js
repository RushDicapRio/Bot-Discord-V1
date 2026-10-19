const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODBURL;
module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        console.log(`[ ✅ ] ${client.user.username} est maintenant en ligne !`)
        console.log(`[ ⚠️ ] Activation de l'état...`)
        setInterval(async() => {
            const servers = await client.guilds.cache.size;
            const users = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
            let status = [
                {
                    name: "/help",
                    type: ActivityType.Playing
                },
                {
                    name: `${servers} serveurs`,
                    type: ActivityType.Watching
                },
                {
                    name: `${users} utilisateurs`,
                    type: ActivityType.Listening
                }
            ];
            let random = Math.floor(Math.random() * status.length);
            client.user.setActivity(status[random]);
        }, 5000);
        console.log("[ ✅ ] Statut activé avec succès !");
        if (!mongodbURL) return;
        mongoose.set('strictQuery', true);
        try {
            await mongoose.connect(mongodbURL);
            console.log('[ ✅ ] La base de données est opérationnelle !');
        } catch (error) {
            console.error('[ ❌ ] Erreur de connexion à MongoDB :', error);
        }
    }
}
