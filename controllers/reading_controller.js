var express = require("express");

var router = express.Router();

// Import the model js to use its database functions.
var book = require("../models/reading.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  book.all(function(data) {
    var hbsObject = {
      books: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/books", function(req, res) {
  book.create(["bookName", "reading"], [req.body.name, req.body.reading], function(result) {
  //book.create(["bookName", "reading"], [req.body.bookName, req.body.reading], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/books/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  book.update(
    {
      reading: req.body.reading
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
