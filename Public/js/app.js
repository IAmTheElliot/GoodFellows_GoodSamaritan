$(function() {

  function UserProfile() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.city = "";
    this.state = "";
    this.zip = "";
    this.phoneNumber = "";
    this.key = "";
  }

// Fetches values from newuser.html and pushes them to Firebase to create a new user account
  var user = new UserProfile();


  UserProfile.prototype.createAccount = function() {
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

  UserProfile.prototype.signIn = function(email, password) {
    var userDataRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User");

    userDataRef.once("value", function(snapshot) {
      var userObj = "";

      snapshot.forEach(function(childSnapshot) {
        userObj = childSnapshot.val();

        if (userObj.email === email) {
          if (userObj.password === password) {
            userObj.key = childSnapshot.key();
            sessionStorage.setItem("userStorage", JSON.stringify(userObj));
            location.href = "userProfile.html";
          } else {
            $("#invalid").text("Incorrect password! Please try again.");
          }
          return true;
        } else {
          $("#invalid").text("This account does not exist! Please try again or create a new account.");
        }
      })
    })
  }

  $("#password").on("focus", function() {
    $("#invalid").text("");
    $("#password").val("");
  })

  $("input#user-email").on("focus", function() {
    $("#invalid").text("");
    $("#password").val("");
  })

  $("#sign-in").on("click", function() {
    var email = $("#user-email").val();
    var password = $("#password").val();

    user.signIn(email, password);
  })

  $('#new-user-form').on('submit', user.createAccount);

});
