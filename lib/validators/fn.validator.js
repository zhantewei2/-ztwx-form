define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FnValidator = /** @class */ (function () {
        function FnValidator(validateCb, errMessage) {
            this.name = "email";
            this.cb = validateCb;
            this.errMessage = errMessage;
        }
        FnValidator.prototype.apply = function (value) {
            return this.cb(value);
        };
        return FnValidator;
    }());
    exports.default = FnValidator;
});
