const {SlashCommandBuilder}= require('discord.js');
const request = require('request');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('crypto')
    .setDescription('Get the price of a cryptocurrency')
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
            {name: 'US Dollar', value: 'USD'},
            {name: 'Euro', value: 'EUR'},
            {name: 'British Pound', value: 'GBP'},
            {name: 'Japanese Yen', value: 'JPY'},
            {name: 'Canadian Dollar', value: 'CAD'},
            {name: 'Australian Dollar', value: 'AUD'},
            {name: 'Swiss Franc', value: 'CHF'},
            {name: 'Chinese Yuan', value: 'CNY'},
            {name: 'New Zealand Dollar', value: 'NZD'},
        )
        
        
    ),

    async execute(interaction) {
        let crypto= interaction.options.getString('cryptocurrency').toUpperCase();
        let currency= interaction.options.getString('currency').toUpperCase();
        const url= `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`; 

        request(url, function(err, response, body){
            if(err){
                console.log('error:', err);
                return
            }
            try{
                let data = JSON.parse(body);
                currency = currency.substring(0, 3);
                crypto = crypto.substring(0, 3);
                if (!data[currency]){
                    interaction.reply({content: 'Invalid cryptocurrency or currency'});
                }else{
                    interaction.reply({content: `The price of ${crypto} is ${Math.round(data[currency])} ${currency}`});
                }
            }catch(err){
                console.log('error:', err);
                return
            }
        });
    }
};