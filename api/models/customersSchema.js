const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Company: String,
    Ratings: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    }
});

const Customers = module.exports = mongoose.model('Customers', CustomersSchema );

module.exports.getAllCustomers = (callback) => {
    Customers.find(callback);
};

module.exports.addCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
};

module.exports.deleteCustomerById = (id, callback) => {
    let query = {_id: id};
    Customers.remove(query, callback);
};

module.exports.updateCustomer = (id, updatedCustomer, callback) => {
    Customers.update({"_id": id}, updatedCustomer, callback);
};