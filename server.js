const express = require('express');
const app = express();

const { DataStoreCRD } = require('./Datastore/DataStoreCRD');
const ds = new DataStoreCRD();

app.get('/', (req, res) => { res.send('This is home page') });

app.get('/create', (req, res) => { 
    result = ds.getTest();
    res.send(JSON.stringify(result))
});

app.get('/read', (req, res) => { res.send('Data for the given key') });

app.get('/delete', (req, res) => { res.send('Deleted the given key')})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!!`);
})