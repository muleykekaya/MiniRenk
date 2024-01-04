
//mediaScale = animasyon tipi,
//start.top = animasyonun başlayacağı top değeri header height'ı ile eşit olmalı
//start.scale = animasyonun başlamadan önceki image'ın scale değeri
//start.storyBottom =scrolla bağlı story alanının görüneceği bottom değeri
//start.storyMarginBottom = story alanın sayfanın ne kadar altından başlayacağını belirtir
//finish.value = scrolla bağlı image'ın scale değeri ve story' in opacity değeri bu değer ile orantılı bir şekilde 1 e gelecek
//finish.storyTop = scrolla bağlı story alanın tepe noktası bu noktadan sonra animasyonlar bitecek 


Feux.Animation = {
    Props: {
        animElemsSelector: '[data-f-anim]',
        animType: {
            mediaScale: {
                xl: { start: { top: 124, scale: 1.02, storyBottom: 150, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 220 } },
                lg: { start: { top: 124, scale: 1.02, storyBottom: 150, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 220 } },
                md: { start: { top: 112, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 192 } },
                sm2: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 180 } },
                sm1: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 180 } },
                xs2: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 148 } },
                xs1: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 148 } }
            },
            counter: {
                xl: { start: { bottom: 400 }, speed: 400 },
                lg: { start: { bottom: 400 }, speed: 400 },
                md: { start: { bottom: 400 }, speed: 400 },
                sm2: { start: { bottom: 400 }, speed: 400 },
                sm1: { start: { bottom: 400 }, speed: 400 },
                xs2: { start: { bottom: 400 }, speed: 400 },
                xs1: { start: { bottom: 400 }, speed: 400 }
            },
            scrollX01: {
                xl: { start: { bottom: 200 }, finish: { bottom: window.innerHeight * 0.5 } },
                lg: { start: { bottom: 200 }, finish: { bottom: window.innerHeight * 0.5 } },
                md: { start: { bottom: 200 }, finish: { bottom: window.innerHeight * 0.5 } },
                sm2: { start: { bottom: -100 }, finish: { bottom: (window.innerHeight * 0.5) / 0.57 } },
                sm1: { start: { bottom: -100 }, finish: { bottom: (window.innerHeight * 0.5) / 0.57 } },
                xs2: { start: { bottom: 200 }, finish: { bottom: window.innerHeight * 0.4 } },
                xs1: { start: { bottom: 200 }, finish: { bottom: window.innerHeight * 0.4 } }
            },
            linearY: {
                xl: { start: { bottom: 250, position: 150, transitionDuration: 0.9 } },
                lg: { start: { bottom: 250, position: 150, transitionDuration: 0.9 } },
                md: { start: { bottom: 250, position: 150, transitionDuration: 0.9 } },
                sm2: { start: { bottom: 250, position: 150, transitionDuration: 0.9 } },
                sm1: { start: { bottom: 250, position: 150, transitionDuration: 0.9 } },
                xs2: { start: { bottom: 150, position: 150, transitionDuration: 0.9 } },
                xs1: { start: { bottom: 150, position: 150, transitionDuration: 0.9 } }

            },
            linear_Y: {
                xl: { start: { bottom: 500, position: -100, transitionDuration: 0.9 } },
                lg: { start: { bottom: 500, position: -100, transitionDuration: 0.9 } },
                md: { start: { bottom: 500, position: -100, transitionDuration: 0.9 } },
                sm2: { start: { bottom: 500, position: -100, transitionDuration: 0.9 } },
                sm1: { start: { bottom: 500, position: -100, transitionDuration: 0.9 } },
                xs2: { start: { bottom: 350, position: -100, transitionDuration: 0.9 } },
                xs1: { start: { bottom: 350, position: -100, transitionDuration: 0.9 } }

            },
            scaleBig2Small: {
                xl: { start: { bottom: 100, scale: 2, transitionDuration: 1 } },
                lg: { start: { bottom: 100, scale: 2, transitionDuration: 1 } },
                md: { start: { bottom: 100, scale: 2, transitionDuration: 1 } },
                sm2: { start: { bottom: 100, scale: 2, transitionDuration: 1 } },
                sm1: { start: { bottom: 100, scale: 2, transitionDuration: 1 } },
                xs2: { start: { bottom: 100, scale: 1.5, transitionDuration: 1 } },
                xs1: { start: { bottom: 100, scale: 1.5, transitionDuration: 1 } }

            },
            opacity: {
                xl: { start: { bottom: 100, transitionDuration: 1 } },
                lg: { start: { bottom: 100, transitionDuration: 1 } },
                md: { start: { bottom: 100, transitionDuration: 1 } },
                sm2: { start: { bottom: 100, transitionDuration: 1 } },
                sm1: { start: { bottom: 100, transitionDuration: 1 } },
                xs2: { start: { bottom: 100, transitionDuration: 1 } },
                xs1: { start: { bottom: 100, transitionDuration: 1 } }

            },
            parallaxImage: {
                xl: { start: { bottom: 0 }, resistance: 0.33 },//resistance görselin scrolla karşı direnci
                lg: { start: { bottom: 0 }, resistance: 0.33 },
                md: { start: { bottom: 0 }, resistance: 0.33 },
                sm2: { start: { bottom: 0 }, resistance: 0.33 },
                sm1: { start: { bottom: 0 }, resistance: 0.33 },
                xs2: { start: { bottom: 0 }, resistance: 0.33 },
                xs1: { start: { bottom: 0 }, resistance: 0.33 }
            },
            group: {
                xl: { start: { bottom: 400, position: -300, transitionDuration: 1.1 } },
                lg: { start: { bottom: 400, position: -300, transitionDuration: 1.1 } },
                md: { start: { bottom: 400, position: -300, transitionDuration: 1.1 } },
                sm2: { start: { bottom: 400, position: -300, transitionDuration: 1.1 } },
                sm1: { start: { bottom: 400, position: -300, transitionDuration: 1.1 } },
                xs2: { start: { bottom: 250, position: -300, transitionDuration: 1.1 } },
                xs1: { start: { bottom: 250, position: -300, transitionDuration: 1.1 } }
            },

            follow: {
                xl: { start: { bottom: window.innerHeight * 0.5 } },
                lg: { start: { bottom: window.innerHeight * 0.5 } },
                md: { start: { bottom: window.innerHeight * 0.5 } },
                sm2: { start: { bottom: (window.innerHeight * 0.5) / 0.57 } },
                sm1: { start: { bottom: (window.innerHeight * 0.5) / 0.57 } },
                xs2: { start: { bottom: window.innerHeight * 0.5 } },
                xs1: { start: { bottom: window.innerHeight * 0.5 } }
            }
        },
        windowHeigth: window.innerHeight
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Feux.Animation.Actions.init();
    },

    scrollEvents: function (arg) {
        Feux.Animation.UX.animate();
    },

    Actions: {
        init: function () {
            Feux.Animation.Helper.setElements();
            Feux.Animation.Helper.setDefaultCss();
        },

    },

    UX: {

        animate: function () {
            var elements = Feux.Animation.Elements;
            var props = Feux.Animation.Props;
            var mqKey = Feux.Base.Props.MediaQ.Curr.key;
            
            for (var i = 0; i < elements.animElems.length; i++) {
                var elem = elements.animElems[i];
                var animType = elem.getAttribute("data-f-anim");
                var data = Feux.Animation.Props.animType[animType];

                if (data[mqKey]) {
                    //animasyon tipi "linear" (yazılar) ise 

                    if (animType === "linearY" || animType === "linear_Y") {
                        var elemBounds = elem.getBoundingClientRect();
                        var bottom = props.windowHeigth - elemBounds.top;
                        var start = data[mqKey].start.bottom;
                        var isAnimStarted = elem.getAttribute("anim-started");


                        //animasyonun başlangıç noktası
                        if (bottom >= start && !isAnimStarted) {
                            elem.style.transform = "translateY(0)";
                            elem.style.opacity = 1;
                            elem.setAttribute("anim-started", "true");
                        }
                        if (bottom < -1) {
                            elem.removeAttribute("anim-started");
                            var position = data[mqKey].start.position;
                            elem.style.transform = "translateY(" + position + "px)";
                            elem.style.opacity = 0;
                        }
                    }

                    else if (animType === "opacity") {
                        var elemBounds = elem.getBoundingClientRect();
                        var bottom = props.windowHeigth - elemBounds.top;
                        var start = data[mqKey].start.bottom;
                        var isAnimStarted = elem.getAttribute("anim-started");

                        //animasyonun başlangıç noktası
                        if (bottom >= start && !isAnimStarted) {
                            elem.style.opacity = 1;
                            elem.setAttribute("anim-started", "true");
                        }
                        if (bottom < -1) {
                            elem.removeAttribute("anim-started");
                            elem.style.opacity = 0;
                        }
                    }

                    else if (animType === "scaleBig2Small") {
                        var elemBounds = elem.getBoundingClientRect();
                        var bottom = props.windowHeigth - elemBounds.top;
                        var start = data[mqKey].start.bottom;
                        var isAnimStarted = elem.getAttribute("anim-started");


                        //animasyonun başlangıç noktası
                        if (bottom >= start && !isAnimStarted) {
                            elem.style.transform = "scale(1)";
                            elem.setAttribute("anim-started", "true");
                        }
                        if (bottom < -1) {
                            elem.removeAttribute("anim-started");
                            var scale = data[mqKey].start.scale;
                            elem.style.transform = "scale(" + scale + ")";
                        }
                    }
                    //animasyon tipi "linear" (görseller) ise 
                    else if (animType === "p-img-y") {
                        //elemanın ekranda görünürlük durumunu belirliyoruz
                        if (elem.getBoundingClientRect().bottom < props.windowHeigth && elem.getBoundingClientRect().top > 0) {
                            elem.setAttribute("data-f-screen", "on");
                        }
                        else if (elem.getBoundingClientRect().top > props.windowHeigth || elem.getBoundingClientRect().bottom < 0) {
                            elem.setAttribute("data-f-screen", "off");
                        }
                        else {
                            elem.setAttribute("data-f-screen", "partial");
                        }

                        //eleman ekranda belirlediğimiz yüzdelik dilimine girdiğinde animasyon başlayacak
                        if (props.windowHeigth * ((100 - data[mqKey].w) / 100) > elem.getBoundingClientRect().top) {

                            //domdaki ilk eleman ise
                            if (elem.getAttribute("data-f-anim-first-image") === "0") {
                                //transform y değerimizi belirliyoruz
                                elem.style.transform = "translateY(" + Feux.Base.Props.Scroll.Y.currval / data[mqKey].s + "px)";
                            }
                            else {
                                //transform y değerimizi belirliyoruz
                                var tyval = props.windowHeigth * ((100 - data[mqKey].w) / 100) - elem.getBoundingClientRect().top;
                                elem.style.transform = "translateY(" + tyval / data[mqKey].s + "px)";

                            }
                        }

                        //eleman ekran dışında ve alt bölümünde ise transform y değerimizi sıfırlıyoruz
                        if (elem.getBoundingClientRect().top > props.windowHeigth) {
                            elem.setAttribute("data-f-tyval", 0);
                            elem.style.transform = "translateY(" + 0 + ")";
                        }

                        //scroll değerimiz 0 ise ilk elemanın konumunu sıfırlıyoruz
                        if (Feux.Base.Props.Scroll.Y.currval === 0) {
                            elem.style.transform = "translateY(" + 0 + ")";
                        }

                    }

                    else if (animType === "mediaScale") {

                        //mediaItem
                        var media = elem.querySelector("[data-media-scale]");
                        var mediaItem = media.querySelector("[data-media-item]");
                        var containerTop = elem.getBoundingClientRect().top;
                        var iStartScale = data[mqKey].start.scale;
                        var startTop = data[mqKey].start.top;
                        var finishValue = data[mqKey].finish.value;

                        //story
                        var storyContainer = elem.querySelector("[data-story-opacity]");
                        var sTop = storyContainer.getBoundingClientRect().top;
                        var sStartBottom = data[mqKey].start.storyBottom;
                        var sFinishTop = data[mqKey].finish.storyTop;


                        //image scale animations
                        if (containerTop < startTop) {
                            if (startTop - finishValue < containerTop) {
                                var newScale = (((startTop - containerTop) * (1 - iStartScale)) / finishValue) + iStartScale;
                                media.style.transform = "scale(" + newScale + ")";
                                mediaItem.style.transition = "transform 5s";
                                mediaItem.style.transform = "scale(1.12)";
                            }
                            else {
                                media.style.transform = "scale(1)";
                            }
                        }
                        else {
                            media.style.transform = "scale(" + iStartScale + ")";
                        }

                        //media itemını scroll etmeye karşı ekranda tutuyoruz

                        if (containerTop < startTop) {
                            if (sTop > sFinishTop) {
                                media.style.position = "fixed";
                                media.style.top = startTop + "px";
                                elem.style.marginBottom = (startTop - containerTop) + "px";
                            }
                            else {

                                media.style.position = "absolute";
                                media.style.bottom = "-" + elem.style.marginBottom;
                                media.style.top = "auto";
                            }

                        }
                        else {
                            elem.style.marginBottom = "0";
                            media.style.position = "absolute";
                            media.style.top = "auto";
                            media.style.bottom = "0";
                        }

                        //story opacity animations
                        if (sTop > 0 && props.windowHeigth - sTop > sStartBottom) {
                            var x = props.windowHeigth - sTop - sStartBottom;

                            if (x < finishValue) {
                                storyContainer.style.opacity = x / finishValue;
                            }
                            else {
                                storyContainer.style.opacity = 1;
                            }

                        }
                    }

                    else if (animType === "counter") {
                        var containerTop = elem.getBoundingClientRect().top;

                        if (!elem.classList.contains("counter-anim-finished")) {
                            if (props.windowHeigth - containerTop > data[mqKey].start.bottom) {
                                elem.classList.add("counter-anim-finished");
                                Feux.Animation.UX.startCounterAnimate(elem, data[mqKey].speed);
                            }
                        }


                    }

                    else if (animType === "scrollX01") {

                        var elemBounds = elem.getBoundingClientRect();
                        var bottom = props.windowHeigth - elemBounds.top;
                        var start = data[mqKey].start.bottom;
                        var finish = data[mqKey].finish.bottom;

                        //animasyonun başlangıç noktası
                        if (bottom >= start && bottom <= finish) {
                            elem.classList.add("active");
                            var x, y, z, t;

                            x = elem.parentNode.getBoundingClientRect().width - elemBounds.width; //(yatay uzunluk) elementin yatayda scroll edeceği alanın uzunluğu
                            y = finish - start; //(dikey uzunluk) bu dikey uzunluk baz alınarak yatay scroll hesaplanır
                            z = bottom - start; //element dikeyde ne kadar gitmiş hesaplanır
                            t = (x * z) / y; //elemti yatayda ne kadar scroll ettireceğiz hesaplanır

                            var dataDirection = elem.getAttribute("data-direction");
                            if (dataDirection === "l2r") { //soldan sağa scroll animasyonu ise
                                elem.style.transform = "translateX(" + t + "px)";
                            }
                            else if (dataDirection === "r2l") {//sağdan sola scroll animasyonu ise
                                elem.style.transform = "translateX(" + -t + "px)";
                            }

                        }
                        else if (bottom < start) {
                            elem.classList.remove("active");
                        }
                    }

                    else if (animType === "parallaxImage") {
                        var elemBounds = elem.getBoundingClientRect();
                        var parentNodeBounds = elem.parentNode.getBoundingClientRect();
                        var bottom = props.windowHeigth - parentNodeBounds.top;
                        var start = data[mqKey].start.bottom;

                        //animasyonun başlangıç noktası
                        if (bottom >= start) {
                            var resistance = data[mqKey].resistance;

                            var y = (props.windowHeigth - elemBounds.top) * resistance;

                            elem.style.transform = "translateY(" + y + "px)";

                        }

                    }

                    else if (animType === "group") {

                        var elemBounds = elem.getBoundingClientRect();
                        var bottom = props.windowHeigth - elemBounds.top;
                        var start = data[mqKey].start.bottom;
                        var isAnimStarted = elem.getAttribute("anim-started");


                        //animasyonun başlangıç noktası
                        if (bottom >= start && !isAnimStarted) {

                            elem.setAttribute("anim-started", "true");

                            var groupItems = elem.querySelectorAll("[data-direction]");

                            for (var j = 0; j < groupItems.length; j++) {
                                var groupItem = groupItems[j];
                                var direction = groupItem.getAttribute("data-direction");
                                groupItem.style.opacity = 1;

                                if (direction === "l2r") {
                                    groupItem.style.transform = "translateX(0)";
                                }
                                else if (direction === "r2l") {
                                    groupItem.style.transform = "translateX(0)";
                                }
                                else if (direction === "b2t") {
                                    groupItem.style.transform = "translateY(0)";
                                }
                                else if (direction === "t2b") {
                                    groupItem.style.transform = "translateY(0)";
                                }

                            }


                        }
                        if (bottom < -1) {
                            elem.removeAttribute("anim-started");

                            var groupItems = elem.querySelectorAll("[data-direction]");
                            var position = data[mqKey].start.position;

                            for (var j = 0; j < groupItems.length; j++) {
                                var groupItem = groupItems[j];
                                var direction = groupItem.getAttribute("data-direction");
                                groupItem.style.opacity = 0;

                                if (direction === "l2r") {
                                    groupItem.style.transform = "translateX(" + position + "px)";
                                }
                                else if (direction === "r2l") {
                                    groupItem.style.transform = "translateX(" + -position + "px)";
                                }
                                else if (direction === "b2t") {
                                    groupItem.style.transform = "translateY(" + -position + "px)";
                                }
                                else if (direction === "t2b") {
                                    groupItem.style.transform = "translateY(" + position + "px)";
                                }

                            }

                        }


                    }

                    else if (animType === "follow") {
                        var elemBounds = elem.getBoundingClientRect();
                        var parentNodeBounds = elem.parentNode.getBoundingClientRect();
                        var bottom = props.windowHeigth - parentNodeBounds.top;
                        var start = data[mqKey].start.bottom;
                        console.log("start"+start)
                        console.log("bottom" + bottom)
                        //animasyonun başlangıç noktası
                        if (bottom >= start) {

                            var y = bottom - start;

                            if (y <= parentNodeBounds.height) {
                                elem.style.transform = "translateY(" + y + "px)";
                            }
                            else {
                                elem.style.transform = "translateY(" + (parentNodeBounds.height) + "px)";
                            }

                        }
                        else {
                            elem.removeAttribute("style");
                        }

                    }

                }
            }
        },
        startCounterAnimate: function (section, speed) {

            const counters = section.querySelectorAll('[data-counter-anim]');

            counters.forEach(counter => {
                const animate = () => {
                    const value = +counter.getAttribute('data-counter-anim');
                    const data = +counter.innerText;

                    const time = value / speed;
                    if (data < value) {
                        counter.innerText = Math.ceil(data + time);
                        setTimeout(animate, 5);
                    } else {
                        counter.innerHTML = value;
                    }

                }

                animate();
            });

        },

    },

    Helper: {

        setElements: function () {
            var props = Feux.Animation.Props;
            var elements = Feux.Animation.Elements;

            elements.animElems = document.querySelectorAll(props.animElemsSelector);
        },
        setDefaultCss: function () {

            var elements = Feux.Animation.Elements;
            var mqKey = Feux.Base.Props.MediaQ.Curr.key;

            if (mqKey === "sm1" || mqKey === "sm2") {
                Feux.Animation.Props.windowHeigth = window.innerHeight * 1.57;
            }
           
            //default css ler atanıyor
            for (var i = 0; i < elements.animElems.length; i++) {

                var elem = elements.animElems[i];
                var animType = elem.getAttribute("data-f-anim");
                var data = Feux.Animation.Props.animType[animType];

                if (data[mqKey]) {
                    if (animType === "linearY" || animType === "linear_Y") {

                        var position = data[mqKey].start.position;
                        var transitionDuration = data[mqKey].start.transitionDuration;
                        elem.style.transform = "translateY(" + position + "px)";
                        elem.style.transitionDuration = transitionDuration + "s";
                        elem.style.opacity = 0;
                    }
                    else if (animType === "opacity") {
                        var position = data[mqKey].start.position;
                        var transitionDuration = data[mqKey].start.transitionDuration;
                        elem.style.transitionDuration = transitionDuration + "s";
                        elem.style.opacity = 0;
                    }
                    else if (animType === "scaleBig2Small") {

                        var scale = data[mqKey].start.scale;
                        elem.style.transform = "scale(" + scale + ")";

                        var transitionDuration = data[mqKey].start.transitionDuration;
                        elem.style.transitionDuration = transitionDuration + "s";

                    }
                    else if (animType === "mediaScale") {
                        var media = elem.querySelector("[data-media-scale]");

                        media.style.transform = "scale(" + data[mqKey].start.scale + ")";
                        media.style.transition = "scale 0.2s";

                        var storyContainer = elem.querySelector("[data-story-opacity]");
                        storyContainer.style.opacity = 0;
                        storyContainer.style.transition = "opacity 0.2s";
                        storyContainer.style.marginBottom = data[mqKey].start.storyMarginBottom + "px";

                    }
                    else if (animType === "parallaxImage") {
                        var resistance = data[mqKey].resistance;

                        elem.style.top = -(Feux.Animation.Props.windowHeigth * resistance) + "px";
                        elem.style.height = "calc(100% + " + Feux.Animation.Props.windowHeigth * resistance / 1.3 + "px)";
                    }
                    else if (animType === "group") {

                        var groupItems = elem.querySelectorAll("[data-direction]");
                        var position = data[mqKey].start.position;
                        var transitionDuration = data[mqKey].start.transitionDuration;

                        for (var j = 0; j < groupItems.length; j++) {
                            var groupItem = groupItems[j];
                            var direction = groupItem.getAttribute("data-direction");
                            groupItem.style.opacity = 0;
                            groupItem.style.transitionDuration = transitionDuration + "s";

                            if (direction === "l2r") {
                                groupItem.style.transform = "translateX(" + -position + "px)";
                            }
                            else if (direction === "r2l") {
                                groupItem.style.transform = "translateX(" + position + "px)";
                            }
                            else if (direction === "b2t") {
                                groupItem.style.transform = "translateY(" + -position + "px)";
                            }
                            else if (direction === "t2b") {
                                groupItem.style.transform = "translateY(" + position + "px)";
                            }

                        }

                    }
                }

            }
        }

    }
};

// End


Feux.Animation.ready();



//for a linear animation use this data

//'{
//"xl": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"lg": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"md": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"sm2": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"sm1": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"xs2": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"xs1": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" }
//}'

////////////////////////////////////////////////////////