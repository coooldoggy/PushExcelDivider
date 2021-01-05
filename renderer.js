const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault();
    let files = document.getElementById("files").files[0].path;
    let rowName = document.getElementById("rows").value;
    console.log(rowName);
    ipcRenderer.send('form-submission', files, rowName);
}

