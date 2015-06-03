$(function() {

  function UserProfile() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.location = "";
    this.phoneNumber = "";
    this.id = "";
  }

  var user = new UserProfile();

// Fetches values from newuser.html and pushe them to Firebase to create a new user account
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



  UserProfile.prototype.renderUserInfo = function(info) {
    console.log(info);
  };

  UserProfile.prototype.signIn = function(email, password) {
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
    this.requestorId = "";
    this.description = "";
    this.isActive = "";
    this.date = "";
  }

  Request.prototype.renderRequestInfo = function() {

  };

// Creates a new request for assistance
// MISSING jQUERY REFERENCES TO HTML/DOM
// CLICK EVENT BELOW NEEDS POINTER
  Request.prototype.createRequest = function() {
    newUserRequest = new Firebase('https://good-samaritan-cf.firebaseio.com/Request');
    newUserRequest.push({
      requestorId: "test id goes here",
      description: "$('#requestorIDhere').val()",
      isActive: true,
      date: event.timeStamp
    }, console.log("createRequest has been pushed to firebase"))
  };

// saved sample code for using moment() to return timestamp to viewable date
/*  $('#test-button').on('click', function(){
    var dateVar = event.timeStamp;
    console.log(event.timeStamp);
    console.log(moment());
    console.log(moment(1433292533519));
    console.log(moment(dateVar));
  })
*/


  Request.prototype.respondRequest = function() {

  };

  Request.prototype.deactivateRequest = function() {

  };

  $("input#sign-in").on("click", function() {
    var email = $("input#user-email").val();
    var password = $("input#password").val();
    user.signIn(email, password);
  })

  $('#new-user-form').on('submit', user.createAccount);

  // $('#CREATENEWREQUESTNAMEHERE').on('submit', user.createRequest);
  $('#test-button').on('click', Request.createRequest);

});
