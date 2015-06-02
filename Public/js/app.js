$(function() {

  function User() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.location = "";
    this.phoneNumber = "";
    this.id = "";
  }

  var user = new User();

  User.prototype.createAccount = function() {

  };

  User.prototype.renderUserInfo = function(info) {
    console.log(info);
  };

  User.prototype.signIn = function(email, password) {
    var self = this;

    var userDataRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User");

    userDataRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      var userObj = snapshot.val();

      if (password === userObj.password) {
        var userData = [];

        userData.push(snapshot.key());
        userData.push(userObj.email);
        userData.push(userObj.password);
        userData.push(userObj.firstName);
        userData.push(userObj.lastName);
        userData.push(userObj.city);
        userData.push(userObj.state);
        userData.push(userObj.zip);
        userData.push(userObj.phoneNumber);

        self.renderUserInfo(userData);
      }
    })
  }

  function Request() {
    this.requestorID = "";
    this.description = "";
    this.isActive = "";
    this.date = "";
  }

  Request.prototype.renderRequestInfo = function() {

  };

  Request.prototype.createRequest = function() {

  };

  Request.prototype.respondRequest = function() {

  };

  Request.prototype.deactivateRequest = function() {

  };

  $("input#sign-in").on("click", function() {
    var email = $("input#user-email").val();
    var password = $("input#password").val();
    user.signIn(email, password);
  })

});
