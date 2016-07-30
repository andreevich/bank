//'use strict';

import storage from './functions/storage';

$(function () {
    function markBestCourse(data, course) {
        var bestCourse = JSON.parse(storage.get('bestCourses'))[course];
        var сurrency = storage.get('typeOfCourse');
        var className = '';
        if (bestCourse == data[course]) {
            className = 'best';
        }
        if (course == сurrency) {
            className = 'active';
        }
        if (bestCourse == data[course] && course == сurrency) {
            className = 'best-inverse active';
        }
        return '<td class="' + className + '">' + data[course] + '</td>';
    }

    function sort() {

        var banks = JSON.parse(storage.get('arrayOfBank'));
        var sortName = $(this).attr('sort');
        var direction = 1;

        $('.sort').each(function () {
            if (this !== event.currentTarget) {
                $(this).removeClass('showSort');
            }
            else {
                $(this).addClass('showSort');
            }
        });

        $(this).toggleClass('sortDown');
        if ($(this).hasClass('sortDown')) {
            direction *= -1;
        }
        banks.sort(function (a, b) {
            return direction * a.courses[sortName].replace(',', '.') - direction * b.courses[sortName].replace(',', '.');
        });

        storage.set('arrayOfBank', JSON.stringify(banks));
        $('.content').html(template());
    };

    function template() {
        var template = '';
        var banks = JSON.parse(storage.get('arrayOfBank'));
        var сurrency = storage.get('typeOfCourse');

        banks.forEach(function (e) {
            template += `<tr class="bank">
                 <td> ${e.bankName} </td>
                 ${markBestCourse(e.courses, 'usdBay')}
                 ${markBestCourse(e.courses, 'usdSell')}
                 ${markBestCourse(e.courses, 'eurBay')}
                 ${markBestCourse(e.courses, 'eurSell')}
                 ${markBestCourse(e.courses, 'rubBay')}
                 ${markBestCourse(e.courses, 'rubSell')}
               </tr>`;
        });
        updateDate();
        var $currentCurrency =  $('th.sort[sort='+сurrency+']');
        $currentCurrency.addClass('active');
        return template;
    };

    function updateDate() {
        var lastUpdate = "Последнее обновление: " + storage.get('lastUpdate');
        $('.update').html(lastUpdate);
    };

    function update() {
        var self = this;
        $(self).attr('disabled', true);
        chrome.extension.sendRequest({userEvent: 'update'}, function (response) {
            $(self).attr('disabled', false);
            $('.content').html(template());
        });

    }

    function openSettings(){
        chrome.tabs.create({url:"options.html"});
    };

    $('.content').html(template());
    $('.sort').on('click', sort);
    $('.updateData').on('click', update);
    $('.settings').on('click', openSettings);
});

