const Customer = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../models/db");

/* To update the profil informations */
exports.updateOne = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Impossible de modifier un article vide !" });
    }

    const user = new Customer({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        biographie: req.body.biographie,
        arriveDate: req.body.arriveDate,
        imageUrl: req.file && req.file.filename ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:undefined
    });
    Customer.updateById(req.params.userId,user, (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la modification !" });
        else res.send(data);
    });
};

/* To access to the profil */
exports.findOne = (req, res) => {
    Customer.findById(req.params.userId, (err, data) => {
        if (err)
            res.status(404).send({ message: "Votre profil n'existe pas !" });
        else res.send(data);
    });
};

/* To delete profil */
exports.delete = (req, res) => {
        Customer.remove(req.params.userId, (err, data) => {
            if (err)
                res.status(404).send({ message: "Votre profil n'existe pas !" });
            else res.send({ message: "Votre profil a bien été supprimé !" });
        });
};

/* To see all profils for admin */
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: "Aucun profil n'a été crée !" });
        else res.send(data);
    });
};

/* To log profil */
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        res.status(400).send({ message: "Veuillez entrer un email et/ou un mot de passe" });
        res.end();
    } else {
        connection.query("SELECT * FROM Users WHERE email = ?", [email], async (err, result) => {
            if (result.length > 0) {
                const pwdCompared = await bcrypt.compare(password, result[0].password);

                if (pwdCompared) {
                    res.status(200).send(
                        {
                            token: jwt.sign( // Encode a new token to permit to the user to connect just once during 24h
                                { userId: result[0].userId },
                                'dhegaifze56686deallj',
                                { expiresIn: '24h' }
                            ),
                            user: result[0],
                            message: "Connexion réussie"
                        });
                } else {
                    res.status(401).send({ message: "Email et/ou mot de passe incorrect" });
                }
            } else {
                res.status(401).send({ message: "Email et/ou mot de passe incorrect" });
            }
        });
    }
};

/* To sign */
exports.signup = (req, res) => {

    // Protect the password 10 times
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Customer({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                jobTitle: req.body.jobTitle,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });


            Customer.create(user, (err, data) => {
                if (err)
                    res.status(500).send({ message: "Une erreur s'est produite lors de la création du compte !" });
                else {
                    res.status(200).send({

                        token: jwt.sign( // Encode a new token to permit to the user to connect just once during 24h
                            { userId: data.userId },
                            'dhegaifze56686deallj',
                            { expiresIn: '24h' }
                        ),
                        user: data,
                        message: "Connexion réussie"
                    });
                }
            });

        })
        .catch(error => res.status(500).send({ error }));
};
