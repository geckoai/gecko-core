"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenDefault = void 0;
var WhenDefault = (function () {
    function WhenDefault() {
    }
    Object.defineProperty(WhenDefault.prototype, "type", {
        get: function () {
            return WhenDefault;
        },
        enumerable: false,
        configurable: true
    });
    WhenDefault.for = function () {
        return new WhenDefault();
    };
    return WhenDefault;
}());
exports.WhenDefault = WhenDefault;
