// Globals

var Feux = {
    Globals: {
        isMF: document.querySelector('[data-lid-mf]') !== null,
        isLocalhost: location.hostname === "localhost",
        bodyElem: document.getElementsByTagName('body')[0],
        headerElem: document.getElementsByTagName('header')[0],
        pageWr: document.getElementById('page-wrapper'),
        contentWr: document.getElementById('content-wrapper'),
        asideElem: document.getElementById('primary-aside'),
        mainElem: document.getElementsByTagName('main')[0],
        overlayWrElem: document.getElementById('overlay-wrapper'),
        toastWrElem: document.getElementById('toast-wrapper')
    }
};

// End Globals