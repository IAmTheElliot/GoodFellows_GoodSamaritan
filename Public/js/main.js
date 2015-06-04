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

    requestRef.orderByChild("isActive").equalTo(true).on("child_added", function(requestSnapshot) {
      var activeRequest = requestSnapshot.val();

      if (activeRequest.key === userObj.key) {
        $("#user-feed").prepend("<p class=" + requestSnapshot.key() + ">" + activeRequest.description +
          "</p><button class=" + requestSnapshot.key() + " name=" + userObj.key + ">Deactivate</button>");
      } else {
        var userRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User/" + activeRequest.key);

        userRef.on("value", function(userSnapshot) {
          $("#other-feed").prepend("<h4 class=" + requestSnapshot.key() + ">" + userSnapshot.val().firstName + " " + userSnapshot.val().lastName +
            "</h4><p class=" + requestSnapshot.key() + ">" + activeRequest.description +
            "</p><button class=" + requestSnapshot.key() + " name=" + activeRequest.key + ">Respond</button>");
        })
      }
    })

    requestRef.orderByChild("isActive").equalTo(false).on("child_added", function(snapshot) {
      $("." + snapshot.key()).remove();
    })
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

  renderUserInfo();
  userRequest.renderRequestInfo();

});
