define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(errMessage) {
            this.name = "required";
            this.errMessage = errMessage;
        }
        default_1.prototype.apply = function (value) {
            return value === 0 || !!value;
        };
        return default_1;
    }());
    exports.default = default_1;
});
