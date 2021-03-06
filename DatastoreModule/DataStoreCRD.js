const fs = require('fs');

function addFields(jsonData) {
    // adding the data 'Created-Time' and 'Time-To-Live' fields to the data
    jsonData['Created-Time'] = this.getCurrentTime();
    jsonData['Time-To-Live'] = jsonData['Time-To-Live'] ? jsonData['Time-To-Live'] : null
    return jsonData
}

function getCurrentTime() {
    // function returns the date in (YYYY-MM-DD hh:mm:ss) format'
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

function checkTimeToLive(data) {
    const createdTime = data['Created-Time'];
    const timeToLive = data['Time-To-Live'];
    if(timeToLive !== null) {
        const dataCreatedTime = new Date(createdTime);
        const currentTime = new Date(this.getCurrentTime());

        // calculating the time difference between the time of creation of the data and current time 
        var diff = Math.abs(currentTime - dataCreatedTime)/1000 
        
        // check if the difference exceeds time to live value of the data if exceeds then data is expired 
        if(diff > timeToLive) {
            return true
        }   
    }
    // in case data is not expired
    return false
}

function createData(jsonData, filePath) {
    try {
        // check if the json data is larger than 1GB 
        if(JSON.stringify(jsonData) > 1000000000) {
            return {status: 'failed', message: 'The data is larger than 1GB'}
        }

        // check if the input json data has valid keys and values.
        for (const [key, value] of Object.entries(jsonData)) {

            // check for the key in data is within 32 characters. 
            if(key.length > 32) {
                return { status: 'failed', message: 'The keys must be in 32 characters length.' }
            }

            // check for the value in data is within 16KB
            if(JSON.stringify(value).length > 16384) {
                return { status: 'failed', message: 'The values must be in 16KB size.'}
            }
        }

        if (!fs.existsSync(filePath)) {
            return { status: 'failed', message: 'Datastore does not exists. Data not found for the key.' }
        }
        // synchronously read the entire contents of a datastore.
        const file = fs.readFileSync(filePath);
        const fileParsed = JSON.parse(file);
        
        // check if existing datastore's size exceeds 1000000000 that is 10^9)
        if(JSON.stringify(fileParsed).length > 1000000000) {
            return { status: 'failed', message: 'Datastore file exceeds 1GB of size'}
        }
        
        // check if key exists
        for (const [key] of Object.entries(jsonData)) {
            if(fileParsed[key]) {
                return {status: 'failed', message: 'Key already exists in the datastore.'}
            }
        }

        // add the extra fields to each data values
        for (const [key] of Object.entries(jsonData)) {
            jsonData[key] = this.addFields(jsonData[key]);
            fileParsed[key]=jsonData[key];
        }

        // synchronously write the modified datastore to the existing datastore
        fs.writeFileSync(filePath, JSON.stringify(fileParsed, null, 4)); 
        
        return {status: 'success', message: 'Data successully added to the datastore.' };
    } catch (error) {
        return {status: 'failed', message: error.status}
    }   
}

function checkData(key, filePath) {
    try {
        // check if datastore exists or not
        if (!fs.existsSync(filePath)) {
            return { status: 'failed', message: 'Datastore does not exists. Data not found for the key.' }
        }
        // get the datastore
        const file = fs.readFileSync(filePath);
        const fileParsed = JSON.parse(file)

        // check if the provided key exists
        if(!fileParsed[key]) {
            return { status: 'failed', message: 'Data not found for the provided key.'}
        }

        // check if the data is expired 
        const data = fileParsed[key];
        if(this.checkTimeToLive(data)) {
            return { status: 'failed', message:  'Cannot perfom the operation as the Time-To-Live for the key has expired.'}
        }

        return {status: 'success' ,file: fileParsed};
    } catch (error) {
        console.error(error.message);
        return {status: 'failed', message:  error.message}
    }
}

function readData(key, filePath) {
    try {
        const response = this.checkData(key, filePath);
        if(response.status == 'failed') {
            return { status: 'failed', message:  response.message }
        }
        
        // return the data for the provided key
        return { status: 'success', data: response.file[key]};
    } catch (error) {
        console.error(error.message);
        return { status: 'failed', message:  error.message}
    }
    
}

function deleteData(key, filePath) {
    try {
        const response = this.checkData(key, filePath);
        if(response.status == 'failed') {
            return { status: 'failed', message:  response.message }
        }

        // get the datastore
        const fileParsed = response.file;

        // delete the data for the provided key.
        delete fileParsed[key];

        // synchronously write the modified datastore to the datastore.
        fs.writeFileSync(filePath, JSON.stringify(fileParsed, null, 4)); 
        return { status: 'success', message:  `Data for the key ${key} deleted successfully from the datastore.`}
    } catch (error) {
        console.error(error.message);
        return {status: 'failed', message:  error.message}
    }
}


// export the class as library to import from different location
module.exports =  { addFields, getCurrentTime, createData, checkData, checkTimeToLive, readData, deleteData} 