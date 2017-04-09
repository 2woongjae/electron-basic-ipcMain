const {app, BrowserWindow, ipcMain} = require('electron');

let win = null;

app.on('ready', () => {
    win = new BrowserWindow();
    win.loadURL(`file://${__dirname}/index.html`);

    ipcMain.on('test-async', (event, arg) => {
        console.log(arg);
        event.sender.send('test-async-reply', 'reply-async');
    });

    ipcMain.on('test-sync', (event, arg) => {
        console.log(arg);
        event.returnValue = 'reply-sync';
    });
});