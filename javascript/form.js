/* Source for POST form: Week 6 lecture-
 * http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html */
document.addEventListener('DOMContentLoaded', postForm);

/* Making a POST request through the form the user will submit in order to
 * schedule an appointment. */
function postForm() {
  document.getElementById("submitForm").addEventListener("click", function(event) {
    var request = new XMLHttpRequest();

    var payload = {
      name: null,
      email: null,
      petName: null,
      petBreed: null,
      grooming: null,
      date: null,
      petInfo: null
    };

    //Adding each value from the form to the payload
    payload.name = document.getElementById("name").value;
    payload.email = document.getElementById("email").value;
    payload.petName = document.getElementById("petName").value;
    payload.petBreed = document.getElementById("petBreed").value;
    payload.grooming = document.getElementById("grooming").value;
    payload.date = document.getElementById("date").value;
    payload.petInfo = document.getElementById("petInfo").value;

    //Sending the data via asynchronous POST to the URL
    request.open("POST", "http://httpbin.org/post", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function() {
      //If request went through
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        console.log(response);

        //Text will appear by submit button if successfully submitted
        document.getElementById("submitMessage").textContent = "Thank you! Your appointment has been scheduled.";
      } else {
        //Could not process form
        console.log("Could not process your request: " + request.statusText);
      }
    });

    //Sending the data
    request.send(JSON.stringify(payload));
    event.preventDefault();
  });
}

/* Source for setting min date for calendar:
 * https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today */
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

//Adds 0 in front of single digit number
if (day < 10) {
  day = '0' + day;
}

//Adds 0 in front of single digit number
if (month < 10) {
  month = '0' + month;
}

today = year + '-' + month + '-' + day;
document.getElementById("date").setAttribute("min", today);