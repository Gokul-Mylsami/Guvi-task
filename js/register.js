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
      console.log(response); // log response data to console
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown); // log error message to console
    },
  });
  console.log(formData);
});
