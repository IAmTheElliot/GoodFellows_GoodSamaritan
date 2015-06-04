$(function() {

  function User() {
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

  var user = new User();

  User.prototype.createAccount = function() {

  };

  User.prototype.signIn = function(email, password) {
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
    $("#user-email").val("");
    $("#password").val("");
  })

  $("#sign-in").on("click", function() {
    var email = $("#user-email").val();
    var password = $("#password").val();

    user.signIn(email, password);
  })

});
