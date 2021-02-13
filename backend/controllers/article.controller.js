const Article = require("../models/Article");

/* To publish an article */
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Impossible de publier un article vide !"});
    }

    const article = new Article({
        publication: req.body.publication,
        likes: req.body.likes,
        comments: req.body.comments,
        date: req.body.date_published,
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

    Article.updateById(req.params.id, new Article(req.body), (err, data) => {
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
    Article.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: "Pas de publication à vous montrer !"});
        else res.send(data);
    });
};
