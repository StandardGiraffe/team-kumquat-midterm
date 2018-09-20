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
  $( "#add_entry" ).on( "submit", function( event ) {
    console.log('Beginning of add entry..')
    event.preventDefault();
    let $error = $('#add_error');
    let $titleLength = $(this).find("input[name='title']").val().length;
    let $urlLength = $(this).find("input[name='url']").val().length;
    let $descriptionLength = $(this).find("input[name='description']").val().length;
    // console.log($titleLength);

    if ($titleLength < 1) {
      // window.alert('You need to type something!')
      $error.text("You need a title!")
      $('#add_error').show()
    } else if ($descriptionLength < 1) {
      // window.alert('Your post is too long!')
      $error.text("You need to add a description please.. for other users' sake..")
      $('#tweet-error').show()
    } else if ($urlLength < 1) {
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
      console.log("Passed all error checks..")
      console.log("What's being sent from app.js to resources.js: " + $(this).serialize());
      $.ajax('/api/resources', {
        data: $(this).serialize(),
        method: 'POST'
      })
      $('#add-error').hide()
      $( 'form' ).each(function() {    // clears the form after submitting
        this.reset();
      });
      console.log('Successfully sent to resources.js');
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
//       TAGS
//#####################

// function searchTags() {
//   knex.select('*')
//     .from('famous_people')
//     .where('first_name', 'ILIKE', inputName)
//     .orWhere('last_name', 'ILIKE', inputName)
//     // asCallback will wait until all the search is done, then handles it
//     // Promises is the more modern way of doing it
//     .asCallback(function(err, rows) {
//       if (err) return console.error(err);
//       console.log(`Found ${rows.length} person(s) by the name${inputName}:`);
//       let count = 1;
//       rows.forEach(output => {
//         console.log(`- ${count}: ${output.first_name} ${output.last_name}, born '${output.birthdate.toLocaleString().slice(0,8)}'`,)
//         count ++;
//       })
//       // knex.destroy();   // force closes the pooling
//     });
// }




//#####################
//   OTHER FUNCTIONS
//#####################

// prevents malicious code being posted
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {
  loadUsers();
  addResources();
  console.log("All functions on app.js were run")
})
