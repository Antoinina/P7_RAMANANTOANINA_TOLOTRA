const sql = require('./db.js');

const Article = function (article) {
    this.publication = article.publication;
    this.likes = article.likes;
    this.comments = article.comments;
    this.date_published = new Date();
    this.id = article.id;
};

/* Save article published in the db */
Article.create = (newArticle, result) => {
    sql.query("INSERT INTO Articles SET ?", newArticle, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created article: ", { id: res.insertId, ...newArticle });
        result(null, { id: res.insertId, ...newArticle });
    });
};

/* Get all articles saved in the db */
Article.getAll = result => {
    sql.query("SELECT * FROM Articles", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Articles: ", res);
        result(null, res);
    });
};

/* Delete the article into db */
Article.remove = (id, result) => {
    sql.query("DELETE FROM Articles WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Article with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted article with id: ", id);
        result(null, res);
    });
};

/* To modify the publication or to update the likes and comments number */
Article.updateById = (id, article, result) => {
    sql.query(
      "UPDATE Articles SET publication = ?, likes = ?, comments = ? WHERE id = ?",
      [article.publication, article.likes, article.comments, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found article with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated article: ", { id: id, ...article });
        result(null, { id: id, ...article });
      }
    );
  };

module.exports = Article;