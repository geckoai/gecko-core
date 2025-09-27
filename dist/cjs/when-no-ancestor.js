"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenNoAncestor = void 0;
var WhenNoAncestor = (function () {
    function WhenNoAncestor(constraint) {
        this.constraint = constraint;
    }
    Object.defineProperty(WhenNoAncestor.prototype, "type", {
        get: function () {
            return WhenNoAncestor;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoAncestor.for = function (constraint) {
        return new WhenNoAncestor(constraint);
    };
    return WhenNoAncestor;
}());
exports.WhenNoAncestor = WhenNoAncestor;
