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
        if (res.status == "success") {
          console.log(res.session_id);
          localStorage.setItem("redisId", res.session_id);

          if (localStorage.getItem("redisId") != null) {
            window.location.href = "../profile.html";
          }
        } else {
          console.log(res.message);
          showErrorMessage(res.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });
});
