const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { PythonShell } = require('python-shell');
const { spawn, execFile } = require('child_process');
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

const guessDistPackaged = () => {
    const fullPath = path.join(__dirname, PY_DIST_FOLDER)
    return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
    // if (!guessDistPackaged()) {
    //     return path.join(__dirname, PY_MODULE + '.py')
    // }
    // if (process.platform === 'win32') {
    //     return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
    // }
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

ipcMain.on('form-submission', function (event, files, rowName) {
    var outputPath = path.parse(files).dir;
    var options = {
        args: [files, rowName, outputPath]
    }
    const arguments = [files, rowName, outputPath];
    var pythonPath = getScriptPath();
    // if (guessDistPackaged()) {
    // var ls = require('child_process').execFile(pythonPath, arguments);
    const ls = spawn(pythonPath, [files, rowName, outputPath], { shell: true });
    ls.on('close', (code) => {
        mainWindow.webContents.send('done', outputPath);
    });
    // } else {
    //     PythonShell.run(pythonPath, options, function (err, results) {
    //         if (err) throw err;
    //         mainWindow.webContents.send('done', outputPath);
    //     });
    // }
});