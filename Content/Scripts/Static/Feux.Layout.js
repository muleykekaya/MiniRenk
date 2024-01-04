Feux.Layout = {
    
    Actions: {
       
        clipBoard: function (arg) {

            var event = arg.ev;
            event.preventDefault();

            var $temp = $("<input>");
            var $url = arg.sender.href;
            $("body").append($temp);
            $temp.val($url).select();
            document.execCommand("copy");
            $temp.remove();
            arg.sender.querySelector("span").innerHTML = arg.sender.getAttribute("data-copied-text");

            setTimeout(function () {
                arg.sender.querySelector("span").innerHTML = arg.sender.getAttribute("data-copy-text");
            }, 3000);
        },
    },
};

 