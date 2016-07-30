'use strict';

export default function(course) {
    var course = course.split(',');
    var mainPart = course[0], secondPart = course[1];

    var canvas = document.createElement('canvas');
    var img = document.createElement('img');
    img.onload = function () {
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 2);

        context.font = "bold 14px Segoe UI";
        var dx = 0;
        switch (true) {
            case (+mainPart < 10):
                dx = 4;
                break;
            case (10 <= +mainPart && +mainPart < 100):
                dx = 0;
                break;
            case (100 <= +mainPart && +mainPart < 9000):
                dx = 0;
                context.font = "bold 11px Segoe UI";
                break;
            default :
                dx = 0;
                break;
        }
        context.fillStyle = "black";
        context.fillText(mainPart + ".", dx, 10);
        chrome.browserAction.setIcon({
            imageData: context.getImageData(0, 0, 19, 19)
        });
        chrome.browserAction.setBadgeBackgroundColor({color: '#2d2d2d'});
        chrome.browserAction.setBadgeText({text: secondPart + ''});
    };
    img.src = "icons/icon.png";
};