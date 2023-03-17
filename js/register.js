function setSuccessMessage(message) {
  let successMessageContainer = $(".success-msg-container");
  let successMessage = $(".success-msg");
  successMessage.text(message);
  successMessageContainer.show();
  setTimeout(function () {
    successMessageContainer.hide();
  }, 5000);
}

function setErrorMessage(message) {
  let errorMessageContainer = $(".err-msg-container");
  let errorMessage = $(".err-msg");
  errorMessage.text(message);
  errorMessageContainer.show();
  setTimeout(function () {
    errorMessageContainer.hide();
  }, 5000);
}

$("#register-form").submit(function (event) {
  event.preventDefault();

  const formData = {
    email: $("#email").val(),
    password: $("#password").val(),
    confirmPassword: $("#confirm-password").val(),
  };
  $.ajax({
    type: "POST",
    url: "../php/register.php",
    data: formData,

    success: function (response) {
      let res = JSON.parse(response);
      console.log(res);
      if (res.status === "success") {
        setSuccessMessage(
          res.message + " You Will Be Redirected to login page....."
        );

        setTimeout(() => {
          window.location.href = "../login.html";
        }, 4000);
      } else {
        setErrorMessage(res.message);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  console.log(formData);
});
