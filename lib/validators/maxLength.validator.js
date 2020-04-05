define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(errMessage, length) {
            this.name = "maxLength";
            this.errMessage = errMessage;
            this.length = length;
        }
        default_1.prototype.apply = function (value) {
            return !value || (typeof (value) == "string" && value.length <= this.length);
        };
        return default_1;
    }());
    exports.default = default_1;
});
