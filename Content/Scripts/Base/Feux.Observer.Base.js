Feux.Observer = {
    Props: {
        Selectors: {
            html: "[data-observe='html']",  // İzlenecek HTML kapsayıcıların selektörü. 
            formEl: "[data-observe='form'] textarea:not([data-observe='false']), [data-observe='form'] select:not([data-observe='false']), [data-observe='form'] input:not([data-observe='false'])" // İzlenecek form input elementlerin selektörü.
        }
    },

    Current: {
        formElValues: [], // DOM'da yer alan form elementlerin eski ve yeni değerlerini tutan json objesi.
        Changes: {
            formEl: false, // form elementleri bazlı değişiklik olup olmadığını belirtir.
            html: false   // HTML kapsayıcı bazlı değişiklik olup olmadığını belirtir.
        }
    },

    ready: function () {
        Feux.Observer.Actions.init();
    },

    Actions: {
        init: function () {
            Feux.Observer.Actions.initHtmlObserver();
            Feux.Observer.Actions.initFormElObserver();
        },
        initHtmlObserver: function () {
            // Get all HTML containers to observe mutation.
            var observedElementList = document.querySelectorAll(Feux.Observer.Props.Selectors.html);

            Feux.Observer.Current.Changes.html = observedElementList.length === 0;

            for (var i = 0; i < observedElementList.length; i++) {
                var elToObserve = observedElementList[i];

                var mutationObserver = new MutationObserver(function () {
                    // HTML değişikliği yapıldığını kaydeder.
                    Feux.Observer.Current.Changes.html = true;

                    // Değişiklik ile ilgili geri bildirim gösterir.
                    Feux.Observer.Actions.displayChangesFeedback();
                });

                mutationObserver.observe(elToObserve, { subtree: true, childList: true });
            }
        },

        initFormElObserver: function () {
            // Get all formEl elements to observe mutation.
            var observedElementList = document.querySelectorAll(Feux.Observer.Props.Selectors.formEl);
            Feux.Observer.Current.Changes.formEl = observedElementList.length === 0;

            for (var i = 0; i < observedElementList.length; i++) {
                var elToObserve = observedElementList[i];

                if (elToObserve.id) {
                    // OnChange eventi, gözlemlenecek formEl elementleri için tanımlanıyor.
                    elToObserve.addEventListener("input", function (event) {
                        this.setAttribute("value", this.value);
                    });

                    // Observer eventi tanımlanıyor.
                    Feux.Observer.Actions.setFormElObserverListener(elToObserve);

                    // Mevcut değerler json objesine kaydediyor.
                    Feux.Observer.Actions.saveCurrentValues(elementInfo(elToObserve.id), false);
                }
            }
        },

        setFormElObserverListener: function (elementToObserve) {
            function callback(mutationList) {
                mutationList.forEach(function (mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName === "value") {
                        // Mevcut değerler json objesine kaydediyor.
                        Feux.Observer.Actions.saveCurrentValues(elementInfo(mutation.target.id), true);

                        // form elementlerindeki eski ve yeni değeri karşılaştırarak bir değişiklik olup olmadığını saptıyoruz.
                        Feux.Observer.Current.Changes.formEl = Feux.Observer.Current.formElValues.some(x => x.oldValue !== x.newValue);

                        // Değişiklik ile ilgili geri bildirim gösterir.
                        Feux.Observer.Actions.displayChangesFeedback();
                    }
                });
            }

            var mutationObserver = new MutationObserver(callback);

            mutationObserver.observe(elementToObserve, {
                attributeFilter: ["value"], // Mutasyonu (değişikliği) takip edeceğimiz 'attribute' referansı.
                attributeOldValue: true,
                subtree: true
            });
        },

        saveCurrentValues: function (elInfo, setNewValue) {
            var formElValues = Feux.Observer.Current.formElValues;

            var value = "";
            var id = elInfo.id;

            if (elInfo.type === "text" || elInfo.tag === "textarea" || elInfo.tag === "multiSelect" || elInfo.tag === "select") {
                value = elInfo.val;
            }
            else if (elInfo.type === "checkbox") {
                value = elInfo.isChecked;
            }
            else if (elInfo.type === "radio") {
                var selectedEl = document.querySelector('input[name="' + elInfo.name + '"]:checked');
                value = selectedEl ? selectedEl.value : "";
                id = elInfo.name;
            }


            if (setNewValue) {
                var index = formElValues.findIndex(x => x.id === id);

                formElValues[index] = {
                    id,
                    newValue: value,
                    oldValue: formElValues[index].oldValue
                };
            }
            else {
                if (elInfo.type === "radio") {
                    if (!formElValues.some(x => x.id === id)) {
                        formElValues.push({
                            id,
                            newValue: value,
                            oldValue: value
                        });
                    }
                }
                else {
                    formElValues.push({
                        id,
                        newValue: value,
                        oldValue: value
                    });
                }
            }
        },

        checkSelect2ElValue: function (id) {
            if (id) {
                Feux.Observer.Actions.saveCurrentValues(elementInfo(id), true);

                // form elementlerindeki eski ve yeni değeri karşılaştırarak bir değişiklik olup olmadığını saptıyoruz.
                Feux.Observer.Current.Changes.formEl = Feux.Observer.Current.formElValues.some(x => x.oldValue !== x.newValue);

                // Değişiklik ile ilgili geri bildirim gösterir.
                Feux.Observer.Actions.displayChangesFeedback();
            }
        },

        displayChangesFeedback: function () {
            // Input elementlerinde veya HTML kapsayıcılarında değişiklik gözlemlenmiş ise...
            if (Feux.Observer.Current.Changes.html || Feux.Observer.Current.Changes.formEl) {
                document.getElementById("yyy").innerHTML = "Dökümanda değişiklik yapıldı.";
            }
            else {
                document.getElementById("yyy").innerHTML = "";
            }
        }
    }
};

// End


// Functions to call as DOM ready

Feux.Observer.ready();

// End
 