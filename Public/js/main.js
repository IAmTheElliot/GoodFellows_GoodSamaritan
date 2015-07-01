$(function() {

  // "goodSam" object constructor
  function goodSam() {};

  // Creates new instance of "goodSam" object constructor
  var app = new goodSam();

  // Fetches and stores current user data from session storage
  var userData = JSON.parse(sessionStorage.getItem("userStorage"));

  // Renders fetched user data to the page
  goodSam.prototype.renderUser = function() {
    $("#first-name").text("Welcome, " + userData.firstName + "!");
    $("#user-name").text(userData.firstName + " " + userData.lastName);
    $("#user-email").text(userData.email);
    $("#user-phone").text(userData.phoneNumber);
    $("#user-address").text(userData.city + ", " + userData.state + " " + userData.zip);
  };

  // Renders info from requests fetched from the database to separate feeds on the page
  goodSam.prototype.renderRequest = function() {
    var requestRef = new Firebase("https://good-samaritan-cf.firebaseio.com/Request");

    // Filters for active requests
    requestRef.orderByChild("isActive").equalTo(true).on("child_added", function(requestSnapshot) {
      var requestDescription = requestSnapshot.val().description;
      var requestKey = requestSnapshot.key();
      var userKey = requestSnapshot.val().key;

      // Renders user's own requests to the user feed
      if (userKey === userData.key) {
        $("#user-feed").prepend("<p class=" + requestKey + ">" + requestDescription +
          "</p><button id=" + requestKey + " class='deactivateButton " + requestKey + "'>Deactivate</button>" + "<hr class=" + requestKey + ">");

        // Event listener for a user to deactivate requests
        $('#' + requestKey).on('click', function() {
          app.deactivateRequest(requestRef, requestKey);
        });

      // Renders all other requests to the main feed
      } else {
        var userRef = new Firebase("https://good-samaritan-cf.firebaseio.com/User/" + userKey);

        userRef.on("value", function(userSnapshot) {
          $("#main-feed").prepend("<h4 class=" + requestKey + ">" + userSnapshot.val().firstName + " " + userSnapshot.val().lastName +
            "</h4><p class=" + requestKey + ">" + requestDescription +
            "</p><button id=" + requestKey + " class='respondButton " + requestKey + "'>Respond</button>" + "<hr/>");

          // Event listener for a user to respond to a request
          $('#' + requestKey).on('click', function() {
            app.respondRequest(userKey);
          })
        })
      }
    })

    // Removes deactivated requests from the user feed
    requestRef.orderByChild("isActive").equalTo(false).on("child_added", function(requestSnapshot) {
      var requestKey = requestSnapshot.key();

      $("." + requestKey).remove();
    })
  };

  // Creates a new user request and adds it to the database
  goodSam.prototype.createRequest = function() {
    requestRef = new Firebase('https://good-samaritan-cf.firebaseio.com/Request');

    requestRef.push({
      key: userData.key,
      description: $('#request-text').val(),
      isActive: true,
      date: event.timeStamp
    }, function() {
      $('#request-text').val("");
    })
  };

  // Fetches requestor contact info and renders it to the page
  goodSam.prototype.respondRequest = function(key) {
    var userRef = new Firebase('https://good-samaritan-cf.firebaseio.com/User');

    userRef.child(key).on("value", function(snapshot) {
      var contactInfo = snapshot.val();

      if (contactInfo.firstName != "") {
        $('#requestor-name').text(contactInfo.firstName);
      }
      if (contactInfo.lastName != "") {
        $('#requestor-name').append(" " + contactInfo.lastName);
      }
      if (contactInfo.phoneNumber != "") {
        $('#requestor-phone').text(contactInfo.phoneNumber);
      }
      if (contactInfo.email != "") {
        $('#requestor-email').text(contactInfo.email);
      }
      if (contactInfo.city != "") {
        $('#requestor-location').text(contactInfo.city);
      }
      if (contactInfo.state != "") {
        $('#requestor-location').append(", " + contactInfo.state);
      }
      if (contactInfo.zip != "") {
        $('#requestor-location').append(" " + contactInfo.zip);
      }
    });
  };

  // Deactivates a user request
  goodSam.prototype.deactivateRequest = function(ref, key) {
    console.log('hr. ' + key);
    ref.child(key).update({ isActive: false });
    $(('hr.' + key)).remove()
  };

  // Calls methods to render user and request info to the page
  app.renderUser();
  app.renderRequest();

  // Event listener to create a new user request
  $('#new-request-button').on('click', function(e) {
    if ($('#request-text').val() == "" ) {
      e.preventDefault();
      $('#request-error').text("Please enter your help request before submitting!");
    } else {
      e.preventDefault();
      app.createRequest();
    }
  });

  // Event listener to clear new request error message on text field focus
  $('#request-text').on('focus', function() {
    $('#request-error').text("");
  })

  // Event listener to clear user info from session storage upon logout
  $('#log-out').on('click', function() {
    sessionStorage.clear();
  });

  // var menu = $("#contact-info");
  var menu = document.querySelector('.menu');
  var menuPosition = menu.getBoundingClientRect();
  var placeholder = document.createElement('div');
  placeholder.style.width = menuPosition.width + 'px';
  placeholder.style.height = menuPosition.height + 'px';
  var isAdded = false;

  window.addEventListener('scroll', function() {
      if (window.pageYOffset >= menuPosition.top && !isAdded) {
          menu.classList.add('sticky');
          menu.parentNode.insertBefore(placeholder, menu);
          isAdded = true;
          console.log(menuPosition);
      } else if (window.pageYOffset < menuPosition.top && isAdded) {
          menu.classList.remove('sticky');
          menu.parentNode.removeChild(placeholder);
          isAdded = false;
      }
  });




});

