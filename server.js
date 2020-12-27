const express = require('express');
const app = express();

const DataStoreCRD = require('./Datastore/DataStoreCRD'); 

app.get('/', (req, res) => { res.send('This is home page') });

app.get('/create', (req, res) => { 
    result = DataStoreCRD.getTest();
    res.send(result)
});

app.get('/read', (req, res) => { res.send('Data for the given key') });

app.get('/delete', (req, res) => { res.send('Deleted the given key')})

app.listen(3000, () => {
    console.log('Server started at port 3000!!');
})