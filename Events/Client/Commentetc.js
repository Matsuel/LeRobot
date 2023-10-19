const {client} = require('../../index.js');

const alternativesQuoi = ['quoi', 'koi', 'koa', 'quoa'];
const aletnativesComment = ['comment', 'koment', 'koman', 'komant', "komen", "keauxman"];
const alternativesHein=['hein', 'un','1' , 'huns', 'hun','ein']
const gifgnan ="https://tenor.com/view/quoicoubeh-david-la-caill%C3%A9-apagnan-gif-27709036";
const gifkoi="https://tenor.com/view/quoicoubeh-gif-27610419";
const gifkomen="https://tenor.com/view/alitalia-gif-14634917";

client.on('messageCreate', message =>{
    for (koi of alternativesQuoi){
        if (message.content.toLowerCase().split(' ').indexOf(koi) != -1){
            message.reply("Quoicoubeh quoicoubeh\n"+gifkoi);
            break;
        }
    }
    for (comment of aletnativesComment){
        if (message.content.toLowerCase().split(' ').indexOf(comment) != -1){
            message.reply('Commandant de bord\n'+gifkomen);
            break;
        }
    }
    for (hein of alternativesHein){
        if (message.content.toLowerCase().split(' ').indexOf(hein) != -1){
            message.reply(`Apagnan,\n`+gifgnan);
            break;
        }
    }
});

