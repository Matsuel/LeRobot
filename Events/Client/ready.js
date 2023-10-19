const {client, ActivityType} = require('discord.js');
const db = require('../../index.js');
const request = require('request');

module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log(`Logged in as ${client.user.tag}!`);
        setInterval(async () => {
            const sql = `SELECT * FROM Alerts`;
        
            // const url= `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`;
        
            // request(url, function(err, response, body){
            //     if(err){
            //         console.log('error:', err);
            //         return
            //     }
            //     try{
            //         let data = JSON.parse(body);
            //         let actualPrice = parseInt(data[currency]);
            //     }catch(err){
            //         console.log(err);
            //     }
            // });
        
            
        }, 1000);
    }
};

