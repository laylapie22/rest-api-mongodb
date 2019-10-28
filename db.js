const { MongoClient } = require('mongodb')
const dbName = 'test'
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
client.connect();

const getDb = () => {
    return client.db(dbName);
}

module.exports = {
   getDb   
}

 
// const dbName = 'test'


// const client = new MongoClient(url)

// client.connect( (err) => {
//     if ( err ) {
//         console.log("error connecting to ", url, err)
//         return
//     } 
//     const db = client.db(dbName)
//     const employeesCollection = db.collection('employees')

//     employeesCollection.find({}).toArray( (err,employees) => {
//         if (err) {
//             console.log("error getting employees", err)
//         } else {
//             console.log(employees)
//         }
//     })

//     client.close()

// })

