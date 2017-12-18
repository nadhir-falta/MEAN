const express = require('express');
const router = express.Router();
const customersSchema = require('../models/customersSchema');


router.get('/',(req,res) => {
    customersSchema.getAllCustomers((err, customers)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all customers. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, customers: customers}, null, 2));
            res.end();
        }
    });
});


router.post('/', (req, res, next) => {
    let newCustomer = new customersSchema({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Company: req.body.Company,
        Ratings: req.body.Ratings
    });

    customersSchema.addCustomer(newCustomer, (err, customer) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new customer. Error: ${err}`});
        }
        else
            res.json({success: true, message: "Added successfully."});
        }
    );
});

router.delete('/:id', (req, res, next)=> {
    let id = req.params.id;
    customersSchema.deleteCustomerById(id, (err, customer) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the customer. Error: ${err}`});
        }
        else if(customer) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
        }
    )
});

router.put('/:id', (req,res) => {

    let updatedCustomer = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Company: req.body.Company,
        Ratings: req.body.Ratings
    };

    customersSchema.updateCustomer(req.params.id, updatedCustomer, (err, resp) => {
            if(err) {
                res.json({success: false, message: `Failed to UPDATE customer. Error: ${err}`});
            }
            else
                res.json({success: true, message: `Updated successfully.`});
        }
    );
});

module.exports = router;