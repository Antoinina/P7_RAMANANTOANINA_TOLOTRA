const Article = require("../models/Article");
const jwt = require('jsonwebtoken');

/* To publish an article */
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Impossible de publier un article vide !"});
    }

    const article = new Article({
        publication: req.body.publication,
        likes: 0,
        comments: 0,
        date: req.body.date_published,
        userId : req.body.userId
    });

    Article.create(article, (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la publication !"});
        else res.send(data);
    });
};

/* To modify an article */
exports.udpateOne = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Impossible de modifier un article vide !"});
    }

    Article.updateById(req.params.id, new Article(req.body.publication), (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la modification !"});
        else res.send(data);
    });
};

/* To delete the article */
exports.delete = (req, res) => {
    Article.remove(req.params.id, (err, data) => {
        if (err)
            res.status(404).send({ message: "Votre publication n'existe pas !"});
        else res.send({ message: "Votre publication a bien été supprimée !"});
    });
};

/* To show all articles in the feed */
exports.findAll = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token form the header
        const decodedToken = jwt.verify(token, 'dhegaifze56686deallj'); // Verify if the user id is the same as in the token
        const userId = decodedToken.userId;
    Article.getAll(userId,(err, data) => {
        if (err)
            res.status(500).send({ message: "Pas de publication à vous montrer !"});
        else res.send(data);
    });
};

/* To like publications */
exports.updateLike = (req, res, next) => {
    Article.updateLikeById(req.params.id, req.params.userId, req.body.likes, (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la modification !"});
        else res.send(data);
    });
};
