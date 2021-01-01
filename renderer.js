const ipcRenderer = require('electron').ipcRenderer;
const { PythonShell } = require('python-shell');

let pyshell = new PythonShell('pythonmain.py');

function sendForm(event) {
    event.preventDefault();
    let files = document.getElementById("files").files[0].path;
    ipcRenderer.send('form-submission', files)
}

