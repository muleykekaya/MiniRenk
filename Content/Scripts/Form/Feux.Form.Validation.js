Feux.Validation = {
    Props: {},

    Actions: {
        init: function () {
            // Changing validator basic behaviours.
            jQuery.validator.setDefaults({
                errorPlacement: function (error, element) {
                    var parentEl = element.parents('.parenterror');
                    parentEl.append(error);

                    // Check if list-validation exists
                    var listContainer = element.parents('.list-validation');
                    if (listContainer) {
                        $(listContainer).addClass('listerror');
                        listContainer.find('input.error').removeClass('error').addClass('no-validation-styling');
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).addClass(errorClass).removeClass(validClass)
                        .parent().addClass("parent" + errorClass).removeClass("parent" + validClass);
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).removeClass(errorClass).addClass(validClass)
                        .parent().removeClass("parent" + errorClass).addClass("parent" + validClass);

                    $(element).parents('.list-validation').removeClass("listerror").addClass("listvalid");

                },
                focusInvalid: false,
                invalidHandler: function (form, validator) {
                    // Scroll to first invalid element if any exists.
                    if (!validator.numberOfInvalids())
                        return;

                    var timerVal = 300;

                    if (Feux.Modal.Current.state === "on") {
                        $('html, body').animate({
                            scrollTop: parseInt($(validator.errorList[0].element).offset().top - 200)
                        }, timerVal);
                    }

                    setTimeout(function () {
                        $(validator.errorList[0].element).focus();
                    }, timerVal);
                }
            });

            $.validator.addMethod(
                'depends',
                function (val, elem) {
                    var ret = true;
                    //validasyonu kontrol edilecek element
                    var senderElemProps = elementInfo(elem.id);

                    //dependent rules
                    var dependent = JSON.parse(elem.getAttribute("data-rule-depends"));

                    //bağımlı olduğu element
                    var dependentElemProps = elementInfo(dependent.dependent_id);

                    var checkElIsValid = false; //bağlı olduğu element işaretlenmiş ise input kontrol edilecek
                    if (dependentElemProps.tag === "select") {
                        if (dependentElemProps.val === dependent.dependent_val) {
                            checkElIsValid = true;
                        }
                    }
                    else if (dependentElemProps.type === "checkbox" || dependentElemProps.type === "radio") {
                        if (dependentElemProps.isChecked) {
                            checkElIsValid = true;
                        }
                    }

                    //bağımlı olduğu element işaretlenmiş ise inputumuzun required kuralını geçip geçmediğine bakıyoruz
                    if (checkElIsValid) {

                        if (senderElemProps.type === "text" || senderElemProps.tag === "textarea" || senderElemProps.tag === "multiSelect" || senderElemProps.tag === "select") {
                            ret = senderElemProps.val !== "";
                        }
                        else if (senderElemProps.type === "checkbox") {
                            ret = senderElemProps.isChecked;
                        }
                        else if (senderElemProps.type === "radio") {
                            var selectedEl = document.querySelector('input[name="' + senderElemProps.name + '"]:checked');
                            ret = selectedEl !== null;
                        }
                    }

                    return ret;
                }, "Zorunlu alan");

            $.validator.addMethod(
                "time24",
                function (value, element) {
                    if (value != '') {
                        if (!/^\d{2}:\d{2}$/.test(value)) return false;
                        var parts = value.split(':');
                        if (parts[0] > 23 || parts[1] > 59) return false;
                    }
                    return true;
                }, "Hatalı çalışma saati");

            $.validator.addMethod(
                'turkishDate',
                function (currVal, element) {
                    if (currVal === '')
                        return false;

                    //Declare Regex  
                    var rxDatePattern = /^(\d{1,2})(\/|-|.)(\d{1,2})(\/|-|.)(\d{4})$/;
                    var dtArray = currVal.match(rxDatePattern);

                    if (!dtArray)
                        return false;

                    //Checks for dd/mm/yyyy format.
                    var dtDay = dtArray[1];
                    var dtMonth = dtArray[3];
                    var dtYear = dtArray[5];
                    var dateRange = $(element).attr('data-year-range').split(':');

                    if (parseInt(dtYear) > parseInt(dateRange[1]) || parseInt(dtYear) < parseInt(dateRange[0])) {
                        return false;
                    }

                    if (dtMonth < 1 || dtMonth > 12)
                        return false;
                    else if (dtDay < 1 || dtDay > 31)
                        return false;
                    else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31)
                        return false;
                    else if (dtMonth === 2) {
                        var isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0));
                        if (dtDay > 29 || (dtDay === 29 && !isleap))
                            return false;
                    }

                    return true;
                }
            );

            $.validator.addMethod(
                'passformat',
                function (currVal, element) {
                    if (currVal === '') {
                        return false;
                    }

                    var rxDatePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[!@#$%^&*+/(),.?"'_:{}|<>=-])[a-zA-Z-!@#$%^&*+/(),.?"':{}|_<>=\d]{8,}$/;
                    var dtArray = currVal.match(rxDatePattern);

                    if (dtArray === null) {
                        return false;
                    }

                    return true;
                }, "Şifre en az 8 karakterden oluşmalıdır ve en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter içermelidir."
            );

            $.validator.addMethod(
                'citizenid',
                function (value, element) {
                    if (value === '') {
                        return false;
                    }
                    debugger;

                    value = value.toString();
                    var isEleven = /^[0-9]{11}$/.test(value);
                    var totalX = 0;
                    for (var i = 0; i < 10; i++) {
                        totalX += Number(value.substr(i, 1));
                    }
                    var isRuleX = totalX % 10 == value.substr(10, 1);
                    var totalY1 = 0;
                    var totalY2 = 0;
                    for (var i = 0; i < 10; i += 2) {
                        totalY1 += Number(value.substr(i, 1));
                    }
                    for (var i = 1; i < 10; i += 2) {
                        totalY2 += Number(value.substr(i, 1));
                    }
                    var isRuleY = ((totalY1 * 7) - totalY2) % 10 == value.substr(9, 0);


                    return isEleven && isRuleX && isRuleY;

                }, "T.C. numarası hatalıdır"
            )

            // Overwriting validator default messages.
            jQuery.extend(jQuery.validator.messages, {
                required: "Zorunlu alan",
                remote: "Please fix this field.",
                email: "Hatalı e-posta adresi",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Geçerli bir sayı giriniz.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                accept: "Please enter a value with a valid extension.",
                maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
                minlength: jQuery.validator.format("Eksik bilgi"),
                rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
                range: jQuery.validator.format("Please enter a value between {0} and {1}."),
                max: jQuery.validator.format("{0} rakamına eşit ya da daha küçük bir değer giriniz."),
                min: jQuery.validator.format("{0} rakamına eşit ya da daha büyük bir değer giriniz."),
                turkishDate: "Geçerli bir tarih giriniz: gg.aa.yyyy"
            });
        },

        run: function (arg) {
            // ReCaptcha check.
            var recaptchaIsValid = Feux.Validation.Actions.reCaptchaCheck();

            // Form jQuery validation check.
            var formEl = arg ? arg.formEl : Feux.Form.Props.formElem;
            var isFormValid = $(formEl).valid();

            // Return boolean flag.
            if (isFormValid && recaptchaIsValid) {
                return true;
            }
            else {
                return false;
            }
        },

        reCaptchaCheck: function () {
            var recaptchaElem = Feux.Form.Props.formElem.querySelector(".lc-recaptcha");
            var recaptchaIsValid = true;

            if (recaptchaElem) {
                Feux.Form.Props.reCaptchaElem = recaptchaElem;
                var recaptchaResponse = grecaptcha.getResponse();

                if (recaptchaResponse === "") {
                    event.preventDefault();
                    grecaptcha.reset();
                    recaptchaIsValid = false;
                    Feux.Form.UX.ReCaptcha.invalid();
                }
                else {
                    Feux.Form.UX.ReCaptcha.valid();
                }
            }

            return recaptchaIsValid;
        },

        clear: function (arg) {
            $(arg.selector).find('.parenterror').each(function (index, elem) {
                $(elem).removeClass('parenterror');
                $(elem).find('label.error').remove();
                $(elem).find('.error').removeClass('error');
            });
        }
    }
}