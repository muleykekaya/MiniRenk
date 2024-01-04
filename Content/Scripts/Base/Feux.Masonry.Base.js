// Tabber Object

Feux.Masonry = {

    ready: function () {

    },

    Actions: {
        init: function () {
            
            var masonryItems = document.querySelectorAll("[data-f-masonry]");
            
            for (var i = 0; i < masonryItems.length; i++) {
                var masonryItem = masonryItems[i];

                var options = masonryItem.getAttribute("data-f-masonry");
                var key = Feux.Base.Props.MediaQ.Curr.key;

                if (key === "xs1" || key === "xs2") {
                    
                }
                //else if (key === "sm1" || key === "sm2") {
                //    $(masonryItem).masonry({
                //        // options
                //        itemSelector: '.masonry-item',
                //        columnWidth: 200,
                //        gutter: 16
                //    });
                //}
                else {
                    $(masonryItem).masonry({
                        // options
                        itemSelector: '.masonry-item',
                        columnWidth: parseInt(options.split(":")[1]),
                        gutter: 16
                    });
                }
               

            }


        },

    },

};

// End

 