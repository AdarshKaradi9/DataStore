const fs = require('fs');
const path = require('path');

// import the DataStoreCRD library
const DataStoreCRD = require('../Datastore/DataStoreCRD');

const rawenv = fs.readFileSync('../config/configurations.json');
const env = JSON.parse(rawenv);
var filePath = env.CUSTOM_FILE_PATH ? env.CUSTOM_FILE_PATH : env.DEFAULT_FILE_PATH
var fileName = env.CUSTOM_FILE_NAME ? env.CUSTOM_FILE_NAME : env.DEFAULT_FILE_NAME
filePath = path.resolve(__dirname,filePath,'..');

const fileFullPath = path.resolve(filePath, fileName);

if (!fs.existsSync(fileFullPath)) {
    console.log("The file does not exists");
    return;
}

const key = "Key3";
const result = DataStoreCRD.deleteData(key, fileFullPath);

console.log("key : " + key)
console.log(result);