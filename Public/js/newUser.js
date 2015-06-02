$(function() {


var $newEmail
var $newPassword1
var $newPassword2
var $newFirstName
var $newLastName
var $newPhoneNumber
var $newCity
var $newState
var $newZipCode

$('#new-user-form').on('keypress', function(){
//   console.log("blur from jquery works");
//   console.log($newUserEmail);
  $newEmail = $('#new-email').val();
  $newPassword1 = $('#new-password1').val();
  $newPassword2 = $('#new-password2').val();
  $newFirstName = $('#new-firstname').val();
  $newLastName = $('#new-lastname').val();
  $newPhoneNumber = $('#new-phonenumber').val();
  $newCity = $('#new-city').val();
  $newState = $('#new-state :selected').val();
  $newZipCode = $('#new-zipcode').val();
});

$('#test-button').on('click', function(){
  console.log("test button is clicked!");
  console.log("email: " + $newEmail)
  console.log("password: " + $newPassword1)
  console.log("password: " + $newPassword2)
  console.log("firstName: " + $newFirstName)
  console.log("lastName: " + $newLastName)
  console.log("phoneNumber: " + $newPhoneNumber)
  console.log("city: " + $newCity)
  console.log("state: " + $newState)
  console.log("zip: " + $newZipCode)
});

var newUserURL = new Firebase('https://good-samaritan-cf.firebaseio.com/User');

$('#new-user-form').on('submit', function() {
  newUserURL.push({
    email: $newEmail,
    password: $newPassword1,
    firstName: $newFirstName,
    lastName: $newLastName,
    phoneNumber: $newPhoneNumber,
    city: $newCity,
    state: $newState,
    zip: $newZipCode
  })
});


});
