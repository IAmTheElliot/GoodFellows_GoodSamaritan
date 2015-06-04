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
  };

  var userRequest = new Request();

  Request.prototype.renderRequestInfo = function() {

  };

  Request.prototype.createRequest = function() {

  };

  Request.prototype.respondRequest = function() {
    
  };

  Request.prototype.deactivateRequest = function() {

  };

  var requestRef = new Firebase("https://good-samaritan-cf.firebaseio.com/Request");

  renderUserInfo();

  userRequest.respondRequest();



});
