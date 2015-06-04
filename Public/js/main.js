$(function() {

  function renderUserInfo() {

      $("#first-name").text("Welcome, " + userObj.firstName + "!");
      $("#location").append(userObj.city + ", " + userObj.state);
      $("#email").append(userObj.email);
      $("#phone-number").append(userObj.phoneNumber);
  };

  function Request() {
    this.requestorID = "";
    this.description = "";
    this.isActive = "";
    this.date = "";
  }

  var userObj = JSON.parse(sessionStorage.getItem("userStorage"));

  var userRequest = new Request();

  Request.prototype.renderRequestInfo = function() {
    var requestRef = new Firebase("https://good-samaritan-cf.firebaseio.com/Request");

    requestRef.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
      var activeRequest = snapshot.val();

      if (activeRequest.key === userObj.key) {
        $("#user-feed").prepend("<p class=" + snapshot.key() + ">" + activeRequest.description + 
          "</p><button class=" + snapshot.key() + " name=" + userObj.key + ">Deactivate</button>");
      } else {
        var userRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User/" + activeRequest.key);
        
        userRef.on("value", function(snapshot) {
          $("#other-feed").prepend("<h4 class=" + snapshot.key() + ">" + snapshot.val().firstName + " " + snapshot.val().lastName +
            "</h4><p class=" + snapshot.key() + ">" + activeRequest.description +
            "</p><button class=" + snapshot.key() + " name=" + activeRequest.key + ">Respond</button>");
        })
      }
    })

    requestRef.orderByChild("isActive").equalTo(false).on("child_added", function(snapshot) {
      $("." + snapshot.key()).remove();
    })
  };

  Request.prototype.createRequest = function() {

  };

  Request.prototype.respondRequest = function() {

  };

  Request.prototype.deactivateRequest = function() {

  };

  renderUserInfo();
  userRequest.renderRequestInfo();

});
