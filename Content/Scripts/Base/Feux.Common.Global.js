// Globals

var Feux = {
  Globals: {
    isMF: document.querySelector('[data-lid-mf]') !== null,
    isLocalhost: location.hostname === 'localhost',
    bodyElem: document.getElementsByTagName('body')[0],
    headerElem: document.getElementsByTagName('header')[0],
    pageWr: document.getElementById('page-wrapper'),
    contentWr: document.getElementById('content-wrapper'),
    asideElem: document.getElementById('primary-aside'),
    mainElem: document.getElementsByTagName('main')[0],
    overlayWrElem: document.getElementById('overlay-wrapper'),
    toastWrElem: document.getElementById('toast-wrapper'),
  },
};

// Return DOM element info as json object

function elementInfo(elId, el) {
  var elem = el ? el : document.getElementById(elId);
  elemId = elId ? elId : elem.id;

  var tag = elem.tagName.toLowerCase();
  tag = elem.getAttribute('multiple') === null ? tag : 'multiSelect';
  var type = tag === 'input' ? elem.getAttribute('type').toLowerCase() : '';
  var info = tag; // select, textarea
  var name = elem.getAttribute('name') ? elem.getAttribute('name') : '';
  var txt = '';
  var val = elem.classList.contains('data-maskformat')
    ? elem.cleanVal()
    : elem.value;

  if (tag === 'input') {
    // text, radio, checkbox, password
    info = type;
  }

  if (tag === 'select') {
    var selectedIndex = elem.selectedIndex;
    var optionList = elem.options;

    if (optionList[selectedIndex]) {
      txt = optionList[selectedIndex].text;
    } else {
      txt = '';
    }
  } else if (info === 'checkbox' || info === 'radio') {
    // Radio or checkboxes always have a label container with a for attribute
    var label = document.querySelectorAll('label[for=' + elemId + ']')[0];
    txt = label === undefined ? '' : label.innerText;
  } else if (tag === 'multiSelect') {
    selectedIndex = elem.selectedIndex;
    optionList = elem.options;
    var multiSelectedElements = [];
    for (var i = 0; i < optionList.length; i++) {
      multiSelectedElements.push(optionList[i].text);
    }
    txt = multiSelectedElements.join('#');
  }

  var elemProps = {
    el: elem,
    id: elemId,
    name: name,
    tag: tag,
    type: type,
    info: info,
    txt: txt,
    val: val,
    isChecked: info === 'checkbox' || info === 'radio' ? elem.checked : 'false',
  };

  return elemProps;
}

// End

// Remove value from javascript array

function arrayRemove(arr, value) {
  return arr.filter(function (item) {
    return item !== value;
  });
}

// End

// Check if Json object is empty

function isJsonEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

// End

// Find matching element by selector (e.g classname, id, data- attribute)

function findAncestor(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
}

// End

// Insert element after a reference

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

// End

// Remove element(s) by class name

