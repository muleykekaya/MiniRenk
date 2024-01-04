// Search Object

Feux.Toast = {
    Props: {
    },

    Settings: {
        position: {
            xs: 'tr',
            sm: 'tr',
            md_lg: 'tr'
        },
        autoHide: true,
        closeButton: true,
        animationType: 'fade',
        animationDuration_on: 500,
        animationDuration_off: 300,
        displayTime: 7000,
        templateHtml: '<div class="t-icon"></div>' +
            '<div class="t-description">' +
            '<h6 class="t-title"></h6>' +
            '<p class="t-explanation"></p>' +
            '</div>' +
            '<a href="#" onclick="Feux.Toast.Actions.hide({ ev: event, sender: this });" class="t-close"></a>'
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Feux.Toast.Actions.init();
    },

    resize: function (arg) {
        var isOrientationChange = arg ? arg.isOrientationChange : false;
        var isResizeCompleted = arg ? arg.resizeCompleted : false;

        // Initiate configuration setup 
        if (isResizeCompleted) {
            // Set default positionings.
            Feux.Toast.Helper.setPositioning();
        }
    },

    Actions: {
        init: function () {
            Feux.Toast.Helper.setCurrent();
            Feux.Toast.Helper.setElements();

            // Set animation.
            Feux.Toast.Helper.setAnimationType();

            // Set default positionings.
            Feux.Toast.Helper.setPositioning();
        },

        mfInit: function (arg) {

        },

        show: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            var sender = arg.sender;
            if (sender) {
                if (sender.disabled) { return false; }
                sender.disabled = true;
                setTimeout(function () { sender.disabled = false; }, 200);
            }

            // Set positionings
            Feux.Toast.Helper.suppressPositioning(arg);

            // Append new toast element
            var toastEl = Feux.Toast.Helper.createToastElement(arg);

            // Animate new toast element
            Feux.Toast.UX.showAndAnimate(toastEl);
        },

        hide: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            var sender = arg.sender;
            if (sender) {
                if (sender.disabled) { return false; }
                sender.disabled = true;
                setTimeout(function () { sender.disabled = false; }, 200);
            }

            var toastEl = sender.parentNode;
            Feux.Toast.UX.hideAndRemove({ toastEl: toastEl });
        }
    },

    UX: {
        showAndAnimate: function (toastEl) {
            var current = Feux.Toast.Current;
            var settings = current.Settings;

            // Display wrapper.
            Feux.Globals.toastWrElem.classList.add('on');

            if (settings.animationType === "fade") {
                // Displaying transition.
                toastEl.style.transition = "opacity " + (settings.animationDuration_on / 1000) + "s";

                setTimeout(function () {
                    toastEl.classList.add('on');
                }, 20);

                setTimeout(function () {
                    Feux.Toast.UX.hideAndRemove({ toastEl: toastEl });
                }, settings.displayTime);
            }
        },

        hideAndRemove(arg) {
            var current = Feux.Toast.Current;
            var settings = current.Settings;
            var toastEl = arg.toastEl;


            // Hiding transition.
            toastEl.style.transition = "opacity " + (settings.animationDuration_off / 1000) + "s";

            setTimeout(function () {
                // Off animation.
                toastEl.classList.remove('on');

                // Remove from DOM after off-animation is completed
                setTimeout(function () {
                    toastEl.remove();
                }, settings.animationDuration_off + 50);
            }, 20);
        }
    },

    Helper: {
        setCurrent: function () {
            Feux.Toast.Current = {
                state: 'off',
                status: '',
                submitter: null,
                submitterArg: {},
                Settings: Feux.Toast.Settings
            };
        },

        setElements: function () {
        },

        setAnimationType: function (arg) {
            var current = Feux.Toast.Current;
            var settings = current.Settings;

            if (settings.animationType === "fade") {
                Feux.Globals.toastWrElem.setAttribute("data-animation", "fade");
            }
        },

        setPositioning: function (arg) {
            var current = Feux.Toast.Current;
            var settings = current.Settings;

            // Remove existing classes.
            Feux.Globals.toastWrElem.setAttribute("class", "");

            // Get current media query.
            var currentMediaQuery = Feux.Base.Props.MediaQ.Curr.key;

            // Set default positionings.
            if (currentMediaQuery === "xs1" || currentMediaQuery === "xs2") {
                Feux.Globals.toastWrElem.classList.add("toast-default-xs-" + settings.position.xs);
            }
            else if (currentMediaQuery === "sm1" || currentMediaQuery === "sm2") {
                Feux.Globals.toastWrElem.classList.add("toast-default-sm-" + settings.position.sm);
            }
            else if (currentMediaQuery === "md" || currentMediaQuery === "lg") {
                Feux.Globals.toastWrElem.classList.add("toast-default-mdlg-" + settings.position.md_lg);
            }
        },

        suppressPositioning: function (arg) {
            var props = Feux.Toast.Props;
            var elements = Feux.Toast.Elements;
            var current = Feux.Toast.Current;
            var settings = current.Settings;

            // Remove existing non-default classes.
            var classNameList = Feux.Globals.toastWrElem.classList;
            var defaultClassNameList = [];

            for (var c = 0; c < classNameList.length; c++) {
                var className = classNameList[c];
                if (className.contains('-default-')) {
                    defaultClassNameList.push(className);
                }
            }

            // Newly assign class attribute.
            Feux.Globals.toastWrElem.setAttribute("class", defaultClassNameList.join(" "));

            // Suppresses default positionings.
            for (const property in arg.pos) {
                Feux.Globals.toastWrElem.classList.add("toast-" + property + "-" + arg.pos[property]);
            }
        },

        createToastElement: function (arg) {
            var current = Feux.Toast.Current;
            var settings = current.Settings;

            // Create new toast element.
            var toastEl = document.createElement("div");

            if (arg.itemClass) {
                // If special classes specified, add them.
                toastEl.setAttribute('class', 'toast-item  toast-' + arg.type + " " + arg.itemClass.join(" "));
            }
            else {
                // If no special classes specified, then add only item class.
                toastEl.setAttribute('class', 'toast-item toast-' + arg.type);
            }

            toastEl.innerHTML = settings.templateHtml;
            toastEl.querySelector('.t-title').innerHTML = arg.title;

            // If explanation does not exist, then remove it's container.
            if (arg.hasOwnProperty("expl")) {
                toastEl.querySelector('.t-explanation').innerHTML = arg.expl;
            }
            else {
                toastEl.querySelector('.t-explanation').remove();
            }

            // Append toast element.
            Feux.Globals.toastWrElem.appendChild(toastEl);

            // Return toast element.
            return toastEl;
        }
    }
};

// End

// Functions to call as DOM ready

Feux.Toast.ready();

// End