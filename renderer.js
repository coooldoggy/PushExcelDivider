const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault();
    let isFileSelected = document.getElementById("files").value;
    if (isFileSelected == "" || isFileSelected == null || isFileSelected == undefined) {
        alert("파일을 선택해 주세요!!");
        return;
    }
    let files = document.getElementById("files").files[0].path;
    let rowName = document.getElementById("rows").value;
    if (rowName == "" || rowName == null || rowName == undefined) {
        rowName = "CTN";
    }
    ipcRenderer.send('form-submission', files, rowName);
    showprogress();
}

function showprogress() {
    document.getElementById("container").style.display = "block";
}

function hideprogress() {
    document.getElementById("container").style.display = "none";
}

ipcRenderer.on('done', function (event, args, code) {
    alert(`resultCode: ${code} \n위치: ${args}`);
    hideprogress();
});
