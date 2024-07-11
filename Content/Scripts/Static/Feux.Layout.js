Feux.Layout = {
  Actions: {
    clipBoard: function (arg) {
      var event = arg.ev;
      event.preventDefault();

      var $temp = $('<input>');
      var $url = arg.sender.href;
      $('body').append($temp);
      $temp.val($url).select();
      document.execCommand('copy');
      $temp.remove();
      arg.sender.querySelector('span').innerHTML =
        arg.sender.getAttribute('data-copied-text');

      setTimeout(function () {
        arg.sender.querySelector('span').innerHTML =
          arg.sender.getAttribute('data-copy-text');
      }, 3000);
    },
  },
};

var nRecaptcha;
var iRecaptcha;

var registirationRecaptchaCallback = function (response) {
  if (response !== '') {
    document.querySelector(
      '#registirationRecaptcha div div iframe'
    ).style.border = 'none';
  }
};
var informationRecaptchaCallback = function (response) {
  if (response !== '') {
    document.querySelector(
      '#informationRecaptcha div div iframe'
    ).style.border = 'none';
  }
};

var CaptchaCallback = function () {
  var registirationRecaptcha = document.getElementById(
    'registirationRecaptcha'
  );
  var informationRecaptcha = document.getElementById('informationRecaptcha');
  if (registirationRecaptcha) {
    nRecaptcha = grecaptcha.render('registirationRecaptcha', {
      sitekey: '6LdIUT8pAAAAABJzNE012CTJHkZpXC1euIi4mtPu',
      theme: 'light',
      callback: registirationRecaptchaCallback,
    });
  }
  if (informationRecaptcha) {
    nRecaptcha = grecaptcha.render('informationRecaptcha', {
      sitekey: '6LdIUT8pAAAAABJzNE012CTJHkZpXC1euIi4mtPu',
      theme: 'light',
      callback: informationRecaptchaCallback,
    });
  }
};

var FormActions = {
  checkValidationAndSubmitForm: function (arg) {
    arg.ev.preventDefault();

    // Disable sender to avoid multiple clicks from user.
    var sender = arg.sender;
    if (sender.disabled) {
      return false;
    }
    sender.disabled = true;

    var form = findAncestor(sender, 'form');

    var recaptcha = '.';

    if (form.querySelector('.g-recaptcha').id === 'registirationRecaptcha') {
      recaptcha = grecaptcha.getResponse(nRecaptcha);
    }
    if (form.querySelector('.g-recaptcha').id === 'informationRecaptcha') {
      recaptcha = grecaptcha.getResponse(iRecaptcha);
    }

    if (recaptcha === '') {
      event.preventDefault();
      form.querySelector('.g-recaptcha div div iframe').style.border =
        '1px solid red';
      sender.disabled = false;
      return false;
    }

    var isValid = Feux.Validation.Actions.run({ formEl: form });

    if (!isValid) {
      sender.disabled = false;
      return false;
    }
    debugger;
    form.submit();
  },
};
