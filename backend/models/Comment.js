const sql = require('./db.js');

const Comment = function (comment) {
    this.comments = comment.comments;
    this.date_published = new Date();
    this.userId = comment.userId;
    this.articleId = comment.articleId;
};

/* Save comment published in the db */
Comment.create = (newComment, result) => {
    sql.query("INSERT INTO Comments SET ? ", newComment, (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(err, null);
            return;
        }

        console.log("Comment published: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

/* To get all comments saved in the db */
Comment.getAll = (result) => {
    sql.query(` SELECT c.*, u.name, u.imageUrl, u.jobTitle FROM Comments AS c JOIN Users AS u ON c.userId=u.userId ORDER BY c.date_published DESC`, (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(null, err);
            return;
        }

        console.log("All comments published: ", res);
        result(null, res);
    });
};

Comment.getByArticleId = (articleId, result) => {
    sql.query(` SELECT c.*, u.name, u.imageUrl, u.jobTitle FROM Comments AS c JOIN Users AS u ON c.userId=u.userId  WHERE articleId = ${articleId} ORDER BY c.date_published DESC`, (err, res) => {
        if (err) {
            console.log("Error appeared: ", err);
            result(null, err);
            return;
        }

        console.log("All comments published: ", res);
        result(null, res);
    });
};

/* To modify the comments */
Comment.updateById = (id, newComment, result) => {
    sql.query(
      "UPDATE Comments SET comments = ? WHERE id = ?",
      [newComment.comments, newComment.comments, id],
      (err, res) => {
        if (err) {
          console.log("Error appeared: ", err);
          result(null, err);
          return;
        }
  
        console.log("Updated comment: ", { id: id, ...newComment });
        result(null, { id: id, ...newComment });
      }
    );
  };

/* Delete the comment into db */
Comment.remove = (id, result) => {
    sql.query("DELETE FROM Comments WHERE id = ?", [id], (err, res) => {
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

module.exports = Comment;