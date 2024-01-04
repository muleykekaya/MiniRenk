Feux.CurrentPage = {

    jQueryDocumentReadyEvents: function () {
        Feux.CurrentPage.owlSliderSetup();
    },

    resizeEvents: function () {

    },

    owlSliderSetup: function () {
        var key = Feux.Base.Props.MediaQ.Curr.key;
        var isMobile = key === "xs1" || key === "xs2";


        $('#section-02-slider').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            dots: true,
            onInitialized: callback
        });
        function callback(event) {

            var nav = document.querySelector("#section-02-slider .owl-nav");
            var dots = document.querySelector("#section-02-slider .owl-dots");
            nav.insertBefore(dots, nav.childNodes[1]);

        }

        $('#home-activite-slider').owlCarousel({
            margin: 50,
            nav: true,
            items: 1,
            dots: false,
            autoWidth: true,
            responsive: {
                0: {
                    margin: 20,
                    autoWidth: false,

                },
                768: {
                    margin: 50,
                    autoWidth: true,

                }
            },
            navText: [
                '<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M-7.43094e-07 17C-3.32207e-07 7.6 7.6 -1.15398e-06 17 -7.43094e-07C26.4 -3.32207e-07 34 7.6 34 17C34 26.4 26.4 34 17 34C7.6 34 -1.15398e-06 26.4 -7.43094e-07 17ZM32 17C32 8.7 25.3 2 17 2C8.7 2 2 8.7 2 17C2 25.3 8.7 32 17 32C25.3 32 32 25.3 32 17Z" fill="#015D4F"/> <path d="M7.59995 16.9998L17.2999 7.2998L18.7 8.69981L10.3999 16.9998L18.7 25.2998L17.2999 26.6998L7.59995 16.9998Z" fill="#015D4F"/> <path d="M26 16L26 18L9 18L9 16L26 16Z" fill="#015D4F"/> </svg> ',
                '<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M34 17C34 26.4 26.4 34 17 34C7.6 34 9.9662e-07 26.4 2.22928e-06 17C3.46194e-06 7.6 7.6 9.9662e-07 17 2.22928e-06C26.4 3.46194e-06 34 7.6 34 17ZM2 17C2 25.3 8.7 32 17 32C25.3 32 32 25.3 32 17C32 8.7 25.3 2 17 2C8.7 2 2 8.7 2 17Z" fill="#015D4F"/> <path d="M26.4001 17.0002L16.7001 26.7002L15.3 25.3002L23.6001 17.0002L15.3001 8.7002L16.7001 7.30019L26.4001 17.0002Z" fill="#015D4F"/> <path d="M8 18L8 16L25 16L25 18L8 18Z" fill="#015D4F"/> </svg> ',
            ]
        });
    },


}

