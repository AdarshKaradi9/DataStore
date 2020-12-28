const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

const app = express();

const { DataStoreCRD } = require('./Datastore/DataStoreCRD');
const DataStore = new DataStoreCRD();

const rawenv = fs.readFileSync('./config/configurations.json');
const env = JSON.parse(rawenv);
const dbPath = path.resolve(__dirname,env.DEFAULT_DB_PATH);
const dbName = env.DEFAULT_DB_NAME
const dbFullPath = path.resolve(dbPath, dbName);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('This is home page') });

app.get('/read', (req, res) => { 
    console.log(req.params);
    result = DataStore.readData("Key1", dbFullPath);
    res.send(result);
});

app.post('/create', (req, res) => { 
const DataStore = new DataStoreCRD();
    result = DataStore.createData(req.body, dbFullPath);
    res.send(JSON.stringify(result));
});

app.delete('/delete', (req, res) => { 
    result = DataStore.deleteData("Key2", dbFullPath);
    res.send(result);

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!!`);
})