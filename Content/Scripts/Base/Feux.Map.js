
Feux.Map = {
    Props: {
        mainMapId: "map01",
        markerIcon: "/Content/Visuals/marker.svg",
        markerZoom: 15,

    },

    Elements: {

    },

    Current: {
        map: null,

    },

    ready: function () {
        Feux.Map.Actions.init();
    },

    Actions: {
        init: function () {
            Feux.Map.Helper.setElements();
            Feux.Map.Actions.setupMap();
            Feux.Map.Actions.addMarker();
        },
        setupMap: function () {
            var props = Feux.Map.Props;
            
            Feux.Map.Current.map = new google.maps.Map(Feux.Map.Elements.map, {
                center: { lat: Feux.Map.Current.data.centerLat, lng: Feux.Map.Current.data.centerLng },
                zoom: props.isMobile ? Feux.Map.Current.data.mobileZoom : Feux.Map.Current.data.zoom,
                mapTypeControl: false,
                fullscreenControl: false,
            });
        },
        addMarker: function () {

            //markerı ekliyoruz
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(Feux.Map.Current.data.centerLat), parseFloat(Feux.Map.Current.data.centerLng)),
                map: Feux.Map.Current.map,
                icon: Feux.Map.Props.markerIcon,
                draggable: false
            });
        },
    },

    Helper: {
        setElements: function () {
            var props = Feux.Map.Props;
            var elements = Feux.Map.Elements;

            elements.map = document.getElementById(props.mainMapId);

            var key = Feux.Base.Props.MediaQ.Curr.key;
            props.isMobile = key === "xs1" || key === "xs2";

           
        },
    }
};

