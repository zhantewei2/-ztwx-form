define(["require", "exports", "tslib", "./Subject"], function (require, exports, tslib_1, Subject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Form = exports.Subject = void 0;
    Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
    var Form = /** @class */ (function () {
        function Form(controllers) {
            var _this = this;
            this.controllerChangeSubject = new Subject_1.Subject();
            this.valueChange = new Subject_1.Subject();
            this.controllerDict = {};
            this.value = {};
            if (!controllers || !controllers.length)
                return;
            this.controllers = controllers;
            this.controllers.forEach(function (controller) {
                _this.handleController(controller);
                _this.appendValue(controller);
                _this.controllerDict[controller.id] = controller;
            });
            this.controllerChangeSubject.subscribe(function (controller) {
                _this.valueChange.next(_this.controllerDict);
            });
        }
        Form.prototype.appendValue = function (controller) {
            this.value[controller.id] = controller.value;
            Object.defineProperty(this.value, controller.id, {
                get: function () {
                    return controller.value;
                },
                set: function (v) {
                    controller.value = v;
                }
            });
        };
        Form.prototype.handleController = function (controller) {
            var _this = this;
            controller._value = controller.value;
            controller.errors = [];
            var self = this;
            controller.valueChange = new Subject_1.Subject();
            Object.defineProperty(controller, "value", {
                get: function () {
                    return this._value;
                },
                set: function (v) {
                    this._value = v;
                    if (!controller.validator)
                        return;
                    controller.errors = [];
                    self.handleControllerValidators(controller);
                    this.valueChange.next(controller);
                    self.controllerChangeSubject.next(controller);
                }
            });
            controller.reset = function () {
                _this.value[controller.id] = undefined;
                controller.errors = [];
                controller.valueChange && controller.valueChange.next(controller);
            };
            controller.errorsChange = new Subject_1.Subject();
        };
        Form.prototype.handleControllerValidators = function (controller) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _i, _a, validator;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(controller.validator instanceof Array)) return [3 /*break*/, 5];
                            _i = 0, _a = controller.validator;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            validator = _a[_i];
                            return [4 /*yield*/, this.handleControllerValidator(controller, validator)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.handleControllerValidator(controller, controller.validator);
                            _b.label = 6;
                        case 6:
                            controller.errorsChange && controller.errorsChange.next(controller.errors || []);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Form.prototype.handleControllerValidator = function (controller, validator) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var isPass, result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isPass = validator.apply(controller.value);
                            result = false;
                            if (!(isPass instanceof Promise)) return [3 /*break*/, 2];
                            return [4 /*yield*/, isPass];
                        case 1:
                            result = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            result = isPass;
                            _a.label = 3;
                        case 3:
                            if (result || !controller.errors)
                                return [2 /*return*/];
                            controller.errors.push(typeof (validator.errMessage) == "string" ? validator.errMessage : validator.errMessage(controller.value));
                            return [2 /*return*/];
                    }
                });
            });
        };
        Form.prototype.reset = function () {
            this.controllers.forEach(function (controller) {
                controller.reset && controller.reset();
            });
        };
        Form.prototype.toSerializer = function () {
            return this.value;
        };
        Object.defineProperty(Form.prototype, "isPass", {
            get: function () {
                for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
                    var controller = _a[_i];
                    if (controller.errors && controller.errors.length)
                        return false;
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Form.prototype.checkValidators = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _i, _a, controller;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.controllers;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            controller = _a[_i];
                            controller.errors = [];
                            return [4 /*yield*/, this.handleControllerValidators(controller)];
                        case 2:
                            _b.sent();
                            controller.valueChange && controller.valueChange.next(controller);
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, this.isPass];
                    }
                });
            });
        };
        return Form;
    }());
    exports.Form = Form;
});
