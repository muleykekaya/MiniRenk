// Return DOM element info as json object

function elementInfo(elId, el) {
    var elem = el ? el : document.getElementById(elId);
    elemId = elId ? elId : elem.id;

    var tag = elem.tagName.toLowerCase();
    tag = (elem.getAttribute('multiple') === null ? tag : 'multiSelect');
    var type = (tag === 'input' ? elem.getAttribute("type").toLowerCase() : '');
    var info = tag; // select, textarea
    var name = (elem.getAttribute("name") ? elem.getAttribute("name") : '');
    var txt = '';
    var val = (elem.classList.contains('data-maskformat') ? elem.cleanVal() : elem.value);

    if (tag === 'input') { // text, radio, checkbox, password
        info = type;
    }

    if (tag === 'select') {
        var selectedIndex = elem.selectedIndex;
        var optionList = elem.options;

        if (optionList[selectedIndex]) {
            txt = optionList[selectedIndex].text;
        }
        else {
            txt = "";
        }
    }
    else if (info === "checkbox" || info === "radio") {
        // Radio or checkboxes always have a label container with a for attribute 
        var label = document.querySelectorAll('label[for=' + elemId + ']')[0];
        txt = label === undefined ? "" : label.innerText;
    }
    else if (tag === 'multiSelect') {
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
        isChecked: (info === "checkbox" || info === "radio" ? elem.checked : 'false')
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
        if (obj.hasOwnProperty(key))
            return false;
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
                while (--i >= 0 && matches.item(i) !== this)
                    return i > -1;
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

function jsonValListByCondition(obj, propertyName, valueToCheck, returnedPropertyVal, ifValueToCheckNotEmpty, listSeparator) {
    var ret = '';

    for (var i = 0; i < Object.keys(obj).length; i++) {
        var keyName = Object.keys(obj)[i];

        if (obj[keyName][propertyName] === valueToCheck) {
            var elVal = obj[keyName][returnedPropertyVal];

            if (ifValueToCheckNotEmpty) {
                if (elVal !== "" && elVal !== "-1" && elVal !== "0" && elVal !== false && elVal !== null) {
                    ret += obj[keyName][returnedPropertyVal] + listSeparator;
                }
            }
            else {
                ret += obj[keyName][returnedPropertyVal] + listSeparator;
            }
        }
    }

    return (ret !== '' ? ret.substring(0, ret.length - 1) : '');
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

    if (window.getComputedStyle(elem).display === "none") {
        isHidden = true;
    }
    else if (window.getComputedStyle(elem).visibility === "hidden") {
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
    var dataObj = arg.hasOwnProperty("dataObject") ? arg.dataObject : current.data;

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
        'textarea');

    var sectionName = "";
    var subsectionName = "";
    var subsubsectionName = "";
    var concatArr = [];

    // Fill json object with form field properties
    for (var i = 0; i < collection.length; i++) {
        var elem = collection[i];

        // First add form main section
        var isSection = elem.hasAttribute("data-form-section");
        var isSubsection = elem.hasAttribute("data-form-subsection");
        var isSubSubsection = elem.hasAttribute("data-form-subsubsection");

        if (isSection) {
            sectionName = elem.getAttribute("data-form-section");
            subsectionName = '';

            // In some cases, we need to declare the end of a section: data-form-section = "end"
            if (sectionName.toLowerCase() !== "end") {
                dataObj[sectionName] = {};
            }
            else {
                sectionName = '';
            }
        }
        else if (isSubsection) {
            subsectionName = elem.getAttribute("data-form-subsection");

            // In some cases, we need to declare the end of a subsection: data-form-subsection = "end"
            if (subsectionName.toLowerCase() !== "end") {
                dataObj[sectionName][subsectionName] = {};
            }
            else {
                subsectionName = '';
            }
        }
        else if (isSubSubsection) {
            subsubsectionName = elem.getAttribute("data-form-subsubsection");

            // In some cases, we need to declare the end of a subsubsection: data-form-subsubsection = "end"
            if (subsubsectionName.toLowerCase() !== "end") {
                props.data[sectionName][subsectionName][subsubsectionName] = {};
            }
            else {
                subsubsectionName = '';
            }
        }
        else {
            // After assigning new main or sub section, add current element details for each one of them
            if (elem.id) {
                var elInfo = elementInfo(elem.id);
                var currentSection;
                var valueEntered = false;

                // If url needs to be modified for modules like filters.
                if (buildUrl) {
                    if (elInfo.info === "checkbox" || elInfo.info === "radio") {
                        if (elInfo.isChecked) {
                            valueEntered = true;
                        }
                    }
                    else if (elInfo.info === "text") {
                        if (elInfo.val !== '') {
                            valueEntered = true;
                        }
                    }
                    else if (elInfo.info === "select") {
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
                    var valueInUrl = "";

                    if (elem.hasAttribute('data-url')) {
                        valueInUrl = elem.getAttribute('data-url');

                        // Check if data-url value is to concat multiple values like custom price range min-max.
                        // e.g --> data-url='{"concat":"tbPricerangeMin|tbPricerangeMax","separator":"-","suffix":"tl","type":"pricerange"}'
                        if (valueInUrl.contains("concat")) {
                            var jsonParsedValue = JSON.parse(valueInUrl);
                            var _type = jsonParsedValue["type"];

                            // Reset valueInUrl and repopulate.
                            valueInUrl = "";

                            // For example, price range min-max both elements have concat data urls. We need to check the values of them if any value
                            // entered. First check min-price-element to collect data url from both min-max elements. If no values entered  
                            // concatArr has no data. Then, continue to check max-price-element value. If concatArr has value, no need to check
                            // max-pricerange-element value.
                            // Therefore, concatArr is used to avoid duplication.
                            // This if statemen can be developed for different cases rather than pricerange.

                            if (concatArr.indexOf(_type) === -1) {
                                concatArr.push(_type);

                                var concatElementIds = jsonParsedValue["concat"].split('|');
                                var _valueArr = [];

                                for (var ce = 0; ce < concatElementIds.length; ce++) {
                                    var _element = document.getElementById(concatElementIds[ce]);
                                    var _elInfo = elementInfo(_element.id);

                                    if (_elInfo.info === "checkbox" || _elInfo.info === "radio") {
                                        // to be developed!
                                    }
                                    else if (_elInfo.info === "text") {
                                        _valueArr.push(_elInfo.val);
                                    }
                                    else if (_elInfo.info === "select") {
                                        // to be developed!
                                    }
                                }

                                // To format url value...
                                var separator = jsonParsedValue["separator"];
                                valueInUrl = _valueArr.join(separator);

                                if (jsonParsedValue.hasOwnProperty("suffix")) {
                                    var suffix = jsonParsedValue["suffix"];
                                    valueInUrl += jsonParsedValue["suffix"];
                                }
                                // End formatting.
                            }
                        }
                    }

                    // Save current url under section name.
                    if (valueInUrl !== "" && current.url[sectionName].indexOf(valueInUrl) === -1) {
                        current.url[sectionName].push(valueInUrl);
                    }
                }

                // Add related section or subsection names.
                if (sectionName === '' && subsectionName === '' && subsubsectionName === '') {
                    // If no section name exists
                    currentSection = dataObj;
                }
                if (sectionName !== '' && subsectionName === '' && subsubsectionName === '') {
                    // Add under section
                    currentSection = dataObj[sectionName];
                }
                else if (subsectionName !== '' && subsubsectionName === '') {
                    // Add under subsection
                    currentSection = dataObj[sectionName][subsectionName];
                }
                else if (subsubsectionName !== '') {
                    // Add under subsubsection
                    currentSection = props.data[sectionName][subsectionName][subsubsectionName];
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
                    isChecked: elInfo.info === "checkbox" || elInfo.info === "radio" ? elInfo.isChecked : false
                };
            }
        }
    }

    if (buildUrl) {
        // Create url query string
        if (!isJsonEmpty(current.url)) {
            var urlString = "";

            for (var u = 0; u < Object.keys(current.url).length; u++) {
                var clusterName = Object.keys(current.url)[u];
                var clusterValues = current.url[clusterName].join(",");
                urlString += clusterName + ":" + clusterValues + "|";
            }

            current.url["queryString"] = urlString.slice(0, -1);
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
            }
            else {
                var typeName = (tag === 'input' ? elem.getAttribute("type").toLowerCase() : '');

                if (typeName === 'checkbox' || typeName === 'radio') {
                    //-> Check if a specific reset value (true or false) defined as attribute
                    var resetVal = elem.getAttribute('data-default-val');

                    if (resetVal) {
                        elem.checked = resetVal;
                    }
                    else {
                        elem.checked = false;
                    }
                }
                else { //-> other input and textarea elements
                    elem.value = '';
                }
            }
        }
    }

    if (Feux.hasOwnProperty("Validation")) {
        Feux.Validation.Actions.clear({ selector: arg.selector });
    }
}

// End


// Update url query string part

function updateUrlQueryString(arg) {
    var urlString = "";

    if (arg.queryString) {
        urlString += urlString === "" ? "?" : "&";
        urlString += arg.queryStringPrefix + "=" + arg.queryString; // e.g --> // ?flt=renk:mavi,kırmızı|beden:sm
    }

    if (arg.queryString_sort) {
        urlString += urlString === "" ? "?" : "&";
        urlString += arg.queryStringPrefix_sort + "=" + arg.queryString_sort; // e.g --> // ?srt=price:asc
    }

    if (arg.queryString_paging) {
        urlString += urlString === "" ? "?" : "&";
        urlString += arg.queryStringPrefix_paging + "=" + arg.queryString_paging; // e.g --> // ?pg=5
    }

    if (arg.queryString_tbr) {
        urlString += urlString === "" ? "?" : "&";
        urlString += arg.queryStringPrefix_tbr + "=" + arg.queryString_tbr; // e.g --> // ?tbr=dummyTabberId:2
    }

    history.pushState("", "", window.location.href.split('?')[0] + urlString);
}

// End


// Assign form element value

function assignFormElementValue(arg) {
    var el = arg.element;
    var val = arg.value;
    var trigger = arg.trigger;
    var elInfo = elementInfo("", el);

    if (elInfo.info === "checkbox" || elInfo.info === "radio") {
        if (trigger) {
            el.click();
        }
        else {
            el.checked = true;
        }
    }
    else if (elInfo.info === "textbox") {

    }
    else if (elInfo.info === "select") {

    }
}

// End


// Normalize Türkish culture string 

function normalizeString(arg) {
    var value = arg.value;

    var characterArr = ["Ç-C", "ç-c", "Ğ-G", "ğ-g", "İ-I", "ı-i", "Ö-O", "ö-o", "Ş-S", "ş-s", "Ü-U", "ü-u"];

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
        left: rect.left + (includeScroll ? window.scrollX : 0)
    };
}

// End


// Unwrap element

function unwrap(arg) {
    var parentEl;

    if (arg.isParent) {
        // If currently sent element is the parent element that will be removed.
        parentEl = arg.hasOwnProperty("elSelector") ? document.querySelector(arg.elSelector) : arg.el;
        var childrenCount = parentEl.children.length;

        // Move all child elements...
        for (var c = 0; c < childrenCount; c++) {
            var childEl = parentEl.children[0];
            parentEl.insertAdjacentElement('beforebegin', childEl);
        }
    }
    else {
        // If currently sent element is the element that will be unwrapped.
        childEl = arg.hasOwnProperty("elSelector") ? document.querySelector(arg.elSelector) : arg.el;
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
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
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