function removeElementsByClass(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// End

// Create element from html string

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

// End

// Dynamic function call --> executeFunction(sender, "Feux.Address.setSelectedOnChange", "1|2|3");

function executeFunction(fnName, argArr) {
  if (argArr === undefined) argArr = null;

  var arr = fnName.split('.');
  var fn = window[arr[0]];

  for (var i = 1; i < arr.length; i++) {
    fn = fn[arr[i]];
  }

  // if argArr is not an array, then convert it to an array.
  if (!Array.isArray(argArr)) {
    argArr = [argArr];
  }

  return fn.apply(window, argArr);
}

// End

// Collect values of elements in a sub object by specifing conditions
// e.g --> jsonValListByCondition(data.productLines, "isChecked", true, "val", false, ",").split(',')

function jsonValListByCondition(
  obj,
  propertyName,
  valueToCheck,
  returnedPropertyVal,
  ifValueToCheckNotEmpty,
  listSeparator
) {
  var ret = '';

  for (var i = 0; i < Object.keys(obj).length; i++) {
    var keyName = Object.keys(obj)[i];

    if (obj[keyName][propertyName] === valueToCheck) {
      var elVal = obj[keyName][returnedPropertyVal];

      if (ifValueToCheckNotEmpty) {
        if (
          elVal !== '' &&
          elVal !== '-1' &&
          elVal !== '0' &&
          elVal !== false &&
          elVal !== null
        ) {
          ret += obj[keyName][returnedPropertyVal] + listSeparator;
        }
      } else {
        ret += obj[keyName][returnedPropertyVal] + listSeparator;
      }
    }
  }

  return ret !== '' ? ret.substring(0, ret.length - 1) : '';
}

// End

// Find property (key) name by value

function jsonKeyByValue(obj, valueToCheck) {
  var ret = '';

  for (var key in obj) {
    var keyVal = obj[key];

    if (keyVal === valueToCheck) {
      ret = key;
      break;
    }
  }

  return ret;
}

// End

// Check if an element is hidden

function isHidden(elem, selectorName) {
  if (selectorName === undefined || selectorName === null) selectorName = '';

  var isHidden = false;

  // function can retreive the element directly instead of a selector name
  if (elem === null) {
    elem = document.querySelector(selectorName);
  }

  if (window.getComputedStyle(elem).display === 'none') {
    isHidden = true;
  } else if (window.getComputedStyle(elem).visibility === 'hidden') {
    isHidden = true;
  }

  return isHidden;
}

// End

// Collect form data

function formCollect(arg) {
  var current = arg.current;
  var container = arg.container;
  var buildUrl = arg.buildUrl;
  var dataObj = arg.hasOwnProperty('dataObject')
    ? arg.dataObject
    : current.data;

  // Empty data object.

  // Empty url values.
  if (buildUrl) {
    current.url = {};
  }

  // Loop through specific elements by selector
  var collection = container.querySelectorAll(
    '[data-form-section],' +
      '[data-form-subsection],' +
      '[data-form-subsubsection],' +
      'input,' +
      'select,' +
      'textarea'
  );

  var sectionName = '';
  var subsectionName = '';
  var subsubsectionName = '';
  var concatArr = [];

  // Fill json object with form field properties
  for (var i = 0; i < collection.length; i++) {
    var elem = collection[i];

    // First add form main section
    var isSection = elem.hasAttribute('data-form-section');
    var isSubsection = elem.hasAttribute('data-form-subsection');
    var isSubSubsection = elem.hasAttribute('data-form-subsubsection');

    if (isSection) {
      sectionName = elem.getAttribute('data-form-section');
      subsectionName = '';

      // In some cases, we need to declare the end of a section: data-form-section = "end"
      if (sectionName.toLowerCase() !== 'end') {
        dataObj[sectionName] = {};
      } else {
        sectionName = '';
      }
    } else if (isSubsection) {
      subsectionName = elem.getAttribute('data-form-subsection');

      // In some cases, we need to declare the end of a subsection: data-form-subsection = "end"
      if (subsectionName.toLowerCase() !== 'end') {
        dataObj[sectionName][subsectionName] = {};
      } else {
        subsectionName = '';
      }
    } else if (isSubSubsection) {
      subsubsectionName = elem.getAttribute('data-form-subsubsection');

      // In some cases, we need to declare the end of a subsubsection: data-form-subsubsection = "end"
      if (subsubsectionName.toLowerCase() !== 'end') {
        props.data[sectionName][subsectionName][subsubsectionName] = {};
      } else {
        subsubsectionName = '';
      }
    } else {
      // After assigning new main or sub section, add current element details for each one of them
      if (elem.id) {
        var elInfo = elementInfo(elem.id);
        var currentSection;
        var valueEntered = false;

        // If url needs to be modified for modules like filters.
        if (buildUrl) {
          if (elInfo.info === 'checkbox' || elInfo.info === 'radio') {
            if (elInfo.isChecked) {
              valueEntered = true;
            }
          } else if (elInfo.info === 'text') {
            if (elInfo.val !== '') {
              valueEntered = true;
            }
          } else if (elInfo.info === 'select') {
            if (elInfo.val !== '') {
              valueEntered = true;
            }
          }
        }

        // Add url cluster name if value exists.
        if (valueEntered) {
          // If section name not included yet, add section name as cluster name for url object.
          if (!current.url.hasOwnProperty(sectionName)) {
            current.url[sectionName] = [];
          }

          // Add url value if user provided any input.
          var valueInUrl = '';

          if (elem.hasAttribute('data-url')) {
            valueInUrl = elem.getAttribute('data-url');

            // Check if data-url value is to concat multiple values like custom price range min-max.
            // e.g --> data-url='{"concat":"tbPricerangeMin|tbPricerangeMax","separator":"-","suffix":"tl","type":"pricerange"}'
            if (valueInUrl.contains('concat')) {
              var jsonParsedValue = JSON.parse(valueInUrl);
              var _type = jsonParsedValue['type'];

              // Reset valueInUrl and repopulate.
              valueInUrl = '';

              // For example, price range min-max both elements have concat data urls. We need to check the values of them if any value
              // entered. First check min-price-element to collect data url from both min-max elements. If no values entered
              // concatArr has no data. Then, continue to check max-price-element value. If concatArr has value, no need to check
              // max-pricerange-element value.
              // Therefore, concatArr is used to avoid duplication.
              // This if statemen can be developed for different cases rather than pricerange.

              if (concatArr.indexOf(_type) === -1) {
                concatArr.push(_type);

                var concatElementIds = jsonParsedValue['concat'].split('|');
                var _valueArr = [];

                for (var ce = 0; ce < concatElementIds.length; ce++) {
                  var _element = document.getElementById(concatElementIds[ce]);
                  var _elInfo = elementInfo(_element.id);

                  if (_elInfo.info === 'checkbox' || _elInfo.info === 'radio') {
                    // to be developed!
                  } else if (_elInfo.info === 'text') {
                    _valueArr.push(_elInfo.val);
                  } else if (_elInfo.info === 'select') {
                    // to be developed!
                  }
                }

                // To format url value...
                var separator = jsonParsedValue['separator'];
                valueInUrl = _valueArr.join(separator);

                if (jsonParsedValue.hasOwnProperty('suffix')) {
                  var suffix = jsonParsedValue['suffix'];
                  valueInUrl += jsonParsedValue['suffix'];
                }
                // End formatting.
              }
            }
          }

          // Save current url under section name.
          if (
            valueInUrl !== '' &&
            current.url[sectionName].indexOf(valueInUrl) === -1
          ) {
            current.url[sectionName].push(valueInUrl);
          }
        }

        // Add related section or subsection names.
        if (
          sectionName === '' &&
          subsectionName === '' &&
          subsubsectionName === ''
        ) {
          // If no section name exists
          currentSection = dataObj;
        }
        if (
          sectionName !== '' &&
          subsectionName === '' &&
          subsubsectionName === ''
        ) {
          // Add under section
          currentSection = dataObj[sectionName];
        } else if (subsectionName !== '' && subsubsectionName === '') {
          // Add under subsection
          currentSection = dataObj[sectionName][subsectionName];
        } else if (subsubsectionName !== '') {
          // Add under subsubsection
          currentSection =
            props.data[sectionName][subsectionName][subsubsectionName];
        }

        // Check if element has a specific json item name.
        var elemJsonName = elem.getAttribute('data-form-obj-name');

        currentSection[elemJsonName ? elemJsonName : elem.id] = {
          el: elem,
          id: elem.id,
          name: elInfo.name,
          tag: elInfo.tag,
          type: elInfo.type,
          info: elInfo.info,
          val: elInfo.val,
          txt: elInfo.txt,
          isChecked:
            elInfo.info === 'checkbox' || elInfo.info === 'radio'
              ? elInfo.isChecked
              : false,
        };
      }
    }
  }

  if (buildUrl) {
    // Create url query string
    if (!isJsonEmpty(current.url)) {
      var urlString = '';

      for (var u = 0; u < Object.keys(current.url).length; u++) {
        var clusterName = Object.keys(current.url)[u];
        var clusterValues = current.url[clusterName].join(',');
        urlString += clusterName + ':' + clusterValues + '|';
      }

      current.url['queryString'] = urlString.slice(0, -1);
    }
  }
}

// End

// Clear form elements

function formReset(arg) {
  var container = document.querySelector(arg.selector);
  var tags = ['select', 'input', 'textarea'];

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var elementsByTag = container.getElementsByTagName(tag);

    for (var j = 0; j < elementsByTag.length; j++) {
      var elem = elementsByTag[j];

      if (tag === 'select') {
        elem.selectedIndex = 0;

        //-> For select2 use jquery event
        $(elem).change();
      } else {
        var typeName =
          tag === 'input' ? elem.getAttribute('type').toLowerCase() : '';

        if (typeName === 'checkbox' || typeName === 'radio') {
          //-> Check if a specific reset value (true or false) defined as attribute
          var resetVal = elem.getAttribute('data-default-val');

          if (resetVal) {
            elem.checked = resetVal;
          } else {
            elem.checked = false;
          }
        } else {
          //-> other input and textarea elements
          elem.value = '';
        }
      }
    }
  }

  if (Feux.hasOwnProperty('Validation')) {
    Feux.Validation.Actions.clear({ selector: arg.selector });
  }
}

// End

// Update url query string part

function updateUrlQueryString(arg) {
  var urlString = '';

  if (arg.queryString) {
    urlString += urlString === '' ? '?' : '&';
    urlString += arg.queryStringPrefix + '=' + arg.queryString; // e.g --> // ?flt=renk:mavi,kırmızı|beden:sm
  }

  if (arg.queryString_sort) {
    urlString += urlString === '' ? '?' : '&';
    urlString += arg.queryStringPrefix_sort + '=' + arg.queryString_sort; // e.g --> // ?srt=price:asc
  }

  if (arg.queryString_paging) {
    urlString += urlString === '' ? '?' : '&';
    urlString += arg.queryStringPrefix_paging + '=' + arg.queryString_paging; // e.g --> // ?pg=5
  }

  if (arg.queryString_tbr) {
    urlString += urlString === '' ? '?' : '&';
    urlString += arg.queryStringPrefix_tbr + '=' + arg.queryString_tbr; // e.g --> // ?tbr=dummyTabberId:2
  }

  history.pushState('', '', window.location.href.split('?')[0] + urlString);
}

// End

// Assign form element value

function assignFormElementValue(arg) {
  var el = arg.element;
  var val = arg.value;
  var trigger = arg.trigger;
  var elInfo = elementInfo('', el);

  if (elInfo.info === 'checkbox' || elInfo.info === 'radio') {
    if (trigger) {
      el.click();
    } else {
      el.checked = true;
    }
  } else if (elInfo.info === 'textbox') {
  } else if (elInfo.info === 'select') {
  }
}

// End

// Normalize Türkish culture string

function normalizeString(arg) {
  var value = arg.value;

  var characterArr = [
    'Ç-C',
    'ç-c',
    'Ğ-G',
    'ğ-g',
    'İ-I',
    'ı-i',
    'Ö-O',
    'ö-o',
    'Ş-S',
    'ş-s',
    'Ü-U',
    'ü-u',
  ];

  for (c = 0; c < characterArr.length; c++) {
    var item = characterArr[c].split('-');
    var regex = new RegExp(item[0], 'g');
    value = value.replace(regex, item[1]);
  }

  if (arg.lowercase !== false) {
    value = value.toLowerCase();
  }

  return value;
}

// End

// Get element offset.

function getOffset(selectorName, includeScroll = false) {
  var el = document.querySelector(selectorName);
  const rect = el.getBoundingClientRect();
  var elWidth = el.clientWidth;
  var elHeight = el.clientHeight;

  return {
    top: rect.top + (includeScroll ? window.scrollY : 0),
    right: rect.left + (includeScroll ? window.scrollX : 0) + elWidth,
    bottom: rect.top + (includeScroll ? window.scrollY : 0) + elHeight,
    left: rect.left + (includeScroll ? window.scrollX : 0),
  };
}

// End

// Unwrap element

function unwrap(arg) {
  var parentEl;

  if (arg.isParent) {
    // If currently sent element is the parent element that will be removed.
    parentEl = arg.hasOwnProperty('elSelector')
      ? document.querySelector(arg.elSelector)
      : arg.el;
    var childrenCount = parentEl.children.length;

    // Move all child elements...
    for (var c = 0; c < childrenCount; c++) {
      var childEl = parentEl.children[0];
      parentEl.insertAdjacentElement('beforebegin', childEl);
    }
  } else {
    // If currently sent element is the element that will be unwrapped.
    childEl = arg.hasOwnProperty('elSelector')
      ? document.querySelector(arg.elSelector)
      : arg.el;
    parentEl = childEl.parentNode;
    parentEl.insertAdjacentElement('beforebegin', childEl);
  }

  // remove the empty element
  if (parentEl.parentNode) {
    parentEl.parentNode.removeChild(parentEl);
  }
}

