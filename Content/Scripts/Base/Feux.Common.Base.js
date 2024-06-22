// Base Events

Feux.Base = {
  Props: {
    Device: {
      touchDevice: false,
    },
    MediaQ: {
      Curr: {},
    },
    Scroll: {
      status: 'enabled',
      X: {
        lastVal: 0,
        currval: 0,
      },
      Y: {
        lastVal: 0,
        currval: 0,
      },
    },
    Window: {},
  },

  // Functions to call as DOM ready
  ready: function () {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      Feux.Base.Props.Device.touchDevice = true;
    }

    Feux.Base.mediaQ('ready');
    Feux.Base.keypress();
    Feux.Base.resize();
    Feux.Base.Scroll.events();
    Feux.Base.assignBodyClass();
    Feux.Base.microFrontendSetup();
  },

  // Determine page media query value
  mediaQ: function (action) {
    if (action === 'ready') {
      // Retrieve media query ranges
      var xs1Val = document.getElementById('mq-xs1').offsetWidth;
      var xs2Val = document.getElementById('mq-xs2').offsetWidth;
      var sm1Val = document.getElementById('mq-sm1').offsetWidth;
      var sm2Val = document.getElementById('mq-sm2').offsetWidth;
      var mdVal = document.getElementById('mq-md').offsetWidth;
      var lgVal = document.getElementById('mq-lg').offsetWidth;
      var xlVal = document.getElementById('mq-xl').offsetWidth;

      // Remove media query reference container from DOM
      var mqValues = document.getElementById('mq-values');
      Feux.Globals.bodyElem.removeChild(mqValues);

      Feux.Base.Props.MediaQ.Res = {
        xs1: xs1Val,
        xs2: xs2Val,
        sm1: sm1Val,
        sm2: sm2Val,
        md: mdVal,
        lg: lgVal,
        xl: xlVal,
      };
    }

    //-> Retrieve current media query value
    var mqEl = document.createElement('div');
    mqEl.setAttribute('id', 'mq-info');
    Feux.Globals.bodyElem.appendChild(mqEl);
    Feux.Base.Props.MediaQ.Curr.key = jsonKeyByValue(
      Feux.Base.Props.MediaQ.Res,
      mqEl.offsetWidth
    );
    Feux.Base.Props.MediaQ.Curr.val = mqEl.offsetWidth;
    Feux.Globals.bodyElem.removeChild(mqEl);
  },

  // Declaring functions to call on key pressing
  keypress: function () {
    window.onkeyup = function (event) {
      // Disable sender to avoid multiple clicks from user.
      var sender = this;
      if (sender.disabled) {
        return false;
      }
      sender.disabled = true;

      // After a while enable it again
      setTimeout(function () {
        sender.disabled = false;
      }, 1000);

      // Get key code.
      var keyCode = event.which || event.keyCode;

      // Hide modal if esc key pressed.
      if (keyCode === 27) {
        if (Feux.Modal) {
          if (Feux.Modal.Current.state === 'on') {
            Feux.Modal.Actions.escKeyPress();
          }
        }

        if (Feux.Search) {
          if (Feux.Search.Current.state === 'on') {
            Feux.Search.Actions.escKeyPress();
          }
        }

        if (Feux.UX.DropMenu) {
          Feux.UX.DropMenu.escKeyPress();
        }
      }
    };
  },

  // Declaring functions to call on resizing
  resize: function () {
    if (!Feux.Base.Props.Device.touchDevice) {
      window.onresize = function (event) {
        // Reset components on being resizing.

        if (Feux.Toast) {
          Feux.Toast.resize();
        }
        if (Feux.Modal) {
          Feux.Modal.resize();
        }
        if (Feux.UX.DropMenu) {
          Feux.UX.DropMenu.resize();
        }
        if (Feux.OpenMenu) {
          Feux.OpenMenu.resize();
        }

        // Check if window is being resizing or resized finished already.
        // Then call functions once resizing finished.
        if (Feux.CurrentPage) {
          if (typeof Feux.CurrentPage.resizeEvents === 'function') {
            Feux.CurrentPage.resizeEvents();
          }
        }

        if (Feux.Base.Props.Window.resizing !== null) {
          clearTimeout(Feux.Base.Props.Window.resizing);
        }

        Feux.Base.Props.Window.resizing = setTimeout(function () {
          // Reset components.
          if (Feux.Toast) {
            Feux.Toast.resize({
              isOrientationChange: false,
              resizeCompleted: true,
            });
          }

          if (Feux.Modal) {
            Feux.Modal.resize({
              isOrientationChange: false,
              resizeCompleted: true,
            });
          }
        }, 200);

        // Setting up new media query value
        Feux.Base.mediaQ('resize');
      };
    } else if (Feux.Base.Props.Device.touchDevice) {
      window.onorientationchange = function (event) {
        // Reset components on being resizing.
        if (Feux.Toast) {
          Feux.Toast.resize();
        }
        if (Feux.Modal) {
          Feux.Modal.resize();
        }
        if (Feux.UX.DropMenu) {
          Feux.UX.DropMenu.resize();
        }

        // Check if window orientation change finished already.
        // Then call functions once orientation changes is finished.

        if (Feux.Base.Props.Window.resizing !== null) {
          clearTimeout(Feux.Base.Props.Window.resizing);
        }

        Feux.Base.Props.Window.resizing = setTimeout(function () {
          // Reset components on resizing completed.
          if (Feux.Toast) {
            Feux.Toast.resize({
              isOrientationChange: true,
              resizeCompleted: true,
            });
          }
          if (Feux.Modal) {
            Feux.Modal.resize({
              isOrientationChange: true,
              resizeCompleted: true,
            });
          }

          // Setting up new media query value
          Feux.Base.mediaQ('orientationchange');
        }, 200);
      };
    }
  },

  // Declaring functions those are scrolling related
  Scroll: {
    events: function () {
      window.onscroll = function (event) {
        if (window.pageYOffset > 0) {
          Feux.Globals.bodyElem.classList.add('f-scrolled');
        } else {
          Feux.Globals.bodyElem.classList.remove('f-scrolled');
        }

        if (Feux.UX.DropMenu && Feux.UX.DropMenu.onScroll) {
          Feux.UX.DropMenu.onScroll();
        }

        if (Feux.Animation) {
          Feux.Animation.scrollEvents();
        }

        if (Feux.ContentConsumption) {
          Feux.ContentConsumption.Actions.onScroll();
        }

        // Check if CurrentPage obj exists. If exists,
        // call CurrentPage related scrolling events.
        if (!isJsonEmpty(Feux.CurrentPage)) {
          if (typeof Feux.CurrentPage.scrollEvents === 'function') {
            Feux.CurrentPage.scrollEvents();
          }
        }
      };
    },

    enable: function (arg) {
      Feux.Globals.bodyElem.classList.remove('noscroll');
      Feux.Globals.bodyElem.removeAttribute('style');
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, Feux.Base.Props.Scroll.Y.currval);
      Feux.Base.Props.Scroll.status = 'enabled';

      setTimeout(function () {
        document.documentElement.removeAttribute('style');
      }, 10);
    },

    disable: function () {
      Feux.Globals.bodyElem.style.top =
        -Feux.Base.Props.Scroll.Y.currval + 'px';
      Feux.Globals.bodyElem.classList.add('noscroll');
      Feux.Base.Props.Scroll.status = 'disabled';
    },

    top: function (arg) {
      if (arg) {
        var topvalue = arg.topvalue;
      } else {
        topvalue = 0;
      }

      window.scrollTo({ top: topvalue, behavior: 'smooth' });
    },
  },

  // Add class for body tag in layout view when needed
  assignBodyClass: function () {
    var classNames = Feux.Globals.mainElem.getAttribute('data-body-class');

    if (classNames) {
      var classNameArr = classNames.split(' ');
      for (var i = 0; i < classNameArr.length; i++) {
        Feux.Globals.bodyElem.classList.add(classNameArr[i]);
      }
    }
  },

  // Trigger sub functions as overlay clicked.
  overlayClick: function (arg) {
    // Disable sender to avoid multiple clicks from user.
    var sender = arg.sender;
    if (sender.disabled) {
      return false;
    }
    sender.disabled = true;

    // After a while enable it again
    setTimeout(function () {
      sender.disabled = false;
    }, 1000);

    if (Feux.Modal) {
      if (Feux.Modal.Current.state === 'on') {
        Feux.Modal.Actions.overlayClick(arg);
      }
    }

    if (Feux.Search) {
      if (Feux.Search.Current.state === 'on') {
        Feux.Search.Actions.overlayClick(arg);
      } else {
        Feux.Search.Actions.closeClick();
      }
    }

    if (Feux.UX.DropMenu) {
      Feux.UX.DropMenu.overlayClick();
    }
  },

  // Setup micro-frontend sections
  microFrontendSetup: function (arg) {
    if (Feux.Globals.isMF) {
      var microFrontendSections;

      if (typeof arg === 'undefined') {
        microFrontendSections = document.querySelectorAll('[data-lid-mf]');
      } else {
        microFrontendSections = arg.mfElements;
      }

      var xhr = [];

      for (var i = 0; i < microFrontendSections.length; i++) {
        (function (i) {
          var mfElem = microFrontendSections[i];
          var lid_mf_path = mfElem.getAttribute('data-lid-mf');

          xhr[i] = new XMLHttpRequest();
          xhr[i].open('GET', lid_mf_path, true);
          xhr[i].onreadystatechange = function () {
            if (xhr[i].readyState === XMLHttpRequest.DONE) {
              var status = xhr[i].status;

              if (status === 0 || status === 200) {
                // Replace inner html of current mf element.
                mfElem.innerHTML = xhr[i].responseText;

                // Trigger js init function related to current mf element.
                var onloadFunc = mfElem.getAttribute('data-mf-onload');

                // Get inner mfElem if exists.
                var microFrontendInnerSections =
                  mfElem.querySelectorAll('[data-lid-mf]');

                if (microFrontendInnerSections.length > 0) {
                  Feux.Base.innerMicroFrontendSetup({
                    mfSections: microFrontendInnerSections,
                  });
                }

                // Unwrap mf html, and remove mf container.
                unwrap({ isParent: true, el: mfElem });

                if (onloadFunc) {
                  var fnJsonObj = JSON.parse(onloadFunc);
                  var fnName = fnJsonObj.name;
                  var fnArgArr = fnJsonObj.arg;

                  executeFunction(fnName, fnArgArr);
                }

                // If all mf sections reached, call component init functions.
                if (i + 1 === microFrontendSections.length) {
                  setTimeout(function () {
                    // Call page specific functions.
                    if (typeof Feux.MF !== 'undefined') {
                      Feux.MF.callback();
                    }
                  }, 10);
                }
              }
            }
          };
          xhr[i].send();
        })(i);
      }
    }
  },

  // Setup micro-frontend sections
  innerMicroFrontendSetup: function (arg) {
    var microFrontendInnerSections = arg.mfSections;
    var xhr = [];

    for (var i = 0; i < microFrontendInnerSections.length; i++) {
      (function (i) {
        var mfElem = microFrontendInnerSections[i];
        var lid_mf_path = mfElem.getAttribute('data-lid-mf');

        xhr[i] = new XMLHttpRequest();
        xhr[i].open('GET', lid_mf_path, true);
        xhr[i].onreadystatechange = function () {
          if (xhr[i].readyState === XMLHttpRequest.DONE) {
            var status = xhr[i].status;

            if (status === 0 || status === 200) {
              // Replace inner html of current mf element.
              mfElem.innerHTML = xhr[i].responseText;

              // Trigger js init function related to current mf element.
              var onloadFunc = mfElem.getAttribute('data-mf-onload');

              // Unwrap mf html, and remove mf container.
              unwrap({ isParent: true, el: mfElem });

              if (onloadFunc) {
                var fnJsonObj = JSON.parse(onloadFunc);
                var fnName = fnJsonObj.name;
                var fnArgArr = fnJsonObj.arg;

                executeFunction(fnName, fnArgArr);
              }
            }
          }
        };
        xhr[i].send();
      })(i);
    }
  },
};

// End

// Functions to call as DOM ready

Feux.Base.ready();

// End
