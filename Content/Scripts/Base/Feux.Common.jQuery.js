if (window.jQuery) {
    $(document).ready(function () {
        // Run validation rules.
        Feux.Validation.Actions.init();

        // Run select2 setup.
        Feux.Select2.Actions.init();

        // Run mask rules.
        Feux.Mask.Actions.init();
         
        // Check if CurrentPage obj exists. If exists,
        // call CurrentPage related document-ready events.
        if (!isJsonEmpty(Feux.CurrentPage)) {
            if (typeof Feux.CurrentPage.jQueryDocumentReadyEvents === 'function') {
                Feux.CurrentPage.jQueryDocumentReadyEvents();
            }
        }

        // Check if Partial obj exists. If exists,
        // call Partial related document-ready events.
        if (!isJsonEmpty(Feux.Partial)) {
            if (typeof Feux.Partial.jQueryDocumentReadyEvents === 'function') {
                Feux.Partial.jQueryDocumentReadyEvents();
            }
        }

    });
     

}