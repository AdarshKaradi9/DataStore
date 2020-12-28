const fs = require('fs');
const path = require('path');

// import the DataStoreCRD library
const DataStoreCRD = require('../Datastore/DataStoreCRD');

const rawenv = fs.readFileSync('../config/configurations.json');
const env = JSON.parse(rawenv);
var filePath = env.CUSTOM_FILE_PATH ? env.CUSTOM_FILE_PATH : env.DEFAULT_FILE_PATH
var fileName = env.CUSTOM_FILE_NAME ? env.CUSTOM_FILE_NAME : env.DEFAULT_FILE_NAME
filePath = path.resolve(__dirname,filePath);

const fileFullPath = path.resolve(filePath, fileName);

if (!fs.existsSync(filePath)) {
    console.log("Please provide a valid file path");
    return;
}

if (!fs.existsSync(fileFullPath)) {
    fs.writeFileSync(fileFullPath, "{}");
    console.log("File named " + fileName + " created");
}

const key = "Key2";
const result = DataStoreCRD.readData(key, fileFullPath);

console.log("Result for the key " + key + " is:");
console.log(result)