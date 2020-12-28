const fs = require('fs');
class DataStoreCRD {
    addFields(jsonData) {
        // adding the data created time and time to live to the data
        jsonData['Created-Time'] = this.getCurrentTime();
        jsonData['Time-To-Live'] = jsonData['Time-To-Live'] ? jsonData['Time-To-Live'] : null
        return jsonData
    }

    getCurrentTime() {
        // function returns the date in (YYYY-MM-DD hh:mm:ss) format"
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
    }

    checkTimeToLive(data) {
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

    createData(jsonData, dbPath) {
        try {
            // check if the json data is larger than 1GB 
            if(JSON.stringify(jsonData) > 1000000000) {
                return {status: 'The data is larger than 1GB'}
            }

            // check if the input json data has valid keys and values.
            for (const [key, value] of Object.entries(jsonData)) {

                // check for the key in data is within 32 characters. 
                if(key.length > 32) {
                    return { status: 'The keys must be in 32 characters length.' }
                }

                // check for the value in data is within 16KB
                if(JSON.stringify(value).length > 16384) {
                    return { status: 'The values must be in 16KB size.'}
                }
            }

            if (!fs.existsSync(dbPath)) {
                return { status: 'Datastore does not exists. Data not found for the key.' }
            }
            // Synchronously reads the entire contents of a datastore.
            const db = fs.readFileSync(dbPath);
            const dbParsed = JSON.parse(db);
            
            // check if existing datastore's size exceeds 1000000000 that is 10^9)
            if(JSON.stringify(dbParsed).length > 1000000000) {
                return { status: 'Datastore file exceeds 1GB of size'}
            }

            // add the extra fields to each data values
            for (const [key] of Object.entries(jsonData)) {
                jsonData[key] = this.addFields(jsonData[key]);
                dbParsed[key]=jsonData[key];
            }

            // write the new data to the existing datastore
            fs.writeFileSync(dbPath, JSON.stringify(dbParsed, null, 4)); 
            
            return {status: "Data successully added to the datastore."};
        } catch (error) {
            return {msg: error.status}
        }   
    }

    checkData(key, dbPath) {
        // check if datastore exists or not
        if (!fs.existsSync(dbPath)) {
            return { status: 'Datastore does not exists. Data not found for the key.' }
        }
        // get the datastore
        const db = fs.readFileSync(dbPath);
        const dbParsed = JSON.parse(db)

        // check if the provided key exists
        if(!dbParsed[key]) {
            return { status: "Data not found for the provided key."}
        }

        // check if the data is expired 
        const data = dbParsed[key];
        if(this.checkTimeToLive(data)) {
            return { status: "Cannot read the data as the Time-To-Live for the key has expired."}
        }

        return {status: "success" ,db: dbParsed};

    }

    readData(key, dbPath) {
        const response = this.checkData(key, dbPath);
        if(response.status !== "success") {
            return { status: response.status }
        }
        
        return response.db[key];
    }

    deleteData(key, dbPath) {
        const response = this.checkData(key, dbPath);
        if(!response.status == "success") {
            return { status: response.status }
        }
        const dbParsed = response.dbParsed;
        delete dbParsed[key];
        fs.writeFileSync(dbPath, JSON.stringify(dbParsed, null, 4)); 
        return { status: "Data deleted from the datastore."}
    }
}

module.exports =  { DataStoreCRD: DataStoreCRD } 

