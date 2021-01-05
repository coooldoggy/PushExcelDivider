const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');
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
    mainWindow.webContents.openDevTools()
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

ipcMain.on('form-submission', function (event, files, rowName) {
    console.log(files);
    console.log(rowName);
    var options = {
        args: [files, rowName]
    }
    PythonShell.run('ExcelProcesser.py', options, function (err, results) {
        if (err) throw err;
        console.log('result: %j', results);
    });
});