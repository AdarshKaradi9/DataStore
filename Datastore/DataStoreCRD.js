const { json } = require("body-parser");

class DataStoreCRD {
    getTest() {
        var obj = { msg: "this is the message" }
        return obj
    }
}

module.exports =  { DataStoreCRD: DataStoreCRD } 

