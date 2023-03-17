let data;

function setData() {
  $(".view-mode")
    .find("p:eq(0)")
    .html("Email: " + data.email);
  $(".view-mode")
    .find("p:eq(1)")
    .html("DOB: " + data.dob);
  $(".view-mode")
    .find("p:eq(2)")
    .html("Age:" + data.age);
  $(".view-mode")
    .find("p:eq(3)")
    .html("Contact:" + data.contact);
}

function showSuccessMessage(message) {
  let successMessageContainer = $(".success-msg-container");
  let successMessage = $(".success-msg");
  successMessage.text(message);
  successMessageContainer.show();
  setTimeout(function () {
    successMessageContainer.hide();
  }, 5000);
}

function showErrorMessage(message) {
  let errorMessageContainer = $(".err-msg-container");
  let errorMessage = $(".err-msg");
  errorMessage.text(message);
  errorMessageContainer.show();
  setTimeout(function () {
    errorMessageContainer.hide();
  }, 5000);
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
        showErrorMessage(
          "Login Again to Continue... You Will Be Redirected...."
        );
        setTimeout(() => {
          window.location.href = "../login.html";
        }, 3000);
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
    var dateString = data.dob;
    var dateParts = dateString.split("-");
    var dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    var formattedDate = dateObj.toISOString().slice(0, 10);
    $("#dob-input").val(formattedDate);
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
    var dobArray = dob.split("-");
    dob = dobArray[2] + "-" + dobArray[1] + "-" + dobArray[0];
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
        showSuccessMessage(res.message + " Redirecting to login page...");

        setTimeout(function () {
          window.location.href = "../login.html";
        }, 3000);
      }
    },
  });

  localStorage.removeItem("redisId");
});
