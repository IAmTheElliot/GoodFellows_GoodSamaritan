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

});
