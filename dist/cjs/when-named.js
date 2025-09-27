"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenNamed = void 0;
var WhenNamed = (function () {
    function WhenNamed(name) {
        this.name = name;
    }
    Object.defineProperty(WhenNamed.prototype, "type", {
        get: function () {
            return WhenNamed;
        },
        enumerable: false,
        configurable: true
    });
    WhenNamed.for = function (name) {
        return new WhenNamed(name);
    };
    return WhenNamed;
}());
exports.WhenNamed = WhenNamed;
