const Comment = require("../models/comment");
const jwt = require('jsonwebtoken');

/* To publish a comment */
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Impossible de publier un commentaire vide !"});
    }

    const comment = new Comment({
        comments: req.body.comments,
        date: req.body.date_published,
        userId : req.body.userId,
        articleId : req.body.articleId
    });

    Comment.create(comment, (err, data) => {
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

    Comment.updateById(req.params.id, new Comment(req.body.comment), (err, data) => {
        if (err)
            res.status(500).send({ message: "Une erreur s'est produite lors de la modification !"});
        else res.send(data);
    });
};

/* To delete the article */
exports.delete = (req, res) => {
    Comment.remove(req.params.id, (err, data) => {
        if (err)
            res.status(404).send({ message: "Votre publication n'existe pas !"});
        else res.send({ message: "Votre publication a bien été supprimée !"});
    });
};

/* To show all comments in the feed */
exports.findAll = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token form the header
        const decodedToken = jwt.verify(token, 'dhegaifze56686deallj'); // Verify if the user id is the same as in the token
        const userId = decodedToken.userId;
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: "Pas de publication à vous montrer !"});
        else res.send(data);
    });
};
