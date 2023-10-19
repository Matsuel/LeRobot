const {SlashCommandBuilder}= require('discord.js');
const {db} = require('../../index.js');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setalerts')
        .setDescription('Set crypto prices alerts')
        .addStringOption((option) =>
        option
        .setName('cryptocurrency')
        .setDescription('The cryptocurrency to get the price of')
        .setRequired(true)
        .setChoices(
            {name: 'Bitcoin', value: 'BTC'},
            {name: 'Ethereum', value: 'ETH'},
            {name: 'Tether', value: 'USDT'},
            {name: 'Binance Coin', value: 'BNB'},
            {name: 'Cardano', value: 'ADA'},
            {name: 'XRP', value: 'XRP'},
            {name: 'Dogecoin', value: 'DOGE'},
            {name: 'Polkadot', value: 'DOT'},
        )
    )
        .addStringOption((option) =>
        option
        .setName('currency')
        .setDescription('The currency to get the price in')
        .setRequired(true)
        .setChoices(
            {name: 'Euro', value: 'EUR'},
            {name: 'Dollar', value: 'USD'},
            {name: 'Pound', value: 'GBP'},
            {name: 'Yen', value: 'JPY'},
            {name: 'Bitcoin', value: 'BTC'},

        )
    )
        .addNumberOption((option) =>
        option
        .setName('price')
        .setDescription('The price to set the alert')
        .setRequired(true)
    ),
    async execute(interaction) {
        let crypto= interaction.options.getString('cryptocurrency').toUpperCase();
        let currency= interaction.options.getString('currency').toUpperCase();

        let price = interaction.options.getNumber('price');

        let actualPrice=0;

        const url= `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`;
        request(url, function(err, response, body){
            if(err){
                console.log('error:', err);
                return
            }
            try{
                let data = JSON.parse(body);
                if (!data[currency]){
                    interaction.reply({content: 'Invalid cryptocurrency or currency'});
                }else{
                    actualPrice = parseInt(data[currency]);
                    console.log(data[currency]);

                    const sql = `INSERT INTO Alerts (channelid, price, actualprice, userid, currency, cryptocurrency) VALUES (?, ?, ?, ?, ?, ?)`;

                    db.run(sql, [interaction.channel.id, price, data[currency], interaction.user.id, currency, crypto], function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log(`A row has been inserted with rowid ${this.lastID}`);
                    });

                    // db.run(sql, [interaction.guild., price, data[currency], interaction.user.id, currency, crypto], function(err) {
                    //     if (err) {
                    //         return console.log(err.message);
                    //     }
                    
                    //     console.log(`A row has been inserted with rowid ${this.lastID}`);
                    // });

                    interaction.reply({content: `Alert set for ${crypto} in ${currency} at ${price}`});
                }
            }catch(err){
                interaction.reply({content: `${err}`});
            }
        });

        

    }
}