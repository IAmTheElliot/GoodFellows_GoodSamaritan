$(function() {

  // "Profile" object constructor
  function Profile() {};

  // Creates new instance of "Profile" object constructor
  var user = new Profile();

  // Fetches user input from the account creation page to create a new account in the database; performs email and password validation
  Profile.prototype.createAccount = function() {
    var userRef = new Firebase('https://good-samaritan-cf.firebaseio.com/User');

    userRef.once("value", function(snapshot) {
      var userData = "";

      snapshot.forEach(function(childSnapshot) {
        userData = childSnapshot.val();
        newEmail = $("#new-email").val();
        newPassword1 = $("#new-password1").val();
        newPassword2 = $("#new-password2").val();

        if (userData.email === newEmail) {
          $("#error-message").text("This account already exists! Please enter another email address or login to the existing account.")
          return true;

        } else if (newPassword1 !== newPassword2) {
          $("#error-message").text("Passwords do not match! Please enter a new password.");
          return true;

        } else {
        userRef.push({
            email: newEmail,
            password: $('#new-password1').val(),
            firstName: $('#new-firstname').val(),
            lastName: $('#new-lastname').val(),
            phoneNumber: $('#new-phonenumber').val(),
            city: $('#new-city').val(),
            state: $('#new-state :selected').val(),
            zip: $('#new-zipcode').val()
          }, user.signIn($('#new-email').val(), $('#new-password1').val()));
        }
      })
    })
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

  // Event listener to clear password field on focus and error message in sign in page
  $("#password").on("focus", function() {
    $("#invalid").text("");
    $("#password").val("");
  })

  // Event listener to clear password field on focus of email field in sign in page
  $("#user-email").on("focus", function() {
    $("#password").val("");
  })

  // Event listener to sign users in with email and password credentials from sign in page
  $("#sign-in").on("click", function() {
    var email = $("#user-email").val();
    var password = $("#password").val();

    user.signIn(email, password);
  })

  // Event listener to clear existing account message in account creation page
  $("#new-email").on("focus", function() {
    $("#email-exists").text("");
  })

  // Event listener to clear password fields on focus in account creation page
  $(".data").on("focus", function() {
    $(this).val("");
  })

  // Event listener to create a new user account and to sign in new user from account creation page
  $('#new-user-form').on('submit', user.createAccount);

});
