/**
 * 业务模块代码示例
 * Created by erminzem on 15/1/17.
 */

define(function(require, exports, module){
    var $ = require('$');
    var Crystal = require('crystal');

    var videoTpl = require('./home.handlebars');

    return Crystal.moduleFactory({
        attrs: {},

        events: {

        },

        setup: function(){
            $(this.element).html(videoTpl({}));

            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video"),
                videoObj = {
                    "video": true
                },
                errBack = function(error) {
                    console.log("Video capture error: ", error.code);
                };

            if(navigator.getUserMedia) {
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                    context.drawImage(video, 0, 0, 640, 480);
                }, errBack);
            } else if (navigator.mozGetUserMedia) {
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            } else {

            }

            $('#snap').on('click', function(){
                context.drawImage(video, 0, 0, 640, 480);
            });
        }
    });
});