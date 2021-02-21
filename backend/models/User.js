const sql = require('./db.js');
const fs = require('fs');


/* The user constructor */
const Customer = function (customer) {
  this.userId = customer.userId;
  this.email = customer.email;
  this.password = customer.password;
  this.imageUrl = customer.imageUrl;
  this.name = customer.name;
  this.jobTitle = customer.jobTitle;
  this.arriveDate = customer.arriveDate;
  this.biographie = customer.biographie;
};

/* Create user profil in the db */
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO Users SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("Error appeared: ", err);
      result(err, null);
      return;
    }

    console.log("Successful customer creation: ", { ...newCustomer, userId: res.insertId });
    result(null, { ...newCustomer, userId: res.insertId });
  });
};

/* To access the user profil saved in the db */
Customer.findById = (userId, result) => {
  sql.query("SELECT * FROM Users WHERE userId = ?", [userId], (err, res) => {
    if (err) {
      console.log("Error appeared: ", err);
      result(null, err);
      return;
    }

    console.log("Customer selected: ", res);
    result(null, res);
  });
};

/* To modify the user profil */
Customer.updateById = (id, updateCustomer, result) => {
  const updateQuery = Object.entries(updateCustomer).filter(([key, values]) => !!values).map(([key, value]) => `${key} = '${value}'`).join(',');
  sql.query(
    ` UPDATE Users SET ${updateQuery} WHERE userId = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log("Error appeared: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null); // The user was not found
        return;
      }

      console.log("The new profil informations : ", { userId: id, ...updateCustomer });
      result(null, {  ...Object.assign({}, ...Object.entries(updateCustomer).filter(([key, value]) => !!value).map(([key, value]) => ({ [key]: value }))) });
    }
  );
};

/* Delete the user into db */
Customer.remove = (userId, result) => {
    sql.query('DELETE FROM Users WHERE userId = ?',[userId], (err, res) => {
      if (err) {
        console.log("Error appeared: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null); // The user was already deleted
        return;
      }

      console.log("The user was deleted: ", userId);
      result(null, res);
    });
};

/* To get all the users profil for admin */
Customer.getAll = (result) => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("Error appeared: ", err);
      result(null, err);
      return;
    }

    console.log("All Users: ", res);
    result(null, res);
  });
};

module.exports = Customer;