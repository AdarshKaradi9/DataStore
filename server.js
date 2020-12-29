const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

const app = express();

// import the DataStoreCRD library
const DataStoreCRD = require('./DatastoreModule/DataStoreCRD');

const rawenv = fs.readFileSync('./config/configurations.json');
const env = JSON.parse(rawenv);
var filePath = env.CUSTOM_FILE_PATH ? env.CUSTOM_FILE_PATH : env.DEFAULT_FILE_PATH
var fileName = env.CUSTOM_FILE_NAME ? env.CUSTOM_FILE_NAME : env.DEFAULT_FILE_NAME
filePath = path.resolve(__dirname,filePath);
var fileFullPath = ''
if(fileName.includes('.json')) {
    fileFullPath = path.resolve(filePath ,fileName);
}
else {
    fileFullPath = path.resolve(filePath ,fileName, '.json');
}
    

if (!fs.existsSync(filePath)) {
    console.log('Please provide a valid custom file path in config/configuration.json');
    return;
}

if (!fs.existsSync(fileFullPath)) {
    fs.writeFileSync(fileFullPath, '{}');
    console.log('File named ' + fileName + ' created')
}

console.log("Datastore path: ",fileFullPath);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('Available routes:\n/read \n/create \n/delete') });

// read route for reading the data for the provided key
app.get('/datastore/read', (req, res) => { res.send(DataStoreCRD.readData(req.query.key, fileFullPath)) });

// create route for storing the data into the datastore
app.post('/datastore/create', (req, res) => { res.send(DataStoreCRD.createData(req.body, fileFullPath)) });

// delete route for deleting the data for the provided key
app.delete('/datastore/delete', (req, res) => { res.send(DataStoreCRD.deleteData(req.query.key, fileFullPath)) })

const PORT = env.PORT
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})