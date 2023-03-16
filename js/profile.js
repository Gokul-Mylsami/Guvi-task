function setData(data) {
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
    data: { action: "get-data", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      $("#loading-message").hide();
      let res = JSON.parse(response);
      console.log(res);
      setData(res.data[0]);
    },

    error: function (xhr, status, error) {
      console.log(error);
    },
  });

  $(".edit-btn").click(function () {
    $(".view-mode").hide();
    $(".edit-mode").show();
  });

  $(".cancel-btn").click(function () {
    $(".edit-mode").hide();
    $(".view-mode").show();
  });

  $(".save-btn").click(function () {
    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var phone = $("#phone-input").val();

    $(".view-mode")
      .find("p:eq(0)")
      .html("<strong>Name:</strong> " + name);
    $(".view-mode")
      .find("p:eq(1)")
      .html("<strong>Email:</strong> " + email);
    $(".view-mode")
      .find("p:eq(2)")
      .html("<strong>Phone:</strong> " + phone);

    $(".edit-mode").hide();
    $(".view-mode").show();
  });
});

let loading = true;
//logout
$("#logout-button").click(function (e) {
  console.log("Hi");
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
