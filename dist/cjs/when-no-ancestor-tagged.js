"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenNoAncestorTagged = void 0;
var WhenNoAncestorTagged = (function () {
    function WhenNoAncestorTagged(tag, tagValue) {
        this.tag = tag;
        this.tagValue = tagValue;
    }
    Object.defineProperty(WhenNoAncestorTagged.prototype, "type", {
        get: function () {
            return WhenNoAncestorTagged;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoAncestorTagged.for = function (tag, value) {
        return new WhenNoAncestorTagged(tag, value);
    };
    return WhenNoAncestorTagged;
}());
exports.WhenNoAncestorTagged = WhenNoAncestorTagged;
