const sql = require('./db.js');

const Customer = function(customer){
    this.userId = customer.userId;
    this.imageUrl = customer.imageUrl;
    this.name = customer.name;
    this.job = customer.job;
};

/* Create customer in the db */
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Customers SET ?", newCustomer, (err, res, req) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCustomer, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` });
      result(null, { id: res.insertId, ...newCustomer });
    });
};

/* Delete the user into db */
Customer.remove = (id, result) => {
  sql.query("DELETE FROM Customers WHERE id = ?", id, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
  });
};

/* To modify the publication or to update the likes and comments number */
Customer.updateById = (id, updateCustomer, result, req) => {
  sql.query(
    "UPDATE Customers SET imageUrl = ?, name = ?, job = ? WHERE id = ?",
    [updateCustomer.imageUrl, updateCustomer.name, updateCustomer.job, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...updateCustomer });
      result(null, { id: id, ...updateCustomer, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` });
    }
  );
};

/* Get user saved in the db */
Customer.getUser = (id, result) => {
  sql.query("SELECT * FROM Customers WHERE id = ?", [id], (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      console.log("Customer: ", res);
      result(null, res);
  });
};

module.exports = Customer;