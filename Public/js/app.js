$(function() {

  function userProfile() {
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

// Fetches values from newuser.html and pushe them to Firebase to create a new user account
  var user = new UserProfile();


  User.prototype.createAccount = function() {
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

  User.prototype.signIn = function(email, password) {
    var userDataRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User");

    // userDataRef.child("email").on("child_added", function(snapshot) {
    //   console.log(snapshot.val());
    // })

    userDataRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      var userObj = snapshot.val();

      if (password === userObj.password) {
        userObj.key = snapshot.key();

        sessionStorage.setItem("userStorage", JSON.stringify(userObj));
        location.href = "userProfile.html";
      } else {
        $("#invalid").text("Incorrect password! Please try again.");
      }
      // } else {
        // $("p#invalid").text("This account does not exist! Please try again or create a new account.");
      // }
    })
  }

  $("#sign-in").on("click", function() {
    var email = $("#user-email").val();
    var password = $("#password").val();
    user.signIn(email, password);
  })

  $("#password").on("focus", function() {
    $("#invalid").text("");
    $("#password").val("");
  })

  // $("input#user-email").on("focus", function() {
  //   $("p#invalid").text("");
  //   $("input#user-email").val("");
  //   $("input#password").val("");
  // })

  $('#new-user-form').on('submit', user.createAccount);

});