// End

// Is browser IE 11

function isBrowserIE11() {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  return isIE11;
}

// End

// UUID generator

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// End

// IE11 polyfills

if (!String.prototype.contains) {
  String.prototype.contains = function () {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

// End

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

Feux.UX = {
  expand: function (arg) {
    if (arg.hasOwnProperty('ev')) {
      arg.ev.preventDefault();
    }

    // Disable sender to avoid multiple clicks from user.
    var sender = arg.sender;
    if (sender.disabled) {
      return false;
    }
    sender.disabled = true;
    // End

    if (sender.getAttribute('contentId')) {
      //Feux.UX.closeAllOpenExpanders();
    }

    var containerSelectorName = arg.contentId;
    var containerEl = document.querySelector(
      '[data-expand="' + containerSelectorName + '"]'
    );
    var expandIcon = document.querySelector(
      '#expandIcon-' + containerSelectorName + ''
    );
    var expandingContentEl =
      containerEl.getElementsByClassName('expandingContent')[0];
    var contentHeight = expandingContentEl.offsetHeight;
    var isInitOn = containerEl.classList.contains('init-on'); // Is initially on.
    var isExpanded = containerEl.classList.contains('on');
    var senderStyle = arg.senderStyle;
    var parentId = arg.parentId;
    var parentEl = document.getElementById(parentId);

    if (!isExpanded && !isInitOn) {
      containerEl.classList.add('on');
      containerEl.style.height = contentHeight + 'px';

      if (senderStyle === 'rotate') {
        expandIcon.style.transform = 'rotate(180deg)';
        expandIcon.style.transition = 'transform 0.3s';
        sender.classList.add('on');
        if (parentEl) {
          parentEl.classList.add('on');
        }
      } else if (senderStyle === 'change') {
        if (parentEl) {
          parentEl.classList.add('on');
        }
      }

      setTimeout(function () {
        containerEl.style.height = 'auto';
        sender.disabled = false;
      }, 1000);
    } else {
      containerEl.style.height = contentHeight + 'px';

      setTimeout(function () {
        containerEl.style.height = 0;
        containerEl.classList.remove('on');
        containerEl.classList.remove('init-on');
        sender.classList.remove('on');

        if (senderStyle === 'rotate') {
          expandIcon.style.transform = 'rotate(0)';

          if (parentEl) {
            parentEl.classList.remove('on');
          }
        } else if (senderStyle === 'change') {
          if (parentEl) {
            parentEl.classList.remove('on');
          }
        }

        setTimeout(function () {
          sender.disabled = false;
        }, 1000);
      }, 10);
    }
  },

  closeAllOpenExpanders: function (arg) {
    var otherPageEl = document.querySelector('[data-page-class]');
    var otherPageClass = otherPageEl ? true : false;
    var openExpanders = null;
    var openExpander = null;

    if (otherPageClass) {
      otherPageClass = otherPageEl.getAttribute('data-page-class');
      openExpanders = document.querySelectorAll(otherPageClass + '.on');
    } else {
      openExpanders = document.querySelectorAll('.c-item-01.on');
    }

    for (var i = 0; i < openExpanders.length; i++) {
      if (openExpanders[i].getAttribute('contentId')) {
        openExpander = openExpanders[i];
        break;
      }
    }
    if (openExpander) {
      var containerSelectorName = openExpander.getAttribute('contentId');
      var containerEl = document.querySelector(
        '[data-expand="' + containerSelectorName + '"]'
      );
      var expandIcon = document.querySelector(
        '#expandIcon-' + containerSelectorName + ''
      );
      var expandingContentEl =
        containerEl.getElementsByClassName('expandingContent')[0];
      var contentHeight = expandingContentEl.offsetHeight;

      containerEl.style.height = contentHeight + 'px';

      setTimeout(function () {
        containerEl.style.height = 0;
        containerEl.classList.remove('on');
        containerEl.classList.remove('init-on');
        openExpander.classList.remove('on');
        expandIcon.style.transform = 'rotate(0)';
      }, 10);
    }
  },

  DropMenu: {
    show: function (arg) {
      // Disable sender to avoid multiple clicks from user.
      arg.ev.preventDefault();
      var sender = arg.sender;
      if (sender.disabled) {
        return false;
      }
      sender.disabled = true;
      setTimeout(function () {
        sender.disabled = false;
      }, 1000);

      // If sender is active, then hide drop menu.
      var isActiveSender = sender.classList.contains('on');

      if (isActiveSender) {
        Feux.UX.DropMenu.hide();
        return;
      }

      // Get related dropmenu element and display with animation.
      var menuEl = document.getElementById(arg.menuId);
      menuEl.classList.add('on');

      // Display overlay with specific class.
      Feux.Globals.overlayWrElem.classList.add('f-dropmenu-overlay');

      // Move overlay under parentEl.
      var menuParentEl = menuEl.parentNode;
      menuParentEl.insertBefore(
        Feux.Globals.overlayWrElem,
        sender.parentNode.childNodes[0]
      );

      // Show overlay
      setTimeout(function () {
        Feux.Globals.overlayWrElem.classList.add('on');
      }, 10);

      // Add sender an active class
      sender.classList.add('f-dropmenu-sender');
      sender.classList.add('on');

      if (arg.hasOwnProperty('hideOnScroll')) {
        // Add a flag for scrolling event which is used to hide on scroll.
        sender.setAttribute('data-hide-on-scroll', arg.hideOnScroll);
      }
    },

    hide: function () {
      var activeDropMenu = document.querySelector('.f-dropmenu.on');

      if (activeDropMenu) {
        // Hide drop menu.
        activeDropMenu.classList.remove('on');

        // Remove sender active class.
        var senderBtn = document.querySelector('.f-dropmenu-sender.on');
        senderBtn.classList.remove('on');

        // Hide overlay.
        Feux.Globals.overlayWrElem.classList.remove('on');
        setTimeout(function () {
          Feux.Globals.overlayWrElem.classList.remove('f-dropmenu-overlay');
        }, 400);

        // Move overlay back to its original position and hide it.
        setTimeout(function () {
          Feux.Globals.pageWr.insertBefore(Feux.Globals.overlayWrElem, null);
        }, 600);

        // Enable scrolling.
        Feux.Base.Scroll.enable();
      }
    },

    overlayClick: function () {
      Feux.UX.DropMenu.hide();
    },

    resize: function () {
      Feux.UX.DropMenu.hide();
    },

    escKeyPress: function () {
      Feux.UX.DropMenu.hide();
    },

    onScroll: function () {
      // Check if need to hide on scrolling.
      var dropMenuSender = document.querySelector(
        '.f-dropmenu-sender[data-hide-on-scroll=true]'
      );

      if (dropMenuSender) {
        Feux.UX.DropMenu.hide();
      }
    },
  },

  Owl: {
    Props: {
      selector: 'data-owl',
      speed: 300,
      navi: true,
      autoWidth: true,
      margin: 0,
      items: 1,
    },

    Current: {
      isDragging: false,
    },

    Actions: {
      init: function (arg) {
        if (arg === undefined || arg === null) arg = {};

        // Find owl elements.
        var owlSelector = Feux.UX.Owl.Props.selector;
        var owlElements;
        var containerSelector = arg.containerSelector;
        var specificOwlSelector = arg.specificOwlSelector;

        if ('containerSelector' in arg) {
          // If specific container element is requested.
          owlElements = $(containerSelector).find('[' + owlSelector + ']');
          owlElements.each(function (index, owlElem) {
            if ($(owlElem).data('owl.carousel')) {
              $(owlElem).owlCarousel('destroy');
              $(owlElem).owlCarousel({ touchDrag: false, mouseDrag: false });
            }
          });
        } else if ('specificOwlSelector' in arg) {
          // If specific single owl element is requested.
          owlElements = $(specificOwlSelector);
        } else {
          // Get all owl elements.
          owlElements = $('[' + owlSelector + ']');
        }

        // Loop through all owl elements to initiate.
        owlElements.each(function (index, owlElem) {
          // Clone default properties to use as current owl properties.
          var currentProps = JSON.parse(JSON.stringify(Feux.UX.Owl.Props));

          // Retrieve json properties and update current properties. The attribute value can be
          // empty string or just set as 'true'. Therefore, check the length of newPropArg value.
          var newPropArg = $(owlElem).attr(owlSelector);

          if (newPropArg.length > 5) {
            var newProps = JSON.parse($(owlElem).attr(owlSelector));

            for (var key in newProps) {
              currentProps[key] = newProps[key];
            }
          }

          // Retrieve functions to call
          var onDragCallbackFunction = Feux.UX.Owl.Actions.drag;
          var onDraggedCallbackFunction = Feux.UX.Owl.Actions.dragged;
          var onTranslateCallbackFunction = Feux.UX.Owl.Actions.translate;
          var onTranslatedCallbackFunction = Feux.UX.Owl.Actions.translated;

          // Build owl carousel.
          $(owlElem).owlCarousel({
            items: currentProps.items,
            margin: currentProps.margin,
            autoWidth: currentProps.autoWidth,
            navi: currentProps.navi,
            smartSpeed: currentProps.speed,
            onDrag: onDragCallbackFunction,
            onDragged: onDraggedCallbackFunction,
            onTranslate: onTranslateCallbackFunction,
            onTranslated: onTranslatedCallbackFunction,
          });
        });
      },

      drag: function (event) {
        var owlElem = event.currentTarget;
        owlElem.setAttribute('data-drag', 'true');

        // Call custom drag functions.
        var owlSelector = Feux.UX.Owl.Props.selector;
        var argString = owlElem.getAttribute(owlSelector);
        var arg = JSON.parse(argString);

        if (arg.hasOwnProperty('drag')) {
          executeFunction(arg.drag, arg.dragArg);
        }
      },

      dragged: function (event) {
        // Call custom onDragged functions.
        var owlElem = event.currentTarget;
        var owlSelector = Feux.UX.Owl.Props.selector;
        var argString = owlElem.getAttribute(owlSelector);
        var arg = JSON.parse(argString);

        if (arg.hasOwnProperty('dragged')) {
          executeFunction(arg.dragged, arg.draggedArg);
        }
      },

      translate: function (event) {
        var owlElem = event.currentTarget;

        // Call custom onTranslated functions.
        var owlSelector = Feux.UX.Owl.Props.selector;
        var argString = owlElem.getAttribute(owlSelector);
        var arg = JSON.parse(argString);

        if (arg.hasOwnProperty('translate')) {
          executeFunction(arg.translate, arg.translateArg);
        }
      },

      translated: function (event) {
        var owlElem = event.currentTarget;
        owlElem.setAttribute('data-drag', 'false');

        // Call custom onTranslated functions.
        var owlSelector = Feux.UX.Owl.Props.selector;
        var argString = owlElem.getAttribute(owlSelector);
        var arg = JSON.parse(argString);

        if (arg.hasOwnProperty('translated')) {
          executeFunction(arg.translated, arg.translatedArg);
        }
      },
    },
  },

  toggleElem: function (sender, className, parentElemSelector) {
    var parentElem = findAncestor(sender, parentElemSelector);
    parentElem.classList.toggle(className);
  },

  changeClass: function (parentselector, className, targetSelectorNo) {
    document
      .querySelector(parentselector + ' .' + className)
      .classList.remove(className);
    document
      .querySelector(parentselector + " [data-id='" + targetSelectorNo + "']")
      .classList.add(className);
  },
};

// Modal Object

Feux.Modal = {
  Props: {
    wrapperId: 'modal-wrapper',
    contentId: 'modal-content',
    headerId: 'modal-header',
    bodyId: 'modal-body',
    footerId: 'modal-footer',
    closeButtonId: 'modal-close',
    defaultHtml: '',
    queryStringPrefix: 'mdl',
    Animation: {
      // Duration values have to be identically same as css values!
      Modal: {
        Large: {
          duration_on: 500,
          duration_off: 300,
        },

        Small: {
          duration_on: 500,
          duration_off: 300,
        },
      },
      Drawer: {
        Large: {
          duration_on: 750,
          duration_off: 600,
        },

        Small: {
          duration_on: 650,
          duration_off: 450,
        },
      },
    },
  },

  Elements: {},

  Current: {},

  ready: function () {
    // Initiate configuration setup
    Feux.Modal.Actions.init();
  },

  resize: function (arg) {
    Feux.Modal.Actions.closeClick();
  },

  Actions: {
    init: function () {
      var props = Feux.Modal.Props;
      var current = Feux.Modal.Current;
      var elements = Feux.Modal.Elements;

      Feux.Modal.Helper.setCurrent();
      Feux.Modal.Helper.setElements();

      // Save default html which is needed as resetting the modal.
      props.defaultHtml = elements.wrapperEl.innerHTML;

      // Prepare modals by url query string
      Feux.Modal.Actions.prepareByUrl();
    },

    mfInit: function (arg) {
      // If mf is used, add onload attribute to call mfInit function.
      var props = Feux.Modal.Props;
      var current = Feux.Modal.Current;
      var elements = Feux.Modal.Elements;

      Feux.Modal.Helper.setCurrent();
      Feux.Modal.Helper.setElements();

      // Prepare modals by url query string if current mf has a match.
      var modalId = sender.querySelector('[data-modal]');
      Feux.Modal.Actions.prepareByUrl({ mfModalId: modalId });
    },

    show: function (arg) {
      if (arg.hasOwnProperty('ev')) {
        arg.ev.preventDefault();
      }

      // Disable sender to avoid multiple clicks from user.
      var sender = arg.sender;
      if (sender.disabled) {
        return false;
      }
      sender.disabled = true;

      // If owl carousel is dragging, then cancel modal showing.
      var owlCarousel = findAncestor(sender, '.owl-carousel');
      var owlIsDragging = false;

      if (owlCarousel) {
        var owlDragData = owlCarousel.getAttribute('data-drag');
        owlIsDragging = owlDragData ? owlDragData === 'true' : false;

        if (owlIsDragging) {
          sender.disabled = false;
          return false;
        }
      }

      // Disable body scroll.
      Feux.Base.Scroll.disable();

      // Get common short cuts.
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;

      // Set current new properties
      current.submitter = sender;
      current.submitterArg = arg;
      current.contentId = arg.hasOwnProperty('contentId')
        ? arg.contentId
        : sender.getAttribute('data-modal');

      // Set current status.
      current.status = 'showing';

      // Set onClickClose function.
      if (arg.hasOwnProperty('onClickClose')) {
        current.onClickClose.funcname = arg.onClickClose.funcname;
        current.onClickClose.funcarg = arg.onClickClose.funcarg;
      }

      // Get duration value;
      var duration = Feux.Modal.Helper.getDurationValue();

      // Set modal content and css classes
      Feux.Modal.Helper.setContentOn();

      if (arg.hasFilter) {
        // Trigger filter supporting init functions
        Feux.Modal.Helper.initFilters();
        setTimeout(function () {
          Feux.Modal.Helper.initFormPlugins();
        }, 30);
      } else if (arg.hasForm) {
        // Trigger form supporting plug-ins.
        Feux.Modal.Helper.initFormPlugins();
      }

      // Prepare UX
      Feux.Modal.UX.show();

      setTimeout(function () {
        // Update current properties.
        current.state = 'on';
        current.status = 'shown';
        current.submitter.disabled = false;
      }, duration);
    },

    hide: function (arg) {
      if (arg) {
        if (arg.hasOwnProperty('ev')) {
          arg.ev.preventDefault();
        }

        // Disable sender to avoid multiple clicks from user.
        var sender = arg.sender;
        if (sender.disabled) {
          return false;
        }
        sender.disabled = true;

        setTimeout(function () {
          sender.disabled = false;
        }, 100);
      }

      if (Feux.Modal.Current.state === 'on') {
        var props = Feux.Modal.Props;
        var elements = Feux.Modal.Elements;
        var current = Feux.Modal.Current;

        // Set current status.
        current.status = 'hiding';

        // Get duration value;
        var duration = Feux.Modal.Helper.getDurationValue();

        // Prepare UX
        Feux.Modal.UX.hide({ dur: duration });

        setTimeout(function () {
          // Reset modal form.
          formReset({ selector: '#' + props.contentId });

          // Set modal content and css classes
          Feux.Modal.Helper.setContentOff();

          // Update current properties.
          current.state = 'off';
          current.status = 'hidden';
          current.onClickClose.funcname = null;
          current.onClickClose.funcarg = null;

          // Enable body scroll.
          Feux.Base.Scroll.enable();

          if (current.submitter) {
            current.submitter.disabled = false;
          }
        }, duration);
      }
    },

    closeClick: function (arg) {
      if (arg) {
        if (arg.hasOwnProperty('ev')) {
          arg.ev.preventDefault();
        }

        // Disable sender to avoid multiple clicks from user.
        var sender = arg.sender;
        if (sender.disabled) {
          return false;
        }
        sender.disabled = true;
      }

      // Get common short cuts.
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;

      // Set current new properties
      current.submitter = sender;
      current.status = 'hiding';

      // Go to hide action.
      Feux.Modal.Actions.hide();

      // Call on-click-close function if saved in current object
      if (current.onClickClose.funcname) {
        executeFunction(
          current.onClickClose.funcname,
          current.onClickClose.funcarg
        );
      }
    },

    overlayClick: function (arg) {
      if (Feux.Modal.Current.submitterArg.overlay !== false) {
        Feux.Modal.Actions.closeClick({ sender: this });
      }
    },

    escKeyPress: function (arg) {
      if (Feux.Modal.Current.submitterArg.esc !== false) {
        Feux.Modal.Actions.closeClick({ sender: this });

        setTimeout(function () {
          this.disabled = false;
        }, 300);
      }
    },

    prepareByUrl: function (arg) {
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;
      var hasQueryString = window.location.href.indexOf('?') > -1;

      if (hasQueryString) {
        // e.g --> ?mdl=modalDummyId01
        var queryString = window.location.href.split('?')[1];
        var queryStringArr = queryString.split('&');

        for (var q = 0; q < queryStringArr.length; q++) {
          var queryStringItemArr = queryStringArr[q].split('=');
          var queryStringPrefixName = queryStringItemArr[0];

          if (queryStringPrefixName === props.queryStringPrefix) {
            var modalId = queryStringItemArr[1]; // modalDummyId01
            var modalLink = document.querySelector(
              '[data-modal="' + modalId + '"]'
            );

            if (!Feux.Globals.isMF) {
              modalLink.click();
            } else if (Feux.Globals.isMF && modalId === arg.mfModalId) {
              modalLink.click();
            }
          }
        }
      }
    },
  },

  UX: {
    show: function () {
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;

      // Get current modal properties and set clases.
      var arg = current.submitterArg;

      // Show overlay
      Feux.Globals.overlayWrElem.classList.add('on');

      // Set modal wrapper classes.
      elements.wrapperEl.classList.add('on');
      elements.wrapperEl.classList.add('type-' + arg.type);
      elements.wrapperEl.classList.add('size-' + arg.size);

      // If auto height specified, then manipulate styling.
      if (arg.autoheight) {
        // First set auto height.
        elements.wrapperEl.style.height = 'auto';

        // Then get and assign new top value.
        var marginTopValue = elements.wrapperEl.clientHeight / 2;
        var topStyleValue = 'calc(50% - ' + marginTopValue + 'px)';
        elements.wrapperEl.style.top = topStyleValue;
      }

      // Direction class can vary for each media query range
      // Timeout needed for regular modals, to get opacity transition in effect.
      setTimeout(
        function () {
          for (var d = 0; d < arg.dir.length; d++) {
            elements.wrapperEl.classList.add('dir-' + arg.dir[d]);
          }
        },
        arg.type === 'drw' ? 0 : 20
      );

      // Hide modal header if no content exists.
      if (current.contentHeaderEl === null) {
        elements.headerEl.style.display = 'none';
      } else {
        elements.headerEl.removeAttribute('style');
      }

      // Hide modal footer if no content exists.
      if (current.contentFooterEl === null) {
        elements.footerEl.style.display = 'none';
      } else {
        elements.footerEl.removeAttribute('style');
      }
    },

    hide: function (arg) {
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;

      // Hide overlay wrapper element with a short delay.
      setTimeout(function () {
        Feux.Globals.overlayWrElem.classList.remove('on');
      }, parseInt(arg.dur / 2));

      // Hide modal wrapper element.
      elements.wrapperEl.classList.remove('on');

      setTimeout(function () {
        // Remove modal wrapper class and style attribute.
        elements.wrapperEl.removeAttribute('class');
        elements.wrapperEl.removeAttribute('style');
      }, arg.dur);
    },
  },

  Helper: {
    setCurrent: function () {
      Feux.Modal.Current = {
        state: 'off',
        status: 'hidden',
        submitter: null,
        submitterArg: {},
        contentId: '',
        contentEl: null,
        contentHeaderEl: null,
        contentBodyEl: null,
        contentFooterEl: null,
        hasForm: false,
        esc: true,
        overlay: true,
        onClickClose: {
          funcname: null,
          funcarg: null,
        },
      };
    },

    setElements: function () {
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;

      elements.wrapperEl = document.getElementById(props.wrapperId);
      elements.contentEl = document.getElementById(props.contentId);
      elements.headerEl = document.getElementById(props.headerId);
      elements.bodyEl = document.getElementById(props.bodyId);
      elements.footerEl = document.getElementById(props.footerId);
      elements.closeButtonEl = document.getElementById(props.closeButtonId);
    },

    setContentOn: function () {
      var props = Feux.Modal.Props;
      var current = Feux.Modal.Current;
      var elements = Feux.Modal.Elements;

      // Get and set modal content by moving them.
      current.contentEl = document.getElementById(current.contentId);

      current.contentHeaderEl = current.contentEl.querySelector(
        '[data-modal-section = header]'
      );
      if (current.contentHeaderEl) {
        var contentHeaderChildren = current.contentHeaderEl.children;
        while (contentHeaderChildren.length) {
          elements.headerEl.appendChild(contentHeaderChildren[0]);
        }
      }

      current.contentBodyEl = current.contentEl.querySelector(
        '[data-modal-section = body]'
      );
      var contentBodyChildren = current.contentBodyEl.children;
      while (contentBodyChildren.length) {
        elements.bodyEl.appendChild(contentBodyChildren[0]);
      }

      current.contentFooterEl = current.contentEl.querySelector(
        '[data-modal-section = footer]'
      );
      if (current.contentFooterEl) {
        var contentFooterChildren = current.contentFooterEl.children;
        while (contentFooterChildren.length) {
          elements.footerEl.appendChild(contentFooterChildren[0]);
        }
      }

      // Apply css classes on to modal.
      var contentCssClasses = current.contentEl.classList;
      var headerCssClasses = current.contentHeaderEl
        ? current.contentHeaderEl.classList
        : '';
      var bodyCssClasses = current.contentBodyEl.classList;
      var footerCssClasses = current.contentFooterEl
        ? current.contentFooterEl.classList
        : '';

      for (var cc = 0; cc < contentCssClasses.length; cc++) {
        var contentCssClass = contentCssClasses[cc];
        elements.contentEl.classList.add(contentCssClass);
      }

      for (var hc = 0; hc < headerCssClasses.length; hc++) {
        var headerCssClass = headerCssClasses[hc];
        elements.headerEl.classList.add(headerCssClass);
      }

      for (var bc = 0; bc < bodyCssClasses.length; bc++) {
        var bodyCssClass = bodyCssClasses[bc];
        elements.bodyEl.classList.add(bodyCssClass);
      }

      for (var fc = 0; fc < footerCssClasses.length; fc++) {
        var footerCssClass = footerCssClasses[fc];
        elements.footerEl.classList.add(footerCssClass);
      }
    },

    setContentOff: function () {
      var props = Feux.Modal.Props;
      var current = Feux.Modal.Current;
      var elements = Feux.Modal.Elements;

      // Get and set modal content off to default placeholders.
      current.contentEl = document.getElementById(current.contentId);

      current.contentHeaderEl = current.contentEl.querySelector(
        '[data-modal-section = header]'
      );
      if (current.contentHeaderEl) {
        var headerElChildren = elements.headerEl.children;
        while (headerElChildren.length) {
          current.contentHeaderEl.appendChild(headerElChildren[0]);
        }
      }

      current.contentBodyEl = current.contentEl.querySelector(
        '[data-modal-section = body]'
      );
      var bodyElChildren = elements.bodyEl.children;
      while (bodyElChildren.length) {
        current.contentBodyEl.appendChild(bodyElChildren[0]);
      }

      current.contentFooterEl = current.contentEl.querySelector(
        '[data-modal-section = footer]'
      );
      if (current.contentFooterEl) {
        var footerElChildren = elements.footerEl.children;
        while (footerElChildren.length) {
          current.contentFooterEl.appendChild(footerElChildren[0]);
        }
      }

      // Remove custom css classes
      elements.contentEl.removeAttribute('class');
      elements.headerEl.removeAttribute('class');
      elements.bodyEl.removeAttribute('class');
      elements.footerEl.removeAttribute('class');
    },

    getDurationValue: function () {
      // Get common short cuts.
      var props = Feux.Modal.Props;
      var elements = Feux.Modal.Elements;
      var current = Feux.Modal.Current;
      var arg = current.submitterArg;
      var duration;

      if (current.status === 'showing') {
        if (arg.type === 'mdl') {
          if (arg.size === 'lg') {
            duration = props.Animation.Modal.Large.duration_on;
          } else if (arg.size === 'sm') {
            duration = props.Animation.Modal.Small.duration_on;
          }
        } else if (arg.type === 'drw') {
          if (arg.size === 'lg') {
            duration = props.Animation.Drawer.Large.duration_on;
          } else if (arg.size === 'sm') {
            duration = props.Animation.Drawer.Small.duration_on;
          }
        }
      } else if (current.status === 'hiding') {
        if (arg.type === 'drw') {
          if (arg.size === 'lg') {
            duration = props.Animation.Drawer.Large.duration_off;
          } else if (arg.size === 'sm') {
            duration = props.Animation.Drawer.Small.duration_off;
          }
        } else if (arg.type === 'mdl') {
          if (arg.size === 'lg') {
            duration = props.Animation.Modal.Large.duration_off;
          } else if (arg.size === 'sm') {
            duration = props.Animation.Modal.Small.duration_off;
          }
        }
      }

      return duration;
    },

    initFilters: function () {
      Feux.Filter.ready(true);
    },

    initFormPlugins: function () {
      // Run validation rules.
      if (!isJsonEmpty(Feux.Validation)) {
        Feux.Validation.Actions.init();
      }

      // Run select2 setup.
      if (!isJsonEmpty(Feux.Select2)) {
        Feux.Select2.Actions.init({ containerSelector: '#modal-content' });
      }

      // Run mask rules.
      if (!isJsonEmpty(Feux.Mask)) {
        Feux.Mask.Actions.init({ containerSelector: '#modal-content' });
      }

      // Run date picker.
      if (!isJsonEmpty(Feux.DatePicker)) {
        Feux.DatePicker.Actions.init({ containerSelector: '#modal-content' });
      }
    },
  },
};

// End

// Functions to call as DOM ready

Feux.Modal.ready();

// End
