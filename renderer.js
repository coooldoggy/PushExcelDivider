const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault();
    let files = document.getElementById("files").files[0].path;
    let rowName = document.getElementById("rows").value;
    ipcRenderer.send('form-submission', files, rowName);
    showprogress();
}

function showprogress() {
    document.getElementById("container").style.display = "block";
}

function hideprogress() {
    document.getElementById("container").style.display = "none";
}

ipcRenderer.on('done', function (event, args) {
    hideprogress();
});
