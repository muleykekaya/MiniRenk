// Tabber Object

Feux.Tabber = {
    Props: {
        tabberContainerSelector: '.tabber-container',
        tabberHeaderSelector: '.tabber-header',
        tabberBodySelector: '.tabber-body',
        tabHeadItemSelector: '.tab-head-item',
        tabContentItemSelector: '.tab-content-item',
        tabContentSelector: '.tab-content',
        queryStringPrefix: 'tbr',
        tabberContainerIdArrByUrl: [],
        isUrlSetup: false,
        Animation: {
            // Duration values have to be identically same as css values!
            height_duration: 500,
            opacity_duration_on: 350,
            opacity_duration_off: 250
        }
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Feux.Tabber.Actions.init();
    },

    resize: function (arg) {

    },

    Actions: {
        init: function () {
            Feux.Tabber.Helper.setCurrent();
            Feux.Tabber.Helper.setElements();

            // Get shortcut objects.
            var elements = Feux.Tabber.Elements;

            // Assign click events on tab item link
            for (ti = 0; ti < elements.tabberHeadItems.length; ti++) {
                var tabberHeadItem = elements.tabberHeadItems[ti];

                tabberHeadItem.addEventListener("click", function () {
                    Feux.Tabber.Actions.show({ sender: this });
                });
            }

            // Prepare tabbers by url query string
            Feux.Tabber.Actions.prepareByUrl();
        },

        mfInit: function (arg) {
            // If mf is used, add onload attribute to call mfInit function with container id.
            Feux.Tabber.Helper.setCurrent();
            Feux.Tabber.Helper.setElements();

            // Get shortcut objects.
            var props = Feux.Tabber.Props;
            var current = Feux.Tabber.Current;

            // Assign click events on tab item link.
            var tabberContainerEl = document.getElementById(arg.tabberContainerId);
            var tabberHeadItems = tabberContainerEl.querySelectorAll(props.tabHeadItemSelector);

            // Set tabber head item click event.
            for (ti = 0; ti < tabberHeadItems.length; ti++) {
                var tabberHeadItem = tabberHeadItems[ti];

                tabberHeadItem.addEventListener("click", function () {
                    Feux.Tabber.Actions.show({ sender: this });
                });
            }

            // Trigger tab content mf approach.
            var tabberContentMfItems = tabberContainerEl.querySelectorAll("[data-lid-mf]");

            if (tabberContentMfItems.length) {
                Feux.Base.microFrontendSetup({ mfElements: tabberContentMfItems });
            }

            // Prepare tabbers by url query string
            Feux.Tabber.Actions.prepareByUrl();
        },

        show: function (arg) {
            var sender = arg.sender;

            // Disable sender to avoid multiple clicks from user.
            if (!Feux.Tabber.Current.isUrlSetup) {
                if (sender.disabled) { return false; }
                sender.disabled = true;
            }

            // First check if the same tab-head-item is clicked. If it is the same, then return false.
            if (sender.classList.contains('on')) {
                sender.disabled = false;
                return false;
            }

            // Get current item data attributes.
            arg.tabNo = sender.getAttribute("data-tab-no");
            arg.tabUrl = sender.getAttribute("data-url");
            arg.text = sender.innerHTML;

            // Get common short cuts.
            var props = Feux.Tabber.Props;
            var elements = Feux.Tabber.Elements;
            var current = Feux.Tabber.Current;

            // Set current new properties
            current.submitter = sender;
            current.submitterArg = arg;

            // Set current status.
            current.status = "showing";

            // Update tab content properties.
            Feux.Tabber.Helper.setContentProps();

            // Prepare UX
            Feux.Tabber.UX.show();
        },

        scrollAndShow: function (arg) {
            arg.ev.preventDefault();

            // Disable sender to avoid multiple clicks from user.
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;
            setTimeout(function () { sender.disabled = false; }, 30);

            // Get arguments.
            var props = Feux.Tabber.Props;
            var tabberContainerId = arg.tabberId;
            var tabNo = arg.tabNo;

            // First check if the same tab-head-item is clicked. If it is the same, then return false.
            var tabberContainerEl = document.getElementById(tabberContainerId);

            // Scroll to tabber.
            var rect = tabberContainerEl.getBoundingClientRect();
            var headerHeight = Feux.Globals.headerElem.offsetHeight; // in case header is fixed!
            var scrollTopVal = parseInt(Feux.Base.Props.Scroll.Y.currval + rect.top - headerHeight - 50);

            if (!isBrowserIE11()) {
                window.scrollTo({ top: scrollTopVal, left: 0, behavior: 'smooth' });
            }
            else {
                window.scrollTo(0, scrollTopVal);
            }

            // Click on specified tab head item.
            var tabHeadItemEl = tabberContainerEl.querySelector('[data-tab-no="' + tabNo + '"]');

            if (tabHeadItemEl.classList.contains('on')) {
                sender.disabled = false;
                return false;
            }
            else {
                tabHeadItemEl.click();
            }

            // Y-Scroll tab head item.
            Feux.Tabber.Helper.yScrollToTabHeadItem({ _tabberContainerEl: tabberContainerEl, _tabHeadItemEl: tabHeadItemEl });
        },

        prepareByUrl: function () {
            var props = Feux.Tabber.Props;
            var elements = Feux.Tabber.Elements;
            var current = Feux.Tabber.Current;
            var hasQueryString = window.location.href.indexOf('?') > -1;

            if (hasQueryString) {
                // e.g --> ?tbr=tabberDummyId01:2|tabberDummyId02:1
                var queryString = window.location.href.split('?')[1];
                var queryStringArr = queryString.split('&');

                for (var q = 0; q < queryStringArr.length; q++) {
                    var queryStringItemArr = queryStringArr[q].split('=');
                    var queryStringPrefixName = queryStringItemArr[0];

                    if (queryStringPrefixName === props.queryStringPrefix) {
                        var tabberArr = queryStringItemArr[1]; // e.g --> tabberDummyId01:2|tabberDummyId02:1
                        var tabberClusterArr = tabberArr.split('|');

                        for (var c = 0; c < tabberClusterArr.length; c++) {
                            var tabberClusterItem = tabberClusterArr[c]; // e.g --> tabberDummyId01:2
                            props.tabberContainerIdArrByUrl.push(tabberClusterItem);

                            var tabberClusterItemArr = tabberClusterItem.split(':');
                            var tabberContainerId = tabberClusterItemArr[0]; // e.g --> tabberDummyId01
                            var tabNo = tabberClusterItemArr[1];
                            var tabberContainerEl = document.getElementById(tabberContainerId);
                            var tabHeadItemEl = tabberContainerEl.querySelector('[data-tab-no="' + tabNo + '"]');
                            current.isUrlSetup = true;
                            tabHeadItemEl.click();
                        }
                    }
                }

                // Y-Scroll to active tab head items.
                // Timeout needed to get the actual width and offset value.
                setTimeout(function () {
                    for (var u = 0; u < props.tabberContainerIdArrByUrl.length; u++) {
                        var tabInfoArr = props.tabberContainerIdArrByUrl[u].split(':');
                        var tabContainerId_ = tabInfoArr[0];
                        var tabberContainerEl_ = document.getElementById(tabContainerId_);
                        var tabNo_ = tabInfoArr[1];

                        if (tabberContainerEl_) {
                            var tabHeadItemEl_ = tabberContainerEl_.querySelector('[data-tab-no="' + tabNo_ + '"]');

                            Feux.Tabber.Helper.yScrollToTabHeadItem({ _tabberContainerEl: tabberContainerEl_, _tabHeadItemEl: tabHeadItemEl_ });
                        }
                    }
                }, 400);
            }
        }
    },

    UX: {
        show: function () {
            var props = Feux.Tabber.Props;
            var elements = Feux.Tabber.Elements;
            var current = Feux.Tabber.Current;

            // Get current properties and set clases.
            var arg = current.submitterArg;
            var tabberContainerEl = current.submitterArg.tabberContainerEl;
            var tabberBodyEl = current.submitterArg.tabberBodyEl;
            var activeContent = current.submitterArg.activeContent;
            var newContent = current.submitterArg.newContent;

            // Remove active class from tab content.
            activeContent.activeTabContentItemEl.classList.remove('on');

            setTimeout(function () {
                // Add active class onto new tab.
                newContent.relatedTabContentItemEl.classList.add('on');

                // X-Scroll tabber head container.
                var leftScrollVal = current.submitter.getBoundingClientRect().left - 16;
                current.submitterArg.tabberHeaderEl.scrollTo({ left: leftScrollVal, behavior: 'smooth' });
            }, current.isUrlSetup ? 0 : props.Animation.opacity_duration_off);

            // Get active (current) body height and assign it on body style.
            var activeBodyElHeight = activeContent.activeTabContentElHeight;
            tabberBodyEl.style.height = activeBodyElHeight + "px";

            setTimeout(function () {
                // Get new body height and assign again to animate.
                var newBodyElHeight = newContent.relatedTabContentElHeight;
                tabberBodyEl.style.height = newBodyElHeight + "px";
            }, current.isUrlSetup ? 0 : 10);

            // Remove last active class, and add active class on new sender tab-head-item.
            var activeTabHeadItem = tabberContainerEl.querySelector(props.tabHeadItemSelector + '.on');

            if (activeTabHeadItem) {
                activeTabHeadItem.classList.remove('on');
            }

            if (current.submitter) {
                current.submitter.classList.add('on');
            }

            // Update URL
            if (!current.isUrlSetup) {
                updateUrlQueryString({
                    queryStringPrefix_tbr: props.queryStringPrefix,
                    queryString_tbr: Feux.Tabber.Helper.buildUrl().join('|')
                });
            }

            // Update current properties as all actions are done.
            setTimeout(function () {
                current.state = "on";
                current.status = "shown";
                current.isUrlSetup = false;

                if (current.submitter) {
                    current.submitter.disabled = false;
                }

                tabberBodyEl.style.height = "auto";
            }, current.isUrlSetup ? 0 : props.Animation.height_duration);

            // Let  all url based click events to complete.
            setTimeout(function () {
                current.isUrlSetup = false;
            }, 20);
        }
    },

    Helper: {
        setCurrent: function () {
            Feux.Tabber.Current = {
                state: '',
                status: '',
                submitter: null,
                submitterArg: {}
            };
        },

        setElements: function () {
            var props = Feux.Tabber.Props;
            var elements = Feux.Tabber.Elements;

            elements.tabberList = document.querySelectorAll(props.tabberContainerSelector);
            elements.tabberHeadItems = document.querySelectorAll(props.tabHeadItemSelector);
        },

        setContentProps: function () {
            // Get common short cuts.
            var props = Feux.Tabber.Props;
            var elements = Feux.Tabber.Elements;
            var current = Feux.Tabber.Current;
            var arg = current.submitterArg;

            // Get current tabber container and body elements
            var _tabberContainerEl = findAncestor(arg.sender, props.tabberContainerSelector);
            var _tabberHeaderEl = _tabberContainerEl.querySelector(props.tabberHeaderSelector);
            var _tabberBodyEl = _tabberContainerEl.querySelector(props.tabberBodySelector);
            current.submitterArg.tabberContainerEl = _tabberContainerEl;
            current.submitterArg.tabberHeaderEl = _tabberHeaderEl;
            current.submitterArg.tabberBodyEl = _tabberBodyEl;

            // Set active (current) content props.
            var _activeTabContentItemEl = _tabberContainerEl.querySelector(props.tabContentItemSelector + ".on");
            var _activeTabContentEl = _activeTabContentItemEl.querySelector(props.tabContentSelector);
            var _activeTabContentElHeight = _activeTabContentEl.offsetHeight;

            current.submitterArg.activeContent = {
                activeTabContentItemEl: _activeTabContentItemEl,
                activeTabContentEl: _activeTabContentEl,
                activeTabContentElHeight: _activeTabContentElHeight
            };

            // Set new content props.
            var _relatedTabContentItemEl = _tabberContainerEl.querySelector('[data-tab-content-no="' + arg.tabNo + '"]');
            var _relatedTabContentEl = _relatedTabContentItemEl.querySelector(props.tabContentSelector);
            var _relatedTabContentElHeight = _relatedTabContentEl.offsetHeight;

            current.submitterArg.newContent = {
                relatedTabContentItemEl: _relatedTabContentItemEl,
                relatedTabContentEl: _relatedTabContentEl,
                relatedTabContentElHeight: _relatedTabContentElHeight
            };
        },

        buildUrl: function () {
            var elements = Feux.Tabber.Elements;
            var url = [];

            for (var tl = 0; tl < elements.tabberList.length; tl++) {
                var tabber = elements.tabberList[tl];
                var activeTabHeadItem = tabber.querySelector('.tab-head-item.on');
                var activeTabNo = activeTabHeadItem.getAttribute('data-tab-no');
                url.push(tabber.id + ':' + activeTabNo);
            }

            return url;
        },

        yScrollToTabHeadItem: function (arg) {
            var props = Feux.Tabber.Props;
            var tabberHeaderEl = arg._tabberContainerEl.querySelector(props.tabberHeaderSelector);

            if (tabberHeaderEl.children[0] === arg._tabHeadItemEl) {
                tabberHeaderEl.scrollTo(0, 0);
            }
            else {
                var newTabHeadItemWidth = arg._tabHeadItemEl.offsetWidth;
                var scrollLeftVal = parseInt(arg._tabHeadItemEl.offsetLeft + newTabHeadItemWidth);
                tabberHeaderEl.scrollTo(scrollLeftVal, 0);
            }
        }
    }
};

// End

// Functions to call as DOM ready

if (!Feux.Globals.isMF) {
    Feux.Tabber.ready();
}

// End