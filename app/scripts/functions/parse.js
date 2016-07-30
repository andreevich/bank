'use strict';

import storage from './storage';

const parse = {
    bestCoure: function (data, item) {
        return data.find('th:nth-child(' + item + ')').find('b').text();
    },
    banks: function (data) {
        var dx = 0;
        if (storage.get('city')) {
            dx = -1;
        }

        return {
            bankName: $(data).find('td').eq(1 + dx).text(),
            courses: {
                usdBay: $(data).find('td').eq(2 + dx).text(),
                usdSell: $(data).find('td').eq(3 + dx).text(),
                eurBay: $(data).find('td').eq(4 + dx).text(),
                eurSell: $(data).find('td').eq(5 + dx).text(),
                rubBay: $(data).find('td').eq(6 + dx).text(),
                rubSell: $(data).find('td').eq(7 + dx).text()
            }
        };
    }
};
export default parse;