const express = require('express')
const { getDb } = require('./db')
const { ObjectId } = require('mongodb')

const app = express()
//enable parsing of json objects, by default this is not enabled in express
app.use(express.json())

const port = 8080

/**
 * Return all employees
 */
app.get('/employees', (req,res) => {
    const search = req.query.search
    if ( search ) {
        searchEmployees(req,res)
        return
    }
    const testDb = getDb();
    const employeeCollection = testDb.collection("employees")
    employeeCollection.find({}).toArray( (err,employees) => {
        if (err) {
            console.log("error getting employees", err)
        } else {
            res.send(employees)
        }
    })
    
})
//get employee by id number
app.get('/employee/:id' ,(req,res) => {
    const id = req.params.id
    const testDb = getDb();
    const employeeCollection = testDb.collection("employees")
    console.log("get employee by id ", id)
    employeeCollection.findOne( {_id: ObjectId(id)}, (err,result) => {
        if ( err ) {
            console.log("error encountered while finding employee with that id")
            res.send("error encountered while finding employee with that id")
            return
        } 
        if ( result === null ) {
            console.log(`can't find employee with that id ${id}`)
            res.send(`can't find employee with that id ${id}`)
            return
        }
    
        res.send(result)                              
    })
})
//to be able to add employee in the body
app.post('/employee',(req,res) => {
    const testDb = getDb();
    const employeeCollection = testDb.collection("employees")
    const employee = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        job: req.body.job,
        company: req.body.company
    }
    employeeCollection.insertOne(employee, {}, (err, result) => {
       if ( err ) {
           console.log(err)
           res.send("error inserting")
           return
       }

       employee._id = result.insertedId
       res.send(employee)
    })
    
})
//to be able to update employee in the body
app.put('/employee/:id', (req,res) => {
    const testDb = getDb();
    const employeeCollection = testDb.collection("employees")
    const id = req.params.id
    
    const update = {
        job: req.body.job,
        address: req.body.address,
        company: req.body.company
    }
    employeeCollection.updateOne({_id: ObjectId(id) }, { $set: update }, (err,result) => {
        if ( err ) {
            console.log("error encountered while finding employee with that id")
            res.send("error encountered while finding employee with that id")
            return
        }
        
        if ( result.modifiedCount > 0 ) {
            res.send(`Updated employee with id ${id}`)
        } else {
            res.send(`Error updating employee with id ${id}`)
        }
    })
})

//searches for employee with query
const searchEmployees = (req,res) => {
    const { search } = req.query
    const testDb = getDb();
    const employeeCollection = testDb.collection("employees")

    const fields = [
        { name: { $regex:  search, $options: "i" } },
        { email: { $regex:  search, $options: "i" } },
        { address: { $regex:  search, $options: "i" } },
    ];
    

    employeeCollection.find( { $or: fields }).toArray( (err, employees) => {
        if ( err ) {
            console.log(`There was an error during the search of employees with given field ${search}`)
            res.send(`There was an error during the search of employees with given field ${search}`)
            return
        }
        res.send(employees)
    })
}





app.listen(port,() => console.log(`listening to port ${port}`))
