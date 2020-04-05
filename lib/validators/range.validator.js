define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(errMessage, minValue, maxValue) {
            this.name = "range";
            this.errMessage = errMessage;
            this.minValue = minValue;
            this.maxValue = maxValue;
        }
        default_1.prototype.apply = function (value) {
            if (!value && value !== 0)
                return true;
            value = Number(value);
            if (value !== 0 && !value)
                return false;
            return value >= this.minValue && value <= this.maxValue;
        };
        return default_1;
    }());
    exports.default = default_1;
});
