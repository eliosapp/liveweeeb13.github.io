const net = require('net');
const readline = require('readline');
const { exec } = require('child_process');

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const bold = '\x1b[1m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';
const PENCIL = "\u001b[38;2;253;182;0m";
const clearScreen = '\x1b[2J';
const moveCursorHome = '\x1b[0;0H';
const jsp = '\x1b[34;219m';
const itallic = "\x1b[3m";

const client = net.createConnection({ host: '51.75.25.2', port: 2012 }, () => {
    console.log(`Connecté au serveur de chat ${itallic}${jsp}room 0${reset}`);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});
exec('title Elios Chat');
let lineCount = 0;

process.on('SIGINT', () => {
    client.end();
    process.exit();
});

client.on('data', (data) => {
    const message = data.toString().trim();

    if (message.endsWith('Login:')) {
        rl.question(`${message} `, (login) => {
            client.write(login);
        });
    } else if (message.endsWith('Mot de passe:')) {
        rl.question(`${message} `, (password) => {
            client.write(password);
        });
    } else {
        process.stdout.write('\n');
        console.log(message);
        process.stdout.write('> '); 
    }
});

client.on('end', () => {
    console.log('Déconnecté du serveur');
    console.log(`${itallic}Pour tout bug ajoutez ${green}@liveweeeb ${white}ou ${green}@test_befaci.coolate ${white}sur discord.`)
    console.log('Appuyez sur une touche pour réessayer...');
    
    process.stdin.once('keypress', () => {
        console.log('Tentative de reconnexion...');
        
        client.connect({  host: '51.75.25.2', port: 2012});
    });
});

client.on('error', (err) => {
    console.error(`Erreur de connexion`);
    
    console.log(`${itallic}Pour tout bug ajoutez ${green}@liveweeeb ${white}ou ${green}@test_befaci.coolate ${white}sur discord.`)
    console.log('Appuyez sur une touche pour réessayer...');
    
    process.stdin.once('keypress', () => {
        console.log('Tentative de reconnexion...');
        
        client.connect({  host: '51.75.25.2', port: 2012 });
    });
});

rl.on('line', (input) => {
    client.write(input);
});
