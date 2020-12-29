const fs = require('fs');
const path = require('path');

// import the DataStoreCRD library
const DataStoreCRD = require('../DatastoreModule/DataStoreCRD');

const rawenv = fs.readFileSync('../config/configurations.json');
const env = JSON.parse(rawenv);
var filePath = env.CUSTOM_FILE_PATH ? env.CUSTOM_FILE_PATH : env.DEFAULT_FILE_PATH
var fileName = env.CUSTOM_FILE_NAME ? env.CUSTOM_FILE_NAME : env.DEFAULT_FILE_NAME
filePath = path.resolve(__dirname,filePath);
fileName = fileName.includes('.json') ? fileName : fileName.concat('.json');

const fileFullPath = path.resolve(filePath ,fileName);

if (!fs.existsSync(fileFullPath)) {
    console.log("The datastore file does not exists. Please run createData.js first to create datastore");
    return;
}

console.log('Datastore path:', fileFullPath);
console.log('response:');

const key = "Key1";
const response = DataStoreCRD.deleteData(key, fileFullPath);
if(response.status == 'failed') {
    console.log(response);
    return;
}
console.log(response);