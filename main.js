const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const isPackaged = require('electron-is-packaged').isPackaged;
let mainWindow;
const PY_DIST_FOLDER = 'pydist'
const PY_MODULE = 'ExcelProcesser'

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
    // mainWindow.webContents.openDevTools()
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

// const guessDistPackaged = () => {
//     const fullPath = path.join(__dirname, PY_DIST_FOLDER)
//     return require('fs').existsSync(fullPath)
// }

const getScriptPath = () => {
    var appPath = path.parse(app.getAppPath()).dir;
    if (!isPackaged) {
        return path.join(__dirname, PY_MODULE + '.py')
    }
    return path.join(appPath, PY_DIST_FOLDER, PY_MODULE)
}

ipcMain.on('form-submission', function (event, files, rowName) {
    var outputPath = path.parse(files).dir;
    var options = {
        args: [files, rowName, outputPath]
    }
    var pythonPath = getScriptPath();
    if (isPackaged) {
        spawn(pythonPath, options, function (err, results) {
            if (err) throw err;
            mainWindow.webContents.send('done', "");
        });
    } else {
        PythonShell.run(pythonPath, options, function (err, results) {
            if (err) throw err;
            mainWindow.webContents.send('done', "");
        });
    }
});