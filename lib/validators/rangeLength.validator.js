define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(errMessage, minLength, maxLength) {
            this.name = "rangeLength";
            this.errMessage = errMessage;
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
        default_1.prototype.apply = function (value) {
            return !value || (typeof (value) == "string" && (value.length <= this.maxLength) && (value.length >= this.minLength));
        };
        return default_1;
    }());
    exports.default = default_1;
});
