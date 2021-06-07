define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FnValidator = /** @class */ (function () {
        function FnValidator(validateCb, errMessage) {
            this.name = "fn";
            this.cb = validateCb;
            this.errMessage = errMessage;
        }
        FnValidator.prototype.apply = function (value, formVal) {
            return this.cb(value, formVal);
        };
        return FnValidator;
    }());
    exports.default = FnValidator;
});
