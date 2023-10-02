const qrcode = require('qrcode-terminal');
// const fs = require('fs');

const { Client,LocalAuth   } = require('whatsapp-web.js');
// Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
// let sessionData;

// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth({
        clientId:'YASH-CLIENT-2'
    })
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async() => {
    console.log('Client is ready!');
    const chats =await client.getChats();
    console.log(chats[0]);
});

client.on('message', message => {
	// if(message.body === '!ping') {
	// 	message.reply('pong');
	// }
    console.log(message.body);

    if(message.body.toLowerCase()=='yash'){
        message.reply('chaturmutha');
        // client.sendMessage(message.from,'chaturmutha');
    }
});


// Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });
 
client.initialize();
 