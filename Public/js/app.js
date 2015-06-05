$(function() {

  // "Profile" object constructor
  function Profile() {};

  // Creates new instance of "Profile" object constructor
  var user = new Profile();

  // Fetches user input from the account creation page to create a new account in the database
  Profile.prototype.createAccount = function() {
    var newUserURL = new Firebase('https://good-samaritan-cf.firebaseio.com/User');

    newUserURL.push({
      email: $('#new-email').val(),
      password: $('#new-password1').val(),
      firstName: $('#new-firstname').val(),
      lastName: $('#new-lastname').val(),
      phoneNumber: $('#new-phonenumber').val(),
      city: $('#new-city').val(),
      state: $('#new-state :selected').val(),
      zip: $('#new-zipcode').val()
    }, user.signIn($('#new-email').val(), $('#new-password1').val()));
  };

  // Fetches user info from database and stores into session storage, performs user authentication, and signs users into the app
  Profile.prototype.signIn = function(email, password) {
    var userRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User");

    userRef.once("value", function(snapshot) {
      var userData = "";

      snapshot.forEach(function(childSnapshot) {
        userData = childSnapshot.val();

        if (userData.email === email) {
          if (userData.password === password) {
            userData.key = childSnapshot.key();
            sessionStorage.setItem("userStorage", JSON.stringify(userData));
            location.href = "userProfile.html";
            return true;

          } else {
            $("#invalid").text("Incorrect password! Please try again.");
          }
          return true;

        } else if (!email) {
          return true;

        } else {
          $("#invalid").text("This account does not exist! Please try again or create a new account.");
        }
      })
    })
  }

  // Event listener to clear password field and error message on focus
  $("#password").on("focus", function() {
    $("#invalid").text("");
    $("#password").val("");
  })

  // Event listener to clear password field on focus of email field
  $("#user-email").on("focus", function() {
    $("#password").val("");
  })

  // Event listener to sign users in with email and password credentials
  $("#sign-in").on("click", function() {
    var email = $("#user-email").val();
    var password = $("#password").val();

    user.signIn(email, password);
  })

  // Event listener to create a new account with the provided user info
  $('#new-user-form').on('submit', user.createAccount);

});
