"use strict";

var player;

function videoHTML(videoNumber) {
    if (videoNumber!=2){
        return '<video id="video-js" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" ' +
            'controls preload="auto" width="640" height="264" ' +
            'poster="videos/img/' + videoNumber + '.png"' +
            'data-setup=\'{"fluid": true}\'>' +
            '\t<source src="videos/blog/' + videoNumber + '.mp4" type="video/mp4" /> \n' +
            '</video>';
    }
    else{
        return '<video id="video-js" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" ' +
            'controls preload="auto" width="640" height="264" ' +
            'poster="videos/img/' + videoNumber + '.png"' +
            'data-setup=\'{"fluid": true}\'>' +
            '\t<source src="https://seekedu.b-cdn.net/getyourchildexcited-1.mp4" type="video/mp4" /> \n' +
            '</video>';
    }
}

$("div.video-thumbnail").click(function () {

    var videoNumber = $(this).data("video");

    player.dispose();

    var html = videoHTML(videoNumber);

    $('div.video-background').html(html);

    player = videojs('#video-js');
    window.setTimeout('player.play()', 1500);

});

$(document).ready(function () {
    $('div.video-background').html(videoHTML(1));
    player = videojs('#video-js');
});