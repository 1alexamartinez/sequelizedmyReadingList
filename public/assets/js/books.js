// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-read").on("click", function(event) {
    var id = $(this).data("id");
    var newRead = $(this).data("newread");

    var newReadState = {
      reading: newRead
    };

    // Send the PUT request.
    $.ajax("/api/books/" + id, {
      type: "PUT",
      data: newReadState
    }).then(
      function() {
        console.log("changed read to", newRead);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBook = {
      name: $("#bookname").val().trim(),
      reading: $("[name=reading]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/books", {
      type: "POST",
      data: newBook
    }).then(
      function() {
        console.log("created new book");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
