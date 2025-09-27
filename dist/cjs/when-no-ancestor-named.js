"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenNoAncestorNamed = void 0;
var WhenNoAncestorNamed = (function () {
    function WhenNoAncestorNamed(name) {
        this.name = name;
    }
    Object.defineProperty(WhenNoAncestorNamed.prototype, "type", {
        get: function () {
            return WhenNoAncestorNamed;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoAncestorNamed.for = function (tag) {
        return new WhenNoAncestorNamed(tag);
    };
    return WhenNoAncestorNamed;
}());
exports.WhenNoAncestorNamed = WhenNoAncestorNamed;
