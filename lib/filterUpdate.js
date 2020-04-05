define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterUpdate = function (preVal, nextVal) {
        /**
         * null,undefined  ""  0
         */
        if (preVal == undefined) {
            if (nextVal === "") {
                preVal = "";
            }
            else if (nextVal === null)
                nextVal = preVal;
            //pass 0
        }
        else if (preVal === "") {
            if (nextVal == undefined)
                nextVal = "";
            //pass 0
        }
        else if (preVal === 0) {
            if (nextVal === "")
                nextVal = 0;
            // pass undefined
        }
        return [preVal, nextVal];
    };
});
