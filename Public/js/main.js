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

// Creates a new request for assistance
// MISSING jQUERY REFERENCES TO HTML/DOM
// CLICK EVENT BELOW NEEDS POINTER
  Request.prototype.createRequest = function() {
    newUserRequest = new Firebase('https://good-samaritan-cf.firebaseio.com/Request');
    newUserRequest.push({
      key: userObj.key,
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
    console.log("the respondRequest prototype is called");
    var temp = userRequest.requestorID;
    console.log(userRequest.requestorID);
    console.log("the ID is: " + temp);

    var userDataRef = new Firebase('https://good-samaritan-cf.firebaseio.com/User');
    userDataRef.orderByChild("key").equalTo(userRequest.requestorID).on("child_added", function(snapshot){
      var userObj = snapshot.val();
      console.log(userObj);
    });
  };

  // change jQuery to button CLASS search instead of by Id
  $('.button').on('click', function() {
    // console.log("the contact info button works!");
    userRequest.requestorID = this.name;
    console.log("this.name is: " + this.name);
    console.log("the requestor key is: " + userRequest.requestorID);
    userRequest.respondRequest();
  })



  Request.prototype.deactivateRequest = function() {

  };

  renderUserInfo();
  userRequest.renderRequestInfo();

});
