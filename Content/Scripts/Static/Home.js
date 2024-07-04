var player;

var Home = {
  Video: {
    Props: {
      youtubeVideoId: 'wyzcnJOYYwc',
    },

    openYoutubeVideo: function (sender) {
      var w = '100%';
      var h = '100%';

      player = new YT.Player('player', {
        width: w,
        height: h,
        videoId: Home.Video.Props.youtubeVideoId,
        playerVars: {
          controls: 1,
          modestbranding: 0,
          showinfo: 0,
          rel: 0,
          disablekb: 1,
          fs: 1,
        },
        events: {
          onReady: Home.Video.playYoutubeVideo,
        },
      });
      sender.classList.add('on');
    },
    playYoutubeVideo: function () {
      player.playVideo();
    },
    stopYoutubeVideo: function () {
      player.stopVideo();
    },
  },
};
