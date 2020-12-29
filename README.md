# DATASTORE_FRESHWORKS

Description: 
A file-based key-value data store that supports the basic CRD(create, read and delete) operations. The application is written in Nodejs. 

Environment setup:
1. Clone the repository using **git clone https://github.com/AdarshKaradi9/DataStore_FreshWorks.git**.
2. Change the director to DataStore_FreshWorks using command **cd DataStore_FreshWorks/**.
3. Install all the necessary node modules using command **npm install** in the DataStore_FreshWorks directory
4. The environment is set.

Usage:
1. The **configuration.json** file present in config directory is the file that contains environment variables.
2. The **DataStoreCRD** library is present at Datastore directory and can be imported anywhere.
3. The default file(datastore) path is set to **~/DataStore_FreshWorks/**. 
4. (OPTIONAL) If you want your own file path then change the value of **CUSTOM_FILE_PATH** to required file(datastore) path.
5. The default name of the file or the datastore is **file.json**.
6. (OPTIONAL) If you want your own file name then change the value of **CUSTOM_FILE_NAME** to required file(datastore) name.
7. Two ways to test:
    1. Testing with **Postman**: 
        1. Using **npm start** it will start the **server.js** file which will by default listen at port 3000. The file server.js is the REST API developed using Express.js in **Nodejs**. 
        2. (OPTIONAL) If you want to change the port then change the value of **PORT** to required port number in **config/configuration.json**.
        3. To test it using Postman you can import **DataStoreCRD.postman_collection.json** into Postman application and carry out the operations such as read data, delete data, create data.
    2. Testing with **scripts**:
        1. Change the directory to TestScripts and run the scripts using **node createData.js**,**node readData.js** or **node deleteData.js** to test.
        2. Begin with **node createData.js**. This will create the file(datastore) in the specified file path and then you can run **node readData.js** or **node deleteData.js** by editing these scripts if needed.


