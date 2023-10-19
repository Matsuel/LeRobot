const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js');

const sqlite3 = require('sqlite3').verbose();

const request = require('request'); 

const db = new sqlite3.Database('./Database/database.db');

const {Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildPresences}= GatewayIntentBits;

const  {User, Message, GuildMember, Channel}= Partials;

const {loadEvents} = require('./Handlers/eventHandlers.js');

const {loadCommands} = require('./Handlers/commandHandler.js');

const datas= require('./config.json');
// Il faut utiliser la variable DiscordToken dans le fichier config.json pour le token du bot


const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildPresences],
    partials: [User, Message, GuildMember, Channel]
});

module.exports = {client,db};

client.commands= new Collection();

client.login(datas.DiscordToken).then(() => {
    loadEvents(client);
    loadCommands(client);
});

// setInterval(async () => {
//     client.channels.cache.get('1066815112247263354').send('Go fuck Yourself');
// }, 1000);

// setInterval(async () => {
//     const sql = `SELECT * FROM Alerts`;
//     let datas=[];
//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         rows.forEach((row) => {
//             datas.push(row);
//             console.log(datas);
//             const url= `https://min-api.cryptocompare.com/data/price?fsym=${datas[0].cryptocurrency}&tsyms=${datas[0].currency}`;
//             request(url, function(err, response, body){
//                 if(err){
//                     console.log('error:', err);
//                     return
//                 }
//                 try{
//                     let data = JSON.parse(body);
//                     if (!data[datas[0].currency]){
//                         console.log('Invalid cryptocurrency or currency');
//                     }else{
//                         // actualPrice = parseInt(data[currency]);
//                         console.log(parseInt(data[datas[0].currency]));
//                         let channid = datas[0].channelid;
//                         let userid = datas[0].userid;
//                         let crypto = datas[0].cryptocurrency;
//                         let currency = datas[0].currency;
//                         let price = datas[0].price;
//                         let actualprice = datas[0].actualprice;
//                         if(parseInt(data[datas[0].currency])>datas[0].price){       

//                             // envoyer un message dabs le channel de l'alerte
//                             client.channels.cache.get(channid).send(`Price of ${crypto} in ${currency} is now ${price}`);


//                             // supprimer l'alerte de la db
//                             const sql = `DELETE FROM Alerts WHERE channelid = ? AND userid = ? AND cryptocurrency = ? AND currency = ? AND price = ? AND actualprice = ?`;
//                             db.run(sql, [channid, userid, crypto, currency, price, actualprice], function(err) {
//                                 if (err) {
//                                     return console.error(err.message);
//                                 }
//                                 console.log(`Row(s) deleted ${this.changes}`);
//                             });
//                         }
//                     }
//                 }catch(err){
//                     console.log(`${err}`);
//                 }
//             });
//         });        
//     }); 
// }, 10000);