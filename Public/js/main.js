$(function() {

  function renderUserInfo() {

      var userObj = JSON.parse(sessionStorage.getItem("userStorage"));

      $("#first-name").text("Welcome, " + userObj.firstName + "!");
      $("#location").append(userObj.city + ", " + userObj.state);
      $("#email").append(userObj.email);
      $("#phone-number").append(userObj.phoneNumber);
      console.log();
  };

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


  renderUserInfo();

});
