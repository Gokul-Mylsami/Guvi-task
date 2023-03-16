let sessionID;

$(document).ready(function () {
  $("#loading-message").show();
  //check the session is valid or not

  $.ajax({
    type: "POST",
    url: "../php/profile.php",
    data: { action: "valid-session" },
    success: function (response) {
      let res = JSON.parse(response);
      console.log(res);
      if (res.status != "success") {
        window.location.href = "../login.html";
      }
    },
  });

  //get the data
  $.ajax({
    url: "../php/profile.php",
    type: "POST",

    success: function (response) {
      $("#loading-message").hide();
      console.log(response);
    },

    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

let loading = true;

const email = document.querySelector("#email");

$("#logout-button").click(function (e) {
  console.log("Hi");
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "../php/profile.php",
    data: { action: "logout" },
    success: function (response) {
      let res = JSON.parse(response);

      if (res.status == "success") {
        window.location.href = "../login.html";
      }
    },
  });
});
