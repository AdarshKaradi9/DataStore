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


if (!fs.existsSync(filePath)) {
    console.log("Please provide a valid file path");
    return;
}

if (!fs.existsSync(fileFullPath)) {
    fs.writeFileSync(fileFullPath, "{}");
    console.log("File named " + fileName + " created");
}

const data = {
    "Key1" :{
        "field1": "data1",
        "field2": "data2",
        "field3": "data3",
        "Time-To-Live": 300
    },
    "Key2" :{
        "field1": "data1",
        "field2": "data2",
        "field3": "data2",
        "Time-To-Live": 1
    },
    "Key3" :{
        "field1": "data1",
        "field2": "data2",
        "field3": "data2"
    }
}

console.log('Datastore path:', fileFullPath);
console.log('response:')
const response = DataStoreCRD.createData(data, fileFullPath);
if(response.status == 'failed') {
    console.log(response);
    return;
}
console.log(response)
