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

  var userRequest = new Request();

  Request.prototype.renderRequestInfo = function() {

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
  $('#button-contact-info').on('click', function() {
    // console.log("the contact info button works!");
    userRequest.requestorID = this.name;
    console.log("this.name is: " + this.name);
    console.log("the requestor key is: " + userRequest.requestorID);
    userRequest.respondRequest();
  })



  Request.prototype.deactivateRequest = function() {

  };


  renderUserInfo();

});
