const connection = require("../models/db");
const Customer = require("../models/User");

/* To update the profil informations */
exports.updateOne = (req, res) => {

};

/* To access to the profil */
exports.findOne = (req, res) => {

};

/* To delete profil */
exports.delete = (req, res) => {

};

/* To see all profils for admin */
exports.findAll = (req, res) => {

};

/* To log profil */
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password){
        connection.query("SELECT * FROM Users WHERE email = ? AND password = ?", [email, password], function(err, result){
            if (result.length > 0){
                req.session.loggedin = true;
                req.session.email = email;
            } else {
                res.status(404).send({ message: "Email ou mot de passe incorrect"});
            }
            res.end();
        });
    } else {
        res.status(400).send({ message: "Veuillez entrer un email et/ou un mot de passe"});
        res.end();
    }
};

/* To sign */
exports.signup = (req, res) => {
    const user = new Customer({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        imageUrl: req.body.imageUrl
    });

    Customer.create(user, (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la création du compte !"});
        else res.send(data);
    });
};
