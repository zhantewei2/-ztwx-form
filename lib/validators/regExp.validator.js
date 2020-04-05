define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(errMessage, regExp) {
            this.name = "required";
            this.errMessage = errMessage;
            this.regExp = regExp;
        }
        default_1.prototype.apply = function (value) {
            if (!value && value !== 0)
                return true;
            return typeof (value) === "string" && this.regExp.test(value);
        };
        return default_1;
    }());
    exports.default = default_1;
});
