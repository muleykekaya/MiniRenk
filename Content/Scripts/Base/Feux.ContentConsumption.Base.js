Feux.ContentConsumption = {
    Props: {
        start: 100, // progress'in başlayacağı noktayı belirliyoruz. (start elementinin top değeri 100 den küçük olursa)
        finish: 400, //progress'in biteceği noktayı belirliyoruz. (start elementinin bottom değeri 400 den küçük olursa)
        Selectors: {
            start: "[data-content-consumption='start']",
            title: "[data-content-consumption='title']",
            contentConsumption: "#content-consumption",
            progress: "#content-consumption .progress",
        }
    },

    Elements: {},

    Current: {},

    Actions: {
        init: function () {
            Feux.ContentConsumption.Helper.setElements();
        },
        onScroll: function () {
            var elements = Feux.ContentConsumption.Elements;

            if (elements.startEl) {

                var props = Feux.ContentConsumption.Props;
                var bounds = elements.startEl.getBoundingClientRect();

                //top değeri progress'in başlayacağı değerden küçük olursa
                if (bounds.top < props.start) {

                    //bottom değeri bitiş değerinden küçük olursa 
                    if (bounds.bottom < props.finish) {
                        elements.contentConsumption.classList.remove('on');
                    }
                    else {
                        elements.contentConsumption.classList.add('on');

                        //gidilmesi gereken yol = (content toplam height) - (progress'in biteceği nokta) + (progress'in başlayacağı nokta)
                        var totalScroll = bounds.height - props.finish + props.start;

                        //toplam gidilen yol = (progress'in başlayacağı nokta) - (content'in top değeri)
                        var totalConsumption = props.start - bounds.top;

                        //toplam gidilen yol yüzdesi
                        var percent = (totalConsumption * 100) / totalScroll;

                        //sağ taraf ve dikeyde konumlanıyorsa heigth değiştirecez
                        if (elements.contentConsumption.classList.contains('right')) {
                            elements.progress.style.height = percent.toFixed(2) + "%";
                        }
                        //üst taraf ve yatayda konumlanıyorsa width değiştirecez
                        else if (elements.contentConsumption.classList.contains('top')) {
                            elements.progress.style.width = percent.toFixed(2) + "%";
                        }

                    }
                }
                else {
                    elements.contentConsumption.classList.remove('on');
                }
            }
        }
    },
    Helper: {

        setElements: function () {
            var props = Feux.ContentConsumption.Props;
            var elements = Feux.ContentConsumption.Elements;

            elements.startEl = document.querySelector(props.Selectors.start);
            elements.titleEl = document.querySelector(props.Selectors.title);
            elements.contentConsumption = document.querySelector(props.Selectors.contentConsumption);
            elements.progress = document.querySelector(props.Selectors.progress);
        },

    }
};

Feux.ContentConsumption.Actions.init();
