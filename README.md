DATASTORE_FRESHWORKS

Description: 
A file-based key-value data store that supports the basic CRD(create, read and delete) operations. The application is written in Nodejs .

Installation:
1. Clone the repository using 'git clone https://github.com/AdarshKaradi9/DataStore_FreshWorks.git'
2. Change the director to DataStore_FreshWorks using command 'cd DataStore_FreshWorks/'
3. Install all the necessary node modules using command 'npm install' in the DataStore_FreshWorks directory
4. The installation is done

Usage:
1. Open the configuration.json file present in config directory
2. The default file(datastore) path is set to current_path/DataStore_FreshWorks/TestScripts. 
3. (OPTIONAL) If you want your own file path then change the value of "CUSTOM_FILE_PATH" to required file(datastore) path.
4. The default name of the file is "file.json".
5.(OPTIONAL) If you want your own file name then change the value of "CUSTOM_FILE_NAME" to required file(datastore) name.
6. Test using Postman: The  file server.js is the REST API developed using Express.js in Nodejs. Start the server using npm start which will start the server which will by default listen at port 3000. If you want to change the port then change the value of "PORT" to required port number in config/configuration.json. To test it using Postman you can import DataStoreCRD.postman_collection.json into Postman application and carry out the operations such as read data, delete data, create data.
7. Test using scripts: Change the directory to TestScripts and run the createData.js, readData.js or deleteData.js to test using scripts.


