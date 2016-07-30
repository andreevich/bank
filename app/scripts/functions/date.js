'use strict';
const date = {
    parseTo2: function (par) {
        if (par < 10)
            par = '0' + par;
        return par;
    },
    getFormatedTime: function () {
        let t = new Date();
        return this.parseTo2(t.getDate()) + "."
            + this.parseTo2(t.getUTCMonth() * 1 + 1)
            + " " + this.parseTo2(t.getHours())
            + ":" + this.parseTo2(t.getMinutes()) + ":" + this.parseTo2(t.getSeconds());
    }
}
export default date;