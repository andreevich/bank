'use strict';

import storage from './functions/storage';
import date from './functions/date';
import parse from './functions/parse';
import draw from './functions/drawIcon';

function init() {
    if (!storage.get('typeOfCourse')) {
        storage.set('typeOfCourse', 'usdBay');
    }
    if (!storage.get('bestCourses')) {
        storage.set('bestCourses');
    }
    if (!storage.get('lastUpdate')) {
        storage.set('lastUpdate');
    }
    if (!storage.get('arrayOfBank')) {
        storage.set('arrayOfBank');
    }
    if (!storage.get('city')) {
        storage.set('city');
    }

    update();
}

function update(callback) {
    let url = 'http://select.by/kurs' + storage.get('city');
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        var $best = $(data).find('tfoot');
        var $allBanks;
        var dx = 0;
        if (storage.get('city')) {
            $allBanks = $(data).find('#cours_obl_tbl tr:not(.tablesorter-childRow)');
            dx = -1;
        }
        else {
            $allBanks = $(data).find('#curr_table tr:not(.tablesorter-childRow)');
        }

        var bestCourses = {
            usdBay: parse.bestCoure($best, 3 + dx),
            usdSell: parse.bestCoure($best, 4 + dx),
            eurBay: parse.bestCoure($best, 5 + dx),
            eurSell: parse.bestCoure($best, 6 + dx),
            rubBay: parse.bestCoure($best, 7 + dx),
            rubSell: parse.bestCoure($best, 8 + dx)
        };

        var arrayOfBank = [];

        for (var i = 1; i < $allBanks.length - 1; i++) {
            arrayOfBank.push(parse.banks($allBanks[i]));
        }

        storage.set("lastUpdate", date.getFormatedTime(), function (data) {
            chrome.browserAction.setTitle({title: 'Последнее обновление: ' + data});
        });

        storage.set('bestCourses', JSON.stringify(bestCourses));
        storage.set("arrayOfBank", JSON.stringify(arrayOfBank));

        var course = JSON.parse(storage.get('bestCourses'))[storage.get('typeOfCourse')];
        draw(course);
        if (callback) {
            callback();
        }
    });
}

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        update(function () {
            sendResponse();
        })
    }
);


init();


setInterval(function () {
    update()
}, 1000 * 60 * 60); //1h