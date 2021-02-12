const sql = require('./db.js');


/* The user constructor */
const Customer = function(customer){
    this.userId = customer.id;
    this.email = customer.email;
    this.password = customer.password;
    this.imageUrl = customer.imageUrl;
    this.name = customer.name;
    this.jobTitle = customer.jobTitle;
};

/* Create user profil in the db */
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Users SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("Error appeared: ", err);
        result(err, null);
        return;
      }
  
      console.log("Successful customer creation: ", { userId: res.insertId, ...newCustomer });
      result(null, { userId: res.insertId, ...newCustomer });
    });
};

/* To access the user profil saved in the db */
Customer.findById = (id, result) => {
  sql.query("SELECT * FROM Users WHERE userId = ?", [id], (err, res) => {
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
  sql.query(
    "UPDATE Users SET email = ?, password = ?, imageUrl = ?, name = ?, jobTitle = ? WHERE userId = ?",
    [updateCustomer.email, updateCustomer.password, updateCustomer.imageUrl, updateCustomer.name, updateCustomer.jobTitle, id],
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
      result(null, { userId: id, ...updateCustomer });
    }
  );
};

/* Delete the user into db */
Customer.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE userId = ?", [id], (err, res) => {
      if (err) {
          console.log("Error appeared: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null); // The user was already deleted
          return;
      }

      console.log("The user was deleted: ", id);
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