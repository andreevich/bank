//'use strict';

import storage from './functions/storage';

$(function () {
    function changeCity() {
        storage.set('city', $(this).val());
        updateCourse();
    }

    function updateCourse() {
        chrome.extension.sendRequest({userEvent: 'update'}, function () {
        });
    }

    function changeCurrency() {
        storage.set('typeOfCourse', $(this).val());
        updateCourse();
    }

    function initSettings() {
        var city = storage.get('city'),
            сurrency = storage.get('typeOfCourse');

        $('.city').val(city);
        $('.сurrency').val(сurrency);
    }

    initSettings();

    $('.city').on('change', changeCity);
    $('.сurrency').on('change', changeCurrency)
});

