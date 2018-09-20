// .done()     //instead of success()
// .fail()     //instead of error()
// .always()   //instead of complete()

// function loadTweets() {
//     $(".posted-tweets").empty();   // empties all the loaded tweets before loading the database
//     $.ajax('/tweets', { method: 'GET' }).then(function(data) {
//       renderTweets(data);
//     })
//   }

//#####################
//       USERS
//#####################

// Loads all the user names into the body
function loadUsers() {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
}


//#####################
//     RESOURCES
//#####################

// Loads all the resources into the html body
function loadResources() {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    for(resource of resources) {
      $("<div>").text(resource.title).appendTo($("body"));
      $("<div>").text(resource.description).appendTo($("body"));
      $("<div>").text(resource.url).appendTo($("body"));
    }
  });;
}

// Adds a new entry into resources
function addResources() {
  $( "add_entry" ).on( "submit", function( event ) {
    event.preventDefault();
    console.log( escape($(this).serialize()) );
    let $error = $('#add_error');
    let $titleLength = $(this).find("title").val().length;
    let $description = $(this).find("description").val().length;
    if (!$titleLength) {
      // window.alert('You need to type something!')
      $error.text("You need a title!")
      $('#add_error').show()
    } else if (!$descriptionLength) {
      // window.alert('Your post is too long!')
      $error.text("You need to add a description please.. for other users' sake..")
      $('#tweet-error').show()
    } else if (!$url) {
      // window.alert('Your post is too long!')
      $error.text("What is the page you are adding?")
      $('#tweet-error').show()
    } else if ($titleLength > 40) {
      // window.alert('Your post is too long!')
      $error.text("Your title is too long!")
      $('#tweet-error').show()
    } else if ($descriptionLength > 200) {
      // window.alert('Your post is too long!')
      $error.text("Your description is too long!")
      $('#tweet-error').show()
    } else {
      $.ajax('/api/resources', {
        title: $(req.body.title),
        url: $(req.body.url),
        description: $(req.body.description)
        method: 'POST'
      })
      $('#add-error').hide()
      loadTweets();
      $( 'form' ).each(function() {    // clears the form after submitting
        this.reset();
      });
      console.log('Successfully added new entry to resources table');
    }
  })
}


//#####################
//     COMMENTS
//#####################





//#####################
//       LIKES
//#####################








//#####################
//    RUN FUNCTIONS
//#####################

$(document).ready(function() {
  loadUsers();
  loadResources();
})
