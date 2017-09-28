//console.log("from renderer...");

const fs = require('fs');
const os = require('os');

const files = fs.readdirSync(os.homedir());

document.getElementById("temp").innerHTML = files.join('<br/>');