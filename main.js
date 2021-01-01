const { app, BrowserWindow, ipcMain } = require('electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('ready', () => {
    createWindow();
})

ipcMain.on('form-submission', function (event, files) {

});