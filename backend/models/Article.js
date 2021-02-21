const sql = require('./db.js');

const Article = function (article) {
    this.publication = article.publication;
    this.likes = article.likes;
    this.comments = article.comments;
    this.date_published = new Date();
    this.userId = article.userId;
};

/* Save article published in the db */
Article.create = (newArticle, result) => {
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
Article.getAll = (userId, result) => {
    sql.query(` SELECT a.*, u.name, u.jobTitle, u.imageUrl, (SELECT COUNT(*) FROM Usersliked INNER JOIN Articles ON Usersliked.articleId = Articles.id WHERE Usersliked.userId = ${userId} AND Usersliked.articleId = a.id ) as likecountByTheUser, (SELECT COUNT(*) FROM Comments INNER JOIN Articles ON Comments.articleId = Articles.id WHERE Comments.articleId = a.id ) AS commentsCount FROM Articles AS  a JOIN Users AS u ON a.userId=u.userId ORDER BY a.date_published DESC`, (err, res) => {
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
      "UPDATE Articles SET publication = ? WHERE id = ?",
      [newArticle.publication, id],
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

  /* To modify the like */
Article.updateLikeById =  (id, userId, updateLike, result) => {
    sql.query(
      "UPDATE Articles SET likes = ? WHERE id = ?",
      [updateLike, id],
      (err, res) => {
        if (err) {
          console.log("Error appeared: ", err);
          result(null, err);
          return;
        }

        sql.query("INSERT INTO Usersliked SET ?", {articleId: id, userId});
  
        console.log("Updated like: ", { id: id, updateLike });
        result(null, { id: id, updateLike });
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