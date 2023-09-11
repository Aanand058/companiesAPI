/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _____Aanand Aman_________________ Student ID: __166125211____________ Date: ____2023/09/11____________
*  Cyclic Link: https://pink-wicked-perch.cyclic.app/
*

Note: Made changes in companiesDB.js 
    From:
    deleteCompanyByName(name) {
    return this.Movie.deleteOne({ name: name }).exec();
  }
    To:
    deleteCompanyByName(name) {
    return this.Company.deleteOne({ name: name }).exec();
  }
********************************************************************************/ 


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const CompaniesDB = require("./modules/companiesDB.js");
const db = new CompaniesDB();


app.use(cors());
app.use(express.json());


// Start the server
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

//GET "/" route
app.get('/', (req, res) => {
    res.json({ message: 'API Listening' });
});


//Add Routes 

//•	POST /api/companies

app.post("/api/companies", (req, res) => {
    db.addNewCompany(req.body)
        .then((company) => {
            res.status(201).json(company);
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to add new company' });
        });
});


//•	GET /api/companies
app.get("/api/companies", (req, res) => {
    db.getAllCompanies(req.query.page, req.query.perPage, req.query.tag)
        .then((company) => {
            res.status(200).json(company);
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to get companies' });
        });
});


//•	GET /api/company
app.get("/api/company/:name", (req, res) => {
    db.getCompanyByName(req.params.name)
        .then((company) => {
            res.status(200).json(company);
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to get company' });
        });
});



//•	PUT /api/company
app.put("/api/company/:name", (req, res) => {
    db.updateCompanyByName(req.body, req.params.name)
        .then(() => {
            res.status(200).json({ message: 'Company updated successfully!' })
        })
        .catch(() => {
            res.status(500).json({ message: `Fail to update company ${req.params.name}` });
        });
});



//•	DELETE /api/company
app.delete("/api/company/:name", (req, res) => {
    db.deleteCompanyByName(req.params.name)
        .then((() => {
            res.status(200).json({ message: 'Company deleted' });
        }))
        .catch(() => {
            res.status(500).json({ message: `Fail to delete company ${req.params.name}` });
        });
});




