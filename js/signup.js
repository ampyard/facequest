function registrationSuccess(data, textStatus, jqXHR) {
  $('#registration-result').html("<font color='green'>Thanks for registering to get FaceQuest&trade; BETA.  We'll take a   look at your application and send you an email with the next steps.  Typical wait time is one day.</font>");
  $('#registration-result').show();
  grecaptcha.reset();
}

function notificationCallback(data, textStatus, jqXHR) {
  $('#notifyme-result').html("<font color='green'>Thanks for your interest in FaceQuest&trade; BETA. You will receive an email once we are ready to support non Gmail addresses.</font>");
  $('#notifyme-result').show();
}

function registrationFailure(jqXHR, textStatus, errorThrown) {
  $('#registration-result').html("<font color='red'> " + jqXHR.responseJSON.message + "</font>");
  $('#registration-result').show();
   grecaptcha.reset();
}


function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function IsGmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@gmail.com$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function validateForm() {
  var emailValue = $('#gmail').val();
  var firstNameValue = $('#firstName').val();
  var lastNameValue = $('#lastName').val();
  if (IsGmail(emailValue)) {
    if(firstNameValue === "" || lastNameValue === ""){
      $('#registration-result').html("<font color='red'> Both first name and last name need to be filled.</font>");
      $('#registration-result').show();
      return false;
    }
    return true;
  } else {
    $('#registration-result').html("<font color='red'> Note: At the moment, FaceQuest&trade; supports only Gmail users. Please drop your email address in the 'Not a Gmail user' section.</font>");
    $('#registration-result').show();
    return false;
  }
}

function validateNotificationForm() {
  var emailValue = $('#MERGE0').val();
  if (IsEmail(emailValue)) {
    return true;
  } else {
    $('#notifyme-result').html("<font color='red'> Invalid email address </font>");
    $('#notifyme-result').show();
    return false;
  }
}


$('#signup-button').click(function() {
  if (validateForm()) {
    $.ajax({
      type: "POST",
      url: "https://app.facequest.io/api/v1/register",
      data: {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#gmail').val(),
        "g-recaptcha-response": grecaptcha.getResponse()
      },
      success: registrationSuccess,
      error: registrationFailure
    });
  }
})

$('#notifyme-button').click(function() {
  if (validateNotificationForm()) {
    $.ajax({
      type: "POST",
      url: "https://facequest.us19.list-manage.com/subscribe/post",
      data: {
          u: $('#u').val(),
          id: $('#id').val(),
          MERGE0: $('#MERGE0').val(),
          action: "submit"
      },
      error: notificationCallback
    });
  }
});
