const sql = require('./db.js');

const Article = function (article) {
    this.publication = article.publication;
    this.likes = 0;
    this.comments = 0;
    this.date_published = new Date();
};

/* Save article published in the db */
Article.create = (newArticle, result) => {
    delete newArticle.id;
    sql.query("INSERT INTO Articles SET ? ", newArticle, (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(err, null);
            return;
        }

        console.log("Article published: ", { id: res.insertId, ...newArticle });
        result(null, { id: res.insertId, ...newArticle });
    });
};

/* To get all articles saved in the db */
Article.getAll = (result) => {
    sql.query("SELECT a.*, u.name, u.jobTitle, u.imageUrl FROM Articles AS a JOIN Users AS u ON a.id=u.userId", (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(null, err);
            return;
        }

        console.log("All articles published: ", res);
        result(null, res);
    });
};

/* To modify the publication or to update the likes and comments number */
Article.updateById = (id, newArticle, result) => {
    sql.query(
      "UPDATE Articles SET publication = ?, likes = ?, comments = ? WHERE id = ?",
      [newArticle.publication, newArticle.likes, newArticle.comments, id],
      (err, res) => {
        if (err) {
          console.log("Error appeared: ", err);
          result(null, err);
          return;
        }
  
        console.log("Updated article: ", { id: id, ...newArticle });
        result(null, { id: id, ...newArticle });
      }
    );
  };

/* Delete the article into db */
Article.remove = (id, result) => {
    sql.query("DELETE FROM Articles WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null); // The article was already deleted
            return;
        }

        console.log("This article was deleted: ", id);
        result(null, res);
    });
};

module.exports = Article;