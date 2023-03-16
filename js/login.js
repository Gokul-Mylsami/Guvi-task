$(document).ready(function () {
  console.log("Hi");
  $("#my-form").submit(function (event) {
    event.preventDefault();

    let formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "../php/login.php",
      data: formData,

      success: function (response) {
        let res = JSON.parse(response);
        console.log(res);
        if (res.status == "success") {
          window.location.replace("../profile.html");
          localStorage.setItem("redisId", res.session_id);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown); // log error message to console
      },
    });
  });
});
