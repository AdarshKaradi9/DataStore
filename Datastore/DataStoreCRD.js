const { json } = require("body-parser");

export default class DataStoreCRD {
    getTest() {
        return json({msg: "this is the message"});
    }
}