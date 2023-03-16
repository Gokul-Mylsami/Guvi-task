let data;

function setData() {
  $(".view-mode")
    .find("p:eq(0)")
    .html("<strong>Email:</strong> " + data.email);
  $(".view-mode")
    .find("p:eq(1)")
    .html("<strong>DOB:</strong> " + data.dob);
  $(".view-mode")
    .find("p:eq(2)")
    .html("<strong>Age:</strong> " + data.age);
  $(".view-mode")
    .find("p:eq(3)")
    .html("<strong>Contact:</strong> " + data.contact);
}

$(document).ready(function () {
  $("#loading-message").show();
  //check the session is valid or not
  $.ajax({
    type: "POST",
    url: "../php/profile.php",
    data: { action: "valid-session", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      let res = JSON.parse(response);

      if (res.status != "success") {
        window.location.href = "../login.html";
      }
    },
  });

  //get the data
  $.ajax({
    url: "../php/profile.php",
    type: "POST",
    data: { action: "get-data", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      $("#loading-message").hide();
      let res = JSON.parse(response);
      data = res.data[0];
      setData();
    },

    error: function (xhr, status, error) {
      console.log(error);
    },
  });

  $(".edit-btn").click(function () {
    $(".view-mode").hide();
    $(".edit-mode").show();
    $("#email-input").val(data.email);
    $("#dob-input").val(data.dob);
    $("#age-input").val(data.age);
    $("#contact-input").val(data.contact);
  });

  $(".cancel-btn").click(function () {
    $(".edit-mode").hide();
    $(".view-mode").show();
  });

  $(".save-btn").click(function () {
    var email = $("#email-input").val();
    var dob = $("#dob-input").val();
    var age = $("#age-input").val();
    var contact = $("#contact-input").val();

    data = { ...data, dob, age, contact };
    setData();

    //send the updated data
    $.ajax({
      url: "../php/profile.php",
      type: "POST",
      data: { action: "update-data", email, data },
      success: function (response) {
        $("#loading-message").hide();
        console.log(response);
      },

      error: function (xhr, status, error) {
        console.log(error);
      },
    });

    $(".edit-mode").hide();
    $(".view-mode").show();
  });
});

let loading = true;
//logout
$("#logout-button").click(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "../php/profile.php",
    data: { action: "logout", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      let res = JSON.parse(response);

      if (res.status == "success") {
        window.location.href = "../login.html";
      }
    },
  });

  localStorage.removeItem("redisId");
});
