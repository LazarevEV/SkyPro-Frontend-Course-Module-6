const fs = require('fs');
const path = require("path");

function getUserData() {
    console.log(path.resolve(__dirname))
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")))
}

module.exports = { getUserData